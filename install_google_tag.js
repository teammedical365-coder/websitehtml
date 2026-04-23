const fs = require('fs');
const path = require('path');

const googleTag = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-RMGG2LX0RF"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-RMGG2LX0RF');
</script>`;

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const rootDir = __dirname;
let count = 0;

walkDir(rootDir, (filePath) => {
    if (path.extname(filePath) === '.html') {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Skip if tag already present
        if (content.includes('G-RMGG2LX0RF')) {
            return;
        }

        // Insert after <head>
        // Regex to match <head> case-insensitive and handle attributes just in case
        const headRegex = /<head[^>]*>/i;
        const match = content.match(headRegex);
        
        if (match) {
            const headTag = match[0];
            const newContent = content.replace(headTag, headTag + '\n' + googleTag);
            fs.writeFileSync(filePath, newContent, 'utf8');
            count++;
        }
    }
});

console.log(`Successfully added Google Tag to ${count} files.`);
