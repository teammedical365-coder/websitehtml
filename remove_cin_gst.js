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

        // Regex to match the CIN/GST block with potential newlines and spaces
        const cinGstRegex = /CIN: U72900RJ2022PTC080000\s*(?:&nbsp;| )*\|(?:\s*(?:&nbsp;| )*)*GST: 08AAAAA0000A1Z5\s*(?:&nbsp;| )*\|(?:\s*(?:&nbsp;| )*)*/g;
        
        if (cinGstRegex.test(content)) {
            content = content.replace(cinGstRegex, '');
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            count++;
        }
    }
});

console.log(`Removed CIN/GST in ${count} files.`);
