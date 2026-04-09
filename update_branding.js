const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const excludeDir = 'teammedical365-next';
const targetImg = 'medical365fav.jpg?v=branding5'; // Cache buster added

// Precise brand colors from the new identity
const colorMedical = '#1D4E9E';
const color365 = '#37B39C';

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

    // 1. Desktop Logo
    // Apply tight spacing and negative margins to bypass CSS cache and image padding
    const logoRegex = /<a[^>]*class=["']logo["'][^>]*>[\s\S]*?<\/a>/gi;
    if (logoRegex.test(content)) {
        content = content.replace(logoRegex, 
            `<a href="/" class="logo" aria-label="Medical365 Home" style="display: flex; align-items: center; text-decoration: none;">` +
            `<img src="${targetImg}" alt="MEDICAL365" class="logo-img" loading="lazy" style="height: 35px; display: block; margin: 0; padding: 0; margin-right: -8px;">` +
            `<span class="logo-text" style="font-weight: 800; font-size: 32px; font-family: 'Plus Jakarta Sans', sans-serif, Arial; display: flex; align-items: center; letter-spacing: -1px; line-height: 1; margin: 0; padding: 0;">` +
            `<span class="brand-medical" style="color: ${colorMedical};">MEDICAL</span><span class="brand-365" style="color: ${color365};">365</span></span></a>`
        );
        changed = true;
    }

    // 2. Mobile Logo
    // Apply tight spacing and negative margins to bypass CSS cache and image padding
    const mobileLogoRegex = /<div[^>]*class=["']logo-mobile-wrapper["'][^>]*>[\s\S]*?<\/div>/gi;
    if (mobileLogoRegex.test(content)) {
        content = content.replace(mobileLogoRegex, 
            `<div class="logo-mobile-wrapper" style="display: flex; align-items: center; text-decoration: none; padding-bottom: 5px;">` +
            `<img src="${targetImg}" alt="MEDICAL365" class="logo-img-mobile" loading="lazy" style="height: 80px; display: block; margin: 0; padding: 0; margin-right: -12px;">` +
            `<span class="logo-text" style="font-weight: 800; font-size: 60px; font-family: 'Plus Jakarta Sans', sans-serif, Arial; display: flex; align-items: center; letter-spacing: -2px; line-height: 1; margin: 0; padding: 0;">` +
            `<span class="brand-medical" style="color: ${colorMedical};">MEDICAL</span><span class="brand-365" style="color: ${color365};">365</span></span></div>`
        );
        changed = true;
    }

    // 3. Footer Logo
    const footerLogoRegex = /<div[^>]*class=["']footer-logo-wrapper["'][^>]*>[\s\S]*?<\/div>/gi;
    if (footerLogoRegex.test(content)) {
        content = content.replace(footerLogoRegex, 
            `<div class="footer-logo-wrapper" style="display: flex; align-items: center; margin-bottom: 15px;">` +
            `<img src="${targetImg}" alt="MEDICAL365" class="mf-logo" loading="lazy" style="height: 35px; display: block; margin: 0; padding: 0; margin-right: -8px;">` +
            `<span class="logo-text" style="font-weight: 800; font-size: 32px; font-family: 'Plus Jakarta Sans', sans-serif, Arial; display: flex; align-items: center; letter-spacing: -1px; line-height: 1; margin: 0; padding: 0;">` +
            `<span class="brand-medical" style="color: ${colorMedical};">MEDICAL</span><span class="brand-365" style="color: ${color365};">365</span></span></div>`
        );
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
    }
});

console.log('Force-cache-buster branding update completed.');
