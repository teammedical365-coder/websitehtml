const https = require('https');

console.log('=== VERIFYING LIVE PRODUCTION DEPLOYMENT FOR BATCH 4 (COMMIT b7a1e77a) ===');

const testUrls = [
    { name: 'Antenatal Care Records', url: 'https://www.medical365.in/antenatal-care-records' },
    { name: 'Appointment Scheduling', url: 'https://www.medical365.in/appointment-scheduling' },
    { name: 'EMR EHR System', url: 'https://www.medical365.in/emr-ehr-system' },
    { name: 'Appointment Scheduling SVG Asset', url: 'https://www.medical365.in/images/diagrams/appointment-scheduling-workflow.svg' }
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
                console.log('=== LIVE PRODUCTION BATCH 4 VERIFICATION COMPLETE ===');
            }
        });
    });
});
