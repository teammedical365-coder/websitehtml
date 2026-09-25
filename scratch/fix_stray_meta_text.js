const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
console.log('=== FIXING STRAY META DESCRIPTION TEXT IN SPECIALTY FILES ===');

const modFiles = JSON.parse(fs.readFileSync(path.join(repoRoot, 'scratch/specialty_seo_modified_files.json'), 'utf8'));

let fixedCount = 0;

modFiles.forEach(item => {
    const filePath = path.join(repoRoot, item.filename);
    if (!fs.existsSync(filePath)) return;

    let html = fs.readFileSync(filePath, 'utf8');

    // Look for lines containing <meta name="description" that also have the stray text fragment
    const lines = html.split('\n');
    let fileChanged = false;

    const newLines = lines.map(line => {
        if (line.includes('<meta name="description"') && line.includes('Streamline your healthcare operations')) {
            fileChanged = true;
            // Extract the clean meta description tag up to the first closing '>'
            const match = line.match(/(<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*>)/i);
            if (match) {
                return '    ' + match[1];
            } else {
                // Construct clean meta tag from primary keyword
                return `    <meta name="description" content="Medical365 ${item.primaryKeyword}: ABDM & DPDP compliant clinical software for Indian hospitals and clinics. Book a free demo today.">`;
            }
        }
        return line;
    });

    if (fileChanged) {
        fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
        fixedCount++;
        console.log(`Fixed stray meta description in: ${item.filename}`);
    }
});

console.log(`=== FIX COMPLETE: Fixed ${fixedCount} files ===`);
