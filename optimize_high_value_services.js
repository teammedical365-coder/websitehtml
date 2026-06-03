const fs = require('fs');
const path = require('path');

const targetPages = [
    {
        file: 'revenue-cycle-management.html',
        serviceName: 'Hospital Revenue Cycle Management',
        title: 'Hospital Revenue Cycle Management Software India | RCM | Medical365',
        desc: 'Medical365 RCM Software automates billing, TPA claims & financial reporting for Indian hospitals. Reduce revenue leakage by 15%. ABDM compliant. Free demo.',
        h1Append: ' — Zero Revenue Leakage & TPA Automation'
    },
    {
        file: 'clinical-assessment-forms.html',
        serviceName: 'Clinical Assessment Forms',
        title: 'Clinical Assessment Forms Software India | EMR | Medical365',
        desc: 'Medical365 Clinical Assessment Forms — drag-and-drop builder with PHQ-9, GAD-7, MMSE & 20+ validated tools. ABDM compliant EMR India. Book free demo today.',
        h1Append: ' — PHQ-9, GAD-7, MMSE & 20+ Validated Tools'
    },
    {
        file: 'outpatient.html',
        serviceName: 'Outpatient Management',
        title: 'Outpatient Management Software India | OPD System | Medical365',
        desc: 'Medical365 OPD Software manages appointments, EMR, billing & queue for Indian clinics. ABDM compliant outpatient system. Trusted by 500+ facilities. Free demo.',
        h1Append: ' — Smart Queue, EMR & Billing in One Platform'
    },
    {
        file: 'inpatient.html',
        serviceName: 'Inpatient Management',
        title: 'Inpatient Management Software India | IPD System | Medical365',
        desc: 'Medical365 IPD Software manages bed allocation, ward rounds, OT scheduling & discharge for Indian hospitals. NABH & ABDM compliant. Book free demo today.',
        h1Append: ' — Bed Management, Ward Rounds & Discharge'
    },
    {
        file: 'hrms.html',
        serviceName: 'Hospital HRMS',
        title: 'Hospital HRMS Software India | Staff Management | Medical365',
        desc: 'Medical365 Hospital HRMS manages staff attendance, payroll, duty rosters & HR compliance for Indian hospitals. ABDM compliant. Book free demo today.',
        h1Append: ' — Payroll, Rosters & HR Compliance'
    },
    {
        file: 'operation-theater-management.html',
        serviceName: 'Operation Theater Management',
        title: 'Operation Theater Management Software India | OT | Medical365',
        desc: 'Medical365 OT Management Software schedules surgeries, tracks instruments & manages OT workflows for Indian hospitals. NABH compliant. Book free demo.',
        h1Append: ' — Surgery Scheduling & Instrument Tracking'
    },
    {
        file: 'nursing-management-system.html',
        serviceName: 'Nursing Management System',
        title: 'Nursing Management System Software India | ABDM | Medical365',
        desc: 'Medical365 Nursing Management System tracks vitals, care plans & shift handovers for Indian hospital wards. ABDM & NABH compliant. Book free demo today.',
        h1Append: ' — Vitals, Care Plans & Shift Handovers'
    },
    {
        file: 'patient-portal.html',
        serviceName: 'Patient Portal',
        title: 'Patient Portal Software India | Self-Service Healthcare | Medical365',
        desc: 'Medical365 Patient Portal — self-service appointment booking, report downloads & bill payments for Indian hospitals. ABDM compliant. Book free demo today.',
        h1Append: ' — Self-Service Bookings & Report Downloads'
    },
    {
        file: 'queue-token-management.html',
        serviceName: 'Hospital Queue Token Management',
        title: 'Hospital Queue Token Management Software India | Medical365',
        desc: 'Medical365 Queue & Token Management reduces OPD wait times by 40% with smart token display & WhatsApp alerts. ABDM compliant India. Book free demo today.',
        h1Append: ' — 40% Faster OPD & WhatsApp Alerts'
    },
    {
        file: 'supply-chain.html',
        serviceName: 'Hospital Supply Chain Management',
        title: 'Hospital Supply Chain Management Software India | Medical365',
        desc: 'Medical365 Supply Chain Management tracks procurement, vendor management & inventory for Indian hospitals. ABDM compliant HMS. Book free demo today.',
        h1Append: ' — Procurement, Vendor & Inventory Management'
    }
];

const dirPath = __dirname;

