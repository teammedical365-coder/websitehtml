const fs = require('fs');
const path = require('path');

const standardCssSnippet = `    <!-- Standard Styles -->
    <link rel="stylesheet" href="global-styles.css?v=4.3">
    <link rel="stylesheet" href="redesign.css?v=1.0">`;

const directoryPath = './';

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    let updatedCount = 0;
    files.forEach(function (file) {
        if (path.extname(file) === '.html') {
            let content = fs.readFileSync(file, 'utf8');
            
            // Regex to find the preload block that was injected previously
            const preloadRegex = /<link rel="preload" href="global-styles\.css\?v=4\.3" as="style" onload="this\.onload=null;this\.rel='stylesheet'">\s*<link rel="preload" href="redesign\.css\?v=1\.0" as="style" onload="this\.onload=null;this\.rel='stylesheet'">\s*<noscript>\s*<link rel="stylesheet" href="global-styles\.css\?v=4\.3">\s*<link rel="stylesheet" href="redesign\.css\?v=1\.0">\s*<\/noscript>/g;
            
            // Also regex for the original single preload
            const originalPreloadRegex = /<link rel="preload" href="global-styles\.css\?v=4\.3" as="style" onload="this\.onload=null;this\.rel='stylesheet'">\s*<noscript><link rel="stylesheet" href="global-styles\.css\?v=4\.3"><\/noscript>/g;

            let changed = false;
            
            if (preloadRegex.test(content)) {
                content = content.replace(preloadRegex, standardCssSnippet);
                changed = true;
            }
            if (originalPreloadRegex.test(content)) {
                content = content.replace(originalPreloadRegex, standardCssSnippet);
                changed = true;
            }
            
            if (changed) {
                fs.writeFileSync(file, content, 'utf8');
                updatedCount++;
            }
        }
    });
    console.log(`Updated ${updatedCount} files to use standard CSS links`);
});
