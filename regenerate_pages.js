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
    // Extract location from h1 (usually follows "in ")
    // "Top-Rated Hospital Management Software for Healthcare Providers in Jaipur"
    let location = page.location || "Rajasthan";
    const h1 = page.h1_heading;
    const title = page.meta_title;
    const desc = page.meta_description;

    let feature = page.feature || "Hospital Software";

    // Derive filename from url_slug
    // "/solutions/hospital-management-software-jaipur" -> "hospital-management-software-jaipur.html"
    const filename = page.url_slug.replace('/solutions/', '').replace(/^\//, '') + '.html';
    const filePath = path.join(OUTPUT_DIR, filename);

    // ─── Programmatic Testimonials Injection ───
    const testimonialPools = [
        {
            quote: `Medical365 completely streamlined our clinical workflows here in ${location}. Waiting times in EMR & patient queueing dropped by over 60% within the first month. The localized training team was outstanding.`,
            name: "Dr. Sandeep Choudhary",
            role: `Chief Medical Officer at ${location} Healthcare Hub`,
            initials: "👨‍⚕️"
        },
        {
            quote: `Implementing ${feature} in our multi-specialty facility has been highly rewarding. The billing integrations conform perfectly to local standards, and patient records are secure and ABHA-compliant.`,
            name: "Dr. Ananya Singhal",
            role: `Lead Administrator at the Premium ${location} Clinic`,
            initials: "👩‍⚕️"
        },
        {
            quote: `We went completely paperless with Medical365's ${feature}. The offline-first synchronization handles local power cuts effortlessly, saving our team hours of administrative work.`,
            name: "Dr. Harsh Vardhan",
            role: `Director at ${location} Diagnostic & Care Center`,
            initials: "👨‍⚕️"
        }
    ];

    const tIdx = (location.charCodeAt(0) + feature.charCodeAt(0)) % testimonialPools.length;
    const testimonial = testimonialPools[tIdx];

    // ─── Programmatic FAQs Injection ───
    const faq1_q = `Is Medical365 ${feature} compliant with Indian healthcare standards in ${location}?`;
    const faq1_a = `Yes. Our ${feature} acts as a highly secure, ABDM-compliant vault for patient data. We strictly adhere to the DPDP Act 2023 and the EHR Standards designated by the MoHFW in India, serving all private clinics and nursing homes across ${location}.`;

    const faq2_q = `Do you provide on-site deployment and training for ${feature} in ${location}?`;
    const faq2_a = `Absolutely. While our platform is completely cloud-based, our specialized regional deployment teams in Rajasthan will visit your facility in ${location} to assist with onboarding, data migration, and on-the-ground staff training for ${feature}.`;

    const faq3_q = `What if our internet connection in ${location} drops mid-consultation?`;
    const faq3_a = `You can continue providing uninterrupted care. Our offline-first sync engine caches data locally and pushes it to the master servers automatically the moment your internet connection is restored anywhere in ${location}.`;

    // ─── Contextual PageRank Interlinking Grid ───
    const sameFeatureOthers = pages
        .filter(p => p.feature === page.feature && p.location !== page.location)
        .slice(0, 4);

    const otherFeaturesSameLoc = pages
        .filter(p => p.location === page.location && p.feature !== page.feature)
        .slice(0, 4);

    let linksHtml = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px; margin-top: 16px; text-align: left;">';
    
    if (sameFeatureOthers.length > 0) {
        linksHtml += '  <div>';
        linksHtml += `    <h4 style="font-weight: 700; font-size: 1.1rem; margin-bottom: 12px; color: var(--brand-teal); border-bottom: 1px solid var(--border-light); padding-bottom: 6px;">${feature} in Other Cities</h4>`;
        linksHtml += '    <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">';
        sameFeatureOthers.forEach(p => {
            const cleanSlug = p.url_slug.replace('/solutions/', '').replace(/^\//, '');
            linksHtml += `      <li><a href="${cleanSlug}" style="color: var(--text-secondary); text-decoration: none; font-size: 0.9rem; transition: color 0.2s;" onmouseover="this.style.color='var(--brand-blue)'" onmouseout="this.style.color='var(--text-secondary)'">→ ${feature} in ${p.location}</a></li>`;
        });
        linksHtml += '    </ul>';
        linksHtml += '  </div>';
    }

    if (otherFeaturesSameLoc.length > 0) {
        linksHtml += '  <div>';
        linksHtml += `    <h4 style="font-weight: 700; font-size: 1.1rem; margin-bottom: 12px; color: var(--brand-teal); border-bottom: 1px solid var(--border-light); padding-bottom: 6px;">More Services in ${location}</h4>`;
        linksHtml += '    <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">';
        otherFeaturesSameLoc.forEach(p => {
            const cleanSlug = p.url_slug.replace('/solutions/', '').replace(/^\//, '');
            linksHtml += `      <li><a href="${cleanSlug}" style="color: var(--text-secondary); text-decoration: none; font-size: 0.9rem; transition: color 0.2s;" onmouseover="this.style.color='var(--brand-blue)'" onmouseout="this.style.color='var(--text-secondary)'">→ ${p.feature} in ${location}</a></li>`;
        });
        linksHtml += '    </ul>';
        linksHtml += '  </div>';
    }

    linksHtml += '</div>';

    // Replace placeholders
    let content = template;
    content = content.replace(/{{h1_heading}}/g, h1);
    content = content.replace(/{{meta_title}}/g, title);
    content = content.replace(/{{meta_description}}/g, desc);
    content = content.replace(/{{location}}/g, location);
    content = content.replace(/{{feature}}/g, feature);
    content = content.replace(/{{url_slug}}/g, page.url_slug);
    
    // Dynamic content injections
    content = content.replace(/{{testimonial_quote}}/g, testimonial.quote);
    content = content.replace(/{{testimonial_avatar_initials}}/g, testimonial.initials);
    content = content.replace(/{{testimonial_name}}/g, testimonial.name);
    content = content.replace(/{{testimonial_role}}/g, testimonial.role);

    content = content.replace(/{{faq1_question}}/g, faq1_q);
    content = content.replace(/{{faq1_answer}}/g, faq1_a);
    content = content.replace(/{{faq2_question}}/g, faq2_q);
    content = content.replace(/{{faq2_answer}}/g, faq2_a);
    content = content.replace(/{{faq3_question}}/g, faq3_q);
    content = content.replace(/{{faq3_answer}}/g, faq3_a);

    content = content.replace(/{{related_links_menu}}/g, linksHtml);

    if (page.unique_content) {
        content = content.replace(/{{unique_content}}/g, page.unique_content);
    }

    // Write file
    fs.writeFileSync(filePath, content);
    count++;
});

console.log(`Successfully regenerated ${count} pages with the premium layout.`);
