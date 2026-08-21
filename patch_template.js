const fs = require('fs');
let t = fs.readFileSync('seo_template.html', 'utf8');
const marker = 'RELATED REGIONAL CIRCLES';
const idx = t.indexOf(marker);
const commentStart = t.lastIndexOf('<!--', idx);
const afterMarker = t.indexOf('{{related_links_menu}}', idx);
const sectionEnd = t.indexOf('</section>', afterMarker) + '</section>'.length;

const newSection = [
    '    <!-- Strong Internal Links - Homepage-Equivalent Grid -->',
    '    <section class="related-circles-section" style="padding: 64px 0 80px; background: linear-gradient(180deg, #F8FAFC 0%, #ffffff 100%); border-top: 1px solid var(--border-light);">',
    '        <div class="container">',
    '            <div style="text-align:center; margin-bottom:48px;">',
    '                <span style="display:inline-block; background:linear-gradient(135deg,#1A56DB,#0D9488); color:#fff; font-size:0.75rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; padding:5px 16px; border-radius:999px; margin-bottom:14px;">Complete Healthcare Technology Network</span>',
    '                <h2 style="font-size:clamp(1.5rem,4vw,2rem); font-weight:800; color:#1E293B; margin:0 0 12px 0; line-height:1.2;">Explore All Solutions in {{location}} &amp; Across Rajasthan</h2>',
    '                <p style="font-size:1rem; color:#64748B; max-width:640px; margin:0 auto;">Navigate Medical365\'s complete healthcare software ecosystem - find the exact solution for your specialty, location, and clinical workflow.</p>',
    '            </div>',
    '            {{related_links_menu}}',
    '        </div>',
    '    </section>'
].join('\r\n');

const result = t.substring(0, commentStart) + newSection + t.substring(sectionEnd);
fs.writeFileSync('seo_template.html', result, 'utf8');
console.log('Done. Replaced chars', commentStart, 'to', sectionEnd, '- new length:', result.length);
