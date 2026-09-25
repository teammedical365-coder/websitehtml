const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const files = fs.readdirSync(repoRoot).filter(f => f.endsWith('.html'));

const brokenFiles = [];

files.forEach(f => {
    const fullPath = path.join(repoRoot, f);
    const html = fs.readFileSync(fullPath, 'utf8');
    const lines = html.split('\n');
    lines.forEach((l, idx) => {
        if (l.includes('<meta name="description"') && l.includes('Streamline your healthcare operations')) {
            brokenFiles.push({ file: f, lineNum: idx + 1, snippet: l.trim() });
        }
    });
});

console.log('Total files with stray text in meta tag:', brokenFiles.length);
brokenFiles.slice(0, 5).forEach(b => console.log(`- ${b.file}: line ${b.lineNum}`));
