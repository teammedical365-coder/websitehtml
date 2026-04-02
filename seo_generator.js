const fs = require('fs');

const cities = ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner", "Bhilwara", "Alwar", "Sikar", "Pali", "Bharatpur", "Sri Ganganagar"];
const localAreas = ["Mansarovar", "Vaishali Nagar", "Malviya Nagar", "C-Scheme", "Raja Park", "Jagatpura", "Tonk Road", "Bapu Nagar", "Jhotwara", "Vidyadhar Nagar"];
const features = ["Hospital Management Software", "Clinic Management System", "EMR Software", "Revenue Cycle Management", "Telemedicine Platform", "Hospital IT Cloud Migration", "ABHA Compliance Software", "Patient Portal Software", "Hospital HRMS", "Healthcare CRM"];

const output = [];

function generateSlug(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function truncateString(str, num) {
    if (str.length <= num) {
        return str;
    }
    return str.slice(0, num - 3) + '...';
}

function generateMetadata(feature, location, type) {
    const slugLocation = generateSlug(location);
    const slugFeature = generateSlug(feature);
    const url_slug = `/solutions/${slugFeature}-${slugLocation}`;
    
    // meta_title: Must be under 60 characters. Format: Best [Feature] in [Location] | ABDM Compliant.
    // We'll use "ABDM" or "ABHA" to keep character count down if needed.
    let meta_title = `Best ${feature} in ${location} | ABDM Compliant`;
    if (meta_title.length > 58) {
        meta_title = `Best ${feature} ${location} | ABDM`; 
        if (meta_title.length > 58) {
            meta_title = truncateString(meta_title, 58);
        }
    }
    
    // meta_description: under 155 chars.
    let meta_description = `Upgrade your healthcare facility in ${location} with Medical365's cloud-based ${feature}. Fully ABDM compliant & DPDP Act 2023 ready.`;
    if (meta_description.length > 155) {
        meta_description = truncateString(meta_description, 155);
    }
    
    // h1_heading: Top-Rated [Feature] for Healthcare Providers in [Location]
    const h1_heading = `Top-Rated ${feature} for Healthcare Providers in ${location}`;
    
    return {
        url_slug,
        meta_title,
        meta_description,
        h1_heading,
        page_type: type
    };
}

// Generate for Cities
features.forEach(feature => {
    cities.forEach(city => {
        output.push(generateMetadata(feature, city, "City Hub"));
    });
});

// Generate for Local Areas (Jaipur)
features.forEach(feature => {
    localAreas.forEach(area => {
        // Explicitly format local areas as "Area, City" for H1, but slug uses just area-jaipur
        output.push(generateMetadata(feature, `${area}, Jaipur`, "Local Area"));
    });
});

fs.writeFileSync('seo_pages.json', JSON.stringify(output, null, 2));
console.log(`Successfully generated ${output.length} SEO landing page architectures and saved to seo_pages.json.`);
