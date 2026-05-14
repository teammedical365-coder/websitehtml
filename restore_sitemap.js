const fs = require('fs');
const path = require('path');

const publicHtml = 'c:\\Users\\USER\\Downloads\\public_html';
const sitemapPath = path.join(publicHtml, 'sitemap.xml');
const seoPagesJsonPath = path.join(publicHtml, 'seo_pages.json');

const seoPages = JSON.parse(fs.readFileSync(seoPagesJsonPath, 'utf8'));

let sitemap = fs.readFileSync(sitemapPath, 'utf8');

const lastmod = new Date().toISOString().split('T')[0] + 'T08:06:10+00:00';

let newUrls = '';
seoPages.forEach(entry => {
    const slug = entry.url_slug.replace(/^\//, '');
    newUrls += `
  <url>
    <loc>https://medical365.in/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>0.64</priority>
  </url>`;
});

// Remove closing tag
let updatedSitemap = sitemap.replace('</urlset>', '') + newUrls + '\n</urlset>';

fs.writeFileSync(sitemapPath, updatedSitemap, 'utf8');
console.log(`Re-added ${seoPages.length} SEO pages to sitemap.xml`);
