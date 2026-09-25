const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const files = fs.readdirSync(repoRoot).filter(f => f.endsWith('.html'));

const leaks = [];

files.forEach(f => {
    const html = fs.readFileSync(path.join(repoRoot, f), 'utf8');
    const lines = html.split('\n');
    lines.forEach((l, idx) => {
        // Look for <meta name="description" that has text after the first closing >
        if (l.includes('<meta name="description"')) {
            const trimmed = l.trim();
            // Check if there is text after the closing >
            const match = trimmed.match(/^<meta\s+name=["']description["'][^>]*>(.+)$/i);
            if (match && match[1].trim().length > 0) {
                leaks.push({ file: f, line: idx + 1, trailingText: match[1].trim() });
            }
        }
    });
});

console.log('Total files with trailing text leak after meta tag:', leaks.length);
leaks.forEach(lk => console.log(`- ${lk.file}:${lk.line} -> "${lk.trailingText.substring(0, 60)}..."`));
