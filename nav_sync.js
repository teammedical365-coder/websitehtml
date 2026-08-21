
const fs = require('fs');
const path = require('path');

const directory = 'c:/Users/USER/Downloads/medical365-fixed (1)/medical365-fixed';
const sourceFile = path.join(directory, 'index.html');
const sourceContent = fs.readFileSync(sourceFile, 'utf8');

// 1. Extract CSS Block (Mega Menu Styles)
const cssStartMarker = '/* Mega Menu Desktop */';
const cssEndMarker = '.sub-menu-list a:hover span::after {';
const cssStartIdx = sourceContent.indexOf(cssStartMarker);
const cssEndIdx = sourceContent.indexOf('}', sourceContent.indexOf(cssEndMarker)) + 1;
const megaMenuCSS = sourceContent.substring(cssStartIdx, cssEndIdx);

// 2. Extract Nav Block
const navStartMarker = '<nav class="main-nav" id="main-nav">';
const navEndMarker = '</nav>';
const navStartIdx = sourceContent.indexOf(navStartMarker);
const navEndIdx = sourceContent.indexOf(navEndMarker) + navEndMarker.length;
const navBlock = sourceContent.substring(navStartIdx, navEndIdx);

// 3. Extract Mobile Styles adjustment
const mobileStartMarker = '.mobile-accordion-pane {';
const mobileEndMarker = '.sub-menu-list a { font-size: .85rem; padding: 4px 0; }';
const mobileStartIdx = sourceContent.indexOf(mobileStartMarker);
const mobileEndIdx = sourceContent.indexOf('}', sourceContent.indexOf(mobileEndMarker)) + 1;
const mobileCSS = sourceContent.substring(mobileStartIdx, mobileEndIdx);

const files = fs.readdirSync(directory).filter(f => f.endsWith('.html') && f !== 'index.html' && f !== 'index_backup.html');

files.forEach(file => {
    const filePath = path.join(directory, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace CSS
    const targetCssStart = content.indexOf(cssStartMarker);
    const targetCssEnd = content.indexOf('}', content.indexOf(cssEndMarker)) + 1;
    if (targetCssStart !== -1 && targetCssEnd !== -1) {
        content = content.substring(0, targetCssStart) + megaMenuCSS + content.substring(targetCssEnd);
    }

    // Replace Nav
    const targetNavStart = content.indexOf(navStartMarker);
    const targetNavEnd = content.indexOf(navEndMarker) + navEndMarker.length;
    if (targetNavStart !== -1 && targetNavEnd !== -1) {
        content = content.substring(0, targetNavStart) + navBlock + content.substring(targetNavEnd);
    }

    // Replace Mobile CSS
    const targetMobileStart = content.indexOf(mobileStartMarker);
    const targetMobileEnd = content.indexOf('}', content.indexOf(mobileEndMarker)) + 1;
    if (targetMobileStart !== -1 && targetMobileEnd !== -1) {
        content = content.substring(0, targetMobileStart) + mobileCSS + content.substring(targetMobileEnd);
    }

    fs.writeFileSync(filePath, content);
    console.log('Updated ' + file);
});
