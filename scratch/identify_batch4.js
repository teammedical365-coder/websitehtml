const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');

// Read all html files in repoRoot
const allFiles = fs.readdirSync(repoRoot).filter(f => f.endsWith('.html'));

// Identify the 68 specialty/module pages
// Let's filter those that have a diagram or are part of our 64/67 list
const batch1 = [
    "ecg-ekg-integration", "echocardiography-reports", "stress-test-management", "cardiac-risk-scoring",
    "angiography-reports", "pacemaker-tracking", "lipid-profile-tracking", "cardiac-history-templates",
    "xray-imaging-integration", "fracture-management", "joint-mobility-tracking", "implant-records",
    "physiotherapy-notes", "surgery-planning"
];

const batch2 = [
    "eeg-reports", "mri-ct-integration", "seizure-tracking", "cognitive-assessment", "stroke-management", "neurological-exam-forms",
    "growth-charts", "vaccination-tracking", "pediatric-dosage-calculator", "developmental-milestones", "neonatal-records", "parent-communication",
    "vision-refraction-charts", "retina-imaging-integration", "eye-pressure-tracking", "optical-prescription-mgt", "lasik-surgery-records"
];

const batch3 = [
    "dental-tooth-chart", "dental-imaging", "dental-treatment-planning", "dental-procedure-history", "dental-insurance-billing",
    "skin-image-tracking", "dermatology-photos", "dermatology-treatment-plans", "cosmetic-procedure-records", "allergy-tracking",
    "cancer-staging", "chemotherapy-plans", "radiation-therapy-records", "tumor-tracking", "oncology-reports", "clinical-trial-management"
];

const processed = new Set([...batch1, ...batch2, ...batch3]);
console.log(`Already completed in Batches 1-3: ${processed.size} pages`);

// Let's check the remaining specialty/module pages in the 68 list:
const candidateList = [
    // Gynecology & Obstetrics
    "antenatal-care-records",
    "ultrasound-imaging-obgyn",
    "labor-delivery-tracking",
    "postnatal-care-records",
    "gynecology-exam-templates",
    // Psychiatry & Mental Health
    "psychiatric-evaluation-forms",
    "depression-anxiety-screening",
    "addiction-treatment-records",
    "therapy-session-notes",
    // General Practice & Internal Medicine
    "chronic-disease-management",
    "diabetes-monitoring",
    "hypertension-tracking",
    "preventive-health-checkup",
    "general-physical-exam-forms",
    // Core Clinical Modules
    "opd-management",
    "ipd-management",
    "laboratory-management",
    "pharmacy-management",
    "radiology-management",
    "emergency-room-management",
    "icu-management",
    "blood-bank-management",
    "ot-management",
    "telemedicine-integration",
    "patient-portal-app",
    "medical-billing-claims"
];

const remaining = candidateList.filter(slug => {
    return fs.existsSync(path.join(repoRoot, slug + '.html')) && !processed.has(slug);
});

console.log(`Remaining pages in candidateList: ${remaining.length}`);
console.log(remaining);
