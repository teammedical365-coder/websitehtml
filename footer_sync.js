const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, 'index.html');
const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

// Extract footer from index.html
const footerRegex = /<footer\b[^>]*>[\s\S]*?<\/footer>/i;
const match = indexHtmlContent.match(footerRegex);

if (!match) {
    console.error("Could not find footer in index.html");
    process.exit(1);
}

const masterFooter = match[0];
const dirPath = __dirname;
const files = fs.readdirSync(dirPath);

let count = 0;
files.forEach(file => {
    // Sync to all HTML files except index.html and seo_template.html
    if (file.endsWith('.html') && file !== 'index.html' && file !== 'seo_template.html') {
        let content = fs.readFileSync(path.join(dirPath, file), 'utf8');
        
        const fileFooterMatch = content.match(footerRegex);
        if (fileFooterMatch) {
            content = content.replace(fileFooterMatch[0], masterFooter);
            fs.writeFileSync(path.join(dirPath, file), content);
            count++;
        }
    }
});

console.log(`Successfully synced the master footer to ${count} HTML files.`);
