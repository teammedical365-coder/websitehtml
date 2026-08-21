const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname);
let count = 0;

files.forEach(file => {
    if (file.endsWith('.html') && file !== 'index.html') {
        let content = fs.readFileSync(path.join(__dirname, file), 'utf8');
        let initialContent = content;

        // Ensure global-styles.css is linked
        if (!content.includes('global-styles.css')) {
            content = content.replace(/<\/head>/i, '    <link rel="stylesheet" href="global-styles.css">\n</head>');
        }

        if (content !== initialContent) {
            fs.writeFileSync(path.join(__dirname, file), content);
            count++;
        }
    }
});

console.log(`Successfully injected global-styles.css into ${count} HTML files.`);
