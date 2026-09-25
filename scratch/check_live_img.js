const https = require('https');

function check(url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({
                    status: res.statusCode,
                    headers: res.headers,
                    bodyLength: data.length,
                    bodySnippet: data.substring(0, 200)
                });
            });
        }).on('error', (err) => {
            resolve({ error: err.message });
        });
    });
}

async function run() {
    console.log('Checking SVG directly:');
    const svgRes = await check('https://www.medical365.in/images/diagrams/ecg-ekg-integration-workflow.svg');
    console.log('SVG Response:', svgRes.status, 'Content-Type:', svgRes.headers && svgRes.headers['content-type'], 'Length:', svgRes.bodyLength);
    console.log('Snippet:', svgRes.bodySnippet);

    console.log('\nChecking HTML page:');
    const htmlRes = await check('https://www.medical365.in/ecg-ekg-integration');
    console.log('HTML Response:', htmlRes.status, 'Length:', htmlRes.bodyLength);
    
    // Check if img tag exists in htmlRes
    const imgMatches = htmlRes.bodySnippet ? [] : [];
}

run();
