const fs = require('fs');
const path = require('path');

const files = [
    'telemedicine.html',
    'billing-invoicing.html',
    'dental-imaging.html',
    'dermatology-treatment-plans.html',
    'e-prescriptions.html',
    'lims.html',
    'pharmacy.html'
];

files.forEach(file => {
    let filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');

    // Extract correct description
    let descMatch = content.match(/<meta name="description" content="([^"]+)"/i);
    if (!descMatch) return;
    let correctDesc = descMatch[1];

    // Extract correct title
    let titleMatch = content.match(/<title>([^<]+)<\/title>/i);
    let correctTitle = titleMatch ? titleMatch[1] : '';

    // Fix telemedicine specific bugs
    if (file === 'telemedicine.html') {
        content = content.replace(/<meta property="og:title" content="Telemedicine - Medical365">/g, 
            '<meta property="og:title" content="Telemedicine Software India | Secure HD Video | Medical365">');
        content = content.replace(/<meta name="keywords" content="Telemedicine - Medical365, Medical365, Healthcare Software.*?">/g, 
            '<meta name="keywords" content="telemedicine software India, online doctor consultation, virtual OPD, ABDM compliant telemedicine, video consultation hospital, Medical365">');
    }

    // Fix generic OG and Twitter descriptions
    content = content.replace(/<meta property="og:description" content="Discover Medical365's[^"]+">/gi, 
        '<meta property="og:description" content="' + correctDesc + '">');
    
    content = content.replace(/<meta name="twitter:description" content="Discover Medical365's[^"]+">/gi, 
        '<meta name="twitter:description" content="' + correctDesc + '">');
        
    // Also fix JSON-LD description if it has the old one
    content = content.replace(/"description": "Discover Medical365's[^"]+",/gi, 
        '"description": "' + correctDesc + '",');
        
    // General og:title fallback for all files if it has " - Medical365" format instead of the full title
    if (correctTitle) {
        content = content.replace(/<meta property="og:title" content="[^"]+ - Medical365">/gi, 
            '<meta property="og:title" content="' + correctTitle + '">');
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Fixed OG bugs in " + file);
});
