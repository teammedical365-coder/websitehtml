const fs = require('fs');
const path = require('path');

const sourceFile = path.join(__dirname, 'e-prescriptions.html');
const blogsDir = path.join(__dirname, 'blogs');

if (!fs.existsSync(blogsDir)){
    fs.mkdirSync(blogsDir);
}

const blogs = [
    {
        filename: 'abha-integration-guide.html',
        head: `
<title>ABHA Integration Guide for Hospitals — How to Get ABDM Compliant 2026 | Medical365</title>
<meta name="description" content="Complete ABHA integration guide for Indian hospitals 2026. Step-by-step ABDM compliance, ABHA ID generation, and how Medical365 makes it seamless. Free guide.">
<meta name="keywords" content="ABHA integration guide, ABDM compliant hospital, ABHA ID generation, Ayushman Bharat Digital Mission hospital, ABDM compliance India 2026, Medical365">
<link rel="canonical" href="https://www.medical365.in/blogs/abha-integration-guide">
<meta property="og:title" content="ABHA Integration Guide — How to Get ABDM Compliant in 2026">
<meta property="og:description" content="Complete ABHA integration guide for Indian hospitals. ABDM compliance, ABHA ID setup & how Medical365 makes it seamless. Free guide 2026.">
<meta name="twitter:title" content="ABHA Integration Guide — ABDM Compliance for Indian Hospitals 2026">
<meta name="twitter:description" content="Step-by-step ABHA integration guide for Indian hospitals. ABDM compliance & ABHA ID setup made easy with Medical365.">
`,
        schema: `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "ABHA Integration Guide for Hospitals — How to Get ABDM Compliant 2026",
  "datePublished": "2026-06-03",
  "dateModified": "2026-06-03",
  "author": {"@type": "Organization", "name": "Medical365", "url": "https://www.medical365.in"},
  "publisher": {
    "@type": "Organization",
    "name": "Medical365",
    "logo": {"@type": "ImageObject", "url": "https://www.medical365.in/medical365logo1.png"}
  },
  "mainEntityOfPage": {"@type": "WebPage", "@id": "https://www.medical365.in/blogs/abha-integration-guide"}
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is ABDM compliance mandatory for Indian hospitals?",
      "acceptedAnswer": {"@type": "Answer", "text": "While not yet universally mandatory, ABDM compliance and ABHA ID support are required for Ayushman Bharat PMJAY empanelment and are rapidly becoming the standard for all Indian healthcare providers."}
    },
    {
      "@type": "Question",
      "name": "What is ABHA ID and why does it matter?",
      "acceptedAnswer": {"@type": "Answer", "text": "ABHA (Ayushman Bharat Health Account) is a 14-digit unique health ID for every Indian citizen. It allows patients to link their health records across hospitals and access them digitally — making it the foundation of India's digital health ecosystem."}
    },
    {
      "@type": "Question",
      "name": "How does Medical365 support ABHA integration?",
      "acceptedAnswer": {"@type": "Answer", "text": "Medical365 is fully ABDM compliant and supports ABHA ID generation, verification, and linking natively within the HMS. Patients can be registered with their ABHA ID at OPD, and their records are automatically linked to the national health ecosystem."}
    }
  ]
}
</script>
`,
        body: `
<article style="max-width:800px;margin:0 auto;padding:40px 20px;">

  <nav aria-label="breadcrumb" style="margin-bottom: 20px; font-size: 0.9rem;">
    <a href="/">Home</a> &rsaquo;
    <a href="/blogs">Insights & Blogs</a> &rsaquo;
    ABHA Integration Guide
  </nav>

  <h1 style="font-family:'Fraunces',serif; font-size: 2.5rem; color: #0f172a; margin-bottom: 10px;">ABHA Integration Guide for Hospitals — How to Get ABDM Compliant in 2026</h1>
  <p style="color: #64748b; margin-bottom: 30px;"><em>By Medical365 Team &nbsp;|&nbsp; June 2026 &nbsp;|&nbsp; 7 min read</em></p>

  <p style="margin-bottom: 20px; font-size: 1.1rem; line-height: 1.7; color: #334155;">India's Ayushman Bharat Digital Mission (ABDM) is transforming how
  hospitals manage patient data. At its core is the ABHA ID — a 14-digit
  unique health identifier for every Indian citizen. For hospitals and
  clinics, integrating ABHA is no longer optional — it is the foundation
  of modern, compliant healthcare in India.</p>

  <h2 style="font-size: 1.8rem; color: #1e293b; margin: 40px 0 15px;">What is ABHA (Ayushman Bharat Health Account)?</h2>
  <p style="margin-bottom: 20px; font-size: 1.1rem; line-height: 1.7; color: #334155;">ABHA is a voluntary 14-digit unique health ID issued by the National
  Health Authority (NHA) of India. It allows patients to:</p>
  <ul style="margin-bottom: 30px; padding-left: 20px; line-height: 1.7; color: #334155;">
    <li>Link all their health records from different hospitals in one place</li>
    <li>Share records digitally with any ABDM-compliant provider</li>
    <li>Access health records via the ABHA app or patient portal</li>
    <li>Receive insurance claims processing faster through digital records</li>
  </ul>

  <h2 style="font-size: 1.8rem; color: #1e293b; margin: 40px 0 15px;">What is ABDM and Why Does It Matter?</h2>
  <p style="margin-bottom: 20px; font-size: 1.1rem; line-height: 1.7; color: #334155;">Ayushman Bharat Digital Mission (ABDM) is India's national digital
  health infrastructure — a framework connecting patients, providers,
  pharmacies, labs, and insurers through a common digital ecosystem.
  Hospitals that integrate with ABDM benefit from:</p>
  <ul style="margin-bottom: 30px; padding-left: 20px; line-height: 1.7; color: #334155;">
    <li>Eligibility for Ayushman Bharat PMJAY empanelment</li>
    <li>Faster insurance claim processing via digital records</li>
    <li>Reduced paperwork and patient registration time</li>
    <li>Participation in India's growing digital health economy</li>
    <li>Future-proofing against upcoming regulatory requirements</li>
  </ul>

  <h2 style="font-size: 1.8rem; color: #1e293b; margin: 40px 0 15px;">ABDM Compliance Requirements for Hospitals</h2>
  <p style="margin-bottom: 10px; font-size: 1.1rem; color: #334155;">To become ABDM compliant, your hospital needs to:</p>
  <ol style="margin-bottom: 30px; padding-left: 20px; line-height: 1.7; color: #334155;">
    <li><strong>Register on ABDM HRP portal</strong> as a Health Registered Provider (HRP)</li>
    <li><strong>Integrate ABHA ID generation</strong> at patient registration</li>
    <li><strong>Link patient records</strong> to ABHA IDs in your HMS</li>
    <li><strong>Implement FHIR-compliant data exchange</strong> for health records sharing</li>
    <li><strong>Meet MoHFW EHR Standards</strong> for structured clinical documentation</li>
    <li><strong>Comply with DPDP Act 2023</strong> for patient data privacy</li>
  </ol>

  <h2 style="font-size: 1.8rem; color: #1e293b; margin: 40px 0 15px;">Step-by-Step ABHA Integration with Medical365</h2>
  <ol style="margin-bottom: 30px; padding-left: 20px; line-height: 1.7; color: #334155;">
    <li><strong>Onboarding:</strong> Medical365's team registers your facility on the ABDM HRP portal during implementation</li>
    <li><strong>ABHA ID at Registration:</strong> Front desk staff can generate or verify patient ABHA IDs directly within Medical365's OPD registration screen</li>
    <li><strong>Record Linking:</strong> Every consultation, prescription, lab result, and discharge summary is automatically linked to the patient's ABHA ID</li>
    <li><strong>Patient Access:</strong> Patients can view their linked records via the ABHA app or Medical365 Patient Portal</li>
    <li><strong>Health Information Exchange:</strong> Records can be shared with other ABDM-compliant providers with patient consent</li>
  </ol>

  <h2 style="font-size: 1.8rem; color: #1e293b; margin: 40px 0 15px;">ABHA Integration Checklist for Your Hospital</h2>
  <ul style="margin-bottom: 30px; padding-left: 20px; line-height: 1.7; color: #334155; list-style-type: none;">
    <li>☐ Register facility on ABDM Health Facility Registry (HFR)</li>
    <li>☐ Register on Health Professional Registry (HPR) for all doctors</li>
    <li>☐ Deploy ABDM-compliant HMS with ABHA ID support</li>
    <li>☐ Train front desk staff on ABHA ID generation workflow</li>
    <li>☐ Implement FHIR-compliant data storage</li>
    <li>☐ Set up patient consent management for record sharing</li>
    <li>☐ Test integration with ABDM sandbox environment</li>
    <li>☐ Go live and start generating ABHA IDs for patients</li>
  </ul>

  <div style="background:#f0f7ff;padding:24px;border-radius:8px;margin:32px 0;border-left:4px solid #0066cc;">
    <h3 style="margin-top:0; font-size: 1.5rem; color: #1e3a8a;">Get ABDM Compliant with Medical365</h3>
    <p style="margin-bottom: 20px; font-size: 1.05rem; color: #1e40af;">Medical365 is fully ABDM integrated. Our team handles the entire
    ABHA setup for your hospital during onboarding — no technical hassle.
    Book a free demo and get compliant in weeks.</p>
    <a href="https://www.medical365.in/book-demo"
       style="background:#0066cc;color:#fff;padding:12px 28px;border-radius:6px;text-decoration:none;display:inline-block;font-weight:bold;">
      Book Free Demo →
    </a>
  </div>

  <h2 style="font-size: 1.8rem; color: #1e293b; margin: 40px 0 15px;">Frequently Asked Questions</h2>

  <h3 style="font-size: 1.3rem; color: #334155; margin-top: 20px;">Is ABDM compliance mandatory for Indian hospitals?</h3>
  <p style="margin-bottom: 20px; font-size: 1.1rem; line-height: 1.7; color: #334155;">While not yet universally mandatory, ABDM compliance and ABHA ID
  support are required for Ayushman Bharat PMJAY empanelment and are
  rapidly becoming the standard for all Indian healthcare providers.</p>

  <h3 style="font-size: 1.3rem; color: #334155; margin-top: 20px;">What is ABHA ID and why does it matter?</h3>
  <p style="margin-bottom: 20px; font-size: 1.1rem; line-height: 1.7; color: #334155;">ABHA is a 14-digit unique health ID for every Indian citizen, allowing
  patients to link their health records across hospitals and access them
  digitally — the foundation of India's digital health ecosystem.</p>

  <h3 style="font-size: 1.3rem; color: #334155; margin-top: 20px;">How does Medical365 support ABHA integration?</h3>
  <p style="margin-bottom: 20px; font-size: 1.1rem; line-height: 1.7; color: #334155;">Medical365 supports ABHA ID generation, verification, and linking
  natively within the HMS. Patients are registered with ABHA at OPD, and
  records are automatically linked to the national health ecosystem.</p>

</article>
`
    },
    {
        filename: 'hospital-software-rajasthan.html',
        head: `
<title>Top 10 Hospital Management Software in Rajasthan 2026 | Medical365</title>
<meta name="description" content="Comparing the best hospital management software for Rajasthan hospitals 2026 — features, pricing, ABDM compliance & which HMS suits your facility size. Free guide.">
<meta name="keywords" content="hospital management software Rajasthan, best HMS Rajasthan 2026, hospital software Jaipur, NABH compliant HMS Rajasthan, Medical365 Rajasthan">
<link rel="canonical" href="https://www.medical365.in/blogs/hospital-software-rajasthan">
<meta property="og:title" content="Top 10 Hospital Management Software in Rajasthan 2026">
<meta property="og:description" content="Best HMS for Rajasthan hospitals 2026 — features, pricing, ABDM compliance compared. Find the right hospital software for your facility.">
<meta name="twitter:title" content="Top 10 Hospital Management Software Rajasthan 2026">
<meta name="twitter:description" content="Best HMS for Rajasthan hospitals 2026. Features, pricing & ABDM compliance compared. Find the right software for your facility.">
`,
        schema: `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Top 10 Hospital Management Software in Rajasthan 2026",
  "datePublished": "2026-06-03",
  "dateModified": "2026-06-03",
  "author": {"@type": "Organization", "name": "Medical365", "url": "https://www.medical365.in"},
  "publisher": {
    "@type": "Organization",
    "name": "Medical365",
    "logo": {"@type": "ImageObject", "url": "https://www.medical365.in/medical365logo1.png"}
  },
  "mainEntityOfPage": {"@type": "WebPage", "@id": "https://www.medical365.in/blogs/hospital-software-rajasthan"},
  "about": {"@type": "SoftwareApplication", "name": "Hospital Management Software", "applicationCategory": "HealthApplication"}
}
</script>
`,
        body: `
<article style="max-width:800px;margin:0 auto;padding:40px 20px;">

  <nav aria-label="breadcrumb" style="margin-bottom: 20px; font-size: 0.9rem;">
    <a href="/">Home</a> &rsaquo;
    <a href="/blogs">Insights & Blogs</a> &rsaquo;
    Hospital Software Rajasthan
  </nav>

  <h1 style="font-family:'Fraunces',serif; font-size: 2.5rem; color: #0f172a; margin-bottom: 10px;">Top 10 Hospital Management Software in Rajasthan 2026</h1>
  <p style="color: #64748b; margin-bottom: 30px;"><em>By Medical365 Team &nbsp;|&nbsp; June 2026 &nbsp;|&nbsp; 8 min read</em></p>

  <p style="margin-bottom: 20px; font-size: 1.1rem; line-height: 1.7; color: #334155;">Rajasthan's healthcare sector is growing rapidly — from Jaipur's
  private hospital chains to nursing homes in Jodhpur, Udaipur, and Kota.
  Choosing the right Hospital Management Software (HMS) is the single most
  important technology decision for your facility in 2026. This guide
  compares the top options based on ABDM compliance, features, pricing,
  and suitability for Rajasthan's unique healthcare environment.</p>

  <h2 style="font-size: 1.8rem; color: #1e293b; margin: 40px 0 15px;">What to Look for in Hospital Software for Rajasthan</h2>
  <ul style="margin-bottom: 30px; padding-left: 20px; line-height: 1.7; color: #334155;">
    <li><strong>ABDM & ABHA compliance</strong> — mandatory for PMJAY empanelment</li>
    <li><strong>NABH readiness</strong> — essential for accreditation</li>
    <li><strong>Offline-first architecture</strong> — critical for areas with
    intermittent internet connectivity</li>
    <li><strong>Hindi language support</strong> — for staff across districts</li>
    <li><strong>Local support team</strong> — on-site training in Rajasthan</li>
    <li><strong>Affordable pricing</strong> — suitable for nursing homes and
    district hospitals</li>
  </ul>

  <h2 style="font-size: 1.8rem; color: #1e293b; margin: 40px 0 15px;">Top 10 Hospital Management Software for Rajasthan 2026</h2>

  <h3 style="font-size: 1.4rem; color: #334155; margin: 25px 0 10px;">1. Medical365 — Best Overall for Rajasthan (Jaipur-Based)</h3>
  <p style="margin-bottom: 10px; font-size: 1.1rem; line-height: 1.7; color: #334155;"><strong>Best for:</strong> All facility types from single-doctor clinics
  to 500+ bed multi-specialty hospitals</p>
  <p style="margin-bottom: 10px; font-size: 1.1rem; line-height: 1.7; color: #334155;">Medical365 is the only hospital management platform built specifically
  for the Indian and Rajasthan healthcare ecosystem — with an office in
  Malviya Nagar, Jaipur, and dedicated on-site support teams across
  Rajasthan. It offers full ABDM compliance, ABHA ID integration, offline-first
  architecture, and NABH-ready documentation.</p>
  <p style="margin-bottom: 10px; font-size: 1.1rem; line-height: 1.7; color: #334155;"><strong>Key features:</strong> EMR, OPD/IPD, pharmacy, LIMS, RCM,
  telemedicine, HRMS, and 50+ specialty modules</p>
  <p style="margin-bottom: 10px; font-size: 1.1rem; line-height: 1.7; color: #334155;"><strong>Pricing:</strong> From ₹6,000/year for clinics |
  ₹30,000/year for multi-specialty</p>
  <p style="margin-bottom: 20px; font-size: 1.1rem; line-height: 1.7; color: #334155;"><strong>ABDM:</strong> ✅ Full | <strong>NABH:</strong> ✅ Ready |
  <strong>Local Support:</strong> ✅ Rajasthan team</p>

  <h3 style="font-size: 1.4rem; color: #334155; margin: 25px 0 10px;">2. Practo Ray — Best for Small Clinics</h3>
  <p style="margin-bottom: 10px; font-size: 1.1rem; line-height: 1.7; color: #334155;"><strong>Best for:</strong> Individual practitioners and small OPD clinics</p>
  <p style="margin-bottom: 10px; font-size: 1.1rem; line-height: 1.7; color: #334155;">Practo Ray is widely used across India for basic appointment management
  and simple EMR. Strong for individual practitioners but limited for
  complex hospital workflows.</p>
  <p style="margin-bottom: 20px; font-size: 1.1rem; line-height: 1.7; color: #334155;"><strong>Limitation:</strong> Not suitable for IPD, OT management, or
  multi-specialty hospitals</p>

  <h3 style="font-size: 1.4rem; color: #334155; margin: 25px 0 10px;">3. Meddbase — Best for Mid-Size Hospitals</h3>
  <p style="margin-bottom: 10px; font-size: 1.1rem; line-height: 1.7; color: #334155;"><strong>Best for:</strong> 25–100 bed hospitals needing comprehensive modules</p>
  <p style="margin-bottom: 20px; font-size: 1.1rem; line-height: 1.7; color: #334155;">Meddbase offers strong clinical modules but limited local support in
  Rajasthan. May require significant customization for Indian compliance.</p>

  <h3 style="font-size: 1.4rem; color: #334155; margin: 25px 0 10px;">4. eVital HMS — Budget Option</h3>
  <p style="margin-bottom: 10px; font-size: 1.1rem; line-height: 1.7; color: #334155;"><strong>Best for:</strong> Nursing homes and small hospitals on tight budgets</p>
  <p style="margin-bottom: 20px; font-size: 1.1rem; line-height: 1.7; color: #334155;">eVital provides basic HMS functionality at a lower price point but
  may lack full ABDM integration and advanced specialty modules.</p>

  <h3 style="font-size: 1.4rem; color: #334155; margin: 25px 0 10px;">5. HealthPlix — Best for OPD-Heavy Practices</h3>
  <p style="margin-bottom: 10px; font-size: 1.1rem; line-height: 1.7; color: #334155;"><strong>Best for:</strong> High-volume OPD doctors needing AI-assisted EMR</p>
  <p style="margin-bottom: 20px; font-size: 1.1rem; line-height: 1.7; color: #334155;">HealthPlix uses AI for prescription assistance and is popular among
  individual specialists. Limited for full hospital management.</p>

  <h2 style="font-size: 1.8rem; color: #1e293b; margin: 40px 0 15px;">How to Choose the Right HMS for Your Rajasthan Hospital</h2>
  <table style="width:100%;border-collapse:collapse;margin:20px 0; font-size: 1.05rem;">
    <thead style="background:#0066cc;color:#fff;">
      <tr>
        <th style="padding:12px;text-align:left;">Facility Type</th>
        <th style="padding:12px;text-align:left;">Recommended Software</th>
        <th style="padding:12px;text-align:left;">Key Reason</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom:1px solid #eee;">
        <td style="padding:10px;">Single doctor clinic</td>
        <td style="padding:10px;">Medical365 Starter</td>
        <td style="padding:10px;">₹6,000/yr, ABDM compliant</td>
      </tr>
      <tr style="border-bottom:1px solid #eee;background:#f9f9f9;">
        <td style="padding:10px;">Multi-doctor clinic</td>
        <td style="padding:10px;">Medical365 Clinic Basic</td>
        <td style="padding:10px;">₹15,000/yr, 5 doctors</td>
      </tr>
      <tr style="border-bottom:1px solid #eee;">
        <td style="padding:10px;">Nursing home (25–50 beds)</td>
        <td style="padding:10px;">Medical365 Multi-Specialty</td>
        <td style="padding:10px;">Full IPD + pharmacy</td>
      </tr>
      <tr style="border-bottom:1px solid #eee;background:#f9f9f9;">
        <td style="padding:10px;">District hospital (100+ beds)</td>
        <td style="padding:10px;">Medical365 Enterprise</td>
        <td style="padding:10px;">Full HMS + NABH support</td>
      </tr>
      <tr>
        <td style="padding:10px;">Hospital chain (multi-city)</td>
        <td style="padding:10px;">Medical365 Enterprise</td>
        <td style="padding:10px;">Centralized dashboard</td>
      </tr>
    </tbody>
  </table>

  <div style="background:#f0f7ff;padding:24px;border-radius:8px;margin:32px 0;border-left:4px solid #0066cc;">
    <h3 style="margin-top:0; font-size: 1.5rem; color: #1e3a8a;">Get a Free On-Site Demo in Rajasthan</h3>
    <p style="margin-bottom: 20px; font-size: 1.05rem; color: #1e40af;">Medical365 offers free on-site demos anywhere in Rajasthan —
    Jaipur, Jodhpur, Udaipur, Kota, Ajmer, Bikaner, and beyond. Our
    local team will visit your facility and show you exactly how Medical365
    works for your specific workflows.</p>
    <a href="https://www.medical365.in/book-demo"
       style="background:#0066cc;color:#fff;padding:12px 28px;border-radius:6px;text-decoration:none;display:inline-block;font-weight:bold;">
      Book Free On-Site Demo →
    </a>
  </div>

  <h2 style="font-size: 1.8rem; color: #1e293b; margin: 40px 0 15px;">Frequently Asked Questions</h2>

  <h3 style="font-size: 1.3rem; color: #334155; margin-top: 20px;">Which hospital software is best for Rajasthan?</h3>
  <p style="margin-bottom: 20px; font-size: 1.1rem; line-height: 1.7; color: #334155;">Medical365 is the top-rated hospital management software for Rajasthan —
  built for Indian compliance, with a Jaipur-based support team and
  on-site demo availability across all major Rajasthan cities.</p>

  <h3 style="font-size: 1.3rem; color: #334155; margin-top: 20px;">What is the cost of hospital management software in Rajasthan?</h3>
  <p style="margin-bottom: 20px; font-size: 1.1rem; line-height: 1.7; color: #334155;">HMS pricing in Rajasthan ranges from ₹6,000/year for small clinics
  to ₹1 lakh+ per year for large multi-specialty hospitals. Medical365
  offers transparent pricing starting at ₹6,000/year with no hidden costs.</p>

  <h3 style="font-size: 1.3rem; color: #334155; margin-top: 20px;">Is hospital management software mandatory in Rajasthan?</h3>
  <p style="margin-bottom: 20px; font-size: 1.1rem; line-height: 1.7; color: #334155;">While not legally mandatory for all facilities, ABDM-compliant HMS
  is required for Ayushman Bharat PMJAY empanelment, and NABH-ready HMS
  is needed for hospital accreditation — both essential for growth in
  Rajasthan's healthcare market.</p>

</article>
`
    }
];

