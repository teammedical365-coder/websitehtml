const https = require('https');

console.log('=== VERIFYING LIVE PRODUCTION DEPLOYMENT (COMMIT 2f1e3479) ===');

const sampleUrls = [
    { name: 'Appointment Scheduling (NEW)', url: 'https://www.medical365.in/appointment-scheduling' },
    { name: 'ECG EKG Integration', url: 'https://www.medical365.in/ecg-ekg-integration' },
    { name: 'Chemotherapy Plans', url: 'https://www.medical365.in/chemotherapy-plans' },
    { name: 'Dental Tooth Chart', url: 'https://www.medical365.in/dental-tooth-chart' },
    { name: 'Cloud Security', url: 'https://www.medical365.in/cloud-security' }
];

let checked = 0;
sampleUrls.forEach(item => {
    https.get(item.url + '?v=' + Date.now(), { headers: { 'User-Agent': 'Verifier', 'Cache-Control': 'no-cache' } }, res => {
        let d = '';
        res.on('data', c => d += c);
        res.on('end', () => {
            checked++;
            console.log(`[${res.statusCode}] ${item.name}: Has GA4: ${d.includes('G-RMGG2LX0RF')}, Has AEO Question: ${d.includes('What is')}`);
            if (checked === sampleUrls.length) {
                console.log('=== LIVE PRODUCTION VERIFICATION COMPLETE ===');
            }
        });
    });
});
