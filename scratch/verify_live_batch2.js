const https = require('https');

console.log('=== VERIFYING LIVE PRODUCTION DEPLOYMENT FOR BATCH 2 (COMMIT 0e97f4c7) ===');

const testUrls = [
    { name: 'EEG Reports', url: 'https://www.medical365.in/eeg-reports' },
    { name: 'Growth Charts', url: 'https://www.medical365.in/growth-charts' },
    { name: 'LASIK Surgery Records', url: 'https://www.medical365.in/lasik-surgery-records' },
    { name: 'Growth Charts SVG Asset', url: 'https://www.medical365.in/images/diagrams/growth-charts-workflow.svg' }
];

let checked = 0;
testUrls.forEach(item => {
    https.get(item.url + '?cb=' + Date.now(), { headers: { 'User-Agent': 'Verifier', 'Cache-Control': 'no-cache' } }, res => {
        let d = '';
        res.on('data', c => d += c);
        res.on('end', () => {
            checked++;
            const isSvg = item.url.endsWith('.svg');
            const statusOk = res.statusCode === 200;
            const hasDiagram = isSvg ? d.includes('<svg') : d.includes('-workflow.svg');
            console.log(`[${res.statusCode}] ${item.name} -> OK: ${statusOk} | Asset Valid: ${hasDiagram}`);
            if (checked === testUrls.length) {
                console.log('=== LIVE PRODUCTION BATCH 2 VERIFICATION COMPLETE ===');
            }
        });
    });
});
