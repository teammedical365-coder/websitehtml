const fs = require('fs');
const path = require('path');

const indexHtmlContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// 1. Extract Master Header (including mobile-overlay if present)
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

// Ensure the masterHeader includes the mobile-overlay
if (!masterHeader.includes('id="mobile-overlay"')) {
    masterHeader = '<div class="mobile-overlay" id="mobile-overlay" aria-hidden="true"></div>\n' + masterHeader;
}

// 2. Extract Master Footer
const footerRegex = /<footer\b[^>]*>[\s\S]*?<\/footer>/i;
const footerMatch = indexHtmlContent.match(footerRegex);
if (!footerMatch) {
    console.error("Could not find footer in index.html");
    process.exit(1);
}
const masterFooter = footerMatch[0];

const files = fs.readdirSync(__dirname);
let count = 0;

files.forEach(file => {
    if (file.endsWith('.html') && file !== 'index.html') {
        let content = fs.readFileSync(path.join(__dirname, file), 'utf8');
        let initialContent = content;

        // Clean up any existing mobile overlay to avoi duplication
        content = content.replace(/<div\s+class="mobile-overlay"[\s\S]*?<\/div>\s*/ig, '');

        // Replace Header
        const currentHeaderMatch = content.match(headerOnlyRegex);
        if (currentHeaderMatch) {
            content = content.replace(currentHeaderMatch[0], masterHeader);
        } else {
            // No header found? Inject after <body>
            content = content.replace(/<body\b[^>]*>/i, `$&\\n${masterHeader}\\n`);
        }

        // Replace Footer
        const currentFooterMatch = content.match(footerRegex);
        if (currentFooterMatch) {
            content = content.replace(currentFooterMatch[0], masterFooter);
        }

        // Ensure JS is present
        if (!content.includes('global-scripts.js')) {
            content = content.replace(/<\/body>/i, '    <script src="global-scripts.js"></script>\n</body>');
        }

        if (content !== initialContent) {
            fs.writeFileSync(path.join(__dirname, file), content);
            count++;
        }
    }
});

console.log(`Successfully hard-synced Header, Footer, and Scripts on ${count} HTML files.`);
