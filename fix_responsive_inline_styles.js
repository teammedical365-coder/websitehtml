const fs = require('fs');
const path = require('path');

const directory = './';
const files = fs.readdirSync(directory).filter(file => file.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(directory, file), 'utf8');
    
    // Fix Mobile Logo Inline Styles
    content = content.replace(/<div class="logo-mobile-wrapper" style="[^"]*">/g, '<div class="logo-mobile-wrapper">');
    content = content.replace(/<img style="height: 80px; display: block;"/g, '<img');
    content = content.replace(/<span style="font-weight: 800; font-size: 60px;[^"]*">/g, '<span>');
    
    // Fix Hero Button Inline Style gap/margin if any
    content = content.replace(/style="margin-left: 0;"/g, ''); // Clean up redundant margins
    
    fs.writeFileSync(path.join(directory, file), content);
    console.log(`Fixed ${file}`);
});
