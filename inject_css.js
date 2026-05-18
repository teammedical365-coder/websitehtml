const fs = require('fs');
const path = require('path');

const cssSnippet = `    <link rel="preload" href="redesign.css?v=1.0" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript>
        <link rel="stylesheet" href="global-styles.css?v=4.3">
        <link rel="stylesheet" href="redesign.css?v=1.0">
    </noscript>`;

// We will look for <noscript><link rel="stylesheet" href="global-styles.css?v=4.3"></noscript>
// and replace it with the new snippet.

const directoryPath = './';

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    let updatedCount = 0;
    files.forEach(function (file) {
        if (path.extname(file) === '.html') {
            let content = fs.readFileSync(file, 'utf8');
            if (!content.includes('redesign.css')) {
                // Try replacing the old noscript block
                const oldNoScript = `<noscript><link rel="stylesheet" href="global-styles.css?v=4.3"></noscript>`;
                if (content.includes(oldNoScript)) {
                    content = content.replace(oldNoScript, cssSnippet);
                    fs.writeFileSync(file, content, 'utf8');
                    updatedCount++;
                } else {
                    // Try to insert after global-styles.css
                    const globalStyleLink = `<link rel="stylesheet" href="global-styles.css?v=4.3">`;
                    if (content.includes(globalStyleLink)) {
                        content = content.replace(globalStyleLink, globalStyleLink + `\n    <link rel="stylesheet" href="redesign.css?v=1.0">`);
                        fs.writeFileSync(file, content, 'utf8');
                        updatedCount++;
                    }
                }
            }
        }
    });
    console.log(`Updated ${updatedCount} files to include redesign.css`);
});
