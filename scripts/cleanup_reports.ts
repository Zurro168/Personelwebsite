import fs from 'fs';
import path from 'path';

const PUBLIC_REPORTS_DIR = 'f:/Documents/Antigravity/个人网站/public/content/reports';

function cleanFiles() {
    console.log('🧹 Starting cleanup of existing reports in public folder...');
    const files = fs.readdirSync(PUBLIC_REPORTS_DIR).filter(f => f.endsWith('.html'));

    files.forEach(file => {
        const filePath = path.join(PUBLIC_REPORTS_DIR, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        // Clean Red/Rose/Amber/Orange variants
        content = content.replace(/bg-(red|rose|amber|orange)-[1-9]00/gi, 'bg-brand-blue/20');
        content = content.replace(/text-(red|rose|amber|orange)-[1-9]00/gi, 'text-brand-blue');
        content = content.replace(/border-(red|rose|amber|orange)-[1-9]00/gi, 'border-brand-blue/30');
        
        // Clean Hex Colors in JS/Charts (Red & Rose variations)
        const redHexes = ['#ef4444', '#f43f5e', '#e11d48', '#be123c', '#991b1b', '#dc2626', '#fca5a5', '#b45309', '#d97706'];
        redHexes.forEach(hex => {
            const regex = new RegExp(hex, 'gi');
            content = content.replace(regex, '#38bdf8'); // Replace with brand-blue
        });
        // 彻底清除硬编码背景与文字色 (Nuclear Cleanup)
        content = content.replace(/background-color:\s*#[a-fA-F0-9]{3,6};?/gi, '');
        content = content.replace(/background:\s*#[a-fA-F0-9]{3,6};?/gi, '');
        content = content.replace(/background-color:\s*rgb\([^)]+\);?/gi, '');
        content = content.replace(/color:\s*#[a-fA-F0-9]{3,6};?/gi, '');
        content = content.replace(/color:\s*rgb\([^)]+\);?/gi, '');

        // 适配容器宽度 (Force Full Width)
        content = content.replace(/max-w-[0-9]xl/gi, 'max-w-full');
        content = content.replace(/max-w-screen-[a-z0-9]+/gi, 'max-w-full');
        
        // 修正 Tailwind 背景色与文字色
        content = content.replace(/bg-stone-[0-9]00/gi, '');
        content = content.replace(/bg-white/gi, 'bg-slate-900/40');
        content = content.replace(/text-slate-800/gi, 'text-slate-100');
        content = content.replace(/text-slate-700/gi, 'text-slate-200');
        content = content.replace(/text-slate-600/gi, 'text-slate-300');
        
        // 红框清理 (Red Box)
        content = content.replace(/bg-red-[1-9]00/gi, 'bg-brand-blue/20');
        content = content.replace(/text-red-[1-9]00/gi, 'text-brand-blue');
        content = content.replace(/border-red-[1-9]00/gi, 'border-brand-blue/30');

        // Hex 颜色修正
        content = content.replace(/#ef4444/gi, '#38bdf8');
        content = content.replace(/rgb\(239, 68, 68\)/gi, 'rgb(56, 189, 248)');
        content = content.replace(/#fca5a5/gi, 'rgba(56, 189, 248, 0.5)');

        // 注入全局加固样式
        const globalStyle = `
<style>
  .report-body { max-width: 100% !important; border: none !important; }
  body { background-color: transparent !important; color: inherit !important; font-family: inherit !important; }
  table { width: 100% !important; max-width: 100% !important; display: block; overflow-x: auto; border-color: rgba(56,189,248,0.1) !important; border-collapse: collapse; }
  .glass-panel { background: rgba(15, 23, 42, 0.6) !important; border-color: rgba(56, 189, 248, 0.1) !important; color: #fff !important; }
  img { max-width: 100% !important; height: auto !important; }
</style>
        `;
        
        // 确保样式仅注入一次
        if (!content.includes('.report-body { max-width: 100% !important;')) {
            content = globalStyle + content;
        }

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content);
            console.log(`✅ Cleaned: ${file}`);
        }
    });

    console.log('🏆 Cleanup complete.');
}

cleanFiles();
