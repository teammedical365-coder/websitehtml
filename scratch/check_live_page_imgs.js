const https = require('https');

https.get('https://www.medical365.in/ecg-ekg-integration', res => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
        // Find all img tags in the live HTML
        const imgRegex = /<img\b[^>]*>/gi;
        let match;
        console.log('--- LIVE IMAGES ON https://www.medical365.in/ecg-ekg-integration ---');
        while ((match = imgRegex.exec(body)) !== null) {
            console.log(match[0]);
        }
    });
});
