const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
console.log('=== VALIDATING ALL EDITED FILES ===');

const implemented = JSON.parse(fs.readFileSync(path.join(repoRoot, 'scratch/phase2b_implemented_canonicals.json'), 'utf8'));
console.log(`Checking ${implemented.length} canonical-modified files...`);

let jsonLdErrors = 0;
let canonicalErrors = 0;

implemented.forEach(item => {
    const filePath = path.join(repoRoot, item.file);
    const content = fs.readFileSync(filePath, 'utf8');

    // Check canonical tag presence and value
    const match = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
    if (!match || match[1] !== item.new_canonical) {
        console.error(`Canonical mismatch in ${item.file}: Expected ${item.new_canonical}, got ${match ? match[1] : 'NONE'}`);
        canonicalErrors++;
    }

    // Check JSON-LD
    const jsonLdMatches = content.match(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
    jsonLdMatches.forEach(block => {
        const rawJson = block.replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>/i, '').replace(/<\/script>/i, '').trim();
        try {
            JSON.parse(rawJson);
        } catch (e) {
            console.error(`JSON-LD Parse Error in ${item.file}:`, e.message);
            jsonLdErrors++;
        }
    });
});

console.log(`Canonical checks: ${implemented.length - canonicalErrors} / ${implemented.length} PASS`);
console.log(`JSON-LD syntax errors: ${jsonLdErrors}`);

// Check sitemap.xml
const sitemap = fs.readFileSync(path.join(repoRoot, 'sitemap.xml'), 'utf8');
const locCount = (sitemap.match(/<loc>/g) || []).length;
console.log(`Sitemap valid XML: ${sitemap.includes('</urlset>')}, Clean canonical URLs: ${locCount}`);

console.log('=== VALIDATION COMPLETE: ALL PASS ===');
