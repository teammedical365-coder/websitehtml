const fs = require('fs');
const path = require('path');

const directory = '.';
const files = fs.readdirSync(directory);
const htmlFiles = files.filter(f => f.endsWith('.html'));

let updatedFilesCount = 0;

for (const file of htmlFiles) {
    const filePath = path.join(directory, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    // 1. Force global-scripts.js to v=4.8 (both head with defer and body script)
    // Matches global-scripts.js, global-scripts.js?v=4.6, global-scripts.js?v=2.1, etc.
    content = content.replace(/src=["']global-scripts\.js(?:\?v=[a-z0-9.-_]+)?["']/gi, 'src="global-scripts.js?v=4.8"');

    // 2. Force global-styles.css to v=4.5
    content = content.replace(/href=["']global-styles\.css(?:\?v=[a-z0-9.-_]+)?["']/gi, 'href="global-styles.css?v=4.5"');

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        updatedFilesCount++;
    }
}

console.log(`Successfully updated cache-busting versions to global-scripts.js?v=4.7 and global-styles.css?v=4.5 in ${updatedFilesCount} HTML files.`);
