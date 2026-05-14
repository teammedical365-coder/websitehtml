const fs = require('fs');
const path = require('path');

const urls = [
    "https://www.medical365.in/lims-laboratory-information-management-jaipur",
    "https://www.medical365.in/clinic-management-system-vaishali-nagar",
    "https://www.medical365.in/public-health-surveillance-software-jodhpur",
    "https://www.medical365.in/emr-software-raja-park-jaipur",
    "https://www.medical365.in/hospital-management-software-tonk-road",
    "https://www.medical365.in/on-prem-hospital-software-bhilwara",
    "https://www.medical365.in/telemedicine-platform-jhotwara-jaipur",
    "https://www.medical365.in/hospital-referral-management-software-malviya-nagar",
    "https://www.medical365.in/diabetes-care-management-software-kota",
    "https://www.medical365.in/pradhan-mantri-yojana-support-software-ajmer",
    "https://www.medical365.in/healthcare-billing-software-ajmer",
    "https://www.medical365.in/ris-pacs-software-providers-jodhpur",
    "https://www.medical365.in/accounts-payable-software-hospitals-tonk-road",
    "https://www.medical365.in/hospital-financial-reporting-dashboard-jhotwara",
    "https://www.medical365.in/medical-payment-gateway-integration-jaipur",
    "https://www.medical365.in/insurance-claim-processing-software-bhilwara",
    "https://www.medical365.in/hospital-hr-management-software-bikaner",
    "https://www.medical365.in/blood-bank-software-udaipur",
    "https://www.medical365.in/icu-management-system-hospitals-jaipur",
    "https://www.medical365.in/ambulance-tracking-software-alwar",
    "https://www.medical365.in/canteen-management-software-hospitals-sikar",
    "https://www.medical365.in/biomedical-waste-tracking-software-bharatpur",
    "https://www.medical365.in/nursing-management-system-pali",
    "https://www.medical365.in/patient-engagement-platform-rajasthan",
    "https://www.medical365.in/medical-imaging-software-jodhpur",
    "https://www.medical365.in/smart-opd-queue-management-jaipur",
    "https://www.medical365.in/healthcare-analytics-dashboard-kota",
    "https://www.medical365.in/digital-health-record-migration-ajmer",
    "https://www.medical365.in/mobile-healthcare-clinic-software-bikaner",
    "https://www.medical365.in/tpa-management-system-hospitals-udaipur"
];

urls.forEach(url => {
    const slug = url.split('/').pop();
    const filename = slug + '.html';
    const filepath = path.join(__dirname, filename);

    if (fs.existsSync(filepath)) {
        const content = fs.readFileSync(filepath, 'utf8');
        if (content.includes('noindex')) {
            console.log(`[FOUND NOINDEX] ${filename}`);
        } else {
            console.log(`[CLEAN] ${filename}`);
        }
    } else {
        console.log(`[MISSING FILE] ${filename}`);
    }
});
