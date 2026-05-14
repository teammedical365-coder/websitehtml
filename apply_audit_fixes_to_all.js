const fs = require('fs');
const path = require('path');

const hotfixStyles = `
    /* Audit Hotfixes — Stabilising Mobile & Mega Menu */
    .mega-menu { background-color: #ffffff !important; }
    .header-container { overflow: hidden !important; }
    .br-desktop { display: block; }
    @media (max-width: 768px) { .br-desktop { display: inline; } }
`;

function applyFixes(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // 1. Inject internal style block if not present
    if (!content.includes('.br-desktop')) {
        if (content.includes('</head>')) {
            content = content.replace('</head>', `    <style>${hotfixStyles}    </style>\n</head>`);
            changed = true;
        }
    }

    // 2. Fix Hero Title <br> tags
    // Support both single line and multiline hero titles
    if (content.includes('hero-title')) {
        const h1Regex = /<h1[^>]*class="[^"]*hero-title[^"]*"[^>]*>([\s\S]*?)<\/h1>/gi;
        content = content.replace(h1Regex, (match, innerHtml) => {
            if (innerHtml.includes('<br>')) {
                changed = true;
                return match.replace(/<br>/gi, '<span class="br-desktop"></span>');
            }
            return match;
        });
    }

    if (changed) {
        fs.writeFileSync(filePath, content);
        return true;
    }
    return false;
}

const rootDir = __dirname;
const files = fs.readdirSync(rootDir);
let count = 0;

files.forEach(file => {
    const fullPath = path.join(rootDir, file);
    const stats = fs.statSync(fullPath);
    
    if (stats.isFile() && file.endsWith('.html')) {
        // Skip nextjs related files if any are in root, and skip the nextjs folder (handled by readdir loop)
        if (applyFixes(fullPath)) {
            count++;
        }
    }
});

console.log(`Successfully patched ${count} HTML files with responsive hotfixes and mega-menu stability rules.`);
