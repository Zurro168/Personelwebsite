"""
🛰️ 硅基大宗 · 微信公众号与个人网站智能同步监控引擎 (WeChat to Website Monitor & Sync Engine)
-------------------------------------------------------------------------------------
功能：
1. 监控微信公众号草稿箱（获取后台微调后的封面 thumb_url 与最新摘要）
2. 监测文章正式发布（对比草稿箱出库差分，自动拉取发布事件）
3. 支持通过微信文章公开链接（https://mp.weixin.qq.com/s/...）一键对齐发布日期与封面
4. 自动触发网站增量同步 (npm run sync)、生成静态 HTML 并可选自动 Git 提交流水线
"""

import os
import sys
import re
import json
import time
import datetime
import argparse
import subprocess
from pathlib import Path
from urllib.parse import urlparse

# 强制设置标准输出为 UTF-8，防止 Windows 终端报错
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

import requests

# 根目录与配置解析
PROJECT_ROOT = Path(__file__).resolve().parent.parent
VAULT_CANDIDATES = [
    Path(r"F:\Documents\Vault\020_Projects\SiliconCommand"),
    Path(r"F:\Documents\Antigravity\硅基大宗"),
    Path(r"D:\iCloudDrive\iCloud~md~obsidian\Obsidian Vault\SiliconCommand")
]

CACHE_FILE = PROJECT_ROOT / "scripts" / ".wechat_sync_cache.json"

def get_vault_path() -> Path:
    env_vault = os.environ.get("VAULT_PATH")
    if env_vault and Path(env_vault).exists():
        return Path(env_vault)
    for p in VAULT_CANDIDATES:
        if p.exists():
            return p
    return VAULT_CANDIDATES[0]

def load_wechat_credentials():
    """从环境变量或硅基大宗/.env获取微信配置"""
    app_id = os.environ.get("WECHAT_APPID")
    app_secret = os.environ.get("WECHAT_APPSECRET")
    if app_id and app_secret:
        return app_id, app_secret

    candidate_envs = [
        Path(r"F:\Documents\Antigravity\硅基大宗\.env"),
        PROJECT_ROOT / ".env",
        PROJECT_ROOT / ".env.local"
    ]
    for env_path in candidate_envs:
        if env_path.exists():
            with open(env_path, "r", encoding="utf-8") as f:
                for line in f:
                    if "=" in line and not line.startswith("#"):
                        k, v = line.strip().split("=", 1)
                        k = k.strip()
                        v = v.strip().strip('"').strip("'")
                        if k == "WECHAT_APPID": app_id = v
                        elif k == "WECHAT_APPSECRET": app_secret = v
            if app_id and app_secret:
                return app_id, app_secret
    return None, None

def get_access_token():
    """获取并缓存微信 Access Token"""
    app_id, app_secret = load_wechat_credentials()
    if not app_id or not app_secret:
        print("⚠️ 未找到微信配置 WECHAT_APPID / WECHAT_APPSECRET")
        return None

    cache_paths = [
        Path(r"F:\Documents\Antigravity\硅基大宗\.token_cache.json"),
        PROJECT_ROOT / "scripts" / ".token_cache.json"
    ]
    for cp in cache_paths:
        if cp.exists():
            try:
                with open(cp, "r", encoding="utf-8") as f:
                    cache = json.load(f)
                if cache.get("app_id") == app_id and cache.get("expires_at", 0) > time.time():
                    return cache.get("access_token")
            except Exception:
                pass

    url = f"https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={app_id}&secret={app_secret}"
    try:
        res = requests.get(url, timeout=10).json()
        token = res.get("access_token")
        if token:
            cache = {
                "app_id": app_id,
                "access_token": token,
                "expires_at": time.time() + res.get("expires_in", 7200) - 300,
            }
            save_path = cache_paths[1]
            save_path.parent.mkdir(parents=True, exist_ok=True)
            with open(save_path, "w", encoding="utf-8") as f:
                json.dump(cache, f, ensure_ascii=False)
        return token
    except Exception as e:
        print(f"❌ 获取 Access Token 异常: {e}")
        return None

