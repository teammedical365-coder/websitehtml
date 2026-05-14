const fs = require('fs');
const path = require('path');

const dirPath = __dirname;
const htmlFiles = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));

const baseUrl = "https://medical365.in";
const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

const getPriority = (filePath) => {
    if (filePath === 'index.html' || filePath === '') return "1.00";
    if (['clinics.html', 'hospitals.html', 'about.html', 'contact.html', 'emr.html', 'blogs.html', 'privacy-policy.html', 'terms-of-service.html', 'book-demo.html'].includes(filePath)) return "0.80";
    if (filePath.length > 40) return "0.64"; // Long SEO names
    return "0.80"; 
};

// Exclusions for the sitemap
const exclusions = [
    'seo_template.html', 
    'template.html', 
    'templates.html', 
    'googleffaff865656e63b1.html',
    'sitemap.html',
    'landingpages_sitemap.html',
    '404.html',
    'pwa-info.html',
    'thank-you.html'
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

// Add root
xml += `    <url>
        <loc>${baseUrl}/</loc>
        <lastmod>${currentDate}</lastmod>
        <priority>1.00</priority>
    </url>\n`;

// Set for deduplication
const addedPaths = new Set(['index.html']);

htmlFiles.forEach(file => {
    if (exclusions.includes(file)) return;
    if (addedPaths.has(file)) return;
    addedPaths.add(file);
    
    // Format loc: strip .html extension
    const cleanName = file.replace('.html', '');
    const priority = getPriority(file);

    xml += `    <url>
        <loc>${baseUrl}/${cleanName}</loc>
        <lastmod>${currentDate}</lastmod>
        <priority>${priority}</priority>
    </url>\n`;
});

// Add book-demo variations
const bookDemoLocations = [
    'Malviya%20Nagar,%20Jaipur', 'Jagatpura,%20Jaipur', 'Tonk%20Road,%20Jaipur', 'Jhotwara,%20Jaipur'
];

bookDemoLocations.forEach(loc => {
    xml += `    <url>
        <loc>${baseUrl}/book-demo?location=${loc}</loc>
        <lastmod>${currentDate}</lastmod>
        <priority>0.51</priority>
    </url>\n`;
});

xml += `</urlset>`;

fs.writeFileSync('sitemap.xml', xml);
console.log(`Generated sitemap.xml with ${addedPaths.size + bookDemoLocations.length} URLs.`);
