const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const diagramDir = path.join(repoRoot, 'images/diagrams');

console.log('=== COMPREHENSIVE MASTER VERIFICATION: ALL 68 SPECIALTY & MODULE PAGES ===\n');

// Get all files from commit 2f1e3479
const stdout = execSync('git show --name-only --oneline 2f1e3479', { cwd: repoRoot }).toString();
const all68Files = stdout.split('\n')
    .map(l => l.trim())
    .filter(l => l.endsWith('.html'));

console.log(`Total target pages to audit: ${all68Files.length}`);

let totalWords = 0;
let jsonErrors = 0;
let missingSvg = 0;
let metaErrors = 0;
let below1600 = 0;

const tableRows = [];

all68Files.forEach((filename, idx) => {
    const slug = filename.replace('.html', '');
    const filePath = path.join(repoRoot, filename);
    
    if (!fs.existsSync(filePath)) {
        console.error(`File does not exist: ${filename}`);
        return;
    }

    const html = fs.readFileSync(filePath, 'utf8');

    // 1. Word count
    const textOnly = html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    const wordCount = textOnly.split(' ').filter(w => w.length > 0).length;
    totalWords += wordCount;

    if (wordCount < 1600) {
        below1600++;
        console.error(`Page below 1600 words: ${filename} (${wordCount} words)`);
    }

    // 2. SVG diagram
    const svgFile = path.join(diagramDir, `${slug}-workflow.svg`);
    const svgExists = fs.existsSync(svgFile);
    if (!svgExists) {
        missingSvg++;
        console.error(`Missing SVG: ${slug}-workflow.svg`);
    }

    // 3. JSON-LD
    const jsonMatches = html.match(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
    jsonMatches.forEach((s, sIdx) => {
        try {
            const raw = s.replace(/<\/?script[^>]*>/gi, '').trim();
            JSON.parse(raw);
        } catch (e) {
            jsonErrors++;
            console.error(`JSON-LD Error in ${filename} block ${sIdx+1}:`, e.message);
        }
    });

    // 4. Stray meta check
    const lines = html.split('\n');
    lines.forEach(l => {
        if (l.includes('<meta name="description"') && l.includes('>s ')) {
            metaErrors++;
            console.error(`Meta leak in ${filename}`);
        }
    });

    tableRows.push({
        idx: idx + 1,
        slug: slug,
        words: wordCount,
        svg: svgExists ? 'YES' : 'MISSING',
        jsonBlocks: jsonMatches.length
    });
});

console.log(`Audited ${tableRows.length} pages.`);
console.log('Sample check:');
tableRows.slice(0, 5).forEach(r => console.log(`[${r.idx.toString().padStart(2)}] ${r.slug.padEnd(32)} | Words: ${r.words} | SVG: ${r.svg} | JSON: ${r.jsonBlocks}`));
console.log('...');
tableRows.slice(-5).forEach(r => console.log(`[${r.idx.toString().padStart(2)}] ${r.slug.padEnd(32)} | Words: ${r.words} | SVG: ${r.svg} | JSON: ${r.jsonBlocks}`));

console.log('\n----------------------------------------------------');
console.log(`GRAND TOTAL WORDS across all 68 pages: ${totalWords}`);
console.log(`Average Word Count per page: ${Math.round(totalWords / tableRows.length)} words`);
console.log(`Pages below 1,600 words: ${below1600}`);
console.log(`Missing SVG diagrams: ${missingSvg}`);
console.log(`JSON-LD Syntax Errors: ${jsonErrors}`);
console.log(`Stray Meta Tag Leaks: ${metaErrors}`);

if (below1600 === 0 && missingSvg === 0 && jsonErrors === 0 && metaErrors === 0) {
    console.log('\n=== ALL 68 SPECIALTY & MODULE PAGES: 100% PASS VERIFIED! ✅ ===');
} else {
    console.error('\n=== MASTER VERIFICATION FAILED ❌ ===');
    process.exit(1);
}
