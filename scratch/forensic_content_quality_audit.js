const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
console.log('=== FORENSIC CONTENT-QUALITY & TEMPLATE SIMILARITY AUDIT (67 PAGES) ===');

const modifiedList = JSON.parse(fs.readFileSync(path.join(repoRoot, 'scratch/specialty_seo_modified_files.json'), 'utf8'));

// 1. Cross-Page Sentence Repetition Analysis
const sentenceMap = new Map(); // sentence -> Set of files
const fileSentences = new Map(); // filename -> Array of sentences

modifiedList.forEach(item => {
    const html = fs.readFileSync(path.join(repoRoot, item.filename), 'utf8');
    // Extract main content area (between header and footer)
    const headerEndIdx = html.indexOf('</header>');
    let footerStartIdx = html.indexOf('<footer id="mega-footer"');
    if (footerStartIdx === -1) footerStartIdx = html.indexOf('MEDICAL365 MEGA FOOTER');
    
    const bodyContent = html.substring(headerEndIdx, footerStartIdx);
    
    // Extract text blocks from paragraphs, headers, and list items
    const textMatches = bodyContent.match(/<(p|h1|h2|h3|h4|li)[^>]*>([\s\S]*?)<\/\1>/gi) || [];
    const sentences = [];

    textMatches.forEach(tag => {
        const text = tag.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        if (text.length > 25) {
            // Split into sentences
            const sList = text.split(/(?<=[.?!])\s+/);
            sList.forEach(s => {
                const clean = s.trim().toLowerCase();
                if (clean.length > 25) {
                    sentences.push(clean);
                    if (!sentenceMap.has(clean)) sentenceMap.set(clean, new Set());
                    sentenceMap.get(clean).add(item.filename);
                }
            });
        }
    });

    fileSentences.set(item.filename, sentences);
});

// Identify sentences appearing in 3 or more files (boilerplate detection)
const boilerplateSentences = [];
for (const [sentence, fileSet] of sentenceMap.entries()) {
    if (fileSet.size >= 3) {
        boilerplateSentences.push({
            sentence,
            occurrences: fileSet.size,
            sampleFiles: Array.from(fileSet).slice(0, 3)
        });
    }
}
boilerplateSentences.sort((a, b) => b.occurrences - a.occurrences);

// 2. Workflow Appropriateness Audit (Mismatch Detection)
const nonClinicalSlugs = [
    'cloud-security', 'notifications-system', 'billing-invoicing', 
    'patient-registration', 'parent-communication', 'confidential-records',
    'billing-reports', 'dental-insurance-billing', 'clinical-trial-management'
];

const workflowMismatches = [];
modifiedList.forEach(item => {
    const html = fs.readFileSync(path.join(repoRoot, item.filename), 'utf8');
    if (nonClinicalSlugs.includes(item.slug)) {
        if (html.includes('Doctor orders test or procedure') || html.includes('Clinical technician or specialist conducts examination')) {
            workflowMismatches.push({
                slug: item.slug,
                filename: item.filename,
                issue: "Non-clinical module has clinical test workflow (Requisition -> Test -> Execution)"
            });
        }
    }
});

// 3. Jaccard N-Gram Similarity Between Pages (Word 3-grams)
function get3Grams(sentences) {
    const text = sentences.join(' ');
    const words = text.split(' ').filter(w => w.length > 2);
    const grams = new Set();
    for (let i = 0; i < words.length - 2; i++) {
        grams.add(words[i] + ' ' + words[i+1] + ' ' + words[i+2]);
    }
    return grams;
}

const similarityMatrix = [];
const samplePairs = [];
const filenames = Array.from(fileSentences.keys());

