const fs = require('fs');
const path = require('path');

// Target https://medical365.in but not https://www.medical365.in
const URL_REGEX = /https:\/\/(?!www\.)medical365\.in/g;
const NEW_URL = 'https://www.medical365.in';

function updateUrls(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        if (URL_REGEX.test(content)) {
            const updatedContent = content.replace(URL_REGEX, NEW_URL);
            fs.writeFileSync(filePath, updatedContent);
            return true;
        }
    } catch (err) {
        console.error(`Error processing ${filePath}: ${err.message}`);
    }
    return false;
}

const rootDir = __dirname;
const files = fs.readdirSync(rootDir);
let updatedCount = 0;

console.log('Starting global URL migration to https://www.medical365.in...');

files.forEach(file => {
    const fullPath = path.join(rootDir, file);
    if (fs.statSync(fullPath).isFile() && file.endsWith('.html')) {
        if (updateUrls(fullPath)) {
            updatedCount++;
        }
    }
});

console.log(`Success: Updated references in ${updatedCount} HTML files.`);
