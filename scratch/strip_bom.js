const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const indexPath = path.join(repoRoot, 'medical365-analytics/index.html');

let content = fs.readFileSync(indexPath, 'utf8');
// Strip BOM and any non-standard leading character
content = content.replace(/^\uFEFF/, '').replace(/^[^\s<]+/, '');
if (!content.startsWith('<!DOCTYPE html>')) {
    content = '<!DOCTYPE html>\n' + content.substring(content.indexOf('<html'));
}

fs.writeFileSync(indexPath, content, 'utf8');
console.log('Stripped BOM. Starts with <!DOCTYPE html>:', content.startsWith('<!DOCTYPE html>'));
