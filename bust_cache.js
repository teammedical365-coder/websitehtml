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
            if (content.includes('redesign.css?v=1.0')) {
                content = content.replace(/redesign\.css\?v=1\.0/g, 'redesign.css?v=1.1');
                changed = true;
            }
            
            // Bust cache for global-styles.css
            if (content.includes('global-styles.css?v=4.3')) {
                content = content.replace(/global-styles\.css\?v=4\.3/g, 'global-styles.css?v=4.4');
                changed = true;
            }
            
            if (changed) {
                fs.writeFileSync(file, content, 'utf8');
                updatedCount++;
            }
        }
    });
    console.log(`Busted CSS cache for ${updatedCount} files.`);
});
