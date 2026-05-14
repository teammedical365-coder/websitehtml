const fs = require('fs');

function getHeader(file) {
    const c = fs.readFileSync(file, 'utf8');
    const start = c.indexOf('<header');
    const end = c.indexOf('</header>') + 9;
    return c.substring(start, end);
}

const h1 = getHeader('index.html');
const h2 = getHeader('clinics.html');

fs.writeFileSync('header-index.txt', h1);
fs.writeFileSync('header-clinics.txt', h2);

console.log('Index header length: ' + h1.length);
console.log('Clinics header length: ' + h2.length);
if (h1 === h2) {
    console.log('Headers are identical');
} else {
    console.log('Headers are DIFFERENT');
}
