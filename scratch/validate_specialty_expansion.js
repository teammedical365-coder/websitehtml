const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
console.log('=== PHASE 19 & 21: RIGOROUS VALIDATION & PHASE 2B ISOLATION AUDIT ===');

const modifiedList = JSON.parse(fs.readFileSync(path.join(repoRoot, 'scratch/specialty_seo_modified_files.json'), 'utf8'));

// Load Phase 2B URLs to strictly verify 0 overlap
const p2bMatrix = JSON.parse(fs.readFileSync(path.join(repoRoot, 'scratch/phase2b_classification_matrix.json'), 'utf8'));
const phase2bFilenames = new Set();
p2bMatrix.forEach(p => {
    phase2bFilenames.add(p.slug_a + '.html');
    phase2bFilenames.add(p.slug_b + '.html');
});

console.log(`Loaded ${phase2bFilenames.size} Phase 2B files for protection check.`);

const validationResults = {
    totalAudited: modifiedList.length,
    htmlStructureErrors: 0,
    titleErrors: 0,
    h1Errors: 0,
    metaDescriptionErrors: 0,
    canonicalErrors: 0,
    accidentalNoindex: 0,
    jsonLdParseErrors: 0,
    fakeAggregateRatings: 0,
    fakeReviews: 0,
    missingGa4: 0,
    missingGtm: 0,
    phase2bViolations: 0,
    pagesDetails: []
};

const uniqueTitles = new Set();
const uniqueH1s = new Set();

modifiedList.forEach(item => {
    const filePath = path.join(repoRoot, item.filename);
    const html = fs.readFileSync(filePath, 'utf8');

    // 1. Phase 2B Isolation Check
    if (phase2bFilenames.has(item.filename)) {
        validationResults.phase2bViolations++;
        console.error(`FATAL ERROR: Phase 2B file was modified: ${item.filename}`);
    }

    // 2. HTML Structure
    const hasHead = html.includes('</head>');
    const hasBody = html.includes('<body') && html.includes('</body>');
    const hasHtml = html.includes('</html>');
    if (!hasHead || !hasBody || !hasHtml) {
        validationResults.htmlStructureErrors++;
    }

    // 3. Title Check
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';
    if (!title || uniqueTitles.has(title)) {
        validationResults.titleErrors++;
    }
    uniqueTitles.add(title);

    // 4. H1 Check
    const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    if (h1Matches.length !== 1) {
        validationResults.h1Errors++;
    }
    const h1Text = h1Matches[0] ? h1Matches[0].replace(/<[^>]+>/g, '').trim() : '';
    if (uniqueH1s.has(h1Text)) {
        validationResults.h1Errors++;
    }
    uniqueH1s.add(h1Text);

    // 5. Meta Description
    const metaDescMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
    const metaDesc = metaDescMatch ? metaDescMatch[1].trim() : '';
    if (!metaDesc || metaDesc.length < 20) {
        validationResults.metaDescriptionErrors++;
    }

    // 6. Canonical Check
    const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([\s\S]*?)["']/i);
    const expectedCanonical = `https://www.medical365.in/${item.slug}`;
    if (!canonicalMatch || canonicalMatch[1] !== expectedCanonical) {
        validationResults.canonicalErrors++;
    }

    // 7. Accidental Noindex
    if (html.includes('noindex')) {
        validationResults.accidentalNoindex++;
    }

    // 8. JSON-LD Parse Check
    const jsonLdMatches = html.match(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
    jsonLdMatches.forEach(script => {
        try {
            const raw = script.replace(/<\/?script[^>]*>/gi, '').trim();
            const parsed = JSON.parse(raw);
            if (raw.includes('AggregateRating')) validationResults.fakeAggregateRatings++;
            if (raw.includes('Review')) validationResults.fakeReviews++;
        } catch (e) {
            validationResults.jsonLdParseErrors++;
            console.error(`JSON-LD Parse Error in ${item.filename}:`, e.message);
        }
    });

    // 9. Tracking Check
    if (!html.includes('G-RMGG2LX0RF')) validationResults.missingGa4++;
    if (!html.includes('GTM-W5H82GQ7')) validationResults.missingGtm++;

    validationResults.pagesDetails.push({
        filename: item.filename,
        title,
        h1: h1Text,
        canonical: canonicalMatch ? canonicalMatch[1] : null,
        jsonLdBlocks: jsonLdMatches.length
    });
});

console.log('=== VALIDATION SUMMARY ===');
console.log(`Total Pages Audited: ${validationResults.totalAudited}`);
console.log(`HTML Structure Errors: ${validationResults.htmlStructureErrors}`);
console.log(`Title Errors / Duplicates: ${validationResults.titleErrors}`);
console.log(`H1 Errors / Duplicates: ${validationResults.h1Errors}`);
console.log(`Meta Description Errors: ${validationResults.metaDescriptionErrors}`);
console.log(`Canonical Errors: ${validationResults.canonicalErrors}`);
console.log(`Accidental Noindex: ${validationResults.accidentalNoindex}`);
console.log(`JSON-LD Syntax Errors: ${validationResults.jsonLdParseErrors}`);
console.log(`Fake AggregateRatings: ${validationResults.fakeAggregateRatings}`);
console.log(`Fake Reviews: ${validationResults.fakeReviews}`);
console.log(`Missing GA4 (G-RMGG2LX0RF): ${validationResults.missingGa4}`);
console.log(`Missing GTM (GTM-W5H82GQ7): ${validationResults.missingGtm}`);
console.log(`Phase 2B Isolation Violations: ${validationResults.phase2bViolations}`);

const passedAll = Object.keys(validationResults)
    .filter(k => k.endsWith('Errors') || k.startsWith('fake') || k.startsWith('missing') || k.startsWith('phase2b') || k === 'accidentalNoindex')
    .every(k => validationResults[k] === 0);

console.log(`FINAL STATUS: ${passedAll ? 'PASS — READY FOR HUMAN REVIEW ✅' : 'FAIL ❌'}`);

fs.writeFileSync(path.join(repoRoot, 'scratch/specialty_seo_validation.json'), JSON.stringify(validationResults, null, 2), 'utf8');
console.log('Saved validation log to scratch/specialty_seo_validation.json');
