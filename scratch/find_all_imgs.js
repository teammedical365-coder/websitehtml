const fs = require('fs');
const html = fs.readFileSync('ecg-ekg-integration.html', 'utf8');

const regex = /<img\b[^>]*>/gi;
let m;
while ((m = regex.exec(html)) !== null) {
    console.log('IMG TAG:', m[0]);
}
