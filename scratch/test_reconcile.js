const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');

// 1. Get all sitemap URLs
const sitemapContent = fs.readFileSync(path.join(repoRoot, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());

// 2. Get all HTML files
function getHtmlFiles(dir) {
    let results = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        if (entry.name === '.git' || entry.name === 'node_modules' || entry.name === 'scratch' || entry.name === '.system_generated') continue;
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results = results.concat(getHtmlFiles(fullPath));
        } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
            results.push(fullPath);
        }
    }
    return results;
}

const htmlFiles = getHtmlFiles(repoRoot);
const htmlUrlMap = new Map();
htmlFiles.forEach(f => {
    const rel = path.relative(repoRoot, f).replace(/\\/g, '/');
    let url = 'https://www.medical365.in/' + rel.replace('.html', '');
    if (rel === 'index.html') url = 'https://www.medical365.in/';
    else if (rel.endsWith('/index.html')) url = 'https://www.medical365.in/' + rel.replace('/index.html', '/');
    htmlUrlMap.set(url, rel);
    htmlUrlMap.set(url.replace('https://www.medical365.in', 'https://medical365.in'), rel);
});

// Find sitemap URLs without HTML match
const unmatchedSitemapUrls = [];
sitemapUrls.forEach(smUrl => {
    const norm = smUrl.replace(/\/$/, '');
    let matched = false;
    for (const [k, v] of htmlUrlMap.entries()) {
        if (k.replace(/\/$/, '') === norm) {
            matched = true;
            break;
        }
    }
    if (!matched) unmatchedSitemapUrls.push(smUrl);
});

// Find HTML files not in sitemap
const unlistedHtmlFiles = [];
htmlFiles.forEach(f => {
    const rel = path.relative(repoRoot, f).replace(/\\/g, '/');
    let url = 'https://www.medical365.in/' + rel.replace('.html', '');
    if (rel === 'index.html') url = 'https://www.medical365.in/';
    else if (rel.endsWith('/index.html')) url = 'https://www.medical365.in/' + rel.replace('/index.html', '/');
    
    let inSitemap = false;
    for (const smUrl of sitemapUrls) {
        if (smUrl.replace(/\/$/, '') === url.replace(/\/$/, '')) {
            inSitemap = true;
            break;
        }
    }
    if (!inSitemap) unlistedHtmlFiles.push({ file: rel, url });
});

console.log('Unmatched Sitemap URLs (' + unmatchedSitemapUrls.length + '):', unmatchedSitemapUrls);
console.log('Unlisted HTML Files (' + unlistedHtmlFiles.length + '):', unlistedHtmlFiles);
