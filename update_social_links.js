const fs = require('fs');
const path = require('path');

const replacements = [
    { old: /https:\/\/www\.linkedin\.com\/company\/medical365/g, new: 'https://www.linkedin.com/in/medical-hms-612628405/' },
    { old: /https:\/\/twitter\.com\/medical365in/g, new: 'https://x.com/medical_365' },
    { old: /https:\/\/www\.facebook\.com\/medical365in/g, new: 'https://www.facebook.com/medical365HMS/' },
    { old: /https:\/\/www\.youtube\.com\/@medical365/g, new: 'https://www.youtube.com/@Medical365-HMS' },
    { old: /https:\/\/www\.instagram\.com\/medical365in/g, new: 'https://www.instagram.com/medical365_hms/' }
];

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const rootDir = __dirname;
let fileCount = 0;
let replacementCount = 0;

walkDir(rootDir, (filePath) => {
    if (path.extname(filePath) === '.html') {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        replacements.forEach(r => {
            if (r.old.test(content)) {
                content = content.replace(r.old, r.new);
                replacementCount++;
            }
        });

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            fileCount++;
        }
    }
});

console.log(`Updated social links in ${fileCount} files. Total replacements made: ${replacementCount}`);