function parseFaqs(htmlContent) {
    let faqs = [];
    // Extract questions and answers from the FAQ section
    // The FAQ section structure typically has <button class="faq-question"> and <div class="faq-answer"><p>
    const qRegex = /<button class="faq-question"[^>]*>([^<]+(?:<span[^>]*>[^<]*<\/span>)?.*?)<\/button>/g;
    const aRegex = /<div class="faq-answer"[^>]*>\s*<p>(.*?)<\/p>/g;
    
    let qMatch;
    let qs = [];
    while ((qMatch = qRegex.exec(htmlContent)) !== null) {
        // clean up the question text (remove spans if any)
        let qText = qMatch[1].replace(/<[^>]+>/g, '').trim();
        qs.push(qText);
    }
    
    let aMatch;
    let as = [];
    while ((aMatch = aRegex.exec(htmlContent)) !== null) {
        let aText = aMatch[1].trim();
        as.push(aText);
    }
    
    // Pair them up
    let len = Math.min(qs.length, as.length);
    for (let i = 0; i < len; i++) {
        faqs.push({ question: qs[i], answer: as[i] });
    }
    return faqs;
}

targetPages.forEach(page => {
    let filePath = path.join(dirPath, page.file);
    if (!fs.existsSync(filePath)) {
        console.log("File not found: " + page.file);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Update Title and Meta Description
    content = content.replace(/<title>.*?<\/title>/is, `<title>${page.title}</title>`);
    
    if (content.match(/<meta name="description"[^>]*>/i)) {
        content = content.replace(/<meta name="description"[^>]*>/i, `<meta name="description" content="${page.desc.replace(/"/g, '&quot;')}">`);
    } else {
        content = content.replace('</title>', `</title>\n    <meta name="description" content="${page.desc.replace(/"/g, '&quot;')}">`);
    }
    
    // Fix OG and Twitter tags to match the new title and desc (Part A logic specifically for these pages to ensure consistency)
    if (content.match(/<meta property="og:title"[^>]*>/i)) {
        content = content.replace(/<meta property="og:title"[^>]*>/gi, `<meta property="og:title" content="${page.title}">`);
    }
    if (content.match(/<meta property="og:description"[^>]*>/i)) {
        content = content.replace(/<meta property="og:description"[^>]*>/gi, `<meta property="og:description" content="${page.desc.replace(/"/g, '&quot;')}">`);
    }
    if (content.match(/<meta name="twitter:title"[^>]*>/i)) {
        content = content.replace(/<meta name="twitter:title"[^>]*>/gi, `<meta name="twitter:title" content="${page.title}">`);
    }
    if (content.match(/<meta name="twitter:description"[^>]*>/i)) {
        content = content.replace(/<meta name="twitter:description"[^>]*>/gi, `<meta name="twitter:description" content="${page.desc.replace(/"/g, '&quot;')}">`);
    }

    // 2. Append to existing H1
    // Need to find the H1 tag and append to its inner text
    let h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/i);
    if (h1Match) {
        let oldH1Content = h1Match[1];
        if (!oldH1Content.includes(page.h1Append)) {
            let newH1Content = oldH1Content + page.h1Append;
            let h1Full = h1Match[0].replace(oldH1Content, newH1Content);
            content = content.replace(h1Match[0], h1Full);
        }
    }

    // Extract FAQs for FAQPage Schema
    let faqs = parseFaqs(content);
    let faqSchemaStr = '';
    if (faqs.length > 0) {
        let faqEntities = faqs.map(f => {
            return `    {
      "@type": "Question",
      "name": "${f.question.replace(/"/g, '\\"')}",
      "acceptedAnswer": {"@type": "Answer", "text": "${f.answer.replace(/"/g, '\\"')}"}
    }`;
        }).join(',\n');
        
        faqSchemaStr = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
${faqEntities}
  ]
}
</script>`;
    }

    // Remove old conflicting JSON-LD schemas
    content = content.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');

    // Canonical URL
    let canonicalUrl = `https://www.medical365.in/${page.file.replace('.html', '')}`;

    // 3. Inject Schemas
    const schemas = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Medical365 — ${page.serviceName}",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web, Android, iOS",
  "url": "${canonicalUrl}",
  "description": "${page.desc.replace(/"/g, '\\"')}",
  "offers": {"@type": "Offer", "price": "6000", "priceCurrency": "INR"},
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "500",
    "bestRating": "5"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Medical365",
    "url": "https://www.medical365.in",
    "logo": "https://www.medical365.in/medical365logo1.png",
    "telephone": "+91-77919-10007"
  }
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.medical365.in/"},
    {"@type": "ListItem", "position": 2, "name": "Solutions", "item": "https://www.medical365.in/"},
    {"@type": "ListItem", "position": 3, "name": "${page.serviceName}", "item": "${canonicalUrl}"}
  ]
}
</script>${faqSchemaStr}
`;

    content = content.replace('</head>', schemas + '\n</head>');

    // Optional: Geo tags if missing
    const geoTags = `
    <!-- Geo Tags -->
    <meta name="geo.region" content="IN-RJ" />
    <meta name="geo.placename" content="Jaipur, Rajasthan, India" />
    <meta name="geo.position" content="26.9124;75.7873" />
    <meta name="ICBM" content="26.9124, 75.7873" />`;
    if (!content.includes('geo.region')) {
        content = content.replace('</head>', geoTags + '\n</head>');
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Processed high-value page: " + page.file);
});
