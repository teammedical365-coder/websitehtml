const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'seo_template.html');
const templateContent = fs.readFileSync(templatePath, 'utf-8');

const seoPagesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'seo_pages.json'), 'utf-8'));

seoPagesData.forEach(data => {
    let content = templateContent
        .replace(/{{meta_title}}/g, data.meta_title)
        .replace(/{{meta_description}}/g, data.meta_description)
        .replace(/{{feature}}/g, data.feature || "")
        .replace(/{{location}}/g, data.location || "")
        .replace(/{{h1_heading}}/g, data.h1_heading)
        .replace(/{{unique_content}}/g, data.unique_content)
        .replace(/{{url_slug}}/g, data.url_slug);

    // Fix for template variables that might still be there if feature/location missing from JSON
    // (though they shouldn't be missing in our new generator)
    
    const fileName = `${data.url_slug}.html`;
    fs.writeFileSync(path.join(__dirname, fileName), content);
    console.log(`Generated: ${fileName}`);
});

console.log(`Successfully processed ${seoPagesData.length} pages.`);
