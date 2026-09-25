const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const diagramDir = path.join(repoRoot, 'images/diagrams');

const batch3Slugs = [
    // Dental (5)
    "dental-tooth-chart",
    "dental-imaging",
    "dental-treatment-planning",
    "dental-procedure-history",
    "dental-insurance-billing",
    // Dermatology (5)
    "skin-image-tracking",
    "dermatology-photos",
    "dermatology-treatment-plans",
    "cosmetic-procedure-records",
    "allergy-tracking",
    // Oncology (6)
    "cancer-staging",
    "chemotherapy-plans",
    "radiation-therapy-records",
    "tumor-tracking",
    "oncology-reports",
    "clinical-trial-management"
];

console.log('=== VERIFYING BATCH 3 (16 PAGES) ===');

let totalWords = 0;
let jsonErrors = 0;
let missingSvg = 0;
let metaErrors = 0;

batch3Slugs.forEach((slug, idx) => {
    const filename = slug + '.html';
    const filePath = path.join(repoRoot, filename);
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

    // 2. SVG diagram
    const svgFile = path.join(diagramDir, `${slug}-workflow.svg`);
    if (!fs.existsSync(svgFile)) {
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

    console.log(`[${(idx+1).toString().padStart(2)}] ${slug.padEnd(28)} | Words: ${wordCount} | SVG: Exists | JSON-LD: ${jsonMatches.length} blocks`);
});

console.log('----------------------------------------------------');
console.log(`Total Words across Batch 3: ${totalWords} (Avg: ${Math.round(totalWords/16)} words/page)`);
console.log(`Missing SVGs: ${missingSvg}`);
console.log(`JSON-LD Errors: ${jsonErrors}`);
console.log(`Meta Leaks: ${metaErrors}`);

if (missingSvg === 0 && jsonErrors === 0 && metaErrors === 0) {
    console.log('=== BATCH 3 VERIFICATION 100% PASS ✅ ===');
} else {
    console.error('=== BATCH 3 VERIFICATION FAILED ❌ ===');
    process.exit(1);
}
