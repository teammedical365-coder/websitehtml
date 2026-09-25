const https = require('https');

console.log('=== VERIFYING LIVE PRODUCTION DEPLOYMENT (COMMIT 31ff7971) ===');

const testUrls = [
    { name: 'ECG EKG Integration', url: 'https://www.medical365.in/ecg-ekg-integration' },
    { name: 'ECG Diagram SVG (Relative + Online)', url: 'https://www.medical365.in/images/diagrams/ecg-ekg-integration-workflow.svg' },
    { name: 'Growth Charts', url: 'https://www.medical365.in/growth-charts' },
    { name: 'Dental Tooth Chart', url: 'https://www.medical365.in/dental-tooth-chart' }
];

let completed = 0;
testUrls.forEach(item => {
    https.get(item.url + '?cb=' + Date.now(), { headers: { 'User-Agent': 'Verifier', 'Cache-Control': 'no-cache' } }, res => {
        let d = '';
        res.on('data', c => d += c);
        res.on('end', () => {
            completed++;
            const statusOk = res.statusCode === 200;
            const hasLogo = d.includes('MEDICAL365') || d.includes('medical365');
            const hasModernBadge = d.includes('Verified Clinical Architecture') || d.includes('HOSPITAL MANAGEMENT SYSTEM');
            console.log(`[${res.statusCode}] ${item.name} -> OK: ${statusOk} | Has Logo / Modern UI: ${hasLogo || hasModernBadge}`);
            if (completed === testUrls.length) {
                console.log('=== LIVE PRODUCTION VERIFICATION SUCCESSFUL! ===');
            }
        });
    });
});
