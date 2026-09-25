const https = require('https');

console.log('=== VERIFYING LIVE PRODUCTION DEPLOYMENT FOR BATCH 1 (COMMIT 31437561) ===');

const testUrls = [
    { name: 'ECG EKG Integration', url: 'https://www.medical365.in/ecg-ekg-integration' },
    { name: 'Angiography Reports', url: 'https://www.medical365.in/angiography-reports' },
    { name: 'X-Ray Imaging Integration', url: 'https://www.medical365.in/xray-imaging-integration' },
    { name: 'Surgery Planning', url: 'https://www.medical365.in/surgery-planning' },
    { name: 'ECG SVG Diagram Asset', url: 'https://www.medical365.in/images/diagrams/ecg-ekg-integration-workflow.svg' }
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
                console.log('=== LIVE PRODUCTION BATCH 1 VERIFICATION COMPLETE ===');
            }
        });
    });
});
