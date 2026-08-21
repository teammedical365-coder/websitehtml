const fs = require('fs');
const path = require('path');

const OLD_BLOCK = `/* Audit Hotfixes — Stabilising Mobile & Mega Menu */
    .mega-menu { background-color: #ffffff !important; }
    .header-container { overflow: hidden !important; }
    .br-desktop { display: block; }
    @media (max-width: 768px) { .br-desktop { display: inline; } }`;

const NEW_BLOCK = `/* Audit Hotfixes — Stabilising Mobile & Mega Menu */
    .mega-menu { 
        background-color: #ffffff !important; 
        z-index: 11000 !important;
    }
    .main-header { z-index: 10000 !important; }
    .header-container { overflow: visible !important; }
    @media (max-width: 768px) { 
        .header-container { overflow: hidden !important; } 
    }
    .br-desktop { display: block; }
    @media (max-width: 768px) { .br-desktop { display: inline; } }`;

function fixLayering(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let changed = false;

        // Try replacing the specific block first
        if (content.includes('.header-container { overflow: hidden !important; }')) {
             // Precise replacement of the problematic line and addition of z-indexes
             content = content.replace('.header-container { overflow: hidden !important; }', 
                '.main-header { z-index: 10000 !important; } .header-container { overflow: visible !important; } @media (max-width: 768px) { .header-container { overflow: hidden !important; } }');
             
             content = content.replace('.mega-menu { background-color: #ffffff !important; }',
                '.mega-menu { background-color: #ffffff !important; z-index: 11000 !important; }');
             
             changed = true;
        }

        if (changed) {
            fs.writeFileSync(filePath, content);
            return true;
        }
    } catch (err) {
        console.error(`Error processing ${filePath}: ${err.message}`);
    }
    return false;
}

const rootDir = __dirname;
const files = fs.readdirSync(rootDir);
let count = 0;

console.log('Patching mega-menu layering and overflow site-wide...');

files.forEach(file => {
    const fullPath = path.join(rootDir, file);
    if (fs.statSync(fullPath).isFile() && file.endsWith('.html')) {
        if (fixLayering(fullPath)) {
            count++;
        }
    }
});

console.log(`Success: Fixed layering and visibility in ${count} files.`);
