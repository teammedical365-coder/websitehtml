const fs = require('fs');

const DATA_FILE = 'seo_pages.json';
const INDEX_FILE = 'index.html';

const pages = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
let indexContent = fs.readFileSync(INDEX_FILE, 'utf8');

// Map of "Display Name" (or part of it) to Slug
const slugMap = {}; 
pages.forEach(p => {
    // We can't easily map display names because they are abbreviated in footer
    // e.g. "CRM Udaipur" -> "healthcare-crm-udaipur.html"
});

// Since mapping is hard, let's just use a more surgical approach.
// I will manually fix the prominent ones in index.html and then sync.

const replacements = [
    { old: 'healthcare-crm-software-udaipur.html', new: 'healthcare-crm-udaipur.html' },
    { old: 'hospital-online-scheduling-software-udaipur.html', new: 'hospital-online-scheduling-udaipur.html' }, // wait, is it in JSON?
    { old: 'patient-portal-software-vidyadhar-nagar.html', new: 'patient-portal-software-vidyadhar-nagar.html' }, // wait
];

// Actually, I'll just look at the JSON and the footer again.
// JSON: "Telemedicine Platform" -> telemedicine-platform-jaipur
// JSON: "Online Scheduling" is NOT in features list. 
// Features list from seo_generator.js: 
// ["Hospital Management Software", "Clinic Management System", "EMR Software", "Revenue Cycle Management", "Telemedicine Platform", "Hospital IT Cloud Migration", "ABHA Compliance Software", "Patient Portal Software", "Hospital HRMS", "Healthcare CRM"]

// Ah! Some footer links are NOT in the 10 core features.
// Examples: "Kiosk Providers", "LIMS", "Nursing", "Data Backup", "OT Mgt".

// I should check if these exist as separate files.
// Yes, I saw lims.html, nursing-management-system.html, etc.

// The user wants THEM to look premium too.
// I will update the non-SEO pages (the ones not in JSON) to also use the premium layout manually or with a generic version of the template.
