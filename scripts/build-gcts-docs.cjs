const fs = require('fs');
const path = require('path');

// GCTS 操作系统 Markdown 交付物到 HTML 科技风文档的编译构建脚本
const SOURCE_DIR = 'F:\\Documents\\GitHub\\Critical-Minerals-Trading-OS';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'gcts', 'docs');
const INDEX_FILE = path.join(__dirname, '..', 'public', 'gcts', 'index.html');

// 1. 文档编译对应表
const docMapping = [
  { src: "03_Knowledge_Domains/Commodity_Tungsten/Tungsten_Commodity_KB_V0.1.md", dest: "Tungsten_Commodity_KB_V0.1.html" },
  { src: "07_Case_No_001_Chad_Antimony/01_Deliverables/D05_Antimony_Commodity_KB.md", dest: "D05_Antimony_Commodity_KB.html" },
  { src: "07_Case_No_002_Chad_Tungsten/04_Tungsten_Commodity_KB.md", dest: "04_Tungsten_Commodity_KB.html" },
  { src: "04_Model_Engines/Model_Engine_Register_V0.1.md", dest: "Model_Engine_Register_V0.1.html" },
  { src: "07_Case_No_001_Chad_Antimony/01_Deliverables/D03_Sb_Pricing_Engine_Fields.md", dest: "D03_Sb_Pricing_Engine_Fields.html" },
  { src: "07_Case_No_002_Chad_Tungsten/D01_Tungsten_Logic_Audit.md", dest: "D01_Tungsten_Logic_Audit.html" },
  { src: "04_Model_Engines/E01_Pricing_Engine/WO3_Pricing_Engine_V0.1.md", dest: "WO3_Pricing_Engine_V0.1.html" },
  { src: "07_Case_No_001_Chad_Antimony/01_Deliverables/D06_Logistics_Chad_Douala.md", dest: "D06_Logistics_Chad_Douala.html" },
  { src: "07_Case_No_002_Chad_Tungsten/05_Logistics_Chad_Douala_Tungsten.md", dest: "05_Logistics_Chad_Douala_Tungsten.html" },
  { src: "04_Model_Engines/Pricing_Model_Circular_Reference_Audit_2026-07-06.md", dest: "Pricing_Model_Circular_Reference_Audit_2026-07-06.html" },
  { src: "07_Case_No_001_Chad_Antimony/01_Deliverables/D07_Risk_Compliance_Manual.md", dest: "D07_Risk_Compliance_Manual.html" },
  { src: "07_Case_No_002_Chad_Tungsten/06_Tungsten_Risk_Compliance_Manual.md", dest: "06_Tungsten_Risk_Compliance_Manual.html" },
  { src: "07_Case_No_001_Chad_Antimony/01_Deliverables/D01_Chad_Antimony_Whitepaper.md", dest: "D01_Chad_Antimony_Whitepaper.html" },
  { src: "07_Case_No_001_Chad_Antimony/01_Deliverables/D02_Chad_Antimony_Trading_SOP.md", dest: "D02_Chad_Antimony_Trading_SOP.html" },
  { src: "07_Case_No_002_Chad_Tungsten/07_CEO_Decision_Card.md", dest: "07_CEO_Decision_Card.html" },
  { src: "07_Case_No_002_Chad_Tungsten/01_Chad_Tungsten_Whitepaper.md", dest: "01_Chad_Tungsten_Whitepaper.html" },
  { src: "07_Case_No_002_Chad_Tungsten/02_Chad_Tungsten_SOP.md", dest: "02_Chad_Tungsten_SOP.html" },
  { src: "07_Case_No_002_Chad_Tungsten/Conflict_Resolution_Notes.md", dest: "Conflict_Resolution_Notes.html" }
];

