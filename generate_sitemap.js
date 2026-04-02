const fs = require('fs');
const path = require('path');

const dirPath = __dirname;
const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html') && f !== 'seo_template.html');
const baseUrl = "https://medical365.in";

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

files.forEach(file => {
    let priority = "0.6";
    let changefreq = "monthly";
    
    if (file === "index.html") {
        priority = "1.0";
        changefreq = "daily";
    } else if (["outpatient.html", "hospitals.html", "clinics.html", "emr.html", "revenue-cycle-management.html"].includes(file) || file.startsWith('hospital-software-')) {
        priority = "0.9";
        changefreq = "weekly";
    }
    
    xml += `  <url>
    <loc>${baseUrl}/${file}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>\n`;
});

xml += `</urlset>`;

fs.writeFileSync('sitemap.xml', xml);
console.log(`Successfully generated sitemap.xml for ${files.length} HTML files.`);
