const https = require('https');

https.get('https://www.medical365.in/medical365-analytics?t=' + Date.now(), res => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
        console.log('Status:', res.statusCode);
        console.log('Is 404 Page?:', data.includes('404') || data.includes('Page Not Found') || data.includes('<!DOCTYPE html>'));
        console.log('Contains Medical365 Intelligence Dashboard?:', data.includes('Website Intelligence Platform V6') || data.includes('m365-analytics-'));
        console.log('Snippet:', data.substring(0, 300));
    });
});
