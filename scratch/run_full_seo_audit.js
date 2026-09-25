const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
console.log('=== RUNNING COMPREHENSIVE FULL SEO AUDIT ACROSS REPOSITORY ===');

// 1. Get all HTML files
const allFiles = fs.readdirSync(repoRoot).filter(f => f.endsWith('.html'));
console.log(`Total HTML files in repository: ${allFiles.length}`);

// 2. Identify the 68 Specialty/Module pages
const allData = JSON.parse(fs.readFileSync(path.join(repoRoot, 'scratch/all_68_pages_data.json'), 'utf8'));
const specialtyKeys = Object.keys(allData);

let specialtyStats = {
    count: 0,
    totalWords: 0,
    minWords: 999999,
    maxWords: 0,
    totalFaqs: 0,
    totalCapabilities: 0,
    totalSchemas: 0,
    missingSvg: 0,
    jsonErrors: 0,
    metaLeaks: 0,
    clusters: {}
};

specialtyKeys.forEach(slug => {
    const filename = slug + '.html';
    const filePath = path.join(repoRoot, filename);
    if (!fs.existsSync(filePath)) return;

    specialtyStats.count++;
    const html = fs.readFileSync(filePath, 'utf8');

    // Word count
    const textOnly = html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    const wordCount = textOnly.split(' ').filter(w => w.length > 0).length;
    specialtyStats.totalWords += wordCount;
    if (wordCount < specialtyStats.minWords) specialtyStats.minWords = wordCount;
    if (wordCount > specialtyStats.maxWords) specialtyStats.maxWords = wordCount;

    const item = allData[slug];
    const cluster = item ? item.cluster : 'CORE';
    if (!specialtyStats.clusters[cluster]) {
        specialtyStats.clusters[cluster] = { count: 0, words: 0 };
    }
    specialtyStats.clusters[cluster].count++;
    specialtyStats.clusters[cluster].words += wordCount;

    // Schemas
    const jsonMatches = html.match(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
    specialtyStats.totalSchemas += jsonMatches.length;
    jsonMatches.forEach(s => {
        try {
            const raw = s.replace(/<\/?script[^>]*>/gi, '').trim();
            JSON.parse(raw);
        } catch (e) {
            specialtyStats.jsonErrors++;
        }
    });

    // FAQs
    const faqMatches = html.match(/class="faq-item"/gi) || [];
    specialtyStats.totalFaqs += faqMatches.length;

    // Capabilities
    const capMatches = html.match(/class="capability-card"/gi) || [];
    specialtyStats.totalCapabilities += capMatches.length;
});

// 3. Phase 2B checks
let phase2bCount = 0;
let phase2bMatrixExists = fs.existsSync(path.join(repoRoot, 'scratch/phase2b_classification_matrix.json'));
let phase2bData = {};
if (phase2bMatrixExists) {
    try {
        phase2bData = JSON.parse(fs.readFileSync(path.join(repoRoot, 'scratch/phase2b_classification_matrix.json'), 'utf8'));
        phase2bCount = Object.keys(phase2bData).length;
    } catch(e) {}
}

// 4. Overall technical SEO checks
let sitemapExists = fs.existsSync(path.join(repoRoot, 'sitemap.xml'));
let robotsExists = fs.existsSync(path.join(repoRoot, 'robots.txt'));

const summary = {
    totalHtmlFiles: allFiles.length,
    specialtyPagesCount: specialtyStats.count,
    specialtyTotalWords: specialtyStats.totalWords,
    specialtyAvgWords: Math.round(specialtyStats.totalWords / specialtyStats.count),
    specialtyMinWords: specialtyStats.minWords,
    specialtyMaxWords: specialtyStats.maxWords,
    specialtyClusters: specialtyStats.clusters,
    totalFaqsAcrossSpecialties: specialtyStats.totalFaqs,
    totalCapabilities: specialtyStats.totalCapabilities,
    totalSchemasAcrossSpecialties: specialtyStats.totalSchemas,
    jsonErrors: specialtyStats.jsonErrors,
    phase2bPairs: phase2bCount,
    sitemapExists,
    robotsExists
};

console.log('AUDIT SUMMARY:', JSON.stringify(summary, null, 2));

fs.writeFileSync(path.join(repoRoot, 'scratch/full_seo_audit_summary.json'), JSON.stringify(summary, null, 2), 'utf8');
