const fs = require('fs');
const path = require('path');

const directory = '.';
const files = fs.readdirSync(directory);
const htmlFiles = files.filter(f => f.endsWith('.html'));

// Also include components/footer.html explicitly
const footerPath = path.join(directory, 'components', 'footer.html');
if (fs.existsSync(footerPath)) {
    htmlFiles.push('components/footer.html');
}

let updatedFilesCount = 0;

// Regular expression to match "Bhamashah Techno Hub, Sansthan Path, Jhalana Gram,<br>Malviya Nagar" or with minor spacing variations
const addressRegexHtml = /Bhamashah\s+Techno\s+Hub,\s+Sansthan\s+Path,\s+Jhalana\s+Gram,\s*<br\s*\/?>\s*Malviya\s+Nagar/gi;

// Regular expression to match "— Bhamashah Techno Hub, Sansthan Path, Jhalana Gram, Malviya Nagar," or with minor spacing variations
const copyrightRegex = /(—\s*)Bhamashah\s+Techno\s+Hub,\s+Sansthan\s+Path,\s+Jhalana\s+Gram,\s+Malviya\s+Nagar/gi;

for (const file of htmlFiles) {
    const filePath = path.join(directory, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    // Replace the address inside <address> tags
    content = content.replace(addressRegexHtml, 'Malviya Nagar');

    // Replace the address inside copyright texts
    content = content.replace(copyrightRegex, '$1Malviya Nagar');

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        updatedFilesCount++;
    }
}

console.log(`Successfully removed the address string 'Bhamashah Techno Hub, Sansthan Path, Jhalana Gram,' from ${updatedFilesCount} files.`);
