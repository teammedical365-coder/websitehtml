const fs = require('fs');
const path = require('path');
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

let updated = 0;
for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Cache-bust global-styles.css
    content = content.replace(/href=["']global-styles\.css(?:\?v=[a-z0-9.-_]+)?["']/gi, 'href="global-styles.css?v=2.1"');
    
    // Cache-bust global-scripts.js
    content = content.replace(/src=["']global-scripts\.js(?:\?v=[a-z0-9.-_]+)?["']/gi, 'src="global-scripts.js?v=2.1"');

    // Also update fetching logic in global-scripts.js to use cache busted footer?
    // Wait, global-scripts.js fetches /components/footer.html - let's skip that for now as html files are not cached by default as strictly.

    if (content !== original) {
        fs.writeFileSync(file, content);
        updated++;
    }
}
console.log(`Updated cache-busting strings on ${updated} HTML files.`);
