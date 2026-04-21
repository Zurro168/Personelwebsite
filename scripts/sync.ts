import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

/**
 * 🛰️ Silicon Commodity: Industrial Sync Engine v4.0
 * -----------------------------------------------
 * Features:
 * - 1:1 Mirror Registry Rebuild
 * - Industrial Hacker Visual System (Blue/Copper/Black)
 * - Responsive Financial Data Tables
 * - Timeline History Preservation
 */

const SC_BASE = 'D:/iCloudDrive/iCloud~md~obsidian/Obsidian Vault/SiliconCommand';
const OBSIDIAN_PUBLISH_DIR = `${SC_BASE}/10_Content/01_Drafts`;      
const ARCHIVE_DIR          = `${SC_BASE}/10_Content/03_Published`;   
const SYSTEM_DIR           = `${SC_BASE}/00_Brand`;                  
const REPORTS_REGISTRY_FILE = path.join(process.cwd(), 'src/data/reports.ts');
const PUBLIC_REPORTS_DIR = path.join(process.cwd(), 'public/content/reports');
const PUBLIC_SYSTEM_DIR = path.join(process.cwd(), 'public/content/system');

// --- Industrial CSS Injection ---
const INDUSTRIAL_CSS = `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono&display=swap');
  
  .report-body {
    max-width: 960px;
    margin: 40px auto;
    background: #FFFFFF !important;
    color: #1A1A2E !important;
    font-family: 'Inter', -apple-system, 'Microsoft YaHei', sans-serif;
    line-height: 1.8;
    letter-spacing: 0.3px;
    padding: 60px 80px !important;
    border-radius: 4px !important;
    box-shadow: 0 40px 100px rgba(0,0,0,0.5) !important;
  }
  
  /* 🛡️ Theme Bleed Protection */
  .report-body p, 
  .report-body li, 
  .report-body span,
  .report-body div:not(.reference-zone) {
    color: #1A1A2E !important;
  }

  h2 {
    background: #003366 !important;
    color: #FFFFFF !important;
    padding: 15px 25px !important;
    border-radius: 4px !important;
    font-size: 1.6rem !important;
    font-weight: 800 !important;
    margin: 50px 0 30px 0 !important;
    display: flex !important;
    align-items: center !important;
    box-shadow: 0 4px 12px rgba(0,51,102,0.1) !important;
  }
  
  h3 {
    color: #003366 !important;
    border-left: 5px solid #B87333 !important;
    padding-left: 20px !important;
    margin: 40px 0 20px 0 !important;
    font-size: 1.3rem !important;
    font-weight: 700 !important;
  }
  
  p { margin-bottom: 24px !important; text-align: justify !important; }
  
  strong { color: #003366 !important; font-weight: 700 !important; }
  
  .highlight-gold {
    color: #B87333 !important;
    font-weight: 600 !important;
  }
  
  /* 📊 Financial Table Styles */
  .table-container {
    width: 100% !important;
    overflow-x: auto !important;
    margin: 30px 0 !important;
    border-radius: 8px !important;
    border: 1px solid #E2E8F0 !important;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05) !important;
  }
  
  table {
    width: 100% !important;
    border-collapse: collapse !important;
    background: white !important;
    font-size: 0.9rem !important;
    margin: 0 !important;
  }
  
  th {
    background: #F8FAFC !important;
    color: #003366 !important;
    font-weight: 600 !important;
    text-align: left !important;
    padding: 12px 15px !important;
    border-bottom: 2px solid #003366 !important;
  }
  
  td {
    padding: 12px 15px !important;
    border-bottom: 1px solid #E2E8F0 !important;
  }
  
  tr:nth-child(even) { background: #FBFDFF !important; }
  
  /* 📑 Reference / Terminal Zone */
  .reference-zone {
    background: #1E1E1E;
    color: #E0E0E0;
    padding: 25px;
    border-radius: 8px;
    font-family: 'JetBrains Mono', monospace;
    margin-top: 60px;
    font-size: 0.85rem;
    border-left: 5px solid #B87333;
  }
  
  .reference-zone h4 { color: #B87333; margin-top: 0; }
  .reference-zone a { color: #64B5F6; text-decoration: none; }
  .reference-zone a:hover { text-decoration: underline; }
</style>
`;

