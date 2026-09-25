const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

console.log('=== VERIFYING 16 USABILITY FIXES IN INDEX.HTML ===');

const checks = [
    { id: 1, name: 'Type scale tokens in CSS', pass: html.includes('--text-xs: 0.75rem') },
    { id: 2, name: 'Semantic color tokens in CSS', pass: html.includes('--color-text-primary: #0f172a') },
    { id: 3, name: 'Standard radii scale in CSS', pass: html.includes('--radius-lg: 16px') },
    { id: 4, name: 'Card sub text >= 12px (0.8125rem)', pass: html.includes('0.8125rem') && html.includes('card-sub') },
    { id: 5, name: 'Trusted text Title/Sentence case', pass: html.includes('Trusted by over 500+ healthcare institutions across India') },
    { id: 6, name: 'API Integrations Sentence case', pass: html.includes('text-transform: none; font-weight: 600;">API Integrations</span>') },
    { id: 7, name: 'Footer column titles non-uppercase', pass: html.includes('.mf-col-title { text-transform: none') || html.includes('text-transform: none !important; /* Issue 7 */') },
    { id: 8, name: 'Footer category titles non-uppercase', pass: html.includes('.mf-cat-title { text-transform: none') || html.includes('text-transform: none !important; /* Issue 8 */') },
    { id: 9, name: 'Footer small copy >= 13px (0.8125rem)', pass: html.includes('.mf-copy.mf-copy-sm { font-size: 0.8125rem') || html.includes('0.8125rem !important; /* 13px - Issue 9 */') },
    { id: 10, name: 'Dr. Rajesh Kumar heading fixed to H3', pass: html.includes('<h3 style="margin: 0; font-weight: 700; font-size: 1.05rem;">Dr. Rajesh Kumar</h3>') },
    { id: 11, name: 'Footer category titles fixed to H3', pass: html.includes('<h3 class="mf-cat-title">Hospital & Clinic Management</h3>') },
    { id: 12, name: 'Unified Primary CTA style (#1A56DB)', pass: html.includes('.btn-primary, .btn-v2-primary { background: #1A56DB !important;') || html.includes('background: #1A56DB !important;') },
    { id: 13, name: 'Footer locations accordion (<details>)', pass: html.includes('<details class="mf-locations-accordion">') },
    { id: 14, name: 'Bento feature grid equal height stretch', pass: html.includes('bento-grid-redesign') && html.includes('align-items: stretch') },
    { id: 15, name: 'Integrations brand icons & pills', pass: html.includes('Tally ERP 9') && html.includes('Razorpay') && html.includes('HL7 / FHIR Standard') },
    { id: 16, name: 'Solutions mega-menu grouping & labels', pass: html.includes('aria-label="Healthcare Solutions Categories"') }
];

let allPassed = true;
checks.forEach(c => {
    console.log(`[Fix #${c.id.toString().padStart(2)}] ${c.name.padEnd(45)} -> ${c.pass ? 'PASS ✅' : 'FAIL ❌'}`);
    if (!c.pass) allPassed = false;
});

console.log(`\nOVERALL STATUS: ${allPassed ? '100% ALL 16 FIXES VERIFIED! 🎉' : 'Some fixes failed'}`);
