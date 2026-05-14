const fs = require('fs');
const indexHtml = fs.readFileSync('index.html', 'utf8');
const sitemap = fs.readFileSync('landingpages_sitemap.html', 'utf8');

const footerMatch = indexHtml.match(/<footer\b[^>]*>[\s\S]*?<\/footer>/i);
if (footerMatch && !sitemap.includes('class="main-footer"')) {
    const updated = sitemap.replace(/<\/body>/i, footerMatch[0] + '\n</body>');
    fs.writeFileSync('landingpages_sitemap.html', updated);
    console.log('Fixed sitemap footer');
}
