const fs = require('fs');
const files = fs.readdirSync('.');
const missingScripts = [];
const missingOverlay = [];

files.forEach(f => {
    if (f.endsWith('.html')) {
        const text = fs.readFileSync(f, 'utf8');
        if (!text.includes('global-scripts.js')) {
            missingScripts.push(f);
        }
        if (!text.includes('id="mobile-overlay"')) {
            missingOverlay.push(f);
        }
    }
});

fs.writeFileSync('audit.txt', 'Scripts:\n' + missingScripts.join('\n') + '\n\nOverlay:\n' + missingOverlay.join('\n'));
console.log('Audit complete, written to audit.txt');
