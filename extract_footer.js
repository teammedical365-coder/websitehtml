const fs = require('fs');
const content = fs.readFileSync('seo_template.html', 'utf-8');
const footerMatch = content.match(/<footer id="mega-footer"[\s\S]*?<\/footer>/);
if (footerMatch) {
  fs.writeFileSync('components/footer.html', footerMatch[0]);
  console.log('Footer extracted to components/footer.html');
} else {
  console.error('Footer not found in seo_template.html');
}
