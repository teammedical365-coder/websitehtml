const fs = require('fs');

let output = '';

// Check a few key pages for required IDs
const pages = ['clinics.html', 'about.html', 'book-demo.html', 'contact.html', 'emr.html', 'index.html'];
const requiredIds = ['mobile-toggle', 'main-nav', 'mobile-overlay', 'main-header'];

for (const page of pages) {
    try {
        const content = fs.readFileSync(page, 'utf8');
        const results = requiredIds.map(id => {
            const pattern = 'id="' + id + '"';
            return id + ':' + (content.includes(pattern) ? 'Y' : 'N');
        });
        output += page + ' | ' + results.join(' | ') + '\n';
    } catch (e) {
        output += page + ' | ERROR: ' + e.message + '\n';
    }
}

// Count pages missing global-scripts.js
const allHtml = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const skip = ['blogs.html', 'superadmin.html'];
const missingJS = allHtml.filter(f => !skip.includes(f) && !fs.readFileSync(f, 'utf8').includes('global-scripts'));
const missingCSS = allHtml.filter(f => !skip.includes(f) && !fs.readFileSync(f, 'utf8').includes('global-styles'));
const hasStyle = allHtml.filter(f => !skip.includes(f) && fs.readFileSync(f, 'utf8').includes('<style'));

output += '\n--- Summary ---\n';
output += 'Total HTML: ' + allHtml.length + '\n';
output += 'Missing JS: ' + missingJS.length + (missingJS.length > 0 ? ' [' + missingJS.join(', ') + ']' : '') + '\n';
output += 'Missing CSS: ' + missingCSS.length + (missingCSS.length > 0 ? ' [' + missingCSS.join(', ') + ']' : '') + '\n';
output += 'Has <style>: ' + hasStyle.length + (hasStyle.length > 0 ? ' [' + hasStyle.join(', ') + ']' : '') + '\n';

fs.writeFileSync('verify-results.txt', output);
console.log('Results written to verify-results.txt');
