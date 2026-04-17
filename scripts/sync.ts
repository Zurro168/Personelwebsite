import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * ⚡ Silicon Commodity: Obsidian Sync Engine v3.0 (Folder-Based Intelligence)
 * ---------------------------------------------------------------------
 * 作用：一键同步 Obsidian 内容到 Web 终端。
 * 核心升级：
 * 1. 递归扫描：支持 sub-folders，方便分类管理。
 * 2. 文件夹驱动分类：如果没有在 Frontmatter 指定 tag，则自动使用文件夹名称作为分类。
 * 3. 极简运维：通过文件夹移动即可改变网页展示逻辑。
 */

// ── Obsidian Vault 路径（基于 2026-04 Vault 重组后的新结构）────────────
// 旧结构: 02_Queue / 03_Archives / 00_Identity
// 新结构: 10_Content/02_Queue / 10_Content/03_Published / 00_Brand
const SC_BASE = 'D:/iCloudDrive/iCloud~md~obsidian/Obsidian Vault/SiliconCommand';
const OBSIDIAN_PUBLISH_DIR = `${SC_BASE}/10_Content/02_Queue`;      // 待发布队列
const ARCHIVE_DIR          = `${SC_BASE}/10_Content/03_Published`;   // 已发布存档（原 03_Archives）
const SYSTEM_DIR           = `${SC_BASE}/00_Brand`;                  // IP/品牌资源（原 00_Identity）
const COMMODITY_DATA_DIR = path.join(process.cwd(), 'src/data/commodities');
const REPORTS_REGISTRY_FILE = path.join(process.cwd(), 'src/data/reports.ts');
const PUBLIC_REPORTS_DIR = path.join(process.cwd(), 'public/content/reports');
const PUBLIC_SYSTEM_DIR = path.join(process.cwd(), 'public/content/system');

// 确保目录存在
if (!fs.existsSync(PUBLIC_REPORTS_DIR)) {
    fs.mkdirSync(PUBLIC_REPORTS_DIR, { recursive: true });
}
if (!fs.existsSync(PUBLIC_SYSTEM_DIR)) {
    fs.mkdirSync(PUBLIC_SYSTEM_DIR, { recursive: true });
}

/**
 * 递归获取所有 markdown 文件
 */
function getAllFiles(dir: string, allFiles: string[] = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getAllFiles(filePath, allFiles);
        } else if (file.endsWith('.md')) {
            allFiles.push(filePath);
        }
    });
    return allFiles;
}

