const fs = require('fs');
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let updated = 0;
for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Fix the broken comment that causes CSS to be ignored
    content = content.replace(/\/\* ======\n\n\s+\/\* Page specific \*\//g, '/* ======\n           PAGE SPECIFIC\n           ====== */');

    if (content !== original) {
        fs.writeFileSync(file, content);
        updated++;
    }
}
console.log(`Updated comments on ${updated} HTML files.`);
