const fs = require('fs');

function extractHeader(file) {
    const c = fs.readFileSync(file, 'utf8');
    const start = c.indexOf('<header');
    const end = c.indexOf('</header>') + 9;
    return c.substring(start, end);
}

console.log('--- INDEX.HTML HEADER ---');
console.log(extractHeader('index.html'));
console.log('\n--- CLINICS.HTML HEADER ---');
console.log(extractHeader('clinics.html'));
