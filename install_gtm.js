const fs = require('fs');
const path = require('path');

const gtmScript = `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W5H82GQ7');</script>
<!-- End Google Tag Manager -->`;

const gtmNoscript = `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W5H82GQ7"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`;

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
        
        // Skip if GTM already present
        if (content.includes('GTM-W5H82GQ7')) {
            return;
        }

        let updated = false;

        // 1. Insert Script in <head>
        const headRegex = /<head[^>]*>/i;
        const headMatch = content.match(headRegex);
        if (headMatch) {
            const headTag = headMatch[0];
            content = content.replace(headTag, headTag + '\n' + gtmScript);
            updated = true;
        }

        // 2. Insert Noscript in <body>
        const bodyRegex = /<body[^>]*>/i;
        const bodyMatch = content.match(bodyRegex);
        if (bodyMatch) {
            const bodyTag = bodyMatch[0];
            content = content.replace(bodyTag, bodyTag + '\n' + gtmNoscript);
            updated = true;
        }

        if (updated) {
            fs.writeFileSync(filePath, content, 'utf8');
            count++;
        }
    }
});

console.log(`Successfully installed GTM on ${count} files.`);
