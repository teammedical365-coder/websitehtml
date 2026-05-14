const fs = require('fs');
const path = require('path');

const SKIP_FILES = new Set(['blogs.html', 'superadmin.html', 'index.html']); // index is already clean
const JS_SCRIPT_TAG = '<script src="global-scripts.js?v=3.0"></script>';

// Regex to find the large inline script block that duplicates global-scripts.js
// It usually starts with "document.addEventListener('DOMContentLoaded', function () {" 
// and contains specific comments like "/* ── sticky header"
const REDUNDANT_JS_REGEX = /<script>[\s\S]*?document\.addEventListener\('DOMContentLoaded'[\s\S]*?\/\* ── sticky header[\s\S]*?<\/script>/g;

async function cleanupScripts() {
    const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
    let cleanedCount = 0;
    let alreadyCleanCount = 0;

    for (const file of files) {
        if (SKIP_FILES.has(file)) continue;

        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;

        // 1. Remove redundancy
        if (REDUNDANT_JS_REGEX.test(content)) {
            content = content.replace(REDUNDANT_JS_REGEX, '');
            console.log('Cleaned redundant script from ' + file);
        }

        // 2. Ensure global scripts is included exactly once before </body>
        // Remove any existing global-scripts.js tags first (to standardize)
        const HAS_GLOBAL = /<script src="global-scripts\.js(?:\?v=[\d.]+)?"><\/script>/g;
        content = content.replace(HAS_GLOBAL, '');

        if (content.includes('</body>')) {
            content = content.replace('</body>', JS_SCRIPT_TAG + '\n\n</body>');
        }

        if (content !== originalContent) {
            fs.writeFileSync(file, content);
            cleanedCount++;
        } else {
            alreadyCleanCount++;
        }
    }

    console.log('\n--- Cleanup Summary ---');
    console.log('Total HTML files processed: ' + files.length);
    console.log('Files cleaned: ' + cleanedCount);
    console.log('Files already clean: ' + alreadyCleanCount);
}

cleanupScripts();
