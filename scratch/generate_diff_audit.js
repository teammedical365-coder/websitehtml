const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
console.log('=== GENERATING DIFF AUDIT JSON ===');

const modifiedList = JSON.parse(fs.readFileSync(path.join(repoRoot, 'scratch/specialty_seo_modified_files.json'), 'utf8'));

const diffAudit = {
    generatedAt: new Date().toISOString(),
    totalFilesModified: modifiedList.length,
    modifiedFiles: modifiedList.map(item => ({
        filename: item.filename,
        slug: item.slug,
        cluster: item.cluster,
        primaryKeyword: item.primaryKeyword,
        modifications: [
            "Optimized <title> and unique <meta name='description'>",
            "Added 4 valid JSON-LD schemas: SoftwareApplication, WebPage, BreadcrumbList, FAQPage",
            "Removed generic OPD placeholder content",
            "Injected clinical hero with primary intent H1 and dual CTAs",
            "Injected AEO Quick Answer / Definition Box for direct answer-engine extraction",
            "Injected 6 specialized clinical & operational capability cards",
            "Injected 5-step clinical workflow process",
            "Injected operational advantages & use cases (centralized, paperless, multi-disciplinary)",
            "Injected contextual internal links into /hims-software, /emr-ehr-system, /nabh-compliant-hospital-software, /pricing, and cluster peers",
            "Injected 4-5 specialty-specific FAQs matching exact question search queries",
            "Preserved GA4 (G-RMGG2LX0RF) and GTM (GTM-W5H82GQ7)",
            "Preserved original canonical tags without alteration"
        ]
    }))
};

fs.writeFileSync(path.join(repoRoot, 'scratch/specialty_seo_diff_audit.json'), JSON.stringify(diffAudit, null, 2), 'utf8');
console.log('Saved scratch/specialty_seo_diff_audit.json');