let baseContent = fs.readFileSync(sourceFile, 'utf8');

// Find the header end
let headerEndMatch = baseContent.match(/<\/header>/i);
let headerEndIndex = headerEndMatch.index + 9;

// Find the footer start
let footerStartMatch = baseContent.match(/<!-- ═══════════════════════════════════════════════════════════════\s*MEDICAL365 MEGA FOOTER/i);
let fallbackFooterMatch = baseContent.match(/<footer id="mega-footer"/i);
let footerStartIndex = footerStartMatch ? footerStartMatch.index : (fallbackFooterMatch ? fallbackFooterMatch.index : -1);

let baseTopPart = baseContent.substring(0, headerEndIndex);
let baseBottomPart = baseContent.substring(footerStartIndex);

// Adjust asset paths
baseTopPart = baseTopPart.replace(/href="style\.css"/g, 'href="../style.css"');
baseTopPart = baseTopPart.replace(/href="global-styles\.css/g, 'href="../global-styles.css');
baseTopPart = baseTopPart.replace(/href="medical365fav\.jpg"/g, 'href="../medical365fav.jpg"');
baseTopPart = baseTopPart.replace(/src="medical365fav\.jpg"/g, 'src="../medical365fav.jpg"');
baseTopPart = baseTopPart.replace(/href="([^"http#]+)"/g, (match, p1) => {
    if (!p1.startsWith('http') && !p1.startsWith('//') && !p1.startsWith('tel:') && !p1.startsWith('mailto:') && !p1.startsWith('../')) {
        return 'href="../' + p1 + '"';
    }
    return match;
});
baseBottomPart = baseBottomPart.replace(/src="global-scripts\.js/g, 'src="../global-scripts.js');
baseBottomPart = baseBottomPart.replace(/href="([^"http#]+)"/g, (match, p1) => {
    if (!p1.startsWith('http') && !p1.startsWith('//') && !p1.startsWith('tel:') && !p1.startsWith('mailto:') && !p1.startsWith('../')) {
        return 'href="../' + p1 + '"';
    }
    return match;
});

