const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const sitemapPath = path.join(repoRoot, 'sitemap.xml');
let content = fs.readFileSync(sitemapPath, 'utf8');

// 1. Remove the 4 erroneous parameterized book-demo URLs
const erroneousUrls = [
    'https://www.medical365.in/book-demo?location=Malviya%20Nagar,%20Jaipur',
    'https://www.medical365.in/book-demo?location=Jagatpura,%20Jaipur',
    'https://www.medical365.in/book-demo?location=Tonk%20Road,%20Jaipur',
    'https://www.medical365.in/book-demo?location=Jhotwara,%20Jaipur'
];

erroneousUrls.forEach(url => {
    const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\s*<url>\\s*<loc>${escaped}</loc>[\\s\\S]*?</url>`, 'g');
    content = content.replace(regex, '');
});

// 2. URLs to add
const newUrls = [
    { loc: 'https://www.medical365.in/hims-software', priority: '0.90' },
    { loc: 'https://www.medical365.in/nabh-compliant-hospital-software', priority: '0.90' },
    { loc: 'https://www.medical365.in/blogs/abha-integration-guide', priority: '0.80' },
    { loc: 'https://www.medical365.in/blogs/medical365-vs-practo', priority: '0.80' },
    { loc: 'https://www.medical365.in/blogs/nabh-compliance-guide', priority: '0.80' },
    { loc: 'https://www.medical365.in/blogs/dpdp-act-2023-hospitals', priority: '0.70' },
    { loc: 'https://www.medical365.in/blogs/opd-queue-management', priority: '0.70' },
    { loc: 'https://www.medical365.in/blogs/hospital-billing-software-india', priority: '0.70' },
    { loc: 'https://www.medical365.in/blogs/cloud-vs-onpremise-hms', priority: '0.70' },
    { loc: 'https://www.medical365.in/blogs/hospital-pharmacy-software', priority: '0.70' },
    { loc: 'https://www.medical365.in/blogs/lims-vs-manual-lab', priority: '0.70' },
    { loc: 'https://www.medical365.in/blogs/telemedicine-india-guide', priority: '0.70' }
];

let entriesToAdd = '';
newUrls.forEach(u => {
    // Only add if not already present
    if (!content.includes(`<loc>${u.loc}</loc>`)) {
        entriesToAdd += `    <url>
        <loc>${u.loc}</loc>
        <lastmod>2026-09-02</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${u.priority}</priority>
    </url>\n`;
    }
});

// Inject right before </urlset>
content = content.replace('</urlset>', entriesToAdd + '</urlset>');

fs.writeFileSync(sitemapPath, content, 'utf8');
console.log('Successfully updated sitemap.xml with additions and removals!');
