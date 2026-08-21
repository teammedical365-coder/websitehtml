const fs = require('fs');

let content = fs.readFileSync('pricing.html', 'utf8');
const snippet = fs.readFileSync('pricing_content.html', 'utf8');

// The main tag structure
const mainStartRegex = /<main>/i;
const mainEndRegex = /<\/main>/i;

const startMatch = content.match(mainStartRegex);
const endMatch = content.match(mainEndRegex);

if (startMatch && endMatch) {
    const startIndex = startMatch.index + startMatch[0].length;
    const endIndex = endMatch.index;
    
    content = content.substring(0, startIndex) + '\n' + snippet + '\n' + content.substring(endIndex);
    fs.writeFileSync('pricing.html', content);
    console.log('Successfully injected pricing content into pricing.html');
} else {
    console.log('Could not find <main> or </main> tags in pricing.html');
}

// also update the title to Pricing
content = content.replace(/<title>\{\{meta_title\}\}<\/title>/g, '<title>Pricing Plans - Medical365</title>');
content = content.replace(/\{\{meta_title\}\}/g, 'Pricing Plans - Medical365');
content = content.replace(/\{\{meta_description\}\}/g, 'View all pricing plans for Medical365 SaaS platform. Simple, transparent pricing for Indian healthcare providers.');
content = content.replace(/\{\{slug\}\}/g, 'pricing.html');

fs.writeFileSync('pricing.html', content);
