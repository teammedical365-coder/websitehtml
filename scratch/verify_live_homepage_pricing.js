const https = require('https');

const url = 'https://www.medical365.in/?cache_bust=' + Date.now();
console.log('Verifying live production home page with cache bust:', url);

https.get(url, { headers: { 'User-Agent': 'Verifier', 'Cache-Control': 'no-cache, no-store, must-revalidate' } }, res => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
        console.log('HTTP Status:', res.statusCode);
        console.log('Has home-btn-annual:', data.includes('id="home-btn-annual"'));
        console.log('Has home-btn-monthly:', data.includes('id="home-btn-monthly"'));
        console.log('Has clean /pricing link:', data.includes('href="/pricing"'));
        console.log('Has Home Plan Switcher JS:', data.includes('Zero-Latency Android Plan Switcher Engine for Home Page'));
        console.log('Has Digital Presence Add-On box:', data.includes('digital-addon-box'));
    });
});
