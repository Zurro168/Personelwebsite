import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const OBSIDIAN_PUB_DIR = "d:/iCloudDrive/iCloud~md~obsidian/Obsidian Vault/SiliconCommand/10_Content/03_Published";
const REPORTS_TS_PATH = "f:/Documents/Antigravity/个人网站/src/data/reports.ts";

function audit() {
    console.log("--- Starting Article 1-to-1 Audit ---");

    // 1. Get slugs from Local Files
    const localSlugs = new Set();
    const files = [];
    
    function scanDir(dir: string) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                scanDir(fullPath);
            } else if (entry.name.endsWith('.md')) {
                const content = fs.readFileSync(fullPath, 'utf8');
                const { data } = matter(content);
                if (data.slug) {
                    localSlugs.add(data.slug);
                    files.push({ slug: data.slug, path: fullPath, title: data.title });
                }
            }
        }
    }
    scanDir(OBSIDIAN_PUB_DIR);
    console.log(`Found ${localSlugs.size} articles in Obsidian.`);

    // 2. Get slugs from reports.ts
    const reportsContent = fs.readFileSync(REPORTS_TS_PATH, 'utf8');
    const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
    const registrySlugs = new Set();
    let match;
    while ((match = slugRegex.exec(reportsContent)) !== null) {
        registrySlugs.add(match[1]);
    }
    console.log(`Found ${registrySlugs.size} entries in reports.ts.`);

    // 3. Comparison
    console.log("\n--- Discrepancies ---");
    
    const missingInRegistry = [...localSlugs].filter(s => !registrySlugs.has(s));
    const orphanedInRegistry = [...registrySlugs].filter(s => !localSlugs.has(s) && s !== 'about'); // 'about' is special

    if (missingInRegistry.length > 0) {
        console.log("Missing in reports.ts (Found in Obsidian but not in web):");
        missingInRegistry.forEach(s => console.log(`  - ${s}`));
    } else {
        console.log("No missing entries in web.");
    }

    if (orphanedInRegistry.length > 0) {
        console.log("Orphaned in reports.ts (Found in web but no source MD):");
        orphanedInRegistry.forEach(s => console.log(`  - ${s}`));
    } else {
        console.log("No orphaned entries in web.");
    }

    console.log("\n--- Audit Finished ---");
}

audit();
