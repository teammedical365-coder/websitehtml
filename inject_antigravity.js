const fs = require('fs');
const path = require('path');

const SCRIPT_TAG = '\n    <script src="antigravity.js" defer></script>\n</body>';

function injectScript(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Only inject if not already present
        if (!content.includes('antigravity.js')) {
            if (content.includes('</body>')) {
                // Injects before closing body tag
                const updatedContent = content.replace('</body>', SCRIPT_TAG);
                fs.writeFileSync(filePath, updatedContent);
                return true;
            }
        }
    } catch (err) {
        console.error(`Error processing ${filePath}: ${err.message}`);
    }
    return false;
}

const rootDir = __dirname;
const files = fs.readdirSync(rootDir);
let count = 0;

files.forEach(file => {
    const fullPath = path.join(rootDir, file);
    if (fs.statSync(fullPath).isFile() && file.endsWith('.html')) {
        if (injectScript(fullPath)) {
            count++;
        }
    }
});

console.log(`Antigravity script injected into ${count} HTML files.`);
