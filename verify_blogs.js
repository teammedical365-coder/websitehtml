const fs = require('fs');
const path = require('path');

const blogsDir = path.join(__dirname, 'blogs');
const files = [
    'hospital-billing-software-india.html',
    'digitize-clinic-30-days.html',
    'telemedicine-india-guide.html',
    'dpdp-act-2023-hospitals.html',
    'best-dental-software-india.html',
    'opd-queue-management.html',
    'hospital-pharmacy-software.html',
    'lims-vs-manual-lab.html',
    'ai-hospital-management-india.html',
    'cloud-vs-onpremise-hms.html',
    'medical365-vs-practo.html',
    'hospital-hrms-india.html'
];

let allPassed = true;

console.log("=== Verification Checks ===");

console.log("\\n1. Checking file existence and size...");
files.forEach(f => {
    const fPath = path.join(blogsDir, f);
    if (!fs.existsSync(fPath)) {
        console.error("❌ Missing: " + f);
        allPassed = false;
    } else {
        const stats = fs.statSync(fPath);
        if (stats.size < 30000) {
            console.error("❌ File too small (<30KB): " + f + " (" + stats.size + " bytes)");
            allPassed = false;
        } else {
            console.log("✅ " + f + " (" + stats.size + " bytes)");
        }
    }
});

const sampleContent = fs.readFileSync(path.join(blogsDir, 'hospital-billing-software-india.html'), 'utf8');

console.log("\\n2. Checking Header Extraction...");
const megaMenuMatches = (sampleContent.match(/mega-menu|Solutions|Clinics|Hospitals/gi) || []).length;
if (megaMenuMatches >= 3) {
    console.log("✅ Header extraction successful (Found " + megaMenuMatches + " nav matches)");
} else {
    console.error("❌ Header extraction failed! Only " + megaMenuMatches + " matches found.");
    allPassed = false;
}

console.log("\\n3. Checking Schema Injection...");
const hasBlogPosting = sampleContent.includes('BlogPosting');
const hasFAQPage = sampleContent.includes('FAQPage');
const hasBreadcrumbList = sampleContent.includes('BreadcrumbList');
if (hasBlogPosting && hasFAQPage && hasBreadcrumbList) {
    console.log("✅ All 3 Schema blocks found (BlogPosting, FAQPage, BreadcrumbList)");
} else {
    console.error("❌ Missing Schema blocks!");
    console.error("BlogPosting: " + hasBlogPosting + ", FAQPage: " + hasFAQPage + ", BreadcrumbList: " + hasBreadcrumbList);
    allPassed = false;
}

console.log("\\n4. Checking GTM Injection...");
let gtmPassed = true;
files.forEach(f => {
    const content = fs.readFileSync(path.join(blogsDir, f), 'utf8');
    if (!content.includes('GTM-W5H82GQ7')) {
        console.error("❌ Missing GTM in " + f);
        gtmPassed = false;
    }
});
if (gtmPassed) {
    console.log("✅ GTM found in all 12 files");
} else {
    allPassed = false;
}

console.log("\\n5. Checking Sitemap update...");
const sitemapPath = path.join(__dirname, 'sitemap.xml');
const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
if (sitemapContent.includes('hospital-billing-software-india') && sitemapContent.includes('hospital-hrms-india')) {
    console.log("✅ Sitemap updated with new URLs");
} else {
    console.error("❌ Sitemap does not contain the new URLs");
    allPassed = false;
}

console.log("\\n6. Checking for white text outside allowed classes...");
const whiteRegex = /color:\s*(#fff|#ffffff|white)\b/gi;
const allowedClasses = ['cta-box', 'blog-hero', 'gradient', 'badge', 'btn', 'trust', 'hero', 'badge'];
let whiteTextFailed = false;
files.forEach(f => {
    const content = fs.readFileSync(path.join(blogsDir, f), 'utf8');
    let match;
    while ((match = whiteRegex.exec(content)) !== null) {
        const context = content.substring(Math.max(0, match.index - 50), match.index);
        const isAllowed = allowedClasses.some(cls => context.includes(cls));
        if (!isAllowed) {
            console.error("❌ Potential white text issue in " + f + ": ..." + context + match[0] + "...");
            whiteTextFailed = true;
        }
    }
});
if (!whiteTextFailed) {
    console.log("✅ No unauthorized white text found.");
}

console.log("\\n" + (allPassed ? "🎉 ALL VERIFICATIONS PASSED!" : "⚠️ SOME VERIFICATIONS FAILED."));
