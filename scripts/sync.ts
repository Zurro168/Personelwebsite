import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * ⚡ Silicon Commodity: Obsidian Sync Engine v2.5 (Intelligent Classifier)
 * ---------------------------------------------------------------------
 * 作用：一键同步 Obsidian 内容到 Web 终端。支持「大宗评分卡」与「内容研报」双轨制。
 * 核心升级：支持依据 Frontmatter [tag] 自动在网页端分类挂载。
 */

const OBSIDIAN_PUBLISH_DIR = 'D:/iCloudDrive/iCloud~md~obsidian/Obsidian Vault/SiliconCommand/02_Queue';
const ARCHIVE_DIR = 'D:/iCloudDrive/iCloud~md~obsidian/Obsidian Vault/SiliconCommand/03_Archives';
const COMMODITY_DATA_DIR = path.join(process.cwd(), 'src/data/commodities');
const REPORTS_REGISTRY_FILE = path.join(process.cwd(), 'src/data/reports.ts');
const PUBLIC_REPORTS_DIR = path.join(process.cwd(), 'public/content/reports');

// 确保目录存在
if (!fs.existsSync(PUBLIC_REPORTS_DIR)) {
    fs.mkdirSync(PUBLIC_REPORTS_DIR, { recursive: true });
}

async function sync() {
    console.log('🚀 Checking for new intelligence in Obsidian Queue...');
    
    if (!fs.existsSync(OBSIDIAN_PUBLISH_DIR)) {
        console.error('❌ Obsidian directory not found.');
        return;
    }

    const files = fs.readdirSync(OBSIDIAN_PUBLISH_DIR).filter(f => f.endsWith('.md'));

    if (files.length === 0) {
        console.log('✨ No files to sync. Staying dormant.');
        return;
    }

    for (const file of files) {
        const filePath = path.join(OBSIDIAN_PUBLISH_DIR, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);

        if (!data.slug) {
            console.warn(`⚠️ Skipping ${file}: Missing 'slug' in Frontmatter.`);
            continue;
        }

        // --- 逻辑分流 A: 处理「内容研报」 (依据是否存在 tag 判定) ---
        if (data.tag) {
            console.log(`📑 Processing Report: ${data.title || data.slug} [Category: ${data.tag}]`);
            
            // 1. 保存文章实体文件到 public
            const reportContentPath = path.join(PUBLIC_REPORTS_DIR, `${data.slug}.html`);
            // 为了保持 HTML 原样, 我们直接使用 content 部分
            fs.writeFileSync(reportContentPath, content.trim());
            console.log(`   - Content saved to public assets.`);

            // 2. 更新 reports.ts 注册表
            let registryContent = fs.readFileSync(REPORTS_REGISTRY_FILE, 'utf8');
            
            // 构造新条目对象
            const newEntry = {
                id: `SCC-${new Date().getFullYear()}-${Math.floor(Math.random() * 900) + 100}`,
                title: data.title || '未命名报告',
                description: data.description || '暂无描述',
                tag: data.tag,
                date: new Date().toISOString().split('T')[0],
                readTime: data.readTime || '15 min',
                image: data.image || '/images/reports/mining-strategy.png',
                slug: data.slug,
                hasContent: true
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
    hasContent: true
  },`;

            // 检查是否已存在该 slug 的条目
            const slugRegex = new RegExp(`slug:\\s*'${data.slug}'`, 'g');
            if (slugRegex.test(registryContent)) {
                console.log(`   - Entry already exists, updating properties...`);
                // 这里简单处理：如果已存在，则通过覆盖文件更新内容，但 registry 中我们暂时不复杂替换（可后续优化）
            } else {
                // 插入到 ALL_REPORTS 数组的开头
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
        const archivePath = path.join(ARCHIVE_DIR, file);
        fs.renameSync(filePath, archivePath);
        console.log(`📦 Archived: ${file} moved to 03_Archives.\n`);
    }

    console.log('🏆 All-Pass Sync Complete. Industrial Intelligence Terminal updated.');
}

sync();
