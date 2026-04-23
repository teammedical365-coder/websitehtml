const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
let count = 0;

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir(rootDir, (filePath) => {
    if (path.extname(filePath) === '.html') {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // 1. Update the address in the footer contact block
        const oldContactAddress = /Bhamashah Techno Hub, Sansthan Path, Jhalana\s+Gram,<br>Malviya Nagar, Jaipur, Rajasthan 302017/g;
        const newContactAddress = '31, shyam vatika, Chatrashal nagar, Nandpuri,<br>Malviya Nagar, Jaipur, Rajasthan 302017';
        if (oldContactAddress.test(content)) {
            content = content.replace(oldContactAddress, newContactAddress);
            modified = true;
        }

        // 2. Update the copyright line
        const oldCopyrightAddress = /© 2026 Medical365 — Bhamashah Techno Hub, Malviya Nagar, Jaipur,\s+Rajasthan 302017/g;
        const newCopyrightAddress = '© 2026 Medical365 — 31, shyam vatika, Chatrashal nagar, Nandpuri, Malviya Nagar, Jaipur, Rajasthan 302017';
        if (oldCopyrightAddress.test(content)) {
            content = content.replace(oldCopyrightAddress, newCopyrightAddress);
            modified = true;
        }

        // 3. Special handling for contact.html office blocks
        if (filePath.endsWith('contact.html')) {
            const regionalOfficeRegex = /<div class="office-item"[^>]*>\s*<svg[^>]*>[\s\S]*?<\/svg>\s*<p><strong>Bhamashah Techno Hub \(Regional Office\)<\/strong><br>\s*Sansthan Path, Jhalana Gram, Malviya Nagar, Jaipur, Rajasthan 302017<\/p>\s*<\/div>/g;
            if (regionalOfficeRegex.test(content)) {
                content = content.replace(regionalOfficeRegex, '');
                modified = true;
            }
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            count++;
        }
    }
});

console.log(`Updated address in ${count} files.`);
