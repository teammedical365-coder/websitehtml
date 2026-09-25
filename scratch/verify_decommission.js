const https = require('https');

console.log('=== VERIFYING LIVE 404 DECOMMISSIONING OF ANALYTICS ===');

function check(url) {
    return new Promise(resolve => {
        https.get(url + '?cb=' + Date.now(), { headers: { 'User-Agent': 'Verifier', 'Cache-Control': 'no-cache' } }, res => {
            resolve({ url, status: res.statusCode });
        });
    });
}

async function run() {
    const r1 = await check('https://www.medical365.in/medical365-analytics');
    const r2 = await check('https://www.medical365.in/medical365-analytics/');
    const r3 = await check('https://www.medical365.in/medical365-analytics/index.html');
    console.log(`[${r1.status}] ${r1.url} (Expected 404)`);
    console.log(`[${r2.status}] ${r2.url} (Expected 404)`);
    console.log(`[${r3.status}] ${r3.url} (Expected 404)`);
}

setTimeout(run, 15000);
