const fs = require('fs');
const path = require('path');

const rawDir = path.resolve(__dirname, 'raw_exports');

// Page Indexing Reasons (Page 3 of GSC Indexing Export)
const indexingReasons = [
    { reason: 'Discovered - currently not indexed', source: 'Google systems', status: 'Passed', pages: 933 },
    { reason: 'Page with redirect', source: 'Website', status: 'Failed', pages: 36 },
    { reason: 'Alternate page with proper canonical tag', source: 'Website', status: 'Failed', pages: 26 },
    { reason: 'Crawled - currently not indexed', source: 'Google systems', status: 'Failed', pages: 20 },
    { reason: 'Not found (404)', source: 'Website', status: 'Started', pages: 16 },
    { reason: 'Excluded by noindex tag', source: 'Website', status: 'Passed', pages: 12 },
    { reason: 'Duplicate, Google chose different canonical than user', source: 'Google systems', status: 'Started', pages: 3 },
    { reason: 'Blocked by robots.txt', source: 'Website', status: 'Not Started', pages: 2 },
    { reason: 'Duplicate without user-selected canonical', source: 'Website', status: 'Passed', pages: 0 }
];

let csv = 'Reason,Source,Validation,Pages\n';
indexingReasons.forEach(r => {
    csv += `"${r.reason}","${r.source}","${r.status}",${r.pages}\n`;
});

fs.writeFileSync(path.join(rawDir, 'gsc_indexing_reasons.csv'), csv, 'utf8');
fs.writeFileSync(path.join(rawDir, 'gsc_indexing_reasons.json'), JSON.stringify(indexingReasons, null, 2), 'utf8');

// Indexing Status Totals as of Aug 28, 2026
const indexingTotals = {
    as_of_date: '2026-08-28',
    indexed_pages: 1008,
    not_indexed_pages: 1048,
    total_tracked_pages: 2056,
    daily_impressions_peak: 453,
    discovered_not_indexed_ratio: '933 / 1048 (89.0% of non-indexed URLs are awaiting crawl)',
    google_canonical_mismatches: 3
};

fs.writeFileSync(path.join(rawDir, 'gsc_indexing_totals.json'), JSON.stringify(indexingTotals, null, 2), 'utf8');
console.log('Saved scratch/raw_exports/gsc_indexing_reasons.json and gsc_indexing_totals.json');
