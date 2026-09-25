const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const files = fs.readdirSync(repoRoot).filter(f => f.endsWith('.html'));

let count = 0;
files.forEach(f => {
    const html = fs.readFileSync(path.join(repoRoot, f), 'utf8');
    const lines = html.split('\n');
    lines.forEach(l => {
        if (l.includes('<meta name="description"') && (l.includes('>s ') || l.includes('Streamline your healthcare operations'))) {
            count++;
            console.log('Stray leak in:', f);
        }
    });
});

console.log('Total files with stray meta description leak:', count);
