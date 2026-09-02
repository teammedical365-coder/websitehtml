const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
console.log('=== INJECTING CONTEXTUAL PILLAR LINKS INTO TOP-PERFORMING BLOGS ===');

const linksToAdd = [
    {
        file: 'blogs/hospital-software-rajasthan.html',
        search: '<td style="padding:10px;">Full HMS + NABH support</td>',
        replace: '<td style="padding:10px;">Full <a href="/hims-software" style="color:#0066cc;font-weight:600;">HIMS Software</a> + <a href="/nabh-compliant-hospital-software" style="color:#0066cc;font-weight:600;">NABH Compliance</a> support</td>'
    },
    {
        file: 'blogs/cloud-vs-onpremise-hms.html',
        search: 'Whether you choose cloud or on-premise,',
        replace: 'Whether you choose cloud or on-premise, exploring an enterprise-grade <a href="/hims-software" style="color:#0066cc;font-weight:600;">HIMS software in India</a> that meets <a href="/nabh-compliant-hospital-software" style="color:#0066cc;font-weight:600;">NABH 5th Edition standards</a> ensures your hospital is future-proof. Whether you choose cloud or on-premise,'
    },
    {
        file: 'blogs/hospital-billing-software-india.html',
        search: 'Integrated billing with ABDM and insurance claims',
        replace: 'Integrated billing with ABDM and insurance claims is a core module of modern <a href="/hims-software" style="color:#0066cc;font-weight:600;">hospital management software</a> and <a href="/nabh-compliant-hospital-software" style="color:#0066cc;font-weight:600;">NABH hospital systems</a>'
    },
    {
        file: 'blogs/hospital-pharmacy-software.html',
        search: 'Complete pharmacy management integrates seamlessly',
        replace: 'Complete pharmacy management integrates seamlessly with our comprehensive <a href="/hims-software" style="color:#0066cc;font-weight:600;">HIMS hospital software</a>, <a href="/blood-bank" style="color:#0066cc;font-weight:600;">blood bank management</a>, and <a href="/nabh-compliant-hospital-software" style="color:#0066cc;font-weight:600;">NABH accreditation standards</a>'
    },
    {
        file: 'blogs/medical365-vs-practo.html',
        search: 'For hospitals requiring multi-department coordination,',
        replace: 'For hospitals requiring multi-department coordination, a unified <a href="/hims-software" style="color:#0066cc;font-weight:600;">HIMS software suite</a> with statutory <a href="/nabh-compliant-hospital-software" style="color:#0066cc;font-weight:600;">NABH audit logging</a> is essential. For hospitals requiring multi-department coordination,'
    },
    {
        file: 'blogs/opd-queue-management.html',
        search: 'An efficient OPD queue system is the first touchpoint',
        replace: 'An efficient OPD queue system is the first touchpoint of a complete <a href="/hims-software" style="color:#0066cc;font-weight:600;">HIMS hospital management system</a> and <a href="/hospital-bed-management" style="color:#0066cc;font-weight:600;">bed management workflow</a>'
    }
];

let updatedCount = 0;
linksToAdd.forEach(item => {
    const filePath = path.join(repoRoot, item.file);
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${item.file}`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(item.search)) {
        content = content.replace(item.search, item.replace);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated contextual links in: ${item.file}`);
        updatedCount++;
    } else {
        console.log(`Search string not matched in: ${item.file} (possibly already linked)`);
    }
});

console.log(`Successfully injected high-authority internal links into ${updatedCount} top-ranking blogs!`);
