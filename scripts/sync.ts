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
    width: 1300px !important;
    max-width: 1300px !important;
    margin: 0 auto !important;
    background: #FFFFFF !important;
    color: #1A1A2E !important;
    font-family: 'Inter', -apple-system, 'Microsoft YaHei', sans-serif;
    line-height: 1.8;
    letter-spacing: 0.1px;
    padding: 100px 80px !important; /* Fixed V6.0 Specs */
    overflow-wrap: break-word !important;
    word-wrap: break-word !important;
    word-break: normal !important;
    min-height: 100vh;
    box-sizing: border-box !important;
  }
  
  /* 🚀 Total Width Domination: No elements can escape the 1140px text zone */
  .report-body * {
    max-width: none !important;
    box-sizing: border-box !important;
  }

  .report-body > div, 
  .report-body section, 
  .report-body .mx-auto,
  .report-body [class*="max-w-"] {
    max-width: 100% !important;
    width: 100% !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  
  /* 🛡️ Theme & Layout Protection */
  .report-body p, 
  .report-body li, 
  .report-body h2, 
  .report-body h3 {
    max-width: none !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    text-align: justify;
  }
  .report-body p, 
  .report-body li, 
  .report-body span,
  .report-body div:not(.reference-zone):not(.table-container) {
    color: #1A1A2E !important;
    max-width: 100% !important;
  }

  /* 📊 Scrollable Financial Tables */
  .table-container {
    width: 100% !important;
    overflow-x: auto !important;
    margin: 40px 0 !important;
    background: #f8fafc !important;
    border: 1px solid #e2e8f0 !important;
    border-radius: 8px !important;
  }
  
  table {
    min-width: 100% !important;
    width: max-content !important; /* Allow tables to be wider than container but scrollable */
  }

  h2 {
    background: #003366 !important;
    color: #FFFFFF !important;
    padding: 20px 35px !important;
    border-radius: 4px !important;
    font-size: 1.8rem !important;
    font-weight: 900 !important;
    margin: 60px 0 35px 0 !important;
    display: flex !important;
    align-items: center !important;
    line-height: 1.2 !important;
    box-shadow: 0 4px 12px rgba(0,51,102,0.1) !important;
  }
  
  h3 {
    color: #003366 !important;
    border-left: 6px solid #B87333 !important;
    padding-left: 25px !important;
    margin: 45px 0 25px 0 !important;
    font-size: 1.4rem !important;
    font-weight: 800 !important;
  }
  
  p { margin-bottom: 28px !important; text-align: justify !important; width: 100% !important; }
  
  ul, ol {
    margin-bottom: 28px !important;
    padding-left: 25px !important;
  }
  
  li {
    margin-bottom: 12px !important;
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
        const layout = data.layout || 'paper'; // Default to paper
        
        // 防止重复采集
        if (processedSlugs.has(outSlug)) continue;
        processedSlugs.add(outSlug);

        console.log(`📄 Processing [${layout}]: ${data.title || fileName}`);

        // --- Industrial Rendering Logic ---
        let htmlContent = await marked.parse(content);
        
        // 1. Table Optimization (Only for paper reports)
        if (layout === 'paper') {
            htmlContent = htmlContent.replace(/<table>/g, '<div class="table-container"><table>').replace(/<\/table>/g, '</table></div>');
            
            // 2. Reference Zone Detection
            if (htmlContent.includes('参考文献')) {
                htmlContent = htmlContent.replace(/<h2>参考文献<\/h2>([\s\S]*)/i, '<div class="reference-zone"><h4>参考文献 REFERENCE</h4>$1</div>');
            }
        }

        // --- Layout Strategy ---
        let fullHtml = '';
        if (layout === 'interactive') {
            // Raw HTML mode: No wrapping, no standard CSS
            fullHtml = htmlContent;
        } else {
            // Standard Paper mode: Wrap with industrial visual system
            fullHtml = `
              <div class="report-body">
                ${INDUSTRIAL_CSS}
                ${htmlContent}
              </div>
            `;
        }

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
            isPinned: isSystemFile,
            layout: layout // Store layout in registry
        });
    }

    const registryContent = `
export interface Report {
  id: string; title: string; description: string; tag: string; date: string;
  readTime: string; image: string; slug: string; hasContent: boolean;
  isHtml?: boolean; isPinned?: boolean; layout?: string;
}
export const ALL_REPORTS: Report[] = ${JSON.stringify(allReports, null, 2)};
`;
    fs.writeFileSync(REPORTS_REGISTRY_FILE, registryContent);
    console.log(`✅ Pipeline Complete. Registry synchronized with Industrial Visual Standards.`);
}

sync();
