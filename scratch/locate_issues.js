const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

const queries = [
    'Real-time monitoring',
    'TRUSTED BY',
    'API Integrations',
    'mf-col-title',
    'mf-cat-title',
    'mf-copy',
    'Dr. Rajesh',
    'btn-v2-primary',
    'Locations We Serve',
    'Everything you need',
    'Seamless Integrations',
    'solutions-toggle'
];

queries.forEach(q => {
    let idx = 0;
    let found = 0;
    while ((idx = html.toLowerCase().indexOf(q.toLowerCase(), idx)) !== -1) {
        found++;
        const line = html.substring(0, idx).split('\n').length;
        console.log(`Query "${q}" found at line ${line}: ${html.substring(idx - 20, idx + 80).replace(/\s+/g, ' ')}`);
        idx += q.length;
        if (found >= 3) break;
    }
    if (found === 0) console.log(`Query "${q}" NOT found`);
});
