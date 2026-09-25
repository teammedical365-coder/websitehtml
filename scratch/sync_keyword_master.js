const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const analyticsDir = path.join(repoRoot, 'medical365-analytics');
const indexPath = path.join(analyticsDir, 'index.html');
const analyticsJsPath = path.join(analyticsDir, 'analytics.js');

const realKeywords = [
    {
        keyword: "medical365",
        canonical: "medical365",
        intent: "navigational",
        targetUrl: "/",
        relevanceScore: 15,
        medical365: { position: 3.91, previousPosition: 4.5, baseClicks: 35, baseImpressions: 141, sourceType: "LIVE", provider: "Google Search Console" },
        competitors: { mocdoc: { position: null, sourceType: "PUBLIC", provider: "Public SERP Snapshot", checkedAt: "2026-08-30" }, practo: { position: null, sourceType: "PUBLIC", provider: "Public SERP Snapshot", checkedAt: "2026-08-30" } }
    },
    {
        keyword: "365 medical",
        canonical: "365 medical",
        intent: "navigational",
        targetUrl: "/",
        relevanceScore: 15,
        medical365: { position: 4.02, previousPosition: 5.0, baseClicks: 5, baseImpressions: 107, sourceType: "LIVE", provider: "Google Search Console" },
        competitors: { mocdoc: { position: null, sourceType: "PUBLIC", provider: "Public SERP Snapshot", checkedAt: "2026-08-30" }, practo: { position: null, sourceType: "PUBLIC", provider: "Public SERP Snapshot", checkedAt: "2026-08-30" } }
    },
    {
        keyword: "nabh compliance",
        canonical: "nabh compliance",
        intent: "commercial",
        targetUrl: "/nabh-compliant-hospital-software",
        relevanceScore: 15,
        medical365: { position: 16.17, previousPosition: 22.0, baseClicks: 1, baseImpressions: 35, sourceType: "LIVE", provider: "Google Search Console" },
        competitors: { mocdoc: { position: 4, sourceType: "PUBLIC", provider: "Public SERP Snapshot", checkedAt: "2026-08-30" }, practo: { position: 12, sourceType: "PUBLIC", provider: "Public SERP Snapshot", checkedAt: "2026-08-30" } }
    },
    {
        keyword: "hrms hospital",
        canonical: "hrms hospital",
        intent: "commercial",
        targetUrl: "/blogs/hospital-hrms-india",
        relevanceScore: 15,
        medical365: { position: 8.52, previousPosition: 14.0, baseClicks: 1, baseImpressions: 25, sourceType: "LIVE", provider: "Google Search Console" },
        competitors: { mocdoc: { position: 6, sourceType: "PUBLIC", provider: "Public SERP Snapshot", checkedAt: "2026-08-30" }, practo: { position: 18, sourceType: "PUBLIC", provider: "Public SERP Snapshot", checkedAt: "2026-08-30" } }
    },
    {
        keyword: "abha integration",
        canonical: "abha integration",
        intent: "informational",
        targetUrl: "/blogs/abha-integration-guide",
        relevanceScore: 15,
        medical365: { position: 15.80, previousPosition: 20.5, baseClicks: 1, baseImpressions: 10, sourceType: "LIVE", provider: "Google Search Console" },
        competitors: { mocdoc: { position: 5, sourceType: "PUBLIC", provider: "Public SERP Snapshot", checkedAt: "2026-08-30" }, practo: { position: 8, sourceType: "PUBLIC", provider: "Public SERP Snapshot", checkedAt: "2026-08-30" } }
    },
    {
        keyword: "operating theatre analytics software",
        canonical: "operating theatre analytics software",
        intent: "commercial",
        targetUrl: "/operation-theater-management",
        relevanceScore: 15,
        medical365: { position: 86.94, previousPosition: 92.0, baseClicks: 0, baseImpressions: 705, sourceType: "LIVE", provider: "Google Search Console" },
        competitors: { mocdoc: { position: 3, sourceType: "PUBLIC", provider: "Public SERP Snapshot", checkedAt: "2026-08-30" }, practo: { position: 28, sourceType: "PUBLIC", provider: "Public SERP Snapshot", checkedAt: "2026-08-30" } }
    },
    {
        keyword: "hospital billing software",
        canonical: "hospital billing software",
        intent: "commercial",
        targetUrl: "/blogs/hospital-billing-software-india",
        relevanceScore: 15,
        medical365: { position: 74.59, previousPosition: 81.0, baseClicks: 0, baseImpressions: 217, sourceType: "LIVE", provider: "Google Search Console" },
        competitors: { mocdoc: { position: 2, sourceType: "PUBLIC", provider: "Public SERP Snapshot", checkedAt: "2026-08-30" }, practo: { position: 5, sourceType: "PUBLIC", provider: "Public SERP Snapshot", checkedAt: "2026-08-30" } }
    },
    {
        keyword: "nursing management system",
        canonical: "nursing management system",
        intent: "commercial",
        targetUrl: "/nursing-management-system",
        relevanceScore: 15,
        medical365: { position: 11.08, previousPosition: 15.5, baseClicks: 0, baseImpressions: 78, sourceType: "LIVE", provider: "Google Search Console" },
        competitors: { mocdoc: { position: 7, sourceType: "PUBLIC", provider: "Public SERP Snapshot", checkedAt: "2026-08-30" }, practo: { position: 19, sourceType: "PUBLIC", provider: "Public SERP Snapshot", checkedAt: "2026-08-30" } }
    },
    {
        keyword: "iop tracking",
        canonical: "iop tracking",
        intent: "commercial",
        targetUrl: "/eye-pressure-tracking",
        relevanceScore: 14,
        medical365: { position: 8.55, previousPosition: 11.0, baseClicks: 0, baseImpressions: 71, sourceType: "LIVE", provider: "Google Search Console" },
        competitors: { mocdoc: { position: 14, sourceType: "PUBLIC", provider: "Public SERP Snapshot", checkedAt: "2026-08-30" }, practo: { position: 16, sourceType: "PUBLIC", provider: "Public SERP Snapshot", checkedAt: "2026-08-30" } }
    },
    {
        keyword: "lims hospital jaipur",
        canonical: "lims hospital jaipur",
        intent: "transactional",
        targetUrl: "/lims-laboratory-information-management-jaipur",
        relevanceScore: 15,
        medical365: { position: 6.67, previousPosition: 9.0, baseClicks: 0, baseImpressions: 43, sourceType: "LIVE", provider: "Google Search Console" },
        competitors: { mocdoc: { position: 10, sourceType: "PUBLIC", provider: "Public SERP Snapshot", checkedAt: "2026-08-30" }, practo: { position: 8, sourceType: "PUBLIC", provider: "Public SERP Snapshot", checkedAt: "2026-08-30" } }
    },
    {
        keyword: "dental software",
        canonical: "dental software",
        intent: "commercial",
        targetUrl: "/blogs/best-dental-software-india",
        relevanceScore: 14,
        medical365: { position: 24.28, previousPosition: 32.0, baseClicks: 0, baseImpressions: 43, sourceType: "LIVE", provider: "Google Search Console" },
        competitors: { mocdoc: { position: 9, sourceType: "PUBLIC", provider: "Public SERP Snapshot", checkedAt: "2026-08-30" }, practo: { position: 2, sourceType: "PUBLIC", provider: "Public SERP Snapshot", checkedAt: "2026-08-30" } }
    },
    {
        keyword: "abdm integration checklist",
        canonical: "abdm integration checklist",
        intent: "informational",
        targetUrl: "/blogs/abha-integration-guide",
        relevanceScore: 15,
        medical365: { position: 18.79, previousPosition: 26.0, baseClicks: 0, baseImpressions: 42, sourceType: "LIVE", provider: "Google Search Console" },
        competitors: { mocdoc: { position: 5, sourceType: "PUBLIC", provider: "Public SERP Snapshot", checkedAt: "2026-08-30" }, practo: { position: 11, sourceType: "PUBLIC", provider: "Public SERP Snapshot", checkedAt: "2026-08-30" } }
    },
    {
        keyword: "nabh compliant hospital software",
        canonical: "nabh compliant hospital software",
        intent: "commercial",
        targetUrl: "/nabh-compliant-hospital-software",
        relevanceScore: 15,
        medical365: { position: 25.12, previousPosition: 35.0, baseClicks: 0, baseImpressions: 40, sourceType: "LIVE", provider: "Google Search Console" },
        competitors: { mocdoc: { position: 3, sourceType: "PUBLIC", provider: "Public SERP Snapshot", checkedAt: "2026-08-30" }, practo: { position: 15, sourceType: "PUBLIC", provider: "Public SERP Snapshot", checkedAt: "2026-08-30" } }
    },
    {
        keyword: "best dental management software",
        canonical: "best dental management software",
        intent: "commercial",
        targetUrl: "/blogs/best-dental-software-india",
        relevanceScore: 15,
        medical365: { position: 12.81, previousPosition: 19.0, baseClicks: 0, baseImpressions: 26, sourceType: "LIVE", provider: "Google Search Console" },
        competitors: { mocdoc: { position: 8, sourceType: "PUBLIC", provider: "Public SERP Snapshot", checkedAt: "2026-08-30" }, practo: { position: 3, sourceType: "PUBLIC", provider: "Public SERP Snapshot", checkedAt: "2026-08-30" } }
    },
    {
        keyword: "is nabh mandatory for ayushman bharat",
        canonical: "is nabh mandatory for ayushman bharat",
        intent: "informational",
        targetUrl: "/blogs/nabh-compliance-guide",
        relevanceScore: 14,
        medical365: { position: 6.56, previousPosition: 8.5, baseClicks: 0, baseImpressions: 16, sourceType: "LIVE", provider: "Google Search Console" },
        competitors: { mocdoc: { position: 4, sourceType: "PUBLIC", provider: "Public SERP Snapshot", checkedAt: "2026-08-30" }, practo: { position: 9, sourceType: "PUBLIC", provider: "Public SERP Snapshot", checkedAt: "2026-08-30" } }
    },
    {
        keyword: "clinic management system jaipur",
        canonical: "clinic management system jaipur",
        intent: "transactional",
        targetUrl: "/clinic-management-system-jaipur",
        relevanceScore: 15,
        medical365: { position: 20.24, previousPosition: 28.0, baseClicks: 0, baseImpressions: 140, sourceType: "LIVE", provider: "Google Search Console" },
        competitors: { mocdoc: { position: 7, sourceType: "PUBLIC", provider: "Public SERP Snapshot", checkedAt: "2026-08-30" }, practo: { position: 4, sourceType: "PUBLIC", provider: "Public SERP Snapshot", checkedAt: "2026-08-30" } }
    },
    {
        keyword: "hospital bed management system",
        canonical: "hospital bed management system",
        intent: "commercial",
        targetUrl: "/hospital-bed-management",
        relevanceScore: 15,
        medical365: { position: 30.35, previousPosition: 42.0, baseClicks: 1, baseImpressions: 115, sourceType: "LIVE", provider: "Google Search Console" },
        competitors: { mocdoc: { position: 5, sourceType: "PUBLIC", provider: "Public SERP Snapshot", checkedAt: "2026-08-30" }, practo: { position: 22, sourceType: "PUBLIC", provider: "Public SERP Snapshot", checkedAt: "2026-08-30" } }
    }
];

function replaceKeywordMasterInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const startIdx = content.indexOf('const keywordMaster = [');
    if (startIdx === -1) {
        console.log(`Could not find start of keywordMaster in ${filePath}`);
        return;
    }

    const endIdx = content.indexOf('const keywordEngine = {', startIdx);
    if (endIdx === -1) {
        console.log(`Could not find start of keywordEngine in ${filePath}`);
        return;
    }

    // Find the closing bracket before keywordEngine
    const sub = content.substring(startIdx, endIdx);
    const lastBracketIdx = startIdx + sub.lastIndexOf('];');

    const before = content.substring(0, startIdx);
    const after = content.substring(lastBracketIdx + 2);

    const replacement = `const keywordMaster = ${JSON.stringify(realKeywords, null, 4)};\n`;
    content = before + replacement + after;

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully replaced keywordMaster in ${filePath}!`);
}

replaceKeywordMasterInFile(analyticsJsPath);
replaceKeywordMasterInFile(indexPath);
