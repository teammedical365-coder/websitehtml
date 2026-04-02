const fs = require('fs');

const indexFile = 'index.html';
let content = fs.readFileSync(indexFile, 'utf8');

// replace style
content = content.replace(/<style>[\s\S]*?<\/style>/i, '<link rel="stylesheet" href="global-styles.css">');

// replace script
content = content.replace(/<script>\s*document\.addEventListener\('DOMContentLoaded', function \(\) \{[\s\S]*?<\/script>/i, '<script src="global-scripts.js"></script>');

fs.writeFileSync(indexFile, content);
console.log('Fixed index.html to use global assets');
