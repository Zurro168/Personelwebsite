import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BASE_PATH = 'D:/iCloudDrive/iCloud~md~obsidian/Obsidian Vault/SiliconCommand/10_Content/03_Published';

function scan(dir: string, results: any[] = []) {
    if (!fs.existsSync(dir)) return results;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            scan(fullPath, results);
        } else if (file.endsWith('.md')) {
            try {
                const content = fs.readFileSync(fullPath, 'utf-8');
                const { data } = matter(content);
                results.push({
                    relPath: fullPath.replace(BASE_PATH, ''),
                    title: data.title || file.replace('.md', ''),
                    layout: data.layout || 'paper',
                    slug: data.slug || 'N/A',
                    topicId: data.topic_id || 'N/A',
                    date: data.publish_date || data.published_at || data.date || 'N/A'
                });
            } catch (e) {}
        }
    }
    return results;
}

const list = scan(BASE_PATH);
console.log('| 物理路径 | 标题 | Layout | Slug | TopicID | 日期 |');
console.log('| :--- | :--- | :--- | :--- | :--- | :--- |');
list.forEach(r => {
    console.log(`| ${r.relPath} | ${r.title} | ${r.layout} | ${r.slug} | ${r.topicId} | ${r.date} |`);
});
