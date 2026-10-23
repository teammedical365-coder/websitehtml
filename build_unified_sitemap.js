const fs = require('fs');
const path = require('path');

const dir = __dirname;
const mainXmlPath = path.join(dir, 'sitemap-main.xml');
const locXmlPath = path.join(dir, 'sitemap-locations.xml');
const outXmlPath = path.join(dir, 'sitemap.xml');

function parseSitemapUrls(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf8');
  const urlBlocks = content.match(/<url>[\s\S]*?<\/url>/g) || [];
  
  return urlBlocks.map(block => {
    const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
    const lastmodMatch = block.match(/<lastmod>([^<]+)<\/lastmod>/);
    const changefreqMatch = block.match(/<changefreq>([^<]+)<\/changefreq>/);
    const priorityMatch = block.match(/<priority>([^<]+)<\/priority>/);

    return {
      loc: locMatch ? locMatch[1].trim() : '',
      lastmod: lastmodMatch ? lastmodMatch[1].trim() : '2026-10-23',
      changefreq: changefreqMatch ? changefreqMatch[1].trim() : 'weekly',
      priority: priorityMatch ? priorityMatch[1].trim() : '0.70'
    };
  }).filter(item => item.loc.length > 0);
}

const mainUrls = parseSitemapUrls(mainXmlPath);
const locUrls = parseSitemapUrls(locXmlPath);

console.log(`Parsed ${mainUrls.length} URLs from sitemap-main.xml`);
console.log(`Parsed ${locUrls.length} URLs from sitemap-locations.xml`);

const urlMap = new Map();

// Insert mainUrls (higher priority)
for (const item of mainUrls) {
  urlMap.set(item.loc, item);
}

// Insert locUrls (deduplicate)
for (const item of locUrls) {
  if (!urlMap.has(item.loc)) {
    urlMap.set(item.loc, item);
  } else {
    const existing = urlMap.get(item.loc);
    if (parseFloat(item.priority) > parseFloat(existing.priority)) {
      urlMap.set(item.loc, item);
    }
  }
}

console.log(`Total unique deduplicated URLs: ${urlMap.size}`);

// Sort: Homepage first, then by priority descending, then alphabetical
const sorted = Array.from(urlMap.values()).sort((a, b) => {
  if (a.loc === 'https://www.medical365.in/' || a.loc === 'https://www.medical365.in') return -1;
  if (b.loc === 'https://www.medical365.in/' || b.loc === 'https://www.medical365.in') return 1;
  const pDiff = parseFloat(b.priority) - parseFloat(a.priority);
  if (Math.abs(pDiff) > 0.001) return pDiff;
  return a.loc.localeCompare(b.loc);
});

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
for (const item of sorted) {
  xml += `  <url>\n    <loc>${item.loc}</loc>\n    <lastmod>${item.lastmod}</lastmod>\n    <changefreq>${item.changefreq}</changefreq>\n    <priority>${item.priority}</priority>\n  </url>\n`;
}
xml += `</urlset>\n`;

fs.writeFileSync(outXmlPath, xml, 'utf8');
console.log(`Successfully generated unified sitemap.xml with ${sorted.length} unique URLs!`);