// 2. 科技感 HTML 包装模板
const getHTMLTemplate = (title, contentHTML) => `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - GCTS OS System Document</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;600;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-base: #060913;
            --bg-card: rgba(22, 28, 49, 0.45);
            --border-color: rgba(255, 255, 255, 0.08);
            --border-color-glow: rgba(168, 85, 247, 0.25);
            --text-primary: #e6ebf5;
            --text-secondary: #8f9cae;
            --text-muted: #5e6d82;
            --color-primary: #a855f7;
            --color-cyan: #00f2fe;
            --color-gold: #f2a900;
            --color-success: #00e676;
            --color-danger: #ff1744;
            --font-display: 'Outfit', 'Inter', -apple-system, sans-serif;
            --font-body: 'Inter', -apple-system, sans-serif;
            --font-mono: 'JetBrains Mono', monospace;
            --transition-smooth: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            background-color: var(--bg-base);
            color: var(--text-primary);
            font-family: var(--font-body);
            line-height: 1.7;
            padding: 3rem 1.5rem;
            display: flex;
            justify-content: center;
        }

        .doc-container {
            width: 100%;
            max-width: 900px;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 24px;
            padding: 3rem;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(15px);
            position: relative;
        }

        .btn-back {
            position: fixed;
            top: 30px;
            left: 30px;
            background: rgba(22, 28, 49, 0.8);
            border: 1px solid var(--border-color);
            color: var(--text-secondary);
            padding: 0.75rem 1.25rem;
            border-radius: 12px;
            text-decoration: none;
            font-family: var(--font-display);
            font-size: 0.8rem;
            font-weight: 600;
            transition: var(--transition-smooth);
            z-index: 100;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            backdrop-filter: blur(10px);
        }

        .btn-back:hover {
            color: var(--text-primary);
            border-color: var(--color-primary);
            box-shadow: 0 0 15px rgba(168, 85, 247, 0.3);
            transform: translateX(-3px);
        }

        h1 {
            font-family: var(--font-display);
            font-size: 2.2rem;
            font-weight: 800;
            color: #fff;
            margin-bottom: 2rem;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 1.5rem;
            letter-spacing: -0.5px;
            line-height: 1.2;
        }

        h2 {
            font-family: var(--font-display);
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--color-cyan);
            margin-top: 2.5rem;
            margin-bottom: 1.25rem;
            border-left: 3px solid var(--color-primary);
            padding-left: 12px;
        }

        h3 {
            font-family: var(--font-display);
            font-size: 1.15rem;
            font-weight: 600;
            color: #fff;
            margin-top: 1.75rem;
            margin-bottom: 0.75rem;
        }

        p {
            margin-bottom: 1.25rem;
            color: var(--text-secondary);
            font-size: 0.95rem;
        }

        strong {
            color: #fff;
            font-weight: 600;
        }

        ul, ol {
            margin-bottom: 1.5rem;
            padding-left: 1.5rem;
            color: var(--text-secondary);
            font-size: 0.95rem;
        }

        li {
            margin-bottom: 0.5rem;
        }

        code {
            font-family: var(--font-mono);
            background: rgba(255, 255, 255, 0.05);
            padding: 0.2rem 0.4rem;
            border-radius: 6px;
            font-size: 0.85rem;
            color: var(--color-cyan);
            border: 1px solid rgba(255, 255, 255, 0.03);
        }

        pre {
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 1.25rem;
            overflow-x: auto;
            margin-bottom: 1.5rem;
        }

        pre code {
            background: transparent;
            padding: 0;
            border: none;
            color: var(--text-primary);
            font-size: 0.85rem;
        }

        /* 表格科技风样式表 */
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 2rem;
            margin-top: 1.5rem;
            font-size: 0.85rem;
        }

        th {
            background: rgba(168, 85, 247, 0.1);
            color: var(--color-cyan);
            font-family: var(--font-display);
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 2px solid var(--border-color-glow);
            text-align: left;
            padding: 12px 16px;
        }

        td {
            border-bottom: 1px solid var(--border-color);
            padding: 12px 16px;
            color: var(--text-secondary);
        }

        tr:hover td {
            background: rgba(255, 255, 255, 0.01);
            color: #fff;
        }

        /* 警告通知框样式 */
        .doc-alert-box {
            background: rgba(168, 85, 247, 0.06);
            border-left: 4px solid var(--color-primary);
            padding: 1.25rem 1.5rem;
            border-radius: 0 12px 12px 0;
            margin-bottom: 2rem;
        }

        .doc-alert-box.warning {
            background: rgba(255, 179, 0, 0.06);
            border-left-color: var(--color-warning);
        }

        .doc-alert-box.danger {
            background: rgba(255, 23, 68, 0.06);
            border-left-color: var(--color-danger);
        }

        .doc-alert-box.success {
            background: rgba(0, 230, 118, 0.06);
            border-left-color: var(--color-success);
        }

        .doc-alert-box strong {
            display: block;
            margin-bottom: 0.5rem;
            font-family: var(--font-display);
        }
        
        .doc-alert-box p {
            margin-bottom: 0;
            font-size: 0.85rem;
        }

        /* Mermaid 流程图包裹 */
        .mermaid {
            background: rgba(0, 0, 0, 0.2) !important;
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 1.5rem;
            margin: 2rem 0;
            display: flex;
            justify-content: center;
        }

        hr {
            border: none;
            border-top: 1px solid var(--border-color);
            margin: 2.5rem 0;
        }

        @media (max-width: 768px) {
            body {
                padding: 1.5rem 1rem;
            }
            .doc-container {
                padding: 1.5rem;
            }
            .btn-back {
                position: absolute;
                top: -60px;
                left: 0;
            }
        }
    </style>
    <!-- 引入 Mermaid 渲染 -->
    <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
    <script>
        mermaid.initialize({
            startOnLoad: true,
            theme: 'dark',
            themeVariables: {
                background: '#060913',
                primaryColor: '#161c31',
                lineColor: '#a855f7'
            }
        });
    </script>
</head>
<body>
    <!-- 返回大地图 -->
    <a href="../index.html" class="btn-back">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        返回决策大地图
    </a>

    <article class="doc-container">
        ${contentHTML}
    </article>
</body>
</html>`;

