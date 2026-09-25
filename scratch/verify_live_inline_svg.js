const https = require('https');

console.log('=== VERIFYING LIVE INLINE SVG DEPLOYMENT (COMMIT 23d28deb) ===');

function checkLive(url, checkPattern) {
    return new Promise(resolve => {
        https.get(url + '?cb=' + Date.now(), { headers: { 'User-Agent': 'Verifier', 'Cache-Control': 'no-cache' } }, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const hasPattern = data.includes(checkPattern);
                const hasSvgInline = data.includes('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 440"');
                const hasLogo = data.includes('MEDICAL<tspan fill="#37B39C">365</tspan>');
                resolve({
                    url,
                    status: res.statusCode,
                    hasSvgInline,
                    hasLogo,
                    contentLength: data.length
                });
            });
        });
    });
}

async function verify() {
    const urls = [
        'https://www.medical365.in/ecg-ekg-integration',
        'https://www.medical365.in/growth-charts',
        'https://www.medical365.in/dental-tooth-chart',
        'https://www.medical365.in/appointment-scheduling'
    ];

    for (const u of urls) {
        const r = await checkLive(u);
        console.log(`[${r.status}] ${u} -> Inline SVG: ${r.hasSvgInline} | Medical365 Logo: ${r.hasLogo} (Bytes: ${r.contentLength})`);
    }
}

verify();
