const fs = require('fs');
const path = require('path');

function auditFiles(dir) {
    const files = fs.readdirSync(dir);
    let foundOld = [];
    let countNew = 0;
    
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                const results = auditFiles(fullPath);
                foundOld = foundOld.concat(results.foundOld);
                countNew += results.countNew;
            }
        } else if (fullPath.endsWith('.html') || fullPath.endsWith('.js') || fullPath.endsWith('.css')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (/TEAMMEDICAL365@GMAIL\.COM/i.test(content)) {
                foundOld.push(fullPath);
            }
            if (/support@medical365\.in/i.test(content)) {
                countNew++;
            }
        }
    });
    return { foundOld, countNew };
}

const results = auditFiles(__dirname);
console.log('--- AUDIT RESULTS ---');
console.log(`Files with NEW email (support@medical365.in): ${results.countNew}`);
console.log(`Files still containing OLD email (teammedical365@gmail.com): ${results.foundOld.length}`);
if (results.foundOld.length > 0) {
    console.log('Files with old email:', results.foundOld);
}
