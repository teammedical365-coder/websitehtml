const fs = require('fs');

function fixEnterpriseCard(file) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // Find the Enterprise card block
    const enterpriseStart = content.indexOf('<h3 class="plan-name" style="color: #fff;">Enterprise Plan</h3>');
    if (enterpriseStart === -1) return;

    const enterpriseEnd = content.indexOf('</div>', enterpriseStart + 1000); // Rough boundary

    // We want to replace the addon snippet inside the enterprise card with a white version
    const addonTitleDark = '<h4 class="feature-title" style="margin-top: 16px; color: var(--brand-blue, #1A56DB); font-size: 0.95rem;">Digital Presence Add-On (₹5,000 extra)</h4>';
    const addonTitleWhite = '<h4 class="feature-title" style="margin-top: 16px; color: #fff; font-size: 0.95rem; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 16px;">Digital Presence Add-On (₹5,000 extra)</h4>';

    // The script previously added the exact same string to all cards. Let's find it within the enterprise block.
    // To make it easy, we will split the content at enterpriseStart, replace in the second half, and join.
    let before = content.substring(0, enterpriseStart);
    let after = content.substring(enterpriseStart);

    // Replace Title
    after = after.replace(addonTitleDark, addonTitleWhite);

    // Replace the svg color
    // The SVGs in the addon are <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    // The li elements don't have style="color: #fff;". We need to add it.
    // The snippet added was:
    // <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg> Free Hosting (1 Year)</li>
    // <li><svg ...> 5-Page Custom Website</li> ...

    // Let's just use regex to replace all <li> inside the addon section of the enterprise card
    // We know the addon ul starts right after the title
    
    // Instead of complex regex, let's just fix the CSS! It's much easier and cleaner.
    // If we add a rule to pricing.css:
    // .pricing-card[style*="background: var(--brand-blue)"] .feature-title,
    // .pricing-card[style*="background: var(--brand-blue)"] .plan-features li,
    // .pricing-card[style*="background: var(--brand-blue)"] .plan-features li svg { color: #fff !important; }
    // Let's do that instead! It's perfectly reliable.
}

fixEnterpriseCard('pricing.html');
