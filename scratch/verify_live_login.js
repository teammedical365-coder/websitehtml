const https = require('https');

console.log('=== VERIFYING LIVE LOGIN DASHBOARD DEPLOYMENT (COMMIT 63f93933) ===');

function check(url) {
    return new Promise(resolve => {
        https.get(url + '?cb=' + Date.now(), { headers: { 'User-Agent': 'Verifier', 'Cache-Control': 'no-cache' } }, res => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                resolve({
                    url,
                    status: res.statusCode,
                    hasLoginTitle: data.includes('Medical365 Executive Intelligence | Login'),
                    hasSessionGuard: data.includes('Medical365 Session Guard'),
                    hasSanitizedMetrics: !data.includes('₹61.8L')
                });
            });
        });
    });
}

async function run() {
    const rLogin = await check('https://www.medical365.in/medical365-analytics/login');
    const rIndex = await check('https://www.medical365.in/medical365-analytics/');
    console.log(`[${rLogin.status}] ${rLogin.url} -> Has Login Page: ${rLogin.hasLoginTitle}`);
    console.log(`[${rIndex.status}] ${rIndex.url} -> Session Guard Active: ${rIndex.hasSessionGuard} | Sensitive Raw Metrics Sanitized: ${rIndex.hasSanitizedMetrics}`);
}

setTimeout(run, 15000);
