const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory && !dirPath.includes('node_modules') && !dirPath.includes('.git') && !dirPath.includes('teammedical365-next')) {
            walkDir(dirPath, callback);
        } else if (f.endsWith('.html')) {
            callback(dirPath);
        }
    });
}

const outliers = [];

walkDir('./', (filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    const hasHeader = content.includes('<header') || content.includes('id="main-header"');
    const hasFooter = content.includes('<footer') || content.includes('id="mega-footer"') || content.includes('loadMegaFooter');
    
    if (!hasHeader || !hasFooter) {
        outliers.push({
            path: filePath,
            missing: (!hasHeader ? 'HEADER ' : '') + (!hasFooter ? 'FOOTER' : '')
        });
    }
});

if (outliers.length > 0) {
    console.log(`Found ${outliers.length} outliers:`);
    outliers.forEach(o => console.log(`${o.path} - Missing: ${o.missing}`));
} else {
    console.log('All pages have header and footer components.');
}
