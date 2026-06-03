const fs = require('fs');
const path = require('path');

const dirPath = __dirname;
const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.html'));

files.forEach(file => {
    let filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Extract exact meta description and title
    let descMatch = content.match(/<meta name="description" content="([^"]+)"/i);
    let correctDesc = descMatch ? descMatch[1] : null;

    let titleMatch = content.match(/<title>([^<]+)<\/title>/i);
    let correctTitle = titleMatch ? titleMatch[1] : null;

    if (correctDesc) {
        // Fix generic twitter:description
        if (content.match(/<meta name="twitter:description" content="Discover Medical365's[^"]*"/i)) {
            content = content.replace(/<meta name="twitter:description" content="Discover Medical365's[^"]*"/gi, 
                '<meta name="twitter:description" content="' + correctDesc + '"');
            modified = true;
        }
    }

    if (correctTitle) {
        // Fix mismatched twitter:title (where it's just "Page Name | Medical365" but title has the full SEO string)
        let twitterTitleMatch = content.match(/<meta name="twitter:title" content="([^"]+)"/i);
        if (twitterTitleMatch) {
            let twitterTitle = twitterTitleMatch[1];
            if (twitterTitle.includes('| Medical365') && twitterTitle !== correctTitle) {
                content = content.replace(/<meta name="twitter:title" content="[^"]+"/gi, 
                    '<meta name="twitter:title" content="' + correctTitle + '"');
                modified = true;
            }
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log("Fixed Twitter tags in: " + file);
    }
});
