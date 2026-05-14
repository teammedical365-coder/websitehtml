/**
 * Medical365 CSS Cleanup Script
 * 
 * This script:
 *  1. Removes all <style>...</style> blocks from HTML files
 *  2. Ensures global-styles.css is linked in <head>
 *  3. Ensures global-scripts.js is loaded before </body>
 *  4. Skips pages that have completely different design systems (blogs.html, superadmin.html)
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

// Pages to SKIP — they have a completely different design system
const SKIP_FILES = new Set([
  'blogs.html',
  'superadmin.html',
  'index.html', // already clean
]);

// CSS link to ensure is present
const CSS_LINK = '<link rel="stylesheet" href="global-styles.css?v=3.0">';
const JS_SCRIPT = '<script src="global-scripts.js"></script>';

// Get all HTML files
const htmlFiles = fs.readdirSync(ROOT)
  .filter(f => f.endsWith('.html') && !SKIP_FILES.has(f));

let processed = 0;
let styleRemoved = 0;
let cssAdded = 0;
let jsAdded = 0;
let errors = [];

for (const file of htmlFiles) {
  const filePath = path.join(ROOT, file);
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;
    
    // 1. Remove ALL <style>...</style> blocks (including multiline)
    //    This regex handles multiple <style> blocks, nested content, etc.
    const styleRegex = /<style[\s\S]*?<\/style>/gi;
    const styleMatches = content.match(styleRegex);
    if (styleMatches && styleMatches.length > 0) {
      content = content.replace(styleRegex, '');
      styleRemoved += styleMatches.length;
    }
    
    // Also remove any @import url for Google Fonts that might be outside <style>
    // (these are already in global-styles.css)
    
    // 2. Remove any duplicate blank lines left behind
    content = content.replace(/\n{3,}/g, '\n\n');
    
    // 3. Ensure global-styles.css is linked
    if (!content.includes('global-styles.css')) {
      // Add after <meta name="viewport"> or after first <meta> tag
      const headInsertPoint = content.indexOf('</head>');
      if (headInsertPoint !== -1) {
        content = content.slice(0, headInsertPoint) + 
          '    ' + CSS_LINK + '\n' + 
          content.slice(headInsertPoint);
        cssAdded++;
      }
    } else {
      // Update version number
      content = content.replace(
        /global-styles\.css\?v=[^"']*/g,
        'global-styles.css?v=3.0'
      );
    }
    
    // 4. Ensure global-scripts.js is loaded
    if (!content.includes('global-scripts.js')) {
      const bodyClose = content.lastIndexOf('</body>');
      if (bodyClose !== -1) {
        content = content.slice(0, bodyClose) + 
          JS_SCRIPT + '\n' + 
          content.slice(bodyClose);
        jsAdded++;
      }
    }
    
    // 5. Clean up any leftover empty lines between closing head tags
    content = content.replace(/\n\s*\n\s*<\/head>/g, '\n</head>');
    
    // Write only if changed
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      processed++;
    }
    
  } catch (err) {
    errors.push(`${file}: ${err.message}`);
  }
}

console.log('=== Medical365 CSS Cleanup Report ===');
console.log(`Total HTML files scanned: ${htmlFiles.length}`);
console.log(`Files modified: ${processed}`);
console.log(`<style> blocks removed: ${styleRemoved}`);
console.log(`global-styles.css added to: ${cssAdded} files`);
console.log(`global-scripts.js added to: ${jsAdded} files`);
console.log(`Skipped: ${Array.from(SKIP_FILES).join(', ')}`);
if (errors.length > 0) {
  console.log(`\nErrors:`);
  errors.forEach(e => console.log(`  - ${e}`));
}
console.log(`\nDone!`);
