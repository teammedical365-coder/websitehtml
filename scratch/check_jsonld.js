const fs = require('fs');
const html = fs.readFileSync('ecg-ekg-integration.html', 'utf8');
const matches = html.match(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
console.log('Total JSON-LD blocks:', matches.length);
matches.forEach((m, i) => {
    const raw = m.replace(/<\/?script[^>]*>/gi, '').trim();
    try {
        const parsed = JSON.parse(raw);
        console.log(`Block ${i+1}: @type = ${parsed['@type'] || (parsed['@graph'] ? 'Graph' : 'Array')}`);
    } catch (e) {
        console.error(`Block ${i+1} parse error:`, e.message);
    }
});
