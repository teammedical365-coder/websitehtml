const fs = require('fs');

function simplifyEnterpriseCard(file) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // We will do some specific replacements to strip out the inline styles from the Enterprise card.
    // It's safer to just replace the specific strings.

    // 1. Remove background and color from the main card div
    // We can identify it by the bespoke badge which is right before it, but actually the div is:
    // <div class="pricing-card" style="background: var(--brand-blue); color: #fff;">
    content = content.replace('<div class="pricing-card" style="background: var(--brand-blue); color: #fff;">', '<div class="pricing-card">');

    // 2. Fix the badge
    // <div class="badge-offer" style="background: rgba(255,255,255,0.2); color: #fff;">BESPOKE SLA</div>
    content = content.replace('<div class="badge-offer" style="background: rgba(255,255,255,0.2); color: #fff;">BESPOKE SLA</div>', '<div class="badge-offer">BESPOKE SLA</div>');

    // 3. Fix plan name
    // <h3 class="plan-name" style="color: #fff;">Enterprise Plan</h3>
    content = content.replace('<h3 class="plan-name" style="color: #fff;">Enterprise Plan</h3>', '<h3 class="plan-name">Enterprise Plan</h3>');

    // 4. Fix plan desc
    // <p class="plan-desc" style="color: rgba(255,255,255,0.8);">Optimize According Need.</p>
    content = content.replace('<p class="plan-desc" style="color: rgba(255,255,255,0.8);">Optimize According Need.</p>', '<p class="plan-desc">Optimize According Need.</p>');

    // 5. Fix price wrapper
    // <div class="plan-price-wrapper" style="border-bottom-color: rgba(255,255,255,0.2);">
    content = content.replace('<div class="plan-price-wrapper" style="border-bottom-color: rgba(255,255,255,0.2);">', '<div class="plan-price-wrapper">');

    // 6. Fix price text
    // <div class="plan-price" style="color: #fff; font-size: 2rem;">Custom Quote</div>
    content = content.replace('<div class="plan-price" style="color: #fff; font-size: 2rem;">Custom Quote</div>', '<div class="plan-price" style="font-size: 2rem;">Custom Quote</div>');

    // 7. Fix feature title
    // <h4 class="feature-title" style="color: #fff;">Operational Provision</h4>
    content = content.replace('<h4 class="feature-title" style="color: #fff;">Operational Provision</h4>', '<h4 class="feature-title">Operational Provision</h4>');

    // 8. Fix list items and svgs
    // <li style="color: #fff;"><svg style="color: #fff;" viewBox="0 0 24 24"
    content = content.replace(/<li style="color: #fff;">/g, '<li>');
    content = content.replace(/<svg style="color: #fff;"/g, '<svg');

    // 9. Fix button
    // <a href="https://www.medical365.in/book-demo" class="btn-pricing" style="background: #fff; color: var(--brand-blue); font-weight: 700;">Contact Sales</a>
    content = content.replace('<a href="https://www.medical365.in/book-demo" class="btn-pricing" style="background: #fff; color: var(--brand-blue); font-weight: 700;">Contact Sales</a>', '<a href="https://www.medical365.in/book-demo" class="btn-pricing btn-pricing-outline">Contact Sales</a>');

    fs.writeFileSync(file, content);
    console.log(`Simplified Enterprise card in ${file}`);
}

simplifyEnterpriseCard('pricing.html');
simplifyEnterpriseCard('pricing_content.html');