async function sync() {
    console.log('🚀 Checking for new intelligence in Obsidian Queue (Recursive)...');
    
    if (!fs.existsSync(OBSIDIAN_PUBLISH_DIR)) {
        console.error('❌ Obsidian directory not found.');
        return;
    }

    const queueFiles = fs.existsSync(OBSIDIAN_PUBLISH_DIR) ? getAllFiles(OBSIDIAN_PUBLISH_DIR) : [];
    const archiveFiles = fs.existsSync(ARCHIVE_DIR) ? getAllFiles(ARCHIVE_DIR) : [];
    const systemFiles = fs.existsSync(SYSTEM_DIR) ? getAllFiles(SYSTEM_DIR) : [];
    const files = [...queueFiles, ...archiveFiles, ...systemFiles];

    if (files.length === 0) {
        console.log('✨ No files to sync. Staying dormant.');
        return;
    }

    // 映射规则：公众号同名专栏收敛逻辑 (提取到循环外)
    const categoryMap: Record<string, string> = {
      '00_Brand': '关于我们',
      '00_Identity': '关于我们',
      '关于': '关于我们',
      '宏观周期': '宏观觉悟',
      '宏观研究': '宏观觉悟',
      '宏观研报': '宏观觉悟',
      '#宏观觉悟': '宏观觉悟',
      '商品研报': '硬核商品',
      '矿业与产业链': '硬核商品',
      '#硬核商品': '硬核商品',
      '有色金属': '硬核商品',
      '战略金属': '硬核商品',
      'AI × 供应链': '硅基供应链',
      'AI Agent': '硅基供应链',
      '供应链风险校准': '硅基供应链',
      '交易员笔记': '交易员笔记',
      '跨界实验': '跨界实验',
      '跨界': '跨界实验'
    };

    for (let rawFilePath of files) {
        const filePath = rawFilePath.split(path.sep).join('/');
        const fileName = path.basename(filePath);
        const sourceRoot = filePath.includes(ARCHIVE_DIR) ? ARCHIVE_DIR : 
                           filePath.includes(SYSTEM_DIR) ? SYSTEM_DIR : OBSIDIAN_PUBLISH_DIR;
        const rawRelativeDir = path.dirname(path.relative(sourceRoot, filePath));
        const relativeDir = rawRelativeDir.split(path.sep).join('/');
        
        // 自动计算分类：实施“大类归并”逻辑
        // 过滤掉容器文件夹名（旧结构 + 新结构均兼容）
        const categoryParts = relativeDir.split('/').filter(p => ![
            '.', '..', 
            '02_Queue', '03_Archives',          // 旧结构
            '10_Content', '03_Published',        // 新结构
        ].includes(p));
        let rawCategory = categoryParts.length > 0 ? categoryParts[categoryParts.length - 1] : '商品研报';
        
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);

        if (!data.slug && !filePath.includes(SYSTEM_DIR)) {
            console.warn(`⚠️ Skipping ${fileName}: Missing 'slug' in Frontmatter.`);
            continue;
        }

        const isSystemFile = filePath.includes(SYSTEM_DIR);
        const folderCategory = categoryMap[rawCategory] || rawCategory;
        
        // 1. 映射规则：公众号同名专栏收敛逻辑
        const rawTag = data.tag ? data.tag.replace('#', '') : folderCategory;
        const reportTag = categoryMap[rawTag] || rawTag;

        // --- 逻辑分流 S: 处理「系统页面」(Bio/About) ---
        if (isSystemFile) {
            console.log(`📡 Processing System Resource: ${fileName}`);
            const systemSlug = data.slug || fileName.replace('.md', '').toLowerCase();
            const systemContentPath = path.join(PUBLIC_SYSTEM_DIR, `${systemSlug}.html`);
            
            // 简单的内容清理与样式注入 (重用部分逻辑)
            let finalContent = content.trim();

            // 🌟 核心增强：如果处理的是 About.md，则同步更新 biography.ts
            if (fileName.toLowerCase() === 'about.md') {
                console.log(`   - Updating Bio-Registry from Metadata...`);
                const bioFilePath = path.join(process.cwd(), 'src/data/biography.ts');
                
                // 构造最新的 AUTHOR_INFO 对象（保留基础架构，替换动态内容）
                const newBioData = {
                    ...data,
                    name: data.name || "Silicon Researcher",
                    title: data.title || "硅基大宗主理人",
                    motto: data.motto || "碳基经验的终局，算法逻辑的起点。",
                    social: {
                       email: data.email || "zurro_w@foxmail.com",
                       wechat: { id: "zurro_w" },
                       officialAccount: { name: "Siliconcommodity" },
                       linkedin: (data.linkedin || "www.linkedin.com/in/gordon-wang-63622821").startsWith('http') 
                                 ? (data.linkedin || "www.linkedin.com/in/gordon-wang-63622821") 
                                 : `https://${data.linkedin || "www.linkedin.com/in/gordon-wang-63622821"}`,
                       x: (data.twitter || data.x || "x.com/Gordon800619").startsWith('http')
                                 ? (data.twitter || data.x || "x.com/Gordon800619")
                                 : `https://${data.twitter || data.x || "x.com/Gordon800619"}`
                    },
                    copyright: {
                        owner: "硅基大宗 (Silicon Commodity)",
                        year: 2026,
                        notice: "本文著作权归 硅基大宗 所有。"
                    }
                };

                const updatedBioTS = `/**
 * 🛰️ Silicon Commodity: Global Biography (Auto-Synced from Obsidian v3.0)
 */
export const AUTHOR_INFO = ${JSON.stringify(newBioData, null, 2)};
`;
                fs.writeFileSync(bioFilePath, updatedBioTS);
                console.log(`   - biography.ts updated with latest stats.`);
            }

            fs.writeFileSync(systemContentPath, finalContent);
            console.log(`   - System resource synced to site structure.`);
            continue;
        }

        // --- 逻辑分流 A: 处理「内容研报」 (依据是否存在 slug + content 判定) ---
        // 只要有 slug 我们就认为是研报，除非明确是评分卡格式
        if (data.tag || relativeDir !== '.') {
            console.log(`📑 Processing Report: ${data.title || data.slug} [Category: ${reportTag}]`);
            
            let finalContent = content.trim();

            // 如果内容看起来是完整的 HTML 页面，尝试提取 Body 部分并清理
            if (finalContent.includes('<body') || finalContent.includes('<html')) {
                console.log(`   - Full HTML detected, sanitizing for portal integration...`);
                
                const bodyMatch = finalContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
                if (bodyMatch) {
                    finalContent = bodyMatch[1];
                }

                const styleMatches = content.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
                if (styleMatches) {
                    const styles = styleMatches.join('\n');
                    finalContent = styles + '\n' + finalContent;
                }

                // 移除冗余的导航、页眉、页脚
                finalContent = finalContent.replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '');
                finalContent = finalContent.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '');
                finalContent = finalContent.replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '');
                finalContent = finalContent.replace(/<script[^>]*src="[^"]*tailwindcss\.com[^"]*"[^>]*><\/script>/gi, '');
                
                // 彻底清除背景色与文字色硬编码 (Nuclear background/text removal)
                finalContent = finalContent.replace(/background-color:\s*#[a-fA-F0-9]{3,6};?/gi, '');
                finalContent = finalContent.replace(/background:\s*#[a-fA-F0-9]{3,6};?/gi, '');
                finalContent = finalContent.replace(/background-color:\s*rgb\([^)]+\);?/gi, '');
                finalContent = finalContent.replace(/color:\s*#[a-fA-F0-9]{3,6};?/gi, '');
                finalContent = finalContent.replace(/color:\s*rgb\([^)]+\);?/gi, '');
                
                // 修正 Tailwind 背景色与文字色
                finalContent = finalContent.replace(/text-slate-950/gi, 'text-white');
                finalContent = finalContent.replace(/text-slate-900/gi, 'text-slate-100');
                finalContent = finalContent.replace(/text-slate-800/gi, 'text-slate-200');
                finalContent = finalContent.replace(/text-slate-700/gi, 'text-slate-300');
                finalContent = finalContent.replace(/text-slate-600/gi, 'text-slate-400');
                finalContent = finalContent.replace(/text-stone-900/gi, 'text-stone-100');
                finalContent = finalContent.replace(/text-stone-800/gi, 'text-stone-200');
                finalContent = finalContent.replace(/text-stone-700/gi, 'text-stone-300');
                finalContent = finalContent.replace(/text-stone-600/gi, 'text-stone-400');
                finalContent = finalContent.replace(/text-black/gi, 'text-white');
                finalContent = finalContent.replace(/text-gray-900/gi, 'text-gray-100');
                finalContent = finalContent.replace(/text-zinc-900/gi, 'text-zinc-100');
                
                // 彻底移除红框标识 (Red Box removal)
                finalContent = finalContent.replace(/bg-red-[1-9]00/gi, 'bg-brand-blue/20');
                finalContent = finalContent.replace(/text-red-[1-9]00/gi, 'text-brand-blue');
                finalContent = finalContent.replace(/border-red-[1-9]00/gi, 'border-brand-blue/30');
                
                // 处理硬编码的红色 (Hex Colors especially in Chart.js)
                finalContent = finalContent.replace(/#ef4444/gi, '#38bdf8');
                finalContent = finalContent.replace(/rgb\(239, 68, 68\)/gi, 'rgb(56, 189, 248)');
                finalContent = finalContent.replace(/#fca5a5/gi, 'rgba(56, 189, 248, 0.5)');
                
                // 适配工业风颜色
                finalContent = finalContent.replace(/text-amber-[1-9]00/gi, 'text-brand-blue');
                finalContent = finalContent.replace(/bg-amber-[1-9]00/gi, 'bg-brand-blue/10');
                finalContent = finalContent.replace(/border-amber-[1-9]00/gi, 'border-brand-blue/20');
                finalContent = finalContent.replace(/text-orange-[1-9]00/gi, 'text-brand-blue');
                finalContent = finalContent.replace(/bg-orange-[1-9]00/gi, 'bg-brand-blue/10');
                finalContent = finalContent.replace(/border-orange-[1-9]00/gi, 'border-brand-blue/20');

                // 强制修正容器宽度 (Force container constraints for ALL variants)
                finalContent = finalContent.replace(/max-w-[0-9]xl/gi, 'max-w-full');
                finalContent = finalContent.replace(/max-w-screen-[a-z0-9]+/gi, 'max-w-full');

                // 移除 body 中的硬编码内联样式
                finalContent = finalContent.replace(/<body[^>]*style="[^"]*"[^>]*>/gi, '<body>');

                // 注入全局内容控制样式 (加固版)
                const globalStyleInject = `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@200..900&display=swap');
  .report-body { max-width: 100% !important; border: none !important; font-family: 'Crimson Pro', serif !important; }
  body { background-color: transparent !important; color: inherit !important; font-family: 'Crimson Pro', serif !important; }
  table { width: 100% !important; max-width: 100% !important; display: block; overflow-x: auto; border-color: rgba(56,189,248,0.1) !important; border-collapse: collapse; }
  .red-box, [class*="red-"], [class*="amber-"], [class*="orange-"] { 
    border-color: #38bdf8 !important; 
    background-color: rgba(56,189,248,0.05) !important; 
    color: #fff !important; 
    border-radius: 4px;
    padding: 1rem;
  }
  img { max-width: 100% !important; height: auto !important; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); }
  canvas { max-width: 100% !important; width: 100% !important; }
  .glass-panel { background: rgba(15, 23, 42, 0.6) !important; border-color: rgba(56, 189, 248, 0.1) !important; color: #fff !important; }
</style>
                `;
                finalContent = globalStyleInject + finalContent;
            }

            // 1. 保存文章实体文件
            const reportContentPath = path.join(PUBLIC_REPORTS_DIR, `${data.slug}.html`);
            fs.writeFileSync(reportContentPath, finalContent.trim());
            console.log(`   - Content saved to public assets.`);

            // 1.5 提取日期逻辑：优先 YAML 的 publish_date 或 date，次选物理创建时间，最后保底今天
            const stats = fs.statSync(filePath);
            const physicalDate = stats.birthtime.toISOString().split('T')[0];
            const finalDate = data.publish_date || data.date || physicalDate || new Date().toISOString().split('T')[0];

            // 2. 更新 reports.ts 注册表
            let registryContent = fs.readFileSync(REPORTS_REGISTRY_FILE, 'utf8');
            
            // 检查之前是否已经存在该条目，尝试保留原有日期
            const dateMatch = registryContent.match(new RegExp(`slug:\\s*'${data.slug}'[^}]+date:\\s*'([^']+)'`, 's'));
            const existingDate = dateMatch ? dateMatch[1] : null;

            // 🖼️ 自动封面图检索逻辑：优先 YAML -> 次选本地同名图片 -> 最后保底 Unsplash
            let finalImage = data.image || data.cover; 
            if (!finalImage) {
                const possibleExtensions = ['.jpg', '.png', '.webp', '.jpeg'];
                const imagesDir = path.join(process.cwd(), 'public/images/reports');
                
                // 确保目录存在（防死锁）
                if (fs.existsSync(imagesDir)) {
                    for (const ext of possibleExtensions) {
                        const localFileName = `${data.slug}${ext}`;
                        if (fs.existsSync(path.join(imagesDir, localFileName))) {
                            finalImage = `/images/reports/${localFileName}`;
                            console.log(`   - Detected local matching cover: ${localFileName}`);
                            break;
                        }
                    }
                }
            }
            // 依旧没找到则使用高质感保底图
            if (!finalImage) {
                finalImage = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1200&auto=format&fit=crop';
            }

            const isPinned = fileName.toLowerCase() === 'about.md';

            const newEntry = {
                id: `SCC-2026-${Math.floor(Math.random() * 900) + 100}`,
                title: data.title || fileName.replace('.md', ''),
                description: data.description || '自动同步的深度研究报告',
                tag: isPinned ? '关于我们' : reportTag,
                date: existingDate || finalDate, // 优先保留已存在的日期
                readTime: data.readTime || '15 min',
                image: finalImage,
                slug: data.slug,
                hasContent: true,
                isPinned: isPinned
            };

            const entryString = `  {
    id: '${newEntry.id}',
    title: '${newEntry.title}',
    description: '${newEntry.description}',
    tag: '${newEntry.tag}',
    date: '${newEntry.date}',
    readTime: '${newEntry.readTime}',
    image: '${newEntry.image}',
    slug: '${newEntry.slug}',
    hasContent: true,
    isPinned: ${newEntry.isPinned}
  },`;

            const slugRegex = new RegExp(`\\{\\s*id:[^}]+slug:\\s*'${data.slug}'[^}]+\\}`, 'gs');
            if (slugRegex.test(registryContent)) {
                // Update existing entry (replace old object with new one)
                registryContent = registryContent.replace(slugRegex, entryString.trim().replace(/,$/, ''));
                fs.writeFileSync(REPORTS_REGISTRY_FILE, registryContent);
                console.log(`   - Entry already exists, metadata updated.`);
            } else {
                registryContent = registryContent.replace(
                    /export const ALL_REPORTS: Report\[\] = \[/,
                    `export const ALL_REPORTS: Report[] = [\n${entryString}`
                );
                fs.writeFileSync(REPORTS_REGISTRY_FILE, registryContent);
                console.log(`   - Successfully registered in web navigation.`);
            }
        } 
        
        // --- 逻辑分流 B: 处理「大宗评分卡」 ---
        else {
            console.log(`📈 Processing Commodity Card: ${data.name || data.slug}`);
            const targetPath = path.join(COMMODITY_DATA_DIR, `${data.slug}.json`);
            let jsonData: any = {};
            if (fs.existsSync(targetPath)) {
                jsonData = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
            }

            jsonData.last_updated = new Date().toISOString();
            if (data.name) jsonData.metadata = { ...jsonData.metadata, name: data.name };
            
            if (data.score !== undefined) {
                jsonData.score_engine = {
                    ...jsonData.score_engine,
                    total_score: data.score,
                    cycle_position: data.cycle_pos !== undefined ? data.cycle_pos : jsonData.score_engine?.cycle_position,
                    dimensions: data.dimensions || jsonData.score_engine?.dimensions
                };
            }

            const sections = content.split(/^## /m).filter(Boolean);
            if (sections.length > 0) {
                jsonData.narrative_layer = sections.map(sec => {
                    const lines = sec.split('\n');
                    return {
                        title: lines[0].trim(),
                        content: lines.slice(1).join('\n').trim()
                    };
                });
            }
            fs.writeFileSync(targetPath, JSON.stringify(jsonData, null, 2));
            console.log(`   - Global Data Pack updated.`);
        }

        // --- 公共动作: 归档 ---
        const archiveDest = path.join(ARCHIVE_DIR, relativeDir);
        if (!fs.existsSync(archiveDest)) fs.mkdirSync(archiveDest, { recursive: true });
        
        const archivePath = path.join(archiveDest, fileName);
        if (filePath !== archivePath) {
            fs.renameSync(filePath, archivePath);
            console.log(`📦 Archived: ${fileName} moved to 10_Content/03_Published/${relativeDir}.\n`);
        } else {
            console.log(`✅ ${fileName} is already in archive. Skipping move.\n`);
        }
    }

    console.log('🏆 All-Pass Sync Complete. Industrial Intelligence Terminal updated.');
}

sync();
