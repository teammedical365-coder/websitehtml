const https = require('https');

https.get('https://www.medical365.in/robots.txt', res => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => {
        console.log(`[${res.statusCode}] Live robots.txt:`);
        console.log(d);
    });
});
