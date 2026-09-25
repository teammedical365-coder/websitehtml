const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
console.log('=== PRE-PUSH FORENSIC CHECK ===');

// 1. Check modified files list
const modFiles = JSON.parse(fs.readFileSync(path.join(repoRoot, 'scratch/specialty_seo_modified_files.json'), 'utf8'));
console.log(`Checking ${modFiles.length} specialty/module files...`);

let jsonErrors = 0;
let canonicalErrors = 0;
let missingTracking = 0;

modFiles.forEach(item => {
    const filePath = path.join(repoRoot, item.filename);
    if (!fs.existsSync(filePath)) {
        console.error(`File missing: ${item.filename}`);
        return;
    }
    const html = fs.readFileSync(filePath, 'utf8');

    // JSON-LD
    const jsonMatches = html.match(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
    jsonMatches.forEach((script, idx) => {
        try {
            const raw = script.replace(/<\/?script[^>]*>/gi, '').trim();
            JSON.parse(raw);
        } catch (e) {
            jsonErrors++;
            console.error(`JSON-LD Error in ${item.filename} block #${idx+1}:`, e.message);
        }
    });

    // Canonical
    const expectedCanonical = `https://www.medical365.in/${item.slug}`;
    if (!html.includes(`rel="canonical" href="${expectedCanonical}"`) && !html.includes(`rel='canonical' href='${expectedCanonical}'`)) {
        canonicalErrors++;
        console.error(`Canonical mismatch in ${item.filename}`);
    }

    // Tracking
    if (!html.includes('G-RMGG2LX0RF') || !html.includes('GTM-W5H82GQ7')) {
        missingTracking++;
        console.error(`Missing GA4 or GTM in ${item.filename}`);
    }
});

console.log(`JSON-LD Errors: ${jsonErrors}`);
console.log(`Canonical Errors: ${canonicalErrors}`);
console.log(`Missing Tracking: ${missingTracking}`);

// 2. Check Phase 2B Isolation
const p2bMatrix = JSON.parse(fs.readFileSync(path.join(repoRoot, 'scratch/phase2b_classification_matrix.json'), 'utf8'));
const phase2bFilenames = new Set();
p2bMatrix.forEach(p => {
    phase2bFilenames.add(p.slug_a + '.html');
    phase2bFilenames.add(p.slug_b + '.html');
});

// Check git status
const gitStatus = execSync('git status --porcelain', { cwd: repoRoot, encoding: 'utf8' });
const changedFiles = gitStatus.split('\n')
    .map(line => line.trim().split(/\s+/)[1])
    .filter(Boolean);

let p2bViolations = 0;
changedFiles.forEach(file => {
    if (phase2bFilenames.has(file)) {
        p2bViolations++;
        console.error(`FATAL: Phase 2B file in git status: ${file}`);
    }
});

console.log(`Git Changed Files: ${changedFiles.length}`);
console.log(`Phase 2B Violations: ${p2bViolations}`);

if (jsonErrors === 0 && canonicalErrors === 0 && missingTracking === 0 && p2bViolations === 0) {
    console.log('=== ALL PRE-PUSH CHECKS PASSED: 100% READY TO PUSH ✅ ===');
} else {
    console.error('=== PRE-PUSH CHECKS FAILED ❌ ===');
    process.exit(1);
}
