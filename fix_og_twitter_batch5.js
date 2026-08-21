const fs = require('fs');
const path = require('path');

const dirPath = __dirname;
const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.html'));

let processedCount = 0;
let modifiedCount = 0;

files.forEach(file => {
    let filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Get true <title>
    let titleMatch = content.match(/<title>([^<]+)<\/title>/i);
    let trueTitle = titleMatch ? titleMatch[1] : null;

    // Get true <meta name="description">
    let descMatch = content.match(/<meta name="description" content="([^"]+)"/i);
    let trueDesc = descMatch ? descMatch[1] : null;

    if (trueDesc) {
        // Fix og:description
        if (content.match(/<meta property="og:description" content="Discover Medical365's[^"]*"/i)) {
            content = content.replace(/<meta property="og:description" content="Discover Medical365's[^"]*"/gi, 
                '<meta property="og:description" content="' + trueDesc + '"');
            modified = true;
        }

        // Fix twitter:description
        if (content.match(/<meta name="twitter:description" content="Discover Medical365's[^"]*"/i)) {
            content = content.replace(/<meta name="twitter:description" content="Discover Medical365's[^"]*"/gi, 
                '<meta name="twitter:description" content="' + trueDesc + '"');
            modified = true;
        }
    }

    if (trueTitle) {
        // Fix og:title
        let ogTitleMatch = content.match(/<meta property="og:title" content="([^"]+)"/i);
        if (ogTitleMatch) {
            let ogTitle = ogTitleMatch[1];
            if (ogTitle !== trueTitle) {
                content = content.replace(/<meta property="og:title" content="[^"]+"/gi, 
                    '<meta property="og:title" content="' + trueTitle + '"');
                modified = true;
            }
        }

        // Fix twitter:title
        let twitterTitleMatch = content.match(/<meta name="twitter:title" content="([^"]+)"/i);
        if (twitterTitleMatch) {
            let twitterTitle = twitterTitleMatch[1];
            if (twitterTitle !== trueTitle) {
                content = content.replace(/<meta name="twitter:title" content="[^"]+"/gi, 
                    '<meta name="twitter:title" content="' + trueTitle + '"');
                modified = true;
            }
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        modifiedCount++;
    }
    processedCount++;
});

console.log(`Processed ${processedCount} files. Modified ${modifiedCount} files for OG/Twitter tags.`);
