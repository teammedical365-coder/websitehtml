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

console.log(`Starting regeneration of ${pages.length} pages with strong internal linking...`);

// ─── Curated homepage-style category map for mega-grid ───
// Each category maps to a fixed array of [slug, label] pairs identical to the homepage
const homepageCategoryGrid = [
    {
        title: 'Hospital & Clinic Management',
        links: [
            ['hospital-management-software-jaipur', 'Top HMS Rajasthan'],
            ['clinic-management-system-jaipur', 'Clinic System Jaipur'],
            ['outpatient-software-solutions-jodhpur', 'Outpatient Jodhpur'],
            ['inpatient-management-software-udaipur', 'Inpatient Udaipur'],
            ['telemedicine-platform-mansarovar-jaipur', 'Telemedicine Mansarovar'],
            ['hospital-queue-token-management-vaishali-nagar-jaipur', 'Queue Mgt Vaishali'],
            ['healthcare-kiosk-providers-kota', 'Kiosk Providers Kota'],
            ['virtual-opd-software-ajmer', 'Virtual OPD Ajmer'],
            ['hospital-online-scheduling-software-udaipur', 'Scheduling Udaipur'],
            ['hospital-management-software-jodhpur', 'HMS Jodhpur'],
        ]
    },
    {
        title: 'Clinical & Medical Ops',
        links: [
            ['emr-software-bikaner', 'EMR Bikaner'],
            ['emr-software-jaipur', 'EMR Jaipur'],
            ['clinical-assessment-form-software-c-scheme-jaipur', 'Assessments C-Scheme'],
            ['operation-theater-management-alwar', 'OT Mgt Alwar'],
            ['nursing-management-system-sikar', 'Nursing Sikar'],
            ['lims-laboratory-information-management-jaipur', 'LIMS Jaipur'],
            ['operation-theater-management-jodhpur', 'OT Mgt Jodhpur'],
            ['clinical-assessment-form-software-udaipur', 'Assessments Udaipur'],
            ['nursing-management-system-kota', 'Nursing Kota'],
            ['emr-software-udaipur', 'EMR Udaipur'],
        ]
    },
    {
        title: 'Patient Experience',
        links: [
            ['hospital-online-scheduling-software-udaipur', 'Scheduling Udaipur'],
            ['patient-portal-software-vidyadhar-nagar-jaipur', 'Portal Vidyadhar'],
            ['patient-mobile-app-developers-rajasthan', 'Patient App Raj.'],
            ['healthcare-feedback-satisfaction-surveys-alwar', 'Surveys Alwar'],
            ['patient-portal-software-jaipur', 'Patient Portal Jaipur'],
            ['hospital-online-scheduling-software-jodhpur', 'Scheduling Jodhpur'],
            ['healthcare-feedback-satisfaction-surveys-udaipur', 'Surveys Udaipur'],
            ['patient-portal-software-udaipur', 'Patient Portal Udaipur'],
        ]
    },
    {
        title: 'IT & Infrastructure',
        links: [
            ['hospital-it-cloud-migration-jaipur', 'Cloud Jaipur'],
            ['hospital-data-backup-recovery-kota', 'Backup Kota'],
            ['fhir-hl7-compliant-software-jaipur', 'FHIR/HL7 Raj.'],
            ['medical-robotic-process-automation-jodhpur', 'RPA Jodhpur'],
            ['hospital-it-cloud-migration-udaipur', 'Cloud Udaipur'],
            ['hospital-data-backup-recovery-jaipur', 'Backup Jaipur'],
            ['fhir-hl7-compliant-software-udaipur', 'FHIR/HL7 Udaipur'],
            ['hospital-it-cloud-migration-jodhpur', 'Cloud Jodhpur'],
        ]
    },
    {
        title: 'HR & Operations',
        links: [
            ['hospital-hrms-jaipur', 'HRMS Jaipur'],
            ['healthcare-crm-udaipur', 'CRM Udaipur'],
            ['hospital-bed-management-software-bapu-nagar-jaipur', 'Bed Mgt Jaipur'],
            ['medical-asset-inventory-management-jodhpur', 'Assets Jodhpur'],
            ['hospital-hrms-jodhpur', 'HRMS Jodhpur'],
            ['healthcare-crm-jaipur', 'CRM Jaipur'],
            ['hospital-bed-management-software-udaipur', 'Bed Mgt Udaipur'],
        ]
    },
    {
        title: 'Govt & Public Health',
        links: [
            ['integrated-population-healthcare-management-jaipur', 'Public Health Raj.'],
            ['abha-compliance-software-kota', 'ABHA Compliance'],
            ['vaccine-management-system-bharatpur', 'Vaccine Mgt.'],
            ['multi-facility-hospital-software-jaipur', 'Multi-Facility'],
            ['abha-compliance-software-jaipur', 'ABHA Jaipur'],
            ['vaccine-management-system-jaipur', 'Vaccine Mgt Jaipur'],
        ]
    }
];

