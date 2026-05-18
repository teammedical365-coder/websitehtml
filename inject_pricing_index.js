const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');
const snippet = fs.readFileSync('pricing_section.html', 'utf8');

if (content.includes('<section class="impact-cta-prelude">')) {
    content = content.replace('<section class="impact-cta-prelude">', snippet + '\n\n    <section class="impact-cta-prelude">');
    fs.writeFileSync('index.html', content);
    console.log('Successfully injected into index.html');
} else {
    console.log('Could not find target string in index.html');
}
