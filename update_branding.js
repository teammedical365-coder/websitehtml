const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const excludeDir = 'teammedical365-next';
const colorMedical = '#1D4E9E';
const color365 = '#37B39C';
const targetImg = 'medical365fav.jpg';

function getAllHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (file !== excludeDir && !file.startsWith('.')) {
                getAllHtmlFiles(filePath, fileList);
            }
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    });
    return fileList;
}

const htmlFiles = getAllHtmlFiles(rootDir);
console.log(`Found ${htmlFiles.length} HTML files.`);

htmlFiles.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // 1. Update Mobile Logo Wrapper with new specific dimensions: 70px / 60px
    const mobileLogoRegex = /(<div[^>]*class=["']logo-mobile-wrapper["'][^>]*>)\s*(<img[^>]*class=["']logo-img-mobile["'][^>]*>)\s*(<span[^>]*>.*?<\/span>)?\s*(<\/div>)/gi;
    if (mobileLogoRegex.test(content)) {
        content = content.replace(mobileLogoRegex, (match, openDiv, imgTag, oldSpan, closeDiv) => {
            changed = true;
            const newImgTag = `<img style="height: 70px; display: block;" loading="lazy" src="${targetImg}" alt="MEDICAL365" class="logo-img-mobile">`;
            const newTextSpan = `<span style="font-weight: 800; font-size: 60px; margin-left: 5px; font-family: 'Plus Jakarta Sans', sans-serif, Arial; display: flex; align-items: center; letter-spacing: -0.5px; line-height: 1;"><span style="color: ${colorMedical};">MEDICAL</span><span style="color: ${color365};">365</span></span>`;
            return `<div class="logo-mobile-wrapper" style="display: flex; align-items: center;">${newImgTag}${newTextSpan}${closeDiv}`;
        });
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
    }
});

console.log('Mobile branding sizing update complete.');
