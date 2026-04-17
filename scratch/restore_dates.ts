import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const VAULT_PATH = 'D:/iCloudDrive/iCloud~md~obsidian/Obsidian Vault/SiliconCommand/10_Content/03_Published';
const REGISTRY_FILE = 'f:/Documents/Antigravity/个人网站/src/data/reports.ts';

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        if (fs.statSync(filePath).isDirectory()) {
            getAllFiles(filePath, arrayOfFiles);
        } else if (file.endsWith('.md')) {
            arrayOfFiles.push(filePath);
        }
    });
    return arrayOfFiles;
}

const obsidianFiles = getAllFiles(VAULT_PATH);
let registryContent = fs.readFileSync(REGISTRY_FILE, 'utf8');

obsidianFiles.forEach(filePath => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    const slug = data.slug;
    
    if (slug) {
        const stats = fs.statSync(filePath);
        // 优先使用 Frontmatter 里的日期，否则用物理创建日期
        const actualDate = data.date || stats.birthtime.toISOString().split('T')[0];
        
        // 正则：找到该 slug 对应的 date 行进行替换
        const slugRegex = new RegExp(`(slug:\\s*'${slug}'[^{}]*?date:\\s*')[^']+(')`, 's');
        const match = registryContent.match(new RegExp(`{[^{}]+?slug:\\s*'${slug}'[^{}]+?}`, 's'));
        
        if (match) {
            let entry = match[0];
            const updatedEntry = entry.replace(/date:\s*'[^']+'/, `date: '${actualDate}'`);
            registryContent = registryContent.replace(entry, updatedEntry);
            console.log(`🕒 Restored ${slug} -> ${actualDate}`);
        }
    }
});

fs.writeFileSync(REGISTRY_FILE, registryContent);
console.log('✅ All historical dates restored from file ancestry.');
