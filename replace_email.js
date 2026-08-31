const fs = require('fs');
const path = require('path');

function replaceEmailInFiles(dir) {
    const files = fs.readdirSync(dir);
    let count = 0;
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                count += replaceEmailInFiles(fullPath);
            }
        } else if (fullPath.endsWith('.html') || fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const regex = /TEAMMEDICAL365@GMAIL\.COM/gi; // case-insensitive replacement
            if (regex.test(content)) {
                let newContent = content.replace(regex, 'support@medical365.in');
                fs.writeFileSync(fullPath, newContent, 'utf8');
                count++;
            }
        }
    });
    return count;
}

const updatedCount = replaceEmailInFiles(__dirname);
console.log(`Updated email in ${updatedCount} files.`);
