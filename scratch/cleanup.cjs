const fs = require('fs');
const path = require('path');

const vaultPath = 'D:/iCloudDrive/iCloud~md~obsidian/Obsidian Vault/SiliconCommand';
const queuePath = path.join(vaultPath, '02_Queue');
const draftsPath = path.join(vaultPath, '04_Drafts');

if (!fs.existsSync(draftsPath)) {
    fs.mkdirSync(draftsPath);
}

function scanAndMove(dir) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            scanAndMove(fullPath);
        } else if (item.endsWith('.md')) {
            const content = fs.readFileSync(fullPath, 'utf8').slice(0, 1000);
            const hasSlug = /^slug\s*:/m.test(content);
            
            if (!hasSlug) {
                const dest = path.join(draftsPath, item);
                // Handle potential duplicate names in drafts
                let finalDest = dest;
                let counter = 1;
                while (fs.existsSync(finalDest)) {
                    const ext = path.extname(item);
                    const base = path.basename(item, ext);
                    finalDest = path.join(draftsPath, `${base}_${counter}${ext}`);
                    counter++;
                }
                
                fs.renameSync(fullPath, finalDest);
                console.log(`📦 Moved: ${item}`);
            }
        }
    });
}

try {
    scanAndMove(queuePath);
    console.log('🏆 Cleanup complete.');
} catch (err) {
    console.error('❌ Error during cleanup:', err.message);
}