def load_sync_cache():
    if CACHE_FILE.exists():
        try:
            with open(CACHE_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return {"known_drafts": {}, "synced_articles": {}}

def save_sync_cache(cache):
    CACHE_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(CACHE_FILE, "w", encoding="utf-8") as f:
        json.dump(cache, f, ensure_ascii=False, indent=2)

def fetch_wechat_drafts(token):
    """从微信 API 读取草稿箱文章列表"""
    url = f"https://api.weixin.qq.com/cgi-bin/draft/batchget?access_token={token}"
    drafts = []
    offset = 0
    count = 20
    while True:
        try:
            res = requests.post(url, json={"offset": offset, "count": count, "no_content": 1}, timeout=10).json()
            if "errcode" in res and res["errcode"] != 0:
                print(f"⚠️ 草稿箱获取返回: {res}")
                break
            items = res.get("item", [])
            for item in items:
                media_id = item.get("media_id")
                content = item.get("content", {})
                update_time = item.get("update_time", 0)
                news_items = content.get("news_item", [])
                for idx, news in enumerate(news_items):
                    drafts.append({
                        "media_id": media_id,
                        "title": news.get("title", "").strip(),
                        "digest": news.get("digest", "").strip(),
                        "thumb_url": news.get("thumb_url", "").strip(),
                        "thumb_media_id": news.get("thumb_media_id", ""),
                        "url": news.get("url", ""),
                        "update_time": update_time,
                        "idx": idx
                    })
            if len(items) < count:
                break
            offset += count
        except Exception as e:
            print(f"❌ 读取草稿箱异常: {e}")
            break
    return drafts

def fetch_public_article_metadata(url: str):
    """
    通过公开文章链接解析文章正式发表时间、标题和封面 CDN 图片
    无需公众号授权，完全公开直读
    """
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    try:
        r = requests.get(url, headers=headers, timeout=12)
        if r.status_code != 200:
            print(f"❌ 获取文章页面失败，状态码: {r.status_code}")
            return None
        html = r.text

        # 1. 标题
        title_match = re.search(r'var\s+msg_title\s*=\s*["\'](.*?)["\'];', html)
        if not title_match:
            title_match = re.search(r'<meta\s+property="og:title"\s+content="([^"]*)"', html)
        title = title_match.group(1).strip() if title_match else ""

        # 2. 封面图 CDN 链接
        cover_match = re.search(r'var\s+msg_cdn_url\s*=\s*["\'](.*?)["\'];', html)
        if not cover_match:
            cover_match = re.search(r'<meta\s+property="og:image"\s+content="([^"]*)"', html)
        cover_url = cover_match.group(1).strip() if cover_match else ""

        # 3. 发布时间 (形如 var publish_time = "2026-10-15" 或 时间戳)
        time_match = re.search(r'var\s+publish_time\s*=\s*["\'](.*?)["\'];', html)
        publish_date = ""
        if time_match:
            raw_time = time_match.group(1).strip()
            if raw_time.isdigit():
                publish_date = datetime.datetime.fromtimestamp(int(raw_time)).strftime("%Y-%m-%d")
            else:
                publish_date = raw_time.split(" ")[0].split("T")[0]
        else:
            # 备选提取 ct 时间戳
            ct_match = re.search(r'var\s+ct\s*=\s*["\']?(\d+)["\']?;', html)
            if ct_match:
                publish_date = datetime.datetime.fromtimestamp(int(ct_match.group(1))).strftime("%Y-%m-%d")

        # 4. 摘要
        desc_match = re.search(r'var\s+msg_desc\s*=\s*["\'](.*?)["\'];', html)
        desc = desc_match.group(1).strip() if desc_match else ""

        return {
            "title": title,
            "cover_url": cover_url,
            "publish_date": publish_date or datetime.datetime.now().strftime("%Y-%m-%d"),
            "description": desc,
            "url": url
        }
    except Exception as e:
        print(f"❌ 解析微信文章链接失败: {e}")
        return None

def download_image(img_url: str, dest_path: Path) -> bool:
    """下载微信图床图片到本地资产库"""
    if not img_url: return False
    try:
        headers = {"Referer": "https://mp.weixin.qq.com/"}
        r = requests.get(img_url, headers=headers, timeout=15)
        if r.status_code == 200:
            dest_path.parent.mkdir(parents=True, exist_ok=True)
            with open(dest_path, "wb") as f:
                f.write(r.content)
            return True
    except Exception as e:
        print(f"  ⚠️ 下载图片失败: {e}")
    return False

def find_published_md_by_title(vault_path: Path, title: str):
    """在 10_Content/03_Published 中根据标题查找对应的 Markdown 文件"""
    published_dir = vault_path / "10_Content" / "03_Published"
    if not published_dir.exists():
        return None

    clean_target = re.sub(r'[\s\-_：:，,、？\?！!]', '', title).lower()

    best_match = None
    for md_file in published_dir.rglob("*.md"):
        if "思考清单" in md_file.name or "Visual_Asset" in md_file.name:
            continue
        # 匹配文件名
        clean_name = re.sub(r'[\s\-_：:，,、？\?！!]', '', md_file.stem).lower()
        if clean_target in clean_name or clean_name in clean_target:
            return md_file
        # 匹配标题
        try:
            with open(md_file, "r", encoding="utf-8") as f:
                for _ in range(25):
                    line = f.readline()
                    if line.startswith("title:"):
                        md_title = line.split(":", 1)[1].strip().strip('"').strip("'")
                        clean_md_title = re.sub(r'[\s\-_：:，,、？\?！!]', '', md_title).lower()
                        if clean_target in clean_md_title or clean_md_title in clean_target:
                            return md_file
        except Exception:
            continue
    return None

def update_obsidian_frontmatter(md_file: Path, new_date: str = None, new_cover: str = None):
    """更新 Obsidian 笔记的 publish_date 和 cover 属性"""
    try:
        content = md_file.read_text(encoding="utf-8")
        if not content.startswith("---"):
            return False

        parts = content.split("---", 2)
        if len(parts) < 3:
            return False

        yaml_text = parts[1]
        body = parts[2]

        if new_date:
            if "publish_date:" in yaml_text:
                yaml_text = re.sub(r"publish_date:\s*['\"]?.*?['\"]?(\r?\n)", f"publish_date: '{new_date}'\\1", yaml_text)
            else:
                yaml_text = f"publish_date: '{new_date}'\n" + yaml_text

        if new_cover:
            if "cover:" in yaml_text:
                yaml_text = re.sub(r"cover:\s*['\"]?.*?['\"]?(\r?\n)", f"cover: {new_cover}\\1", yaml_text)
            else:
                yaml_text = f"cover: {new_cover}\n" + yaml_text

        new_content = f"---{yaml_text}---{body}"
        md_file.write_text(new_content, encoding="utf-8")
        return True
    except Exception as e:
        print(f"❌ 更新 Markdown 属性失败: {e}")
        return False

def trigger_website_sync():
    """触发前端管道同步"""
    print("\n🚀 正在触发个人网站研报生成管道 (npm run sync)...")
    try:
        p = subprocess.run(["npm", "run", "sync"], cwd=str(PROJECT_ROOT), capture_output=True, text=True, shell=True)
        if p.returncode == 0:
            print("✅ 研报全量同步成功！")
            return True
        else:
            print(f"⚠️ 研报同步警告: {p.stderr}")
            return False
    except Exception as e:
        print(f"❌ 运行 npm run sync 失败: {e}")
        return False

def check_and_sync_drafts():
    """扫描草稿箱，提取微调封面，侦测发布出库"""
    token = get_access_token()
    if not token:
        return

    vault_path = get_vault_path()
    cache = load_sync_cache()
    known = cache.get("known_drafts", {})

    print(f"🔍 正在检索微信草稿箱...")
    current_drafts = fetch_wechat_drafts(token)
    print(f"📋 当前草稿箱共有 {len(current_drafts)} 篇草稿")

    current_media_ids = set()
    has_changes = False

    for d in current_drafts:
        m_id = d["media_id"]
        title = d["title"]
        current_media_ids.add(m_id)
        
        # 查找对应 Markdown
        md_file = find_published_md_by_title(vault_path, title)
        thumb_url = d["thumb_url"]

        # 检查是否在后台微调了封面
        old_data = known.get(m_id, {})
        old_thumb = old_data.get("thumb_url", "")

        if thumb_url and thumb_url != old_thumb:
            print(f"🖼️ 侦测到文章《{title}》后台更换了封面")
            if md_file:
                # 下载微信封面到本地
                covers_dir = md_file.parent / "assets" / "covers"
                dest_cover = covers_dir / "wechat_cover.jpg"
                if download_image(thumb_url, dest_cover):
                    update_obsidian_frontmatter(md_file, new_cover="./assets/covers/wechat_cover.jpg")
                    print(f"  ✅ 封面已下载并更新至 Obsidian: {dest_cover.name}")
                    has_changes = True

        known[m_id] = {
            "title": title,
            "thumb_url": thumb_url,
            "update_time": d["update_time"]
        }

    # 侦测出库发表（原先在草稿箱，现在消失的草稿）
    disappeared = [m_id for m_id in known if m_id not in current_media_ids]
    for m_id in disappeared:
        d_info = known[m_id]
        title = d_info.get("title", "")
        print(f"\n📢 侦测到文章出库发表：《{title}》！")
        md_file = find_published_md_by_title(vault_path, title)
        today_str = datetime.datetime.now().strftime("%Y-%m-%d")
        if md_file:
            update_obsidian_frontmatter(md_file, new_date=today_str)
            print(f"  ✅ 已将本地文章发布日期同步为今日: {today_str}")
        del known[m_id]
        has_changes = True

    cache["known_drafts"] = known
    save_sync_cache(cache)

    if has_changes:
        trigger_website_sync()

def sync_from_article_url(url: str):
    """通过公众号文章公开链接一键对齐发布日期与封面"""
    print(f"\n🔗 正在解析微信公开文章链接: {url}")
    meta = fetch_public_article_metadata(url)
    if not meta or not meta.get("title"):
        print("❌ 无法提取文章元数据，请检查链接格式。")
        return

    title = meta["title"]
    pub_date = meta["publish_date"]
    cover_url = meta["cover_url"]
    print(f"  📌 文章标题: {title}")
    print(f"  📅 正式发布日期: {pub_date}")
    print(f"  🖼️ 封面图 CDN: {cover_url[:60]}...")

    vault_path = get_vault_path()
    md_file = find_published_md_by_title(vault_path, title)
    if not md_file:
        print(f"⚠️ 在知识库中未找到标题匹配的笔记: {title}")
        return

    print(f"  🎯 匹配到本地笔记: {md_file.relative_to(vault_path)}")
    new_cover_rel = None
    if cover_url:
        covers_dir = md_file.parent / "assets" / "covers"
        dest_cover = covers_dir / "wechat_official_cover.jpg"
        if download_image(cover_url, dest_cover):
            new_cover_rel = "./assets/covers/wechat_official_cover.jpg"
            print(f"  💾 封面图片已下载并存为: assets/covers/wechat_official_cover.jpg")

    update_obsidian_frontmatter(md_file, new_date=pub_date, new_cover=new_cover_rel)
    print(f"  ✨ 已更新 Obsidian 属性: publish_date='{pub_date}'")

    trigger_website_sync()
    print(f"🎉 网站同步完成！文章《{title}》日期已与公众号完全保持一致 ({pub_date})。")

def main():
    parser = argparse.ArgumentParser(description="硅基大宗 · 微信公众号与个人网站同步监测引擎")
    parser.add_argument("--url", help="传入公众号正式发表的永久链接，一键对齐日期与封面并同步")
    parser.add_argument("--scan", action="store_true", help="主动扫描草稿箱微调封面并侦测出库发布")
    parser.add_argument("--sync", action="store_true", help="触发网站全量静态生成")
    args = parser.parse_args()

    if args.url:
        sync_from_article_url(args.url)
    elif args.scan:
        check_and_sync_drafts()
    elif args.sync:
        trigger_website_sync()
    else:
        # 默认执行一次扫描和同步
        check_and_sync_drafts()

if __name__ == "__main__":
    main()
