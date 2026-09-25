const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const diagramDir = path.join(repoRoot, 'images/diagrams');

const batch2Slugs = [
    // Neurology (6)
    "eeg-reports",
    "mri-ct-integration",
    "seizure-tracking",
    "cognitive-assessment",
    "stroke-management",
    "neurological-exam-forms",
    // Pediatrics (6)
    "growth-charts",
    "vaccination-tracking",
    "pediatric-dosage-calculator",
    "developmental-milestones",
    "neonatal-records",
    "parent-communication",
    // Ophthalmology (5)
    "vision-refraction-charts",
    "retina-imaging-integration",
    "eye-pressure-tracking",
    "optical-prescription-mgt",
    "lasik-surgery-records"
];

console.log('=== VERIFYING BATCH 2 (17 PAGES) ===');

let totalWords = 0;
let jsonErrors = 0;
let missingSvg = 0;
let metaErrors = 0;

batch2Slugs.forEach((slug, idx) => {
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
console.log(`Total Words across Batch 2: ${totalWords} (Avg: ${Math.round(totalWords/17)} words/page)`);
console.log(`Missing SVGs: ${missingSvg}`);
console.log(`JSON-LD Errors: ${jsonErrors}`);
console.log(`Meta Leaks: ${metaErrors}`);

if (missingSvg === 0 && jsonErrors === 0 && metaErrors === 0) {
    console.log('=== BATCH 2 VERIFICATION 100% PASS ✅ ===');
} else {
    console.error('=== BATCH 2 VERIFICATION FAILED ❌ ===');
    process.exit(1);
}
