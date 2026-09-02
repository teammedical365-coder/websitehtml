const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
console.log('=== FAST PRE-COMMIT VALIDATION ENGINE ===');

const staged = execSync('git diff --cached --name-only', { cwd: repoRoot }).toString().trim().split('\n').filter(Boolean);
const stagedProdFiles = staged.filter(f => !f.startsWith('scratch/'));

console.log(`Checking ${stagedProdFiles.length} staged production files...`);

let jsonErrors = 0;
let remainingAggCount = 0;
let remainingSyntheticReviewCount = 0;

for (let i = 0; i < stagedProdFiles.length; i++) {
    const file = stagedProdFiles[i];
    const filePath = path.join(repoRoot, file);
    const content = fs.readFileSync(filePath, 'utf8');

    // Ultra-fast string slice extraction of JSON-LD
    let pos = 0;
    while (true) {
        const startTag = content.indexOf('<script type="application/ld+json">', pos);
        if (startTag === -1) break;
        const jsonStart = startTag + '<script type="application/ld+json">'.length;
        const endTag = content.indexOf('</script>', jsonStart);
        if (endTag === -1) break;

        const rawJson = content.slice(jsonStart, endTag).trim();
        pos = endTag + '</script>'.length;

        try {
            const parsed = JSON.parse(rawJson);
            const items = parsed['@graph'] || (Array.isArray(parsed) ? parsed : [parsed]);
            items.forEach(it => {
                if (it.aggregateRating || it['@type'] === 'AggregateRating') remainingAggCount++;
                if (it['@type'] === 'Review') {
                    const author = typeof it.author === 'string' ? it.author : (it.author ? it.author.name : '');
                    if (author === 'Dr. Rajesh Kumar' || author === 'Amit Sharma') remainingSyntheticReviewCount++;
                }
                if (it.review) {
                    const revs = Array.isArray(it.review) ? it.review : [it.review];
                    revs.forEach(r => {
                        const a = typeof r.author === 'string' ? r.author : (r.author ? r.author.name : '');
                        if (a === 'Dr. Rajesh Kumar' || a === 'Amit Sharma') remainingSyntheticReviewCount++;
                    });
                }
            });
        } catch (e) {
            jsonErrors++;
            console.error(`JSON parse error in ${file}: ${e.message}`);
        }
    }

    if (content.includes('aggregateRating') || content.includes('"@type": "AggregateRating"')) {
        remainingAggCount++;
    }

    if ((i + 1) % 500 === 0 || i === stagedProdFiles.length - 1) {
        console.log(`Validated ${i + 1} / ${stagedProdFiles.length} files...`);
    }
}

console.log(`\nValidation complete:`);
console.log(`JSON-LD errors: ${jsonErrors}`);
console.log(`Remaining unsupported AggregateRating in staged files: ${remainingAggCount}`);
console.log(`Remaining synthetic Review in staged files: ${remainingSyntheticReviewCount}`);

// Verify 4 quarantined files are untouched in git
const gitStatusShort = execSync('git status --short', { cwd: repoRoot }).toString();
const quarantined = [
    'abha-compliance-software-jaipur.html',
    'best-clinic-management-software-jaipur.html',
    'emr-software-jaipur.html',
    'healthcare-crm-udaipur.html'
];

let quarantinedTouched = false;
quarantined.forEach(q => {
    if (gitStatusShort.includes(q)) {
        console.error(`ERROR: Quarantined file ${q} appears in git status!`);
        quarantinedTouched = true;
    }
});

console.log(`Quarantined files untouched: ${!quarantinedTouched ? 'YES ✅' : 'NO ❌'}`);

if (jsonErrors === 0 && remainingAggCount === 0 && remainingSyntheticReviewCount === 0 && !quarantinedTouched) {
    console.log('=== ALL PRE-COMMIT CHECKS PASSED WITH ZERO ERRORS ===');
    process.exit(0);
} else {
    console.error('=== PRE-COMMIT VALIDATION FAILED ===');
    process.exit(1);
}
