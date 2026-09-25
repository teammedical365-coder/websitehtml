const fs = require('fs');
const html = fs.readFileSync('appointment-scheduling.html', 'utf8');
const jsonLd = html.match(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
console.log('JSON-LD count:', jsonLd.length);
jsonLd.forEach((b, i) => {
    const raw = b.replace(/<\/?script[^>]*>/gi, '').trim();
    const parsed = JSON.parse(raw);
    console.log(`JSON-LD #${i+1} (${parsed['@type']}): PASS ✅`);
});
