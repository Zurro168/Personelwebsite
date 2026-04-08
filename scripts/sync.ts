import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * ⚡ Silicon Commodity: Obsidian Sync Engine v1.0
 * --------------------------------------------
 * 作用：一键将 Obsidian 研报同步到个人网页
 * 扫描路径：D:\iCloudDrive\iCloud~md~obsidian/SiliconCommand/02_Queue
 * 输出路径：src/data/commodities/
 */

const OBSIDIAN_PUBLISH_DIR = 'D:/iCloudDrive/iCloud~md~obsidian/Obsidian Vault/SiliconCommand/02_Queue';
const WEB_DATA_DIR = path.join(process.cwd(), 'src/data/commodities');
const ARCHIVE_DIR = 'D:/iCloudDrive/iCloud~md~obsidian/Obsidian Vault/SiliconCommand/03_Archives';

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

        const targetPath = path.join(WEB_DATA_DIR, `${data.slug}.json`);
        
        // 1. Read existing JSON or start new
        let jsonData: any = {};
        if (fs.existsSync(targetPath)) {
            jsonData = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
        }

        // 2. Map Frontmatter to Logic-Pack
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

        // 3. Extract Narrative (Split by H2 headers)
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

        // 4. Save to Website
        fs.writeFileSync(targetPath, JSON.stringify(jsonData, null, 2));
        console.log(`✅ Synced: ${data.name || data.slug} to website.`);

        // 5. Archive the file
        const archivePath = path.join(ARCHIVE_DIR, file);
        fs.renameSync(filePath, archivePath);
        console.log(`📦 Archived: ${file} moved to 03_Archives.`);
    }

    console.log('🏆 Sync Complete. Industrial Intelligence Terminal updated.');
}

sync();
