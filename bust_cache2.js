const fs = require('fs');
const path = require('path');

const directoryPath = './';

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    let updatedCount = 0;
    files.forEach(function (file) {
        if (path.extname(file) === '.html') {
            let content = fs.readFileSync(file, 'utf8');
            let changed = false;
            
            // Bust cache for redesign.css
            if (content.includes('redesign.css?v=1.1')) {
                content = content.replace(/redesign\.css\?v=1\.1/g, 'redesign.css?v=1.2');
                changed = true;
            }
            
            if (changed) {
                fs.writeFileSync(file, content, 'utf8');
                updatedCount++;
            }
        }
    });
    console.log(`Busted CSS cache to v1.2 for ${updatedCount} files.`);
});
