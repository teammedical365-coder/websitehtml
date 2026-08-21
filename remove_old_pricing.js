const fs = require('fs');

let content = fs.readFileSync('seo_template.html', 'utf8');

const startIndex = content.indexOf('<section class="pricing-section" id="pricing">');
const endIndex = content.indexOf('<footer id="mega-footer" role="contentinfo">');

if (startIndex !== -1 && endIndex !== -1) {
    const sectionToRemove = content.substring(startIndex, endIndex);
    content = content.replace(sectionToRemove, '');
    fs.writeFileSync('seo_template.html', content);
    console.log('Successfully removed old pricing section from seo_template.html');
} else {
    console.log('Could not find the section boundaries in seo_template.html');
}
