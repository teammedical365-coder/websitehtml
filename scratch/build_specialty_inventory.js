const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
console.log('=== PHASE 1: READ-ONLY INVENTORY OF SPECIALTY & MODULE PAGES ===');

// The candidate pages listed in the specification
const candidateClusters = {
    "CARDIOLOGY": [
        "ecg-ekg-integration",
        "echocardiography-reports",
        "stress-test-management",
        "cardiac-risk-scoring",
        "angiography-reports",
        "pacemaker-tracking",
        "lipid-profile-tracking",
        "cardiac-history-templates"
    ],
    "NEUROLOGY": [
        "eeg-reports",
        "mri-ct-integration",
        "seizure-tracking",
        "cognitive-assessment",
        "stroke-management",
        "neurological-exam-forms"
    ],
    "PEDIATRICS": [
        "growth-charts",
        "vaccination-tracking",
        "pediatric-dosage-calculator",
        "developmental-milestones",
        "neonatal-records",
        "parent-communication"
    ],
    "ORTHOPEDICS": [
        "xray-imaging-integration",
        "fracture-management",
        "joint-mobility-tracking",
        "implant-records",
        "physiotherapy-notes",
        "surgery-planning"
    ],
    "OPHTHALMOLOGY": [
        "vision-refraction-charts",
        "retina-imaging-integration",
        "eye-pressure-tracking",
        "optical-prescription-mgt",
        "lasik-surgery-records"
    ],
    "DENTAL": [
        "dental-tooth-chart",
        "dental-imaging",
        "dental-treatment-planning",
        "dental-procedure-history",
        "dental-insurance-billing"
    ],
    "DERMATOLOGY": [
        "skin-image-tracking",
        "dermatology-photos",
        "dermatology-treatment-plans",
        "cosmetic-procedure-records",
        "allergy-tracking"
    ],
    "ONCOLOGY": [
        "cancer-staging",
        "chemotherapy-plans",
        "radiation-therapy-records",
        "tumor-tracking",
        "oncology-reports",
        "clinical-trial-management"
    ],
    "GYNECOLOGY": [
        "pregnancy-tracking",
        "antenatal-care-records",
        "ultrasound-reports",
        "delivery-records",
        "fertility-treatment-tracking"
    ],
    "PSYCHIATRY": [
        "mental-health-assessments",
        "therapy-session-notes",
        "medication-tracking",
        "behavioral-history",
        "confidential-records"
    ],
    "GENERAL PRACTICE": [
        "patient-history",
        "diagnosis-treatment",
        "e-prescriptions",
        "lab-integration",
        "billing-reports"
    ],
    "CORE PLATFORM": [
        "patient-registration",
        "appointment-scheduling",
        "emr-ehr-system",
        "billing-invoicing",
        "notifications-system",
        "cloud-security"
    ]
};

// Check Phase 2B exclusion list
let phase2bUrls = new Set();
try {
    const rawPairs = JSON.parse(fs.readFileSync(path.join(repoRoot, 'scratch/phase2b_raw_extracted_pairs.json'), 'utf8'));
    rawPairs.forEach(p => {
        phase2bUrls.add(p.url_a);
        phase2bUrls.add(p.url_b);
    });
    console.log('Loaded', phase2bUrls.size, 'Phase 2B URLs to strictly protect and exclude.');
} catch (e) {
    console.warn('Could not load phase2b_raw_extracted_pairs.json:', e.message);
}

const inventory = [];
let totalCandidates = 0;
let existingCount = 0;
let missingCount = 0;

