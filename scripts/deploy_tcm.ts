import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const SCRATCH_TEXT = 'f:/Documents/Antigravity/个人网站/scratch/tcm_text.md';
const SCRATCH_HTML = 'f:/Documents/Antigravity/个人网站/scratch/tcm_html.md';
const PUBLIC_REPORTS_DIR = 'f:/Documents/Antigravity/个人网站/public/content/reports';

function sanitize(content: string) {
    let finalContent = content.trim();
    // 注入全局内容控制样式
    const globalStyleInject = `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@200..900&display=swap');
  .report-body { max-width: 100% !important; border: none !important; font-family: 'Crimson Pro', serif !important; }
  body { background-color: transparent !important; color: inherit !important; font-family: 'Crimson Pro', serif !important; }
  .text-slate-900, .text-slate-800, .text-black { color: #f1f5f9 !important; }
  table { width: 100% !important; border-collapse: collapse; }
  img { max-width: 100% !important; height: auto !important; border-radius: 12px; }
  canvas { max-width: 100% !important; width: 100% !important; }
</style>
`;
    return globalStyleInject + finalContent;
}

async function deploy() {
    console.log('🚀 Starting Dual-Track TCM Deployment...');

    // 1. Process Theory Version
    if (fs.existsSync(SCRATCH_TEXT)) {
        const { content } = matter(fs.readFileSync(SCRATCH_TEXT, 'utf8'));
        const target = path.join(PUBLIC_REPORTS_DIR, 'tcm-theory.html');
        // 文字版直接存 MD 内容，由页面的 ReactMarkdown 负责渲染，这里包装一层样式即可
        fs.writeFileSync(target, sanitize(content));
        console.log('✅ Theory version deployed to tcm-theory.html');
    }

    // 2. Process Interactive Version
    if (fs.existsSync(SCRATCH_HTML)) {
        const { content } = matter(fs.readFileSync(SCRATCH_HTML, 'utf8'));
        const target = path.join(PUBLIC_REPORTS_DIR, 'tcm-interactive.html');
        fs.writeFileSync(target, sanitize(content));
        console.log('✅ Interactive version deployed to tcm-interactive.html');
    }

    console.log('🏆 Deployment Complete!');
}

deploy();
