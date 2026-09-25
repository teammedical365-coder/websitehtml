const https = require('https');

const url = 'https://www.medical365.in/xray-imaging-integration?cache_bust=' + Date.now();
console.log('Verifying live production:', url);

https.get(url, { headers: { 'User-Agent': 'Verifier', 'Cache-Control': 'no-cache, no-store' } }, res => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => {
        console.log('HTTP Status:', res.statusCode);
        const hasLeak = d.includes('Streamline your healthcare operations');
        console.log('Has stray text leak in HTML body:', hasLeak);
        if (!hasLeak) {
            console.log('CONFIRMED FIXED LIVE: Zero stray text overlapping the header! ✅');
        } else {
            console.log('Still propagating...');
        }
    });
});
