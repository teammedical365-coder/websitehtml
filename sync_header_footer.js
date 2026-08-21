const fs = require('fs');
const path = require('path');

const indexHtmlContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Extract Header (including mobile-overlay if present)
const headerRegex = /<div\s+class="mobile-overlay"[\s\S]*?<\/header>/i;
const headerOnlyRegex = /<header\b[^>]*>[\s\S]*?<\/header>/i;

let headerMatch = indexHtmlContent.match(headerRegex);
let masterHeader = headerMatch ? headerMatch[0] : null;

if (!masterHeader) {
    const backupMatch = indexHtmlContent.match(headerOnlyRegex);
    if (backupMatch) masterHeader = backupMatch[0];
    else {
        console.error("Could not find header in index.html");
        process.exit(1);
    }
}

// Extract Footer
const footerRegex = /<footer\b[^>]*>[\s\S]*?<\/footer>/i;
const footerMatch = indexHtmlContent.match(footerRegex);
if (!footerMatch) {
    console.error("Could not find footer in index.html");
    process.exit(1);
}
const masterFooter = footerMatch[0];

const dirPath = __dirname;
const files = fs.readdirSync(dirPath);

let count = 0;

files.forEach(file => {
    // Skip index.html and the raw template string file.
    if (file.endsWith('.html') && file !== 'index.html' && file !== 'seo_template.html') {
        let content = fs.readFileSync(path.join(dirPath, file), 'utf8');
        let initialContent = content;
        
        // Find existing header and replace
        const currentHeaderMatch = content.match(headerRegex) || content.match(headerOnlyRegex);
        if (currentHeaderMatch) {
            content = content.replace(currentHeaderMatch[0], masterHeader);
        }
        
        // Find existing footer and replace
        const currentFooterMatch = content.match(footerRegex);
        if (currentFooterMatch) {
            content = content.replace(currentFooterMatch[0], masterFooter);
        }
        
        if (content !== initialContent) {
            fs.writeFileSync(path.join(dirPath, file), content);
            count++;
        }
    }
});

console.log(`Successfully synced the primary header and footer across ${count} HTML files in the project.`);