for (const [cluster, slugs] of Object.entries(candidateClusters)) {
    for (const slug of slugs) {
        totalCandidates++;
        const filename = slug + '.html';
        const fullPath = path.join(repoRoot, filename);
        const url = `https://www.medical365.in/${slug}`;

        // Verify Phase 2B isolation
        const isPhase2b = phase2bUrls.has(url) || phase2bUrls.has(slug);
        if (isPhase2b) {
            console.error(`CRITICAL WARNING: ${slug} belongs to Phase 2B! Skipping.`);
            continue;
        }

        if (!fs.existsSync(fullPath)) {
            missingCount++;
            inventory.push({
                cluster,
                slug,
                url,
                filename,
                exists: false
            });
            continue;
        }

        existingCount++;
        const html = fs.readFileSync(fullPath, 'utf8');

        // Extract metadata
        const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
        const title = titleMatch ? titleMatch[1].trim() : '';

        const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
        const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : '';

        const metaDescMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
        const metaDescription = metaDescMatch ? metaDescMatch[1].trim() : '';

        const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([\s\S]*?)["']/i);
        const canonical = canonicalMatch ? canonicalMatch[1].trim() : '';

        const robotsMatch = html.match(/<meta\s+name=["']robots["']\s+content=["']([\s\S]*?)["']/i);
        const robots = robotsMatch ? robotsMatch[1].trim() : 'index, follow';

        // Word count estimate (strip scripts, styles, html tags)
        const textOnly = html
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        const wordCount = textOnly.split(' ').filter(w => w.length > 0).length;

        // Headings structure
        const h2s = (html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || []).map(h => h.replace(/<[^>]+>/g, '').trim());
        const h3s = (html.match(/<h3[^>]*>([\s\S]*?)<\/h3>/gi) || []).map(h => h.replace(/<[^>]+>/g, '').trim());

        // Images
        const imgMatches = html.match(/<img\b[^>]*>/gi) || [];
        const images = imgMatches.map(img => {
            const srcMatch = img.match(/src=["']([^"']+)["']/i);
            const altMatch = img.match(/alt=["']([^"']*)["']/i);
            const wMatch = img.match(/width=["']([^"']+)["']/i);
            const hMatch = img.match(/height=["']([^"']+)["']/i);
            return {
                src: srcMatch ? srcMatch[1] : '',
                alt: altMatch ? altMatch[1] : '',
                width: wMatch ? wMatch[1] : null,
                height: hMatch ? hMatch[1] : null
            };
        });

        // Schema extraction
        const schemaMatches = html.match(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
        const schemaTypes = [];
        schemaMatches.forEach(sm => {
            try {
                const raw = sm.replace(/<\/?script[^>]*>/gi, '').trim();
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) {
                    parsed.forEach(item => { if (item['@type']) schemaTypes.push(item['@type']); });
                } else if (parsed && parsed['@type']) {
                    schemaTypes.push(parsed['@type']);
                }
            } catch (err) {}
        });

        // Tracking checks
        const hasGa4 = html.includes('G-RMGG2LX0RF');
        const hasGtm = html.includes('GTM-W5H82GQ7');

        // Internal link count
        const linkMatches = html.match(/href=["'](\/[^"']*|https?:\/\/www\.medical365\.in\/[^"']*)["']/gi) || [];

        // FAQ detection
        const hasFaq = html.includes('faq-section') || html.includes('accordion') || h2s.some(h => /faq|frequently asked/i.test(h));

        inventory.push({
            cluster,
            slug,
            url,
            filename,
            exists: true,
            title,
            h1,
            metaDescription,
            canonical,
            robots,
            wordCount,
            headings: {
                h2Count: h2s.length,
                h2List: h2s,
                h3Count: h3s.length,
                h3List: h3s.slice(0, 5)
            },
            images: {
                count: images.length,
                items: images
            },
            schemaTypes,
            tracking: {
                hasGa4,
                hasGtm
            },
            internalLinkCount: linkMatches.length,
            hasFaq
        });
    }
}

console.log(`Scan Summary: Total candidates: ${totalCandidates}, Existing in repository: ${existingCount}, Missing: ${missingCount}`);

// Save to scratch/specialty_seo_before_snapshot.json
const snapshotPath = path.join(repoRoot, 'scratch/specialty_seo_before_snapshot.json');
fs.writeFileSync(snapshotPath, JSON.stringify(inventory, null, 2), 'utf8');
console.log('Saved snapshot to scratch/specialty_seo_before_snapshot.json');
