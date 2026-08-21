const fs = require('fs');

const addonSnippet = `
    <h4 class="feature-title" style="margin-top: 16px; color: var(--brand-blue, #1A56DB); font-size: 0.95rem;">Digital Presence Add-On (₹5,000 extra)</h4>
    <ul class="plan-features">
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg> 5-Page Custom Website</li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg> 100% Responsive & Modern UI/UX</li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg> .in Domain (1 Year)</li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg> WhatsApp Integration</li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg> On-Page SEO</li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg> Lead Gen (Forms, Click-to-call)</li>
    </ul>
`;

function addAddonToCards(file) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace the end of the existing </ul> in each pricing card with the new addon snippet + </ul>
    // It's safer to just replace </ul> before <a href="https://www.medical365.in/book-demo"
    // The cards end with </ul> followed by an <a> tag. Let's look at the structure.
    
    content = content.replace(/<\/ul>\s*(<a href="https:\/\/www\.medical365\.in\/book-demo".*?>)/gi, '</ul>' + addonSnippet + '$1');
    content = content.replace(/<\/ul>\s*(<a href="pricing\.html".*?>)/gi, '</ul>' + addonSnippet + '$1');
    content = content.replace(/<\/ul>\s*(<a href="https:\/\/www\.medical365\.in\/contact".*?>)/gi, '</ul>' + addonSnippet + '$1');

    fs.writeFileSync(file, content);
    console.log(`Successfully added addon to cards in ${file}`);
}

addAddonToCards('index.html');
addAddonToCards('pricing.html');