// 3. 极简 Markdown 转换引擎 (无三方库依赖，保证环境编译成功率)
function parseMarkdown(mdText) {
  let lines = mdText.split('\n');
  let html = [];
  let inList = false;
  let inTable = false;
  let inCodeBlock = false;
  let codeBlockLines = [];
  let tableRows = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    // A. 代码块处理 (特别提取 mermaid)
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        inCodeBlock = false;
        const codeText = codeBlockLines.join('\n');
        if (codeText.startsWith('mermaid')) {
          html.push(`<div class="mermaid">${codeText.substring(7)}</div>`);
        } else {
          html.push(`<pre><code>${codeText}</code></pre>`);
        }
        codeBlockLines = [];
      } else {
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(lines[i]); // 保留原行空格
      continue;
    }

    // B. 表格处理
    if (line.startsWith('|')) {
      inTable = true;
      tableRows.push(line);
      continue;
    } else if (inTable) {
      inTable = false;
      html.push(renderTable(tableRows));
      tableRows = [];
    }

    // C. 标题处理
    if (line.startsWith('# ')) {
      html.push(`<h1>${line.substring(2)}</h1>`);
      continue;
    }
    if (line.startsWith('## ')) {
      html.push(`<h2>${line.substring(3)}</h2>`);
      continue;
    }
    if (line.startsWith('### ')) {
      html.push(`<h3>${line.substring(4)}</h3>`);
      continue;
    }

    // D. 引用块与 Note 警报盒处理
    if (line.startsWith('>')) {
      let quoteContent = line.substring(1).trim();
      
      // 检测 github 风格警报: > [!NOTE], > [!WARNING], > [!CAUTION]
      if (quoteContent.startsWith('[!')) {
        let type = 'info';
        let titleName = '提示';
        if (quoteContent.includes('WARNING')) { type = 'warning'; titleName = '警告'; }
        if (quoteContent.includes('CAUTION') || quoteContent.includes('IMPORTANT')) { type = 'danger'; titleName = '重要'; }
        if (quoteContent.includes('SUCCESS')) { type = 'success'; titleName = '成功'; }
        
        // 收集接下来的引用块内容
        let alertLines = [];
        while (i + 1 < lines.length && lines[i + 1].trim().startsWith('>')) {
          i++;
          alertLines.push(lines[i].trim().substring(1).trim());
        }
        html.push(`<div class="doc-alert-box ${type}"><strong>${titleName}</strong><p>${alertLines.join('<br>')}</p></div>`);
        continue;
      }
      
      // 普通引用
      html.push(`<blockquote style="border-left: 3px solid var(--color-primary); padding-left: 1rem; margin-bottom: 1.5rem; color: var(--text-secondary); font-style: italic;">${quoteContent}</blockquote>`);
      continue;
    }

    // E. 列表处理
    if (line.startsWith('- ') || line.startsWith('* ')) {
      if (!inList) {
        inList = true;
        html.push('<ul>');
      }
      html.push(`<li>${parseInlineStyles(line.substring(2))}</li>`);
      continue;
    } else if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ') || line.startsWith('5. ')) {
      if (!inList) {
        inList = true;
        html.push('<ol>');
      }
      html.push(`<li>${parseInlineStyles(line.substring(3))}</li>`);
      continue;
    } else if (inList && line === '') {
      inList = false;
      html.push('</ul>'); // 闭合
    }

    // F. 分割线
    if (line === '---') {
      html.push('<hr>');
      continue;
    }

    // G. 空白行跳过
    if (line === '') {
      continue;
    }

    // H. 普通段落
    html.push(`<p>${parseInlineStyles(lines[i])}</p>`);
  }

  // 兜底闭合
  if (inList) html.push('</ul>');
  if (inTable) html.push(renderTable(tableRows));

  return html.join('\n');
}

