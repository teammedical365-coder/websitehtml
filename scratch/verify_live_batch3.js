const https = require('https');

console.log('=== VERIFYING LIVE PRODUCTION DEPLOYMENT FOR BATCH 3 (COMMIT 86f706d8) ===');

const testUrls = [
    { name: 'Dental Tooth Chart', url: 'https://www.medical365.in/dental-tooth-chart' },
    { name: 'Skin Image Tracking', url: 'https://www.medical365.in/skin-image-tracking' },
    { name: 'Cancer Staging', url: 'https://www.medical365.in/cancer-staging' },
    { name: 'Dental Tooth Chart SVG Asset', url: 'https://www.medical365.in/images/diagrams/dental-tooth-chart-workflow.svg' }
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
                console.log('=== LIVE PRODUCTION BATCH 3 VERIFICATION COMPLETE ===');
            }
        });
    });
});
