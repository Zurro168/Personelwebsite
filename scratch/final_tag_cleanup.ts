import fs from 'fs';

const filePath = 'f:/Documents/Antigravity/个人网站/src/data/reports.ts';
let content = fs.readFileSync(filePath, 'utf8');

// 强制映射表 (全面覆盖可能出现的残留)
const tagMap: Record<string, string> = {
    '商品研报': '硬核商品',
    '矿业与产业链': '硬核商品',
    'AI x 供应链': '硅基供应链',
    'AI × 供应链': '硅基供应链',
    'AI | x 供应链': '硅基供应链',
    '宏观研究': '宏观觉悟',
};

Object.keys(tagMap).forEach(oldTag => {
    const regex = new RegExp(`tag:\\s*['"]${oldTag}['"]`, 'g');
    content = content.replace(regex, `tag: '${tagMap[oldTag]}'`);
});

fs.writeFileSync(filePath, content);
console.log('✅ Surgical cleanup of residual tags complete.');
