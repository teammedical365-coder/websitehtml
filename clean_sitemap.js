const fs = require('fs');
const path = require('path');

const publicHtml = 'c:\\Users\\USER\\Downloads\\public_html';
const sitemapPath = path.join(publicHtml, 'sitemap.xml');
const seoPagesJsonPath = path.join(publicHtml, 'seo_pages.json');

const seoPages = JSON.parse(fs.readFileSync(seoPagesJsonPath, 'utf8'));
const seoSlugs = seoPages.map(p => p.url_slug.replace(/^\//, '').replace(/\/$/, ''));

// Add other templates to slugs
seoSlugs.push('templates');
seoSlugs.push('templates.html');
seoSlugs.push('free-webpage');
seoSlugs.push('free-webpage.html');
seoSlugs.push('seo_template');
seoSlugs.push('seo_template.html');

let sitemap = fs.readFileSync(sitemapPath, 'utf8');

// Regex to match <url>...</url> blocks
const urlRegex = /<url>[\s\S]*?<\/url>/g;
const urls = sitemap.match(urlRegex);

if (!urls) {
    console.log("No URLs found in sitemap.");
    process.exit(0);
}

console.log(`Original sitemap had ${urls.length} URLs.`);

const filteredUrls = urls.filter(urlBlock => {
    // Extract loc
    const locMatch = urlBlock.match(/<loc>https:\/\/medical365\.in\/(.*?)<\/loc>/);
    if (!locMatch) return true;
    
    const slug = locMatch[1].replace(/\/$/, '');
    
    // Check if it should be noindexed
    const isSeoPage = seoSlugs.some(s => {
        // Handle city-based slugs that might have variations
        if (s.startsWith('solutions/')) {
            const pattern = s.replace('solutions/', '');
            return slug === pattern;
        }
        return slug === s;
    });

    return !isSeoPage;
});

console.log(`Filtered sitemap has ${filteredUrls.length} URLs.`);

const header = sitemap.split('<url>')[0];
const footer = '\n</urlset>';
const newSitemap = header.trim() + '\n  ' + filteredUrls.join('\n  ') + footer;

fs.writeFileSync(sitemapPath, newSitemap, 'utf8');
console.log("Sitemap updated successfully.");
