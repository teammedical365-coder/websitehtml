const fs = require('fs');
const files = fs.readdirSync('.');
const missingFooter = [];

files.forEach(f => {
    if (f.endsWith('.html')) {
        const text = fs.readFileSync(f, 'utf8');
        if (!text.includes('class="main-footer"')) {
            missingFooter.push(f);
        }
    }
});

fs.writeFileSync('footer_audit.txt', 'Missing master footer:\n' + missingFooter.join('\n'));
console.log('Footer audit complete.');