// Remove existing title, meta, canonical from base top part
baseTopPart = baseTopPart.replace(/<title>.*?<\/title>/is, '');
baseTopPart = baseTopPart.replace(/<meta name="description"[^>]*>/i, '');
baseTopPart = baseTopPart.replace(/<meta name="keywords"[^>]*>/i, '');
baseTopPart = baseTopPart.replace(/<link[^>]*rel="canonical"[^>]*>/i, '');
baseTopPart = baseTopPart.replace(/<meta property="og:title"[^>]*>/i, '');
baseTopPart = baseTopPart.replace(/<meta property="og:description"[^>]*>/i, '');
baseTopPart = baseTopPart.replace(/<meta name="twitter:title"[^>]*>/i, '');
baseTopPart = baseTopPart.replace(/<meta name="twitter:description"[^>]*>/i, '');
baseTopPart = baseTopPart.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');

blogs.forEach(blog => {
    let top = baseTopPart;
    top = top.replace('</head>', blog.head + '\n' + blog.schema + '\n</head>');
    let fullHtml = top + '\n<main id="main">\n' + blog.body + '\n</main>\n' + baseBottomPart;
    let destPath = path.join(blogsDir, blog.filename);
    fs.writeFileSync(destPath, fullHtml, 'utf8');
    console.log("Created blog: " + blog.filename);
});

// Update blogs.html
const blogsFile = path.join(__dirname, 'blogs.html');
if (fs.existsSync(blogsFile)) {
    let blogListingContent = fs.readFileSync(blogsFile, 'utf8');
    
    // Add articles 3 & 4 into the existing posts-grid if they are not there
    if (!blogListingContent.includes('/blogs/abha-integration-guide')) {
        // they are already in the listing I wrote earlier! I just need to make sure they are generated.
        // Let's verify that
    }
}
