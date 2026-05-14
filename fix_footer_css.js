const fs = require('fs');
const path = require('path');

const dirPath = __dirname;
const files = fs.readdirSync(dirPath);

let count = 0;
files.forEach(file => {
    if (file.endsWith('.html') && file !== 'seo_template.html' && file !== 'index.html') {
        let content = fs.readFileSync(path.join(dirPath, file), 'utf8');
        // Replace old footer-grid CSS with the new 5 column CSS
        let newContent = content.replace(/\.footer-grid \{ display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px;/g, '.footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr; gap: 40px;');
        if (content !== newContent) {
            fs.writeFileSync(path.join(dirPath, file), newContent);
            count++;
        }
    }
});

console.log(`Successfully updated footer CSS styling in ${count} HTML files.`);
