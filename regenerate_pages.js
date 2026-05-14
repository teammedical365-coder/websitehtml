const fs = require('fs');
const path = require('path');

// 1. Configuration
const DATA_FILE = 'seo_pages.json';
const TEMPLATE_FILE = 'seo_template.html';
const OUTPUT_DIR = './'; // Root directory as per project structure

// 2. Read Data
if (!fs.existsSync(DATA_FILE)) {
    console.error(`Error: ${DATA_FILE} not found.`);
    process.exit(1);
}
if (!fs.existsSync(TEMPLATE_FILE)) {
    console.error(`Error: ${TEMPLATE_FILE} not found.`);
    process.exit(1);
}

const pages = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
const template = fs.readFileSync(TEMPLATE_FILE, 'utf8');

console.log(`Starting regeneration of ${pages.length} pages...`);

let count = 0;

pages.forEach(page => {
    // Extract variables
    const h1 = page.h1_heading;
    const title = page.meta_title;
    const desc = page.meta_description;
    
    // Extract location from h1 (usually follows "in ")
    // "Top-Rated Hospital Management Software for Healthcare Providers in Jaipur"
    let location = "Rajasthan";
    const locMatch = h1.match(/in (.*)$/);
    if (locMatch) {
        location = locMatch[1];
    }

    // Extract feature (the part before " for Healthcare")
    let feature = "Hospital Software";
    const featMatch = h1.match(/Top-Rated (.*) for/);
    if (featMatch) {
        feature = featMatch[1];
    }

    // Derive filename from url_slug
    // "/solutions/hospital-management-software-jaipur" -> "hospital-management-software-jaipur.html"
    const filename = page.url_slug.replace('/solutions/', '') + '.html';
    const filePath = path.join(OUTPUT_DIR, filename);

    // Replace placeholders
    let content = template;
    content = content.replace(/{{h1_heading}}/g, h1);
    content = content.replace(/{{meta_title}}/g, title);
    content = content.replace(/{{meta_description}}/g, desc);
    content = content.replace(/{{location}}/g, location);
    content = content.replace(/{{feature}}/g, feature);

    // Write file
    fs.writeFileSync(filePath, content);
    count++;
});

console.log(`Successfully regenerated ${count} pages with the premium layout.`);
