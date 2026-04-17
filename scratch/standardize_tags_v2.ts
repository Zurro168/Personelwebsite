import fs from 'fs';

const filePath = 'f:/Documents/Antigravity/个人网站/src/data/reports.ts';
let content = fs.readFileSync(filePath, 'utf8');

const tagMap: Record<string, string> = {
    '00_Brand': '关于我们',
    '00_Identity': '关于我们',
    '00_IDENTITY': '关于我们',
    '#宏观觉悟': '宏观觉悟',
    '宏观周期': '宏观觉悟',
    '宏观研究': '宏观觉悟',
    '宏观研报': '宏观觉悟',
    '#硬核商品': '硬核商品',
    '商品研报': '硬核商品',
    '矿业与产业链': '硬核商品',
    '有色金属': '硬核商品',
    '战略金属': '硬核商品',
    'AI × 供应链': '硅基供应链',
    '硅基供应链': '硅基供应链',
    'AI Agent': '硅基供应链',
    '供应链风险校准': '硅基供应链',
    '交易员笔记': '交易员笔记',
    '跨界实验': '跨界实验',
    '跨界': '跨界实验'
};

// 进化版：匹配一切引号形式的 tag
Object.keys(tagMap).forEach(oldTag => {
    // 匹配 "tag": "oldTag" 或 tag: 'oldTag'
    const regex = new RegExp(`"?tag"?\\s*:\\s*['"]${oldTag}['"]`, 'g');
    content = content.replace(regex, `tag: '${tagMap[oldTag]}'`);
});

// 特殊清理：针对残留的 ID 中包含 00_ 的情况也进行修正
content = content.replace(/tag:\s*['"]00_Brand['"]/g, "tag: '关于我们'");
content = content.replace(/tag:\s*['"]00_Identity['"]/g, "tag: '关于我们'");

fs.writeFileSync(filePath, content);
console.log('✅ Surgical tag cleanup complete.');
