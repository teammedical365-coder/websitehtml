const fs = require('fs');
const files = fs.readdirSync('.');
const htmlFiles = files.filter(f => f.endsWith('.html'));
const categories = [
    "emr", "hospital", "clinic", "revenue", "billing", "lims", "ris-pacs", "pharmacy", 
    "theater", "nursing", "blood", "patient-portal", "telemedicine", "crm", 
    "speech-to-text", "robotic", "cloud", "virtual-opd", "abdm", "abha", "dpdp", 
    "nabh", "pmjay", "medical365", "rajasthan"
];

const results = {};
categories.forEach(cat => {
    results[cat] = htmlFiles.filter(f => f.includes(cat)).sort();
});

console.log(JSON.stringify(results, null, 2));