for (let i = 0; i < filenames.length; i++) {
    const fileA = filenames[i];
    const gramsA = get3Grams(fileSentences.get(fileA));

    for (let j = i + 1; j < filenames.length; j++) {
        const fileB = filenames[j];
        const gramsB = get3Grams(fileSentences.get(fileB));

        let intersection = 0;
        gramsA.forEach(g => { if (gramsB.has(g)) intersection++; });
        const union = gramsA.size + gramsB.size - intersection;
        const jaccard = union > 0 ? (intersection / union) * 100 : 0;

        if (jaccard > 40) {
            similarityMatrix.push({
                fileA,
                fileB,
                similarityPercent: parseFloat(jaccard.toFixed(2))
            });
        }
    }
}
similarityMatrix.sort((a, b) => b.similarityPercent - a.similarityPercent);

// 4. Image Existence & Quality Audit
const imageAudit = [];
modifiedList.forEach(item => {
    const html = fs.readFileSync(path.join(repoRoot, item.filename), 'utf8');
    const headerEndIdx = html.indexOf('</header>');
    let footerStartIdx = html.indexOf('<footer id="mega-footer"');
    if (footerStartIdx === -1) footerStartIdx = html.indexOf('MEDICAL365 MEGA FOOTER');
    const body = html.substring(headerEndIdx, footerStartIdx);

    const imgMatches = body.match(/<img\b[^>]*>/gi) || [];
    const missingImgs = [];
    const emptyAlt = [];

    imgMatches.forEach(img => {
        const srcMatch = img.match(/src=["']([^"']+)["']/i);
        const altMatch = img.match(/alt=["']([^"']*)["']/i);
        const src = srcMatch ? srcMatch[1].replace(/^\//, '') : '';
        const alt = altMatch ? altMatch[1].trim() : '';

        if (src && !src.startsWith('http') && !src.startsWith('data:')) {
            const diskPath = path.join(repoRoot, src);
            if (!fs.existsSync(diskPath)) {
                missingImgs.push(src);
            }
        }
        if (!alt) emptyAlt.push(src);
    });

    imageAudit.push({
        slug: item.slug,
        bodyImageCount: imgMatches.length,
        missingImagesOnDisk: missingImgs,
        emptyAltCount: emptyAlt.length
    });
});

// 5. Keyword Cannibalization with Core Pillars
const cannibalizationFlags = [];
modifiedList.forEach(item => {
    const html = fs.readFileSync(path.join(repoRoot, item.filename), 'utf8');
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const title = titleMatch ? titleMatch[1].toLowerCase() : '';
    const h1 = h1Match ? h1Match[1].toLowerCase() : '';

    if (item.slug !== 'emr-ehr-system' && (h1.includes('emr software') || h1.includes('ehr system') || h1.includes('hospital management system'))) {
        cannibalizationFlags.push({
            slug: item.slug,
            issue: `H1 ('${h1}') targets broad HMS/EMR instead of specialty niche`
        });
    }
});

// Summary Report
const auditReport = {
    totalFilesAudited: modifiedList.length,
    highBoilerplateSentencesCount: boilerplateSentences.length,
    topBoilerplateSentences: boilerplateSentences.slice(0, 10),
    workflowMismatchCount: workflowMismatches.length,
    workflowMismatches,
    highSimilarityPairCount: similarityMatrix.length,
    highestSimilarityPairs: similarityMatrix.slice(0, 10),
    pagesWithZeroBodyImages: imageAudit.filter(i => i.bodyImageCount === 0).length,
    cannibalizationFlagsCount: cannibalizationFlags.length,
    cannibalizationFlags
};

fs.writeFileSync(path.join(repoRoot, 'scratch/forensic_content_quality_audit.json'), JSON.stringify(auditReport, null, 2), 'utf8');
console.log('Saved forensic audit to scratch/forensic_content_quality_audit.json');

console.log('\n=== AUDIT FINDINGS ===');
console.log('1. High Boilerplate Sentences (>2 files):', boilerplateSentences.length);
console.log('2. Workflow Mismatches (e.g. Clinical test workflow on IT/Security):', workflowMismatches.length);
console.log('3. High N-gram Similarity Pairs (>40% overlap):', similarityMatrix.length);
console.log('4. Pages with 0 Body Images:', auditReport.pagesWithZeroBodyImages);
console.log('5. Keyword Cannibalization Flags:', cannibalizationFlags.length);
