const fs = require('fs');

const pages = ['opd-management.html', 'ipd-management.html', 'laboratory-management.html', 'radiology-management.html'];
pages.forEach(p => {
    if (fs.existsSync(p)) {
        const html = fs.readFileSync(p, 'utf8');
        const imgs = html.match(/<img\b[^>]*>/gi) || [];
        console.log(`=== ${p} (Found ${imgs.length} images) ===`);
        imgs.slice(0, 5).forEach(i => console.log('  ', i));
    }
});
