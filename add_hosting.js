const fs = require('fs');

function addHosting(file) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // Replace ".in Domain (1 Year)" (used in cards)
    const target1 = '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg> .in Domain (1 Year)</li>';
    const replace1 = '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg> Free Hosting (1 Year)</li>\n        ' + target1;
    
    // Replace ".in Domain Registration (1 Year)" (used in dedicated pricing page addon box)
    const target2 = '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg> .in Domain Registration (1 Year)</li>';
    const replace2 = '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg> Free Hosting (1 Year)</li>\n                            ' + target2;

    if (content.includes(target1) || content.includes(target2)) {
        // global replace
        content = content.split(target1).join(replace1);
        content = content.split(target2).join(replace2);
        fs.writeFileSync(file, content);
        console.log(`Added free hosting to ${file}`);
    }
}

addHosting('index.html');
addHosting('pricing.html');
addHosting('pricing_content.html');
addHosting('pricing_section.html');
