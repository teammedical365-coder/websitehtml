const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    content = content.replace(/<div style="display:none;" class="faq-answer-content">/g, '<div>');
    fs.writeFileSync(f, content);
});
console.log('Fixed FAQs visibility.');
