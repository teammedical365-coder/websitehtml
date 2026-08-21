const fs = require('fs');

const DATA_FILE = 'seo_pages.json';
const INDEX_FILE = 'index.html';

const pages = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
let indexContent = fs.readFileSync(INDEX_FILE, 'utf8');

// The SEO templates generate slugs like "healthcare-crm-udaipur"
// The legacy footer had "healthcare-crm-software-udaipur"

// Let's create a lookup by keywords
const findBestMatch = (oldUrl) => {
    // strip .html
    const base = oldUrl.replace('.html', '');
    const tokens = base.split('-');
    
    // Attempt to match at least 2 key tokens (usually feature + location)
    // "healthcare-crm-software-udaipur" -> ["healthcare", "crm", "software", "udaipur"]
    // We want to find a page in 'pages' that contains most of these.
    
    let bestMatch = null;
    let maxOverlap = 0;
    
    pages.forEach(p => {
        const slug = p.url_slug.replace('/solutions/', '');
        const slugTokens = slug.split('-');
        const overlap = tokens.filter(t => slugTokens.includes(t)).length;
        
        if (overlap > maxOverlap) {
            maxOverlap = overlap;
            bestMatch = slug + '.html';
        }
    });

    // Only return if we have a reasonably high confidence (at least location + core feature part)
    return maxOverlap >= 2 ? bestMatch : null;
};

// Regex to find all hrefs in the footer cats section
const footerRegex = /<div class="mf-all-cats">([\s\S]*?)<\/div><!-- \/mf-all-cats -->/;
const match = indexContent.match(footerRegex);

if (match) {
    let footerContent = match[1];
    
    // Find all href="xxxx"
    const hrefRegex = /href="([^"]+\.html)"/g;
    let m;
    let replaces = 0;
    
    while ((m = hrefRegex.exec(footerContent)) !== null) {
        const oldUrl = m[1];
        const newUrl = findBestMatch(oldUrl);
        
        if (newUrl && newUrl !== oldUrl) {
            console.log(`Replacing ${oldUrl} with ${newUrl}`);
            // Global replacement in this sub-string
            footerContent = footerContent.replace(new URLSearchParams(`a=${oldUrl}`).toString().slice(2), newUrl);
            replaces++;
        }
    }
    
    // Actually, simple string replace might be safer if we only replace inside the specific block
    indexContent = indexContent.replace(match[1], footerContent);
    fs.writeFileSync(INDEX_FILE, indexContent);
    console.log(`Fixed ${replaces} footer links.`);
}
