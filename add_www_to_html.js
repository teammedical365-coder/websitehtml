const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const rootDir = __dirname;
let count = 0;

walkDir(rootDir, (filePath) => {
    if (path.extname(filePath) === '.html') {
        let content = fs.readFileSync(filePath, 'utf8');
        if (content.includes('https://medical365.in')) {
            let newContent = content.replace(/https:\/\/medical365\.in/g, 'https://www.medical365.in');
            fs.writeFileSync(filePath, newContent, 'utf8');
            count++;
        }
    }
});

console.log(`Updated canonical/base URLs in ${count} files.`);
