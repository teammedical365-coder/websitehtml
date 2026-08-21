const fs = require('fs');
const path = require('path');

const publicHtml = 'c:\\Users\\USER\\Downloads\\public_html';
const seoPagesJsonPath = path.join(publicHtml, 'seo_pages.json');

const seoPages = JSON.parse(fs.readFileSync(seoPagesJsonPath, 'utf8'));

let count = 0;
seoPages.forEach(entry => {
    const slug = entry.url_slug;
    const filename = slug.replace('/solutions/', '').replace(/^\//, '') + '.html';
    const filepath = path.join(publicHtml, filename);

    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        
        // Remove the noindex tag
        if (content.includes('<meta name="robots" content="noindex, nofollow">')) {
            const newContent = content.replace(/\n\s*<meta name="robots" content="noindex, nofollow">/, '');
            if (newContent !== content) {
                fs.writeFileSync(filepath, newContent, 'utf8');
                count++;
            }
        }
    }
});

console.log(`Re-indexed ${count} files (removed noindex tag).`);
