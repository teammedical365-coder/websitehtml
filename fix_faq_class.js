const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    content = content.replace(/<div class="faq-answer-content">/g, '<div class="faq-answer">');
    // Also remove any rogue <p> wrapping if I added them around pair.a, wait. I did `<p>${pair.a}</p>`. I can leave it, or remove it. Let's just leave <p>.
    fs.writeFileSync(f, content);
});
console.log('Fixed FAQs class.');
