const fs = require('fs');
const path = require('path');

// ==============================================================================
// MEDICAL365 — IMAGE ACCESSIBILITY & PERFORMANCE AUDIT TOOL
// Scans for missing ALT tags and enforces loading="lazy" for LCP boost.
// ==============================================================================

const directoryPath = './'; // Scan root directory
const targetExtensions = ['.html'];

function auditImagesInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 1. Audit missing ALT tags (Warning only)
    const imgRegex = /<img(?![^>]*\balt=['"])[^>]*>/gi;
    const missingAlt = content.match(imgRegex);
    if (missingAlt) {
        console.log(`[WARNING] Found ${missingAlt.length} images missing ALT tags in: ${filePath}`);
    }

    // 2. Automate loading="lazy" for all images (Performance Layer)
    // Avoid adding to images that already have a loading attribute or specific hero classes
    const lazyRegex = /<img(?![^>]*\bloading=)(?![^>]*\bclass=['"][^'"]*hero[^'"]*['"])[^>]*>/gi;
    content = content.replace(lazyRegex, (match) => {
        modified = true;
        return match.replace('<img', '<img loading="lazy"');
    });

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`[FIXED] Applied loading="lazy" to images in: ${filePath}`);
    }
}

function scanDirectory(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory() && !fullPath.includes('node_modules')) {
            scanDirectory(fullPath);
        } else if (targetExtensions.includes(path.extname(file))) {
            auditImagesInFile(fullPath);
        }
    });
}

console.log('Starting Medical365 Image Performance Audit...');
scanDirectory(directoryPath);
console.log('Audit Complete.');
