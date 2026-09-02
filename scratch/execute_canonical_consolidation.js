const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');
console.log('=== EXECUTING 94 EVIDENCE-BASED CANONICAL CONSOLIDATIONS ===');

const matrix = JSON.parse(fs.readFileSync(path.join(repoRoot, 'scratch/phase2b_classification_matrix.json'), 'utf8'));
const canonicalizePairs = matrix.filter(m => m.classification === 'CANONICALIZE');

console.log(`Loaded ${canonicalizePairs.length} pairs approved for canonical consolidation.`);

function getSha256(content) {
    return crypto.createHash('sha256').update(content, 'utf8').digest('hex');
}

const modifiedFilesRecord = [];
const sitemapUrlsToRemove = new Set();
let successfulEdits = 0;

canonicalizePairs.forEach((pair, idx) => {
    const winnerUrl = pair.recommendation_target;
    // Determine which file is the non-performing duplicate
    let loserFile = '';
    let loserUrl = '';

    if (winnerUrl === pair.url_a) {
        loserFile = pair.url_b.replace('https://www.medical365.in/', '') + '.html';
        loserUrl = pair.url_b;
    } else {
        loserFile = pair.url_a.replace('https://www.medical365.in/', '') + '.html';
        loserUrl = pair.url_a;
    }

    sitemapUrlsToRemove.add(loserUrl);

    const filePath = path.join(repoRoot, loserFile);
    if (!fs.existsSync(filePath)) {
        console.error(`ERROR: Loser file ${loserFile} not found!`);
        return;
    }

    const contentBefore = fs.readFileSync(filePath, 'utf8');
    const shaBefore = getSha256(contentBefore);

    // Replace canonical tag
    const canonicalRegex = /<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i;
    if (!canonicalRegex.test(contentBefore)) {
        console.error(`WARNING: No canonical tag found in ${loserFile}!`);
        return;
    }

    const newCanonicalTag = `<link rel="canonical" href="${winnerUrl}" />`;
    const contentAfter = contentBefore.replace(canonicalRegex, newCanonicalTag);

    // Write file
    fs.writeFileSync(filePath, contentAfter, 'utf8');
    successfulEdits++;

    const shaAfter = getSha256(contentAfter);
    modifiedFilesRecord.push({
        pair_id: pair.pair_id,
        file: loserFile,
        old_canonical: loserUrl,
        new_canonical: winnerUrl,
        winner_file: (winnerUrl === pair.url_a ? pair.url_a : pair.url_b).replace('https://www.medical365.in/', '') + '.html',
        sha_before: shaBefore,
        sha_after: shaAfter
    });
});

console.log(`Successfully updated canonical tag in ${successfulEdits} non-performing duplicate files.`);
console.log(`URLs marked for sitemap removal: ${sitemapUrlsToRemove.size}`);

fs.writeFileSync(path.join(repoRoot, 'scratch/phase2b_implemented_canonicals.json'), JSON.stringify(modifiedFilesRecord, null, 2), 'utf8');

// Step 2: Reconcile sitemap.xml
console.log('\nReconciling sitemap.xml to exclude the 94 non-canonical duplicates...');
const sitemapPath = path.join(repoRoot, 'sitemap.xml');
let sitemapContent = fs.readFileSync(sitemapPath, 'utf8');

let removedFromSitemap = 0;
sitemapUrlsToRemove.forEach(url => {
    // Escape for regex
    const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const urlBlockRegex = new RegExp(`\\s*<url>\\s*<loc>${escaped}</loc>[\\s\\S]*?<\\/url>`, 'g');
    if (urlBlockRegex.test(sitemapContent)) {
        sitemapContent = sitemapContent.replace(urlBlockRegex, '');
        removedFromSitemap++;
    }
});

fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
const finalLocCount = (sitemapContent.match(/<loc>/g) || []).length;
console.log(`Removed ${removedFromSitemap} non-canonical URLs from sitemap.xml.`);
console.log(`Final clean canonical URLs in sitemap.xml: ${finalLocCount}`);

console.log('=== CANONICAL CONSOLIDATION & SITEMAP RECONCILIATION COMPLETE ===');