// All major city slugs for building location hub links
const cityHubs = [
    { name: 'Jaipur', feature: 'hospital-management-software' },
    { name: 'Jodhpur', feature: 'outpatient-software-solutions' },
    { name: 'Udaipur', feature: 'inpatient-management-software' },
    { name: 'Kota', feature: 'healthcare-kiosk-providers' },
    { name: 'Ajmer', feature: 'virtual-opd-software' },
    { name: 'Bikaner', feature: 'emr-software' },
    { name: 'Bhilwara', feature: 'medical-camp-management-software' },
    { name: 'Alwar', feature: 'operation-theater-management' },
    { name: 'Sikar', feature: 'nursing-management-system' },
    { name: 'Pali', feature: 'hospital-management-software' },
    { name: 'Bharatpur', feature: 'vaccine-management-system' },
    { name: 'Sri Ganganagar', feature: 'clinic-management-system' },
    { name: 'Mansarovar', feature: 'telemedicine-platform' },
    { name: 'Vaishali Nagar', feature: 'hospital-queue-token-management' },
    { name: 'Malviya Nagar', feature: 'emr-software' },
    { name: 'C-Scheme', feature: 'clinic-management-system' },
    { name: 'Bapu Nagar', feature: 'hospital-bed-management-software' },
    { name: 'Raja Park', feature: 'healthcare-crm' },
    { name: 'Jagatpura', feature: 'clinical-assessment-form-software' },
    { name: 'Jhotwara', feature: 'hospital-management-software' },
    { name: 'Vidyadhar Nagar', feature: 'emr-software' },
];

// Helper: generate location pin SVG
const pinSvg = `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style="color:#37B39C;flex-shrink:0;" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;

// Helper: arrow icon
const arrowSvg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;

let count = 0;

pages.forEach(page => {
    let location = page.location || "Rajasthan";
    const h1 = page.h1_heading;
    const title = page.meta_title;
    const desc = page.meta_description;
    let feature = page.feature || "Hospital Software";

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

    // ─── STRONG INTERNAL LINKING ───

    // Section 1: Same feature in ALL other cities (full list, not just 4)
    const sameFeatureOthers = pages
        .filter(p => p.feature === page.feature && p.location !== page.location);

    // Section 2: ALL other services in same location
    const otherFeaturesSameLoc = pages
        .filter(p => p.location === page.location && p.feature !== page.feature);

    // Build city-level slug for current city hub link
    const citySlug = location.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');

    // ─── Build the full {{related_links_menu}} block ───
    let linksHtml = `
