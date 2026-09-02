const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
console.log('=== SURGICAL INJECTION OF PILLAR LINKS INTO TOP BLOGS ===');

const edits = [
    {
        file: 'blogs/cloud-vs-onpremise-hms.html',
        search: 'Choosing between Cloud and On-Premise architecture is the most foundational IT decision a hospital will make.',
        replace: 'Choosing between Cloud and On-Premise architecture is the most foundational IT decision a hospital will make when evaluating enterprise <a href="/hims-software" style="color:var(--c-primary);font-weight:600;">HIMS software in India</a> and statutory <a href="/nabh-compliant-hospital-software" style="color:var(--c-primary);font-weight:600;">NABH compliance frameworks</a>.'
    },
    {
        file: 'blogs/medical365-vs-practo.html',
        search: 'Medical365 is a dedicated Hospital Management System (HMS) built specifically for comprehensive hospital workflows, multi-specialty chains, and deep ABDM compliance.',
        replace: 'Medical365 is a dedicated <a href="/hims-software" style="color:var(--c-primary);font-weight:600;">HIMS software suite</a> built specifically for comprehensive hospital workflows, <a href="/nabh-compliant-hospital-software" style="color:var(--c-primary);font-weight:600;">NABH accreditation standards</a>, and deep ABDM compliance.'
    },
    {
        file: 'blogs/medical365-vs-practo.html',
        search: '<td>Advanced (Ward, Room, OT)</td>',
        replace: '<td>Advanced (<a href="/hospital-bed-management" style="color:var(--c-primary);font-weight:600;">Bed Management</a>, Ward, Room, OT)</td>'
    },
    {
        file: 'blogs/hospital-billing-software-india.html',
        search: 'Medical365’s Revenue Cycle Management (RCM) module is built specifically for Indian hospitals.',
        replace: 'Medical365’s Revenue Cycle Management (RCM) module is built directly into our comprehensive <a href="/hims-software" style="color:var(--c-primary);font-weight:600;">HIMS software in India</a> and statutory <a href="/nabh-compliant-hospital-software" style="color:var(--c-primary);font-weight:600;">NABH compliance suite</a>, connecting seamlessly with <a href="/blood-bank" style="color:var(--c-primary);font-weight:600;">blood bank management</a>.'
    },
    {
        file: 'blogs/hospital-pharmacy-software.html',
        search: 'The Medical365 Pharmacy module is deeply integrated into the core HMS.',
        replace: 'The Medical365 Pharmacy module is deeply integrated into the core <a href="/hims-software" style="color:var(--c-primary);font-weight:600;">HIMS hospital software</a>, connecting directly with <a href="/blood-bank" style="color:var(--c-primary);font-weight:600;">blood bank operations</a> and <a href="/nabh-compliant-hospital-software" style="color:var(--c-primary);font-weight:600;">NABH compliance protocols</a>.'
    },
    {
        file: 'blogs/opd-queue-management.html',
        search: 'Managing this flow efficiently is a critical operational challenge in high-volume Indian hospitals.',
        replace: 'Managing this flow efficiently is a critical operational challenge in high-volume Indian hospitals evaluating modern <a href="/hims-software" style="color:var(--c-primary);font-weight:600;">HIMS software in India</a> and integrated <a href="/hospital-bed-management" style="color:var(--c-primary);font-weight:600;">bed management workflows</a>.'
    }
];

let applied = 0;
edits.forEach(e => {
    const filePath = path.join(repoRoot, e.file);
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(e.search)) {
        content = content.replace(e.search, e.replace);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Applied link to: ${e.file}`);
        applied++;
    } else {
        console.log(`Pattern already replaced or not found in: ${e.file}`);
    }
});

console.log(`Total edits applied: ${applied} / ${edits.length}`);
