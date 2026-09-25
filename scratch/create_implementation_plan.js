const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
console.log('=== PHASE 18: CREATING SPECIALTY SEO IMPLEMENTATION PLAN ===');

const keywordMap = JSON.parse(fs.readFileSync(path.join(repoRoot, 'scratch/specialty_keyword_map.json'), 'utf8'));
const beforeSnapshot = JSON.parse(fs.readFileSync(path.join(repoRoot, 'scratch/specialty_seo_before_snapshot.json'), 'utf8'));

const implementationPlan = [];

keywordMap.forEach(item => {
    const before = beforeSnapshot.find(s => s.slug === item.slug) || {};
    
    implementationPlan.push({
        cluster: item.cluster,
        slug: item.slug,
        filename: item.filename,
        url: item.url,
        existsInRepo: before.exists !== false,
        primaryKeyword: item.primaryKeyword,
        secondaryKeywords: item.secondaryKeywords,
        longTailKeywords: item.longTailKeywords,
        intent: item.intent,
        plannedSections: [
            "HERO (H1 + Clinical Subtitle + Dual CTAs)",
            "AEO QUICK DEFINITION BOX (40-70 word answer to 'What is [Topic]?')",
            "CORE SPECIALTY CAPABILITIES (6 specific clinical/operational features)",
            "SPECIALIZED CLINICAL WORKFLOW (Requisition -> Test -> Review -> EMR Sync -> Follow-up)",
            "OPERATIONAL ADVANTAGES & USE CASES (Centralized, Paperless, Multi-disciplinary)",
            "TOPICAL ECOSYSTEM & INTERNAL LINKS (HIMS, EMR, NABH, Peer Specialty Modules, Pricing)",
            "AEO / FAQ SECTION (4-5 specialty-specific Q&As)",
            "CONVERSION CTA BANNER"
        ],
        schemaUpgrades: [
            "SoftwareApplication (Medical365 Module)",
            "MedicalWebPage / WebPage",
            "BreadcrumbList",
            "FAQPage (Linked to visible on-page FAQs)"
        ],
        internalLinkTargets: [
            "/hims-software",
            "/emr-ehr-system",
            "/nabh-compliant-hospital-software",
            "/pricing",
            "https://www.medical365.in/book-demo"
        ],
        safeguards: {
            preserveGa4: true,
            preserveGtm: true,
            zeroFakeReviews: true,
            zeroPhase2bImpact: true,
            preserveCanonical: true
        }
    });
});

console.log('Total pages in implementation plan:', implementationPlan.length);
const planPath = path.join(repoRoot, 'scratch/specialty_seo_implementation_plan.json');
fs.writeFileSync(planPath, JSON.stringify(implementationPlan, null, 2), 'utf8');
console.log('Saved implementation plan to scratch/specialty_seo_implementation_plan.json');