<div class="strong-internal-links" style="padding: 0;">

    <!-- ══ SECTION A: SAME SERVICE — ALL CITIES ══ -->
    ${sameFeatureOthers.length > 0 ? `
    <div style="margin-bottom: 48px;">
        <div style="display:flex; align-items:center; gap:10px; margin-bottom: 20px; border-bottom: 2px solid #1A56DB; padding-bottom: 12px;">
            ${pinSvg}
            <h3 style="font-size:1.2rem; font-weight:800; color:#1A56DB; margin:0;">${feature} — Available Across Rajasthan</h3>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 8px 24px;">
            ${sameFeatureOthers.map(p => {
                const cleanSlug = p.url_slug.replace('/solutions/', '').replace(/^\//, '');
                return `<a href="${cleanSlug}" style="display:flex;align-items:center;gap:6px;color:#374151;text-decoration:none;font-size:0.875rem;padding:6px 0;border-bottom:1px solid #F3F4F6;transition:color 0.15s;" onmouseover="this.style.color='#1A56DB'" onmouseout="this.style.color='#374151'">${arrowSvg} ${feature} in ${p.location}</a>`;
            }).join('\n            ')}
        </div>
    </div>
    ` : ''}

    <!-- ══ SECTION B: ALL SERVICES IN THIS CITY ══ -->
    ${otherFeaturesSameLoc.length > 0 ? `
    <div style="margin-bottom: 48px;">
        <div style="display:flex; align-items:center; gap:10px; margin-bottom: 20px; border-bottom: 2px solid #0D9488; padding-bottom: 12px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D9488" stroke-width="2.5" aria-hidden="true"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
            <h3 style="font-size:1.2rem; font-weight:800; color:#0D9488; margin:0;">More Healthcare Software Solutions in ${location}</h3>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 8px 24px;">
            ${otherFeaturesSameLoc.map(p => {
                const cleanSlug = p.url_slug.replace('/solutions/', '').replace(/^\//, '');
                return `<a href="${cleanSlug}" style="display:flex;align-items:center;gap:6px;color:#374151;text-decoration:none;font-size:0.875rem;padding:6px 0;border-bottom:1px solid #F3F4F6;transition:color 0.15s;" onmouseover="this.style.color='#0D9488'" onmouseout="this.style.color='#374151'">${arrowSvg} ${p.feature}</a>`;
            }).join('\n            ')}
        </div>
    </div>
    ` : ''}

    <!-- ══ SECTION C: LOCATION HUB — ALL CITIES WE SERVE ══ -->
    <div style="margin-bottom: 48px;">
        <div style="display:flex; align-items:center; gap:10px; margin-bottom: 20px; border-bottom: 2px solid #F59E0B; padding-bottom: 12px;">
            ${pinSvg.replace('color:#37B39C', 'color:#F59E0B')}
            <h3 style="font-size:1.2rem; font-weight:800; color:#92400E; margin:0;">Locations We Serve — Hospital Software Across Rajasthan</h3>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 8px 16px;">
            ${cityHubs.map(city => {
                const cSlug = city.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                const href = `${city.feature}-${cSlug}`;
                const isCurrentCity = city.name.toLowerCase() === location.toLowerCase() ||
                    city.name.toLowerCase().replace(/\s+/g, '-') === citySlug;
                return `<a href="${href}" style="display:flex;align-items:center;gap:6px;color:${isCurrentCity ? '#1A56DB' : '#374151'};text-decoration:none;font-size:0.875rem;padding:6px 8px;border-radius:6px;background:${isCurrentCity ? '#EFF6FF' : 'transparent'};border:1px solid ${isCurrentCity ? '#BFDBFE' : '#E5E7EB'};font-weight:${isCurrentCity ? '700' : '400'};transition:all 0.15s;" onmouseover="this.style.background='#F0F9FF';this.style.color='#1A56DB'" onmouseout="this.style.background='${isCurrentCity ? '#EFF6FF' : 'transparent'}';this.style.color='${isCurrentCity ? '#1A56DB' : '#374151'}'"><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg> ${city.name}${isCurrentCity ? ' ●' : ''}</a>`;
            }).join('\n            ')}
        </div>
    </div>

    <!-- ══ SECTION D: FULL SOLUTIONS MEGA-GRID (matches homepage footer) ══ -->
    <div style="margin-bottom: 16px;">
        <div style="display:flex; align-items:center; gap:10px; margin-bottom: 24px; border-bottom: 2px solid #6B7280; padding-bottom: 12px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2.5" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            <h3 style="font-size:1.2rem; font-weight:800; color:#374151; margin:0;">Browse All Medical365 Healthcare Solutions</h3>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 28px;">
            ${homepageCategoryGrid.map(cat => `
            <div style="background:#F9FAFB; border-radius:10px; padding:16px; border:1px solid #E5E7EB;">
                <h4 style="font-size:0.875rem; font-weight:700; color:#1E293B; margin:0 0 12px 0; text-transform:uppercase; letter-spacing:0.05em; border-bottom:1px solid #E5E7EB; padding-bottom:8px;">${cat.title}</h4>
                <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:6px;">
                    ${cat.links.map(([slug, label]) => `<li><a href="${slug}" style="display:flex;align-items:center;gap:5px;color:#475569;text-decoration:none;font-size:0.8125rem;transition:color 0.15s;" onmouseover="this.style.color='#1A56DB'" onmouseout="this.style.color='#475569'"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>${label}</a></li>`).join('\n                    ')}
                </ul>
            </div>`).join('\n            ')}
        </div>
    </div>

</div>`;

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

console.log(`Successfully regenerated ${count} pages with strong homepage-equivalent internal linking.`);
