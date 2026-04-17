import fs from 'fs';
import path from 'path';

// 读取原始数据
const filePath = 'f:/Documents/Antigravity/个人网站/src/data/reports.ts';
let content = fs.readFileSync(filePath, 'utf8');

// 标签映射字典
const tagMap: Record<string, string> = {
    '00_Brand': '关于我们',
    '00_Identity': '关于我们',
    '00_IDENTITY': '关于我们',
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
    '硅基供应链': '硅基供应链',
    'AI Agent': '硅基供应链',
    '供应链风险校准': '硅基供应链',
    '交易员笔记': '交易员笔记',
    '跨界实验': '跨界实验',
    '跨界': '跨界实验'
};

// 使用正则匹配并替换 tag
Object.keys(tagMap).forEach(oldTag => {
    const regex = new RegExp(`tag:\\s*['"]${oldTag}['"]`, 'g');
    content = content.replace(regex, `tag: '${tagMap[oldTag]}'`);
});

// 移除可能存在的重复项或占位符
// ... (保留现有逻辑)

fs.writeFileSync(filePath, content);
console.log('✅ Reports tags standardized.');