function getAllFiles(dir: string, allFiles: string[] = []) {
    if (!fs.existsSync(dir)) return allFiles;
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file).replace(/\\/g, '/');
        if (fs.statSync(filePath).isDirectory()) {
            getAllFiles(filePath, allFiles);
        } else if (file.endsWith('.md')) {
            allFiles.push(filePath);
        }
    });
    return allFiles;
}

async function sync() {
    console.log('🏭 SC Industrial Intelligence Pipeline v4.0 Active...');
    
    const files = [
        ...getAllFiles(OBSIDIAN_PUBLISH_DIR),
        ...getAllFiles(ARCHIVE_DIR),
        ...getAllFiles(SYSTEM_DIR)
    ];

    const allReports: any[] = [];
    const processedSlugs = new Set();

    for (let filePath of files) {
        const fileName = path.basename(filePath);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);

        // 🚨 资产转换逻辑：将旧预警版重定向到权威 04-17 禁令版
        if (fileName.includes('加蓬锰矿出口关税调整预警')) {
            console.log(`🔀 Redirecting Legacy Gabon Article -> 04-17 Authority Version`);
            continue; // Skip the old version
        }

        if (!data.slug && fileName.toLowerCase() !== 'about.md') {
            continue;
        }

        // 🚨 ECOSYSTEM PROTOCOL V1.0: Respect web_sync status
        if (data.web_sync === false) {
            console.log(`⏩ Skipping: ${fileName} (web_sync disabled)`);
            continue;
        }

        const isSystemFile = filePath.includes(SYSTEM_DIR);
        const outSlug = data.slug || 'about';
        
        // 防止重复采集
        if (processedSlugs.has(outSlug)) continue;
        processedSlugs.add(outSlug);

        console.log(`📄 Processing: ${data.title || fileName}`);

        // --- Industrial Rendering Logic ---
        let htmlContent = await marked.parse(content);
        
        // 1. Table Optimization
        htmlContent = htmlContent.replace(/<table>/g, '<div class="table-container"><table>').replace(/<\/table>/g, '</table></div>');
        
        // 2. Reference Zone Detection
        if (htmlContent.includes('参考文献')) {
            htmlContent = htmlContent.replace(/<h2>参考文献<\/h2>([\s\S]*)/i, '<div class="reference-zone"><h4>参考文献 REFERENCE</h4>$1</div>');
        }

        const fullHtml = `
          <div class="report-body">
            ${INDUSTRIAL_CSS}
            ${htmlContent}
          </div>
        `;

        const outPath = isSystemFile ? path.join(PUBLIC_SYSTEM_DIR, `${outSlug}.html`) : path.join(PUBLIC_REPORTS_DIR, `${outSlug}.html`);
        fs.writeFileSync(outPath, fullHtml);

        // --- Collect Data for Registry ---
        allReports.push({
            id: `SCC-2026-${Math.floor(Math.random()*900)+100}`,
            title: data.title || fileName.replace('.md', ''),
            description: data.description || '自动同步的研报',
            tag: isSystemFile ? '关于我们' : (data.tag || '硬核商品'),
            date: new Date(data.publish_date || data.date || fs.statSync(filePath).mtime).toISOString().split('T')[0],
            readTime: data.readTime || '15 min',
            image: data.cover || data.image || 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1200',
            slug: outSlug,
            hasContent: true,
            isPinned: isSystemFile
        });
    }

    const registryContent = `
export interface Report {
  id: string; title: string; description: string; tag: string; date: string;
  readTime: string; image: string; slug: string; hasContent: boolean;
  isHtml?: boolean; isPinned?: boolean;
}
export const ALL_REPORTS: Report[] = ${JSON.stringify(allReports, null, 2)};
`;
    fs.writeFileSync(REPORTS_REGISTRY_FILE, registryContent);
    console.log(`✅ Pipeline Complete. Registry synchronized with Industrial Visual Standards.`);
}

sync();
