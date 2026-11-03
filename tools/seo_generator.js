const fs = require('fs');

const cities = ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner", "Bhilwara", "Alwar", "Sikar", "Pali", "Bharatpur", "Sri Ganganagar"];
const localAreas = ["Mansarovar", "Vaishali Nagar", "Malviya Nagar", "C-Scheme", "Raja Park", "Jagatpura", "Tonk Road", "Bapu Nagar", "Jhotwara", "Vidyadhar Nagar"];
const features = [
    "Hospital Management Software", 
    "Clinic Management System", 
    "EMR Software", 
    "Revenue Cycle Management", 
    "Telemedicine Platform", 
    "Hospital IT Cloud Migration", 
    "ABHA Compliance Software", 
    "Patient Portal Software", 
    "Hospital HRMS", 
    "Healthcare CRM",
    "LIMS Laboratory Information Management",
    "Nursing Management System",
    "Operation Theater Management",
    "Outpatient Software Solutions",
    "Inpatient Management Software",
    "Clinical Assessment Form Software",
    "Hospital Queue Token Management",
    "Healthcare Kiosk Providers",
    "Hospital Online Scheduling Software",
    "Medical Camp Management Software",
    "Hospital Data Backup Recovery",
    "FHIR HL7 Compliant Software",
    "Medical Robotic Process Automation",
    "Hospital Bed Management Software",
    "Medical Asset Inventory Management",
    "Vaccine Management System",
    "Multi-Facility Hospital Software",
    "Healthcare Feedback Satisfaction Surveys",
    "Integrated Population Healthcare Management"
];

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

function generateUniqueContent(feature, location) {
    const facts = {
        "Jaipur": "Supporting Jaipur’s rapid expansion of private healthcare in areas like Mansarovar and Vaishali Nagar.",
        "Jodhpur": "Tailored for the unique medical tourism needs and multi-specialty centers across Jodhpur.",
        "Udaipur": "Optimized for Udaipur’s burgeoning medical cluster and renowned specialty clinics.",
        "Kota": "Designed for the high-volume healthcare needs of Kota’s educational and medical hubs.",
        "Ajmer": "Serving the clinical needs of Ajmer’s historical healthcare district and patient network.",
        "Bikaner": "Modernizing clinical workflows for Bikaner’s primary and secondary care centers.",
        "Bhilwara": "Bringing cloud-native efficiency to Bhilwara’s industrial healthcare corridors.",
        "Alwar": "Empowering healthcare providers in Alwar with robust, secure digital health records.",
        "Sikar": "Supporting Sikar’s growing reputation as a regional healthcare destination.",
        "Pali": "Optimizing patient care and clinic management for Pali’s medical community.",
        "Bharatpur": "Enhancing clinical precision and data security for Bharatpur’s healthcare facilities.",
        "Sri Ganganagar": "Delivering advanced HMS solutions to Sri Ganganagar’s border-region medical centers."
    };

    // Extract city if location is "Area, City"
    const city = location.includes(",") ? location.split(",")[1].trim() : location;
    const baseFact = facts[city] || `Providing mission-critical healthcare technology in ${location}.`;
    
    return `${baseFact} Medical365's ${feature} ensures your facility remains competitive and compliant with the latest MoHFW standards.`;
}

function generateMetadata(feature, location, type) {
    const slugLocation = generateSlug(location.split(',')[0]); // Use just area name for slug if applicable
    const slugFeature = generateSlug(feature);
    const url_slug = `${slugFeature}-${slugLocation}`; // Removed /solutions/ as it might be handled by routing or file naming
    
    let meta_title = `Best ${feature} in ${location} | ABDM Compliant`;
    if (meta_title.length > 58) {
        meta_title = `Best ${feature} ${location} | ABDM`; 
        if (meta_title.length > 58) {
            meta_title = truncateString(meta_title, 58);
        }
    }
    
    let meta_description = `Upgrade your healthcare facility in ${location} with Medical365's cloud-based ${feature}. Fully ABDM compliant & DPDP Act 2023 ready.`;
    if (meta_description.length > 155) {
        meta_description = truncateString(meta_description, 155);
    }
    
    const h1_heading = `Top-Rated ${feature} for Healthcare Providers in ${location}`;
    const unique_content = generateUniqueContent(feature, location);
    
    return {
        url_slug,
        meta_title,
        meta_description,
        h1_heading,
        unique_content,
        feature,
        location,
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
