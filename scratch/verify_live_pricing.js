const https = require('https');

console.log('Verifying live production /pricing...');
https.get('https://www.medical365.in/pricing', { headers: { 'User-Agent': 'Verifier', 'Cache-Control': 'no-cache' } }, res => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
        console.log('HTTP Status:', res.statusCode);
        console.log('Has btn-annual:', data.includes('id="btn-annual"'));
        console.log('Has btn-monthly:', data.includes('id="btn-monthly"'));
        console.log('Has Plan Switcher JS:', data.includes('Zero-Latency Android Plan Switcher Engine'));
        console.log('Has touch-action manipulation:', data.includes('touch-action: manipulation'));
    });
});
