const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'seo_template.html');
if (!fs.existsSync(templatePath)) {
    console.error("seo_template.html not found!");
    process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');

const locations = [
    { name: 'Mansarovar', slug: 'hospital-software-mansarovar.html' },
    { name: 'Malviya Nagar', slug: 'hospital-software-malviya-nagar.html' },
    { name: 'C-Scheme', slug: 'hospital-software-c-scheme.html' },
    { name: 'Vaishali Nagar', slug: 'hospital-software-vaishali-nagar.html' },
    { name: 'Tonk Road', slug: 'hospital-software-tonk-road.html' }
];

const feature = "Hospital Management Software";

locations.forEach(loc => {
    let content = template;
    
    // Replace placeholders globally
    content = content.replace(/\{\{meta_title\}\}/g, `Best ${feature} in ${loc.name}, Jaipur | ABDM Ready`);
    content = content.replace(/\{\{meta_description\}\}/g, `Upgrade your healthcare facility in ${loc.name} with Medical365's cloud-based ${feature}. Fully ABDM compliant & DPDP Act 2023 ready.`);
    content = content.replace(/\{\{feature\}\}/g, feature);
    content = content.replace(/\{\{location\}\}/g, loc.name + ", Jaipur");
    content = content.replace(/\{\{h1_heading\}\}/g, `Top-Rated ${feature} for Healthcare Providers in ${loc.name}`);
    
    fs.writeFileSync(path.join(__dirname, loc.slug), content);
    console.log(`Successfully Generated SEO Page: ${loc.slug}`);
});
