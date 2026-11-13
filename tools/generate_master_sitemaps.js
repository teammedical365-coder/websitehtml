const fs = require('fs');
const path = require('path');

const dir = __dirname;
const allHtmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
const baseUrl = 'https://www.medical365.in';
const today = new Date().toISOString().split('T')[0];

// 1. Classify Files
const fragmentFiles = new Set([
  'googleffaff865656e63b1.html',
  'pricing_content.html',
  'pricing_section.html',
  'seo_content.html',
  'template.html',
  'templates.html',
  'seo_template.html',
  'free-webpage.html',
  '404.html',
  'pwa-info.html'
]);

// Read canonicals and identify self-canonical pages
const selfCanonicalMap = new Map(); // slug -> file
const alternateFiles = new Set();

allHtmlFiles.forEach(f => {
  if (fragmentFiles.has(f)) return;
  
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  if (!content.includes('<!DOCTYPE') && !content.includes('<html')) {
    fragmentFiles.add(f);
    return;
  }
  
  const match = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i) 
             || content.match(/<link\s+href=["']([^"']+)["']\s+rel=["']canonical["']/i);
  
  const cleanSlug = f.replace('.html', '');
  const expectedCanonical = baseUrl + '/' + (cleanSlug === 'index' ? '' : cleanSlug);
  
  if (!match) {
    selfCanonicalMap.set(cleanSlug, f);
    return;
  }
  
  const canonicalUrl = match[1].trim();
  if (canonicalUrl.replace(/\/$/, '') === expectedCanonical.replace(/\/$/, '')) {
    selfCanonicalMap.set(cleanSlug, f);
  } else {
    alternateFiles.add(f);
  }
});

console.log(`Self-canonical indexable pages: ${selfCanonicalMap.size}`);
console.log(`Alternate / non-self canonical files excluded from sitemap: ${alternateFiles.size}`);
console.log(`Fragment / template files excluded: ${fragmentFiles.size}`);

// City groupings for categorizing sitemaps & creating locations directory
const cityClusters = {
  'Metros & Tier 1 Hubs': [
    { name: 'Delhi NCR', slug: 'delhi' },
    { name: 'Mumbai', slug: 'mumbai' },
    { name: 'Bengaluru', slug: 'bengaluru' },
    { name: 'Hyderabad', slug: 'hyderabad' },
    { name: 'Chennai', slug: 'chennai' },
    { name: 'Kolkata', slug: 'kolkata' },
    { name: 'Pune', slug: 'pune' },
    { name: 'Ahmedabad', slug: 'ahmedabad' }
  ],
  'Rajasthan Key Cities': [
    { name: 'Jaipur', slug: 'jaipur' },
    { name: 'Jodhpur', slug: 'jodhpur' },
    { name: 'Udaipur', slug: 'udaipur' },
    { name: 'Kota', slug: 'kota' },
    { name: 'Ajmer', slug: 'ajmer' },
    { name: 'Bikaner', slug: 'bikaner' },
    { name: 'Alwar', slug: 'alwar' },
    { name: 'Sikar', slug: 'sikar' },
    { name: 'Bhilwara', slug: 'bhilwara' },
    { name: 'Sri Ganganagar', slug: 'sri-ganganagar' },
    { name: 'Pali', slug: 'pali' },
    { name: 'Bharatpur', slug: 'bharatpur' }
  ],
  'Jaipur Localities': [
    { name: 'Mansarovar', slug: 'mansarovar' },
    { name: 'Vaishali Nagar', slug: 'vaishali-nagar' },
    { name: 'Malviya Nagar', slug: 'malviya-nagar' },
    { name: 'C-Scheme', slug: 'c-scheme' },
    { name: 'Tonk Road', slug: 'tonk-road' },
    { name: 'Jagatpura', slug: 'jagatpura' },
    { name: 'Raja Park', slug: 'raja-park' },
    { name: 'Jhotwara', slug: 'jhotwara' },
    { name: 'Vidyadhar Nagar', slug: 'vidyadhar-nagar' },
    { name: 'Bapu Nagar', slug: 'bapu-nagar' }
  ],
  'North & Central India': [
    { name: 'Lucknow', slug: 'lucknow' },
    { name: 'Kanpur', slug: 'kanpur' },
    { name: 'Agra', slug: 'agra' },
    { name: 'Bhopal', slug: 'bhopal' },
    { name: 'Indore', slug: 'indore' },
    { name: 'Chandigarh', slug: 'chandigarh' },
    { name: 'Dehradun', slug: 'dehradun' },
    { name: 'Ludhiana', slug: 'ludhiana' }
  ],
  'East & South India': [
    { name: 'Patna', slug: 'patna' },
    { name: 'Ranchi', slug: 'ranchi' },
    { name: 'Bhubaneswar', slug: 'bhubaneswar' },
    { name: 'Guwahati', slug: 'guwahati' },
    { name: 'Kochi', slug: 'kochi' },
    { name: 'Coimbatore', slug: 'coimbatore' },
    { name: 'Visakhapatnam', slug: 'visakhapatnam' },
    { name: 'Surat', slug: 'surat' },
    { name: 'Vadodara', slug: 'vadodara' },
    { name: 'Nagpur', slug: 'nagpur' },
    { name: 'Nashik', slug: 'nashik' },
    { name: 'Rajkot', slug: 'rajkot' }
  ]
};

// Distinguish Core pages vs Location pages
const corePages = [];
const locationPages = [];

selfCanonicalMap.forEach((fileName, slug) => {
  if (slug === 'index') {
    corePages.push({ loc: `${baseUrl}/`, priority: '1.00', changefreq: 'weekly' });
    return;
  }
  
  // Check if it's a location page
  const isLocation = Object.values(cityClusters).some(cluster => 
    cluster.some(c => slug.endsWith('-' + c.slug) || slug.endsWith('-' + c.slug + '-jaipur'))
  );
  
  if (isLocation) {
    locationPages.push({ loc: `${baseUrl}/${slug}`, priority: '0.70', changefreq: 'monthly' });
  } else {
    const highPriority = ['about', 'clinics', 'hospitals', 'emr', 'pricing', 'book-demo', 'contact', 'blogs', 'locations', 'features'];
    const priority = highPriority.includes(slug) ? '0.90' : '0.80';
    corePages.push({ loc: `${baseUrl}/${slug}`, priority, changefreq: 'weekly' });
  }
});

console.log(`Classified ${corePages.length} Core Pages and ${locationPages.length} Location Pages.`);

// 2. Generate sitemap-main.xml
let mainXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
corePages.forEach(p => {
  mainXml += `  <url>
    <loc>${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>\n`;
});
mainXml += `</urlset>`;
fs.writeFileSync(path.join(dir, 'sitemap-main.xml'), mainXml, 'utf8');

// 3. Generate sitemap-locations.xml
let locXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
locationPages.forEach(p => {
  locXml += `  <url>
    <loc>${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>\n`;
});
locXml += `</urlset>`;
fs.writeFileSync(path.join(dir, 'sitemap-locations.xml'), locXml, 'utf8');

// 4. Generate master sitemap.xml (Sitemap Index)
let indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap-main.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-locations.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>
`;
fs.writeFileSync(path.join(dir, 'sitemap.xml'), indexXml, 'utf8');

console.log('Successfully generated sitemap-main.xml, sitemap-locations.xml, and sitemap.xml index.');