// 行内样式匹配器 (Bold, Code, Math Delimiters)
function parseInlineStyles(text) {
  let result = text;
  
  // 替换加粗 **text** 为 strong
  result = result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // 替换行内代码 `code` 为 code
  result = result.replace(/`(.*?)`/g, '<code>$1</code>');
  
  // 处理 LaTeX 数学公式 $...$ 为代码，便于在静态页中高阶展示
  result = result.replace(/\$(.*?)\$/g, '<code class="math">$1</code>');
  
  // 处理链接 [link](url)
  result = result.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" style="color: var(--color-cyan); text-decoration: none;">$1</a>');
  
  return result;
}

// 渲染表格的函数
function renderTable(rows) {
  let tableHtml = ['<table>'];
  let headersParsed = false;
  
  for (let row of rows) {
    // 过滤掉分割行 | --- | --- |
    if (row.includes('---') && row.includes('|')) {
      continue;
    }
    
    let cells = row.split('|').map(c => c.trim()).filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);
    
    if (!headersParsed) {
      headersParsed = true;
      tableHtml.push('<thead><tr>');
      for (let cell of cells) {
        tableHtml.push(`<th>${parseInlineStyles(cell)}</th>`);
      }
      tableHtml.push('</tr></thead><tbody>');
    } else {
      tableHtml.push('<tr>');
      for (let cell of cells) {
        tableHtml.push(`<td>${parseInlineStyles(cell)}</td>`);
      }
      tableHtml.push('</tr>');
    }
  }
  
  tableHtml.push('</tbody></table>');
  return tableHtml.join('\n');
}

// 4. 执行构建流程
function build() {
  console.log('🚀 开始编译 GCTS 操作系统科技风文档页群...');
  
  // 创建输出目录
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`✓ 已创建输出目录: ${OUTPUT_DIR}`);
  }

  // 编译每个文件
  for (let mapping of docMapping) {
    const srcPath = path.join(SOURCE_DIR, mapping.src);
    const destPath = path.join(OUTPUT_DIR, mapping.dest);
    
    if (!fs.existsSync(srcPath)) {
      console.warn(`⚠️ 无法找到源文件: ${srcPath}，跳过该文档编译。`);
      continue;
    }

    try {
      const mdContent = fs.readFileSync(srcPath, 'utf8');
      
      // 提取标题作为 HTML title
      const firstLine = mdContent.split('\n')[0] || '';
      const title = firstLine.startsWith('# ') ? firstLine.substring(2).trim() : 'GCTS Document';
      
      // 编译为 HTML
      const contentHTML = parseMarkdown(mdContent);
      const fullHTML = getHTMLTemplate(title, contentHTML);
      
      fs.writeFileSync(destPath, fullHTML, 'utf8');
      console.log(`✓ 编译成功: ${mapping.src} -> docs/${mapping.dest}`);
    } catch (e) {
      console.error(`❌ 编译文件失败 ${mapping.src}:`, e);
    }
  }

  // 5. 批量更新 index.html 里面的绝对链接为 docs/xxx.html
  console.log('🔗 开始重写 index.html 中的超级链接...');
  if (fs.existsSync(INDEX_FILE)) {
    try {
      let indexContent = fs.readFileSync(INDEX_FILE, 'utf8');
      
      // 替换 Excel 模板为相对路径
      indexContent = indexContent.replace(/file:\/\/\/F:\/Documents\/GitHub\/Critical-Minerals-Trading-OS\/(.*?\.xlsx)/g, '$1');
      
      // 替换 18 个 md 为 html 相对路径
      for (let mapping of docMapping) {
        // 构建要匹配的绝对路径正则 (兼容正斜杠与反斜杠，及 file:/// 协议)
        const regexStr = `href=["'](?:file:\\/\\/\\/F:\\/Documents\\/GitHub\\/Critical-Minerals-Trading-OS\\/)?${mapping.src.replace(/\//g, '[\\/\\\\]')}["']`;
        const regex = new RegExp(regexStr, 'g');
        indexContent = indexContent.replace(regex, `href="docs/${mapping.dest}"`);
      }
      
      fs.writeFileSync(INDEX_FILE, indexContent, 'utf8');
      console.log('✓ 成功更新 index.html 中的链接！');
    } catch (e) {
      console.error('❌ 更新 index.html 链接失败:', e);
    }
  } else {
    console.error(`❌ 无法找到 index.html: ${INDEX_FILE}`);
  }
  
  console.log('🎉 编译任务已全部完成！');
}

build();
