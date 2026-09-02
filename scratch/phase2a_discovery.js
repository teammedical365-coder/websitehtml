const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repoRoot = path.resolve(__dirname, '..');

function getHtmlFiles(dir) {
    let files = [];
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
        if (['.git', 'node_modules', 'scratch', '.system_generated'].includes(item.name)) continue;
        const full = path.join(dir, item.name);
        if (item.isDirectory()) files = files.concat(getHtmlFiles(full));
        else if (item.isFile() && item.name.endsWith('.html')) files.push(full);
    }
    return files;
}

const protectedPhase1Files = [
    'index.html',
    'hims-software.html',
    'nabh-compliant-hospital-software.html',
    'hospital-bed-management.html',
    'blogs/abha-integration-guide.html',
    'blood-bank.html',
    'pricing.html',
    'blogs/nabh-compliance-guide.html',
    'blogs/medical365-vs-practo.html'
].map(f => f.replace(/\//g, path.sep));

function getSha256(content) {
    return crypto.createHash('sha256').update(content, 'utf8').digest('hex');
}

console.log('=== PHASE 2A DISCOVERY ENGINE STARTING ===');

const allFiles = getHtmlFiles(repoRoot);
console.log(`Total HTML files found: ${allFiles.length}`);

const candidateInventory = [];
const beforeSnapshot = [];
const summary = {
    total_scanned: allFiles.length,
    files_with_aggregate_rating: 0,
    files_with_review: 0,
    safe_remove: 0,
    preserve_legitimate: 0,
    review_required: 0,
    no_target_schema: 0,
    protected_phase1_candidate_count: 0,
    patterns_identified: {}
};

allFiles.forEach(absPath => {
    const relPath = path.relative(repoRoot, absPath).replace(/\\/g, '/');
    const content = fs.readFileSync(absPath, 'utf8');
    const sha256 = getSha256(content);

    const isProtectedPhase1 = protectedPhase1Files.some(pf => absPath.endsWith(pf));

    // Extract all JSON-LD blocks
    const jsonLdRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    const jsonLdBlocks = [];
    let match;
    while ((match = jsonLdRegex.exec(content)) !== null) {
        jsonLdBlocks.push({
            raw: match[1],
            index: match.index
        });
    }

    let hasAggregateRating = false;
    let hasReview = false;
    let ratingValues = [];
    let reviewCounts = [];
    let ratingCounts = [];
    let reviewAuthors = [];
    let reviewBodies = [];
    let targetProperties = [];
    let schemaTypes = [];
    let parseErrors = [];

    jsonLdBlocks.forEach((block, bIdx) => {
        try {
            const parsed = JSON.parse(block.raw.trim());
            const items = parsed['@graph'] || (Array.isArray(parsed) ? parsed : [parsed]);

            items.forEach(item => {
                if (item['@type']) schemaTypes.push(item['@type']);

                // Check aggregateRating property
                if (item.aggregateRating) {
                    hasAggregateRating = true;
                    targetProperties.push('aggregateRating');
                    if (item.aggregateRating.ratingValue) ratingValues.push(String(item.aggregateRating.ratingValue));
                    if (item.aggregateRating.ratingCount) ratingCounts.push(String(item.aggregateRating.ratingCount));
                    if (item.aggregateRating.reviewCount) reviewCounts.push(String(item.aggregateRating.reviewCount));
                }
                if (item['@type'] === 'AggregateRating') {
                    hasAggregateRating = true;
                    targetProperties.push('@type:AggregateRating');
                    if (item.ratingValue) ratingValues.push(String(item.ratingValue));
                    if (item.ratingCount) ratingCounts.push(String(item.ratingCount));
                    if (item.reviewCount) reviewCounts.push(String(item.reviewCount));
                }

                // Check review property
                if (item.review) {
                    hasReview = true;
                    targetProperties.push('review');
                    const revList = Array.isArray(item.review) ? item.review : [item.review];
                    revList.forEach(r => {
                        if (r.author) {
                            reviewAuthors.push(typeof r.author === 'string' ? r.author : (r.author.name || JSON.stringify(r.author)));
                        }
                        if (r.reviewBody) reviewBodies.push(r.reviewBody.substring(0, 40));
                    });
                }
                if (item['@type'] === 'Review') {
                    hasReview = true;
                    targetProperties.push('@type:Review');
                    if (item.author) {
                        reviewAuthors.push(typeof item.author === 'string' ? item.author : (item.author.name || JSON.stringify(item.author)));
                    }
                    if (item.reviewBody) reviewBodies.push(item.reviewBody.substring(0, 40));
                }
            });
        } catch (e) {
            parseErrors.push(`Block ${bIdx}: ${e.message}`);
        }
    });

    // Also run lexical fallback check for keywords
    const lexicalHasAgg = /AggregateRating/i.test(content);
    const lexicalHasReview = /"@type"\s*:\s*"Review"/i.test(content) || /"review"\s*:/i.test(content);

    if (hasAggregateRating || lexicalHasAgg) summary.files_with_aggregate_rating++;
    if (hasReview || lexicalHasReview) summary.files_with_review++;

    // Determine Classification
    let classification = 'NO_TARGET_SCHEMA';
    let reason = 'No AggregateRating or Review markup found';

    if (isProtectedPhase1) {
        if (hasAggregateRating || hasReview) {
            summary.protected_phase1_candidate_count++;
            classification = 'REVIEW_REQUIRED';
            reason = 'Protected Phase 1 file — manual review required';
        } else {
            classification = 'NO_TARGET_SCHEMA';
            reason = 'Protected Phase 1 file — already cleaned in Phase 1';
        }
    } else if (hasAggregateRating || hasReview) {
        // Evaluate boilerplate signals
        const isKnownRating = ratingValues.every(v => v === '4.8' || v === '5' || v === '4.9');
        const isKnownCount = ratingCounts.every(c => c === '120' || c === '500' || c === '250') &&
                             reviewCounts.every(c => c === '120' || c === '500' || c === '250');
        const isKnownAuthor = reviewAuthors.every(a => a.includes('Dr. Rajesh Kumar') || a.includes('Amit Sharma') || a.includes('Rajesh Kumar'));

        // Check if there is visible on-page review text in body
        const visibleReviewRegex = /class=["'][^"']*(patient-review|testimonial-card|user-review)[^"']*["']/i;
        const hasVisibleTestimonial = visibleReviewRegex.test(content);

        if (parseErrors.length > 0) {
            classification = 'REVIEW_REQUIRED';
            reason = `JSON parse error in existing markup: ${parseErrors.join('; ')}`;
        } else if (hasVisibleTestimonial && !isKnownAuthor) {
            classification = 'REVIEW_REQUIRED';
            reason = 'Page has visible testimonial cards with non-boilerplate authors';
        } else if (isKnownRating && (isKnownCount || ratingCounts.length === 0) && (isKnownAuthor || reviewAuthors.length === 0)) {
            classification = 'SAFE_REMOVE';
            reason = 'Matches known repeated legacy boilerplate (4.8/120 or 4.8/500 synthetic reviews without unique page data)';
        } else {
            classification = 'REVIEW_REQUIRED';
            reason = `Unique or ambiguous rating values (${ratingValues.join(',')}) or authors (${reviewAuthors.join(',')})`;
        }
    }

    if (classification === 'SAFE_REMOVE') summary.safe_remove++;
    else if (classification === 'PRESERVE_LEGITIMATE') summary.preserve_legitimate++;
    else if (classification === 'REVIEW_REQUIRED') summary.review_required++;
    else if (classification === 'NO_TARGET_SCHEMA') summary.no_target_schema++;

    const candidateRecord = {
        file: relPath,
        url: 'https://www.medical365.in/' + (relPath === 'index.html' ? '' : relPath.replace(/\.html$/, '')),
        schema_blocks_count: jsonLdBlocks.length,
        schema_types: [...new Set(schemaTypes)],
        has_aggregate_rating: hasAggregateRating,
        has_review: hasReview,
        rating_values: ratingValues,
        rating_counts: ratingCounts,
        review_counts: reviewCounts,
        review_authors: reviewAuthors,
        target_properties: targetProperties,
        parse_errors: parseErrors,
        classification,
        reason
    };

    candidateInventory.push(candidateRecord);

    if (classification === 'SAFE_REMOVE') {
        beforeSnapshot.push({
            file: relPath,
            sha256_before: sha256,
            schema_blocks_before: jsonLdBlocks.length,
            aggregate_rating_count_before: ratingValues.length,
            review_count_before: reviewAuthors.length,
            rating_values_before: ratingValues,
            review_counts_before: reviewCounts,
            target_properties_before: targetProperties,
            classification: 'SAFE_REMOVE'
        });
    }
});

fs.writeFileSync(path.join(repoRoot, 'scratch/phase2a_candidate_inventory.json'), JSON.stringify(candidateInventory, null, 2), 'utf8');
fs.writeFileSync(path.join(repoRoot, 'scratch/phase2a_before_snapshot.json'), JSON.stringify(beforeSnapshot, null, 2), 'utf8');

console.log('\n======================================================');
console.log('        PHASE 2A DISCOVERY & APPROVAL GATE');
console.log('======================================================');
console.log(`Total HTML files scanned:          ${summary.total_scanned}`);
console.log(`Files with AggregateRating:        ${summary.files_with_aggregate_rating}`);
console.log(`Files with Review:                 ${summary.files_with_review}`);
console.log(`SAFE_REMOVE candidates:            ${summary.safe_remove}`);
console.log(`PRESERVE_LEGITIMATE candidates:    ${summary.preserve_legitimate}`);
console.log(`REVIEW_REQUIRED candidates:        ${summary.review_required}`);
console.log(`NO_TARGET_SCHEMA candidates:       ${summary.no_target_schema}`);
console.log(`Protected Phase 1 candidate count: ${summary.protected_phase1_candidate_count}`);
console.log('======================================================\n');
