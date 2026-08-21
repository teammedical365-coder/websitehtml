const fs = require('fs');
const path = require('path');

const sourceFile = path.join(__dirname, 'e-prescriptions.html');
const blogsDir = path.join(__dirname, 'blogs');

if (!fs.existsSync(blogsDir)){
    fs.mkdirSync(blogsDir);
}

const blogs = [
    {
        filename: 'emr-vs-ehr-india.html',
        head: `
<title>EMR vs EHR — What's the Difference for Indian Hospitals? | Medical365</title>
<meta name="description" content="EMR vs EHR explained for Indian hospitals. Understand key differences, which system suits your clinic, and why ABDM compliance matters. Free guide by Medical365.">
<meta name="keywords" content="EMR vs EHR India, electronic medical records vs health records, difference EMR EHR, ABDM EMR India, hospital software India, Medical365">
<link rel="canonical" href="https://www.medical365.in/blogs/emr-vs-ehr-india">
<meta property="og:title" content="EMR vs EHR — What's the Difference for Indian Hospitals?">
<meta property="og:description" content="Understand EMR vs EHR for Indian hospitals. Key differences, compliance requirements & which system suits your clinic. Complete guide by Medical365.">
<meta property="og:type" content="article">
<meta name="twitter:title" content="EMR vs EHR — What's the Difference for Indian Hospitals?">
<meta name="twitter:description" content="Understand EMR vs EHR for Indian hospitals. Key differences, compliance & which system suits your clinic. Medical365 guide.">
`,
        schema: `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "EMR vs EHR — What's the Difference for Indian Hospitals?",
  "description": "EMR vs EHR explained for Indian hospitals. Key differences, compliance and which system suits your clinic.",
  "image": "https://www.medical365.in/medical365logo1.png",
  "datePublished": "2026-06-03",
  "dateModified": "2026-06-03",
  "author": {"@type": "Organization", "name": "Medical365", "url": "https://www.medical365.in"},
  "publisher": {
    "@type": "Organization",
    "name": "Medical365",
    "logo": {"@type": "ImageObject", "url": "https://www.medical365.in/medical365logo1.png"}
  },
  "mainEntityOfPage": {"@type": "WebPage", "@id": "https://www.medical365.in/blogs/emr-vs-ehr-india"}
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is EMR and EHR the same thing in India?",
      "acceptedAnswer": {"@type": "Answer", "text": "Not exactly. In Indian healthcare, EMR is a single-facility digital record while EHR is a cross-facility interoperable system aligned with ABDM and MoHFW standards."}
    },
    {
      "@type": "Question",
      "name": "Does Medical365 support ABDM EHR compliance?",
      "acceptedAnswer": {"@type": "Answer", "text": "Yes. Medical365 is fully compliant with ABDM, supports ABHA ID generation and linking, meets MoHFW EHR Standards, and is DPDP Act 2023 ready."}
    },
    {
      "@type": "Question",
      "name": "What is the cost of EMR software in India?",
      "acceptedAnswer": {"@type": "Answer", "text": "Medical365 starts at ₹6,000 per year for individual doctors and clinics, and ₹15,000 per year for multi-doctor clinics. Enterprise pricing for hospitals is available on request."}
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
    EMR vs EHR India
  </nav>

  <h1 style="font-family:'Fraunces',serif; font-size: 2.5rem; color: #0f172a; margin-bottom: 10px;">EMR vs EHR — What's the Difference for Indian Hospitals?</h1>
  <p style="color: #64748b; margin-bottom: 30px;"><em>By Medical365 Team &nbsp;|&nbsp; June 2026 &nbsp;|&nbsp; 5 min read</em></p>

  <p style="margin-bottom: 20px; font-size: 1.1rem; line-height: 1.7; color: #334155;">If you are evaluating hospital software in India, you have likely come
  across both terms — EMR and EHR — often used interchangeably. But they
  are not the same thing, and choosing the right one matters for your
  hospital's compliance, operations, and long-term growth.</p>

  <h2 style="font-size: 1.8rem; color: #1e293b; margin: 40px 0 15px;">What is an EMR (Electronic Medical Record)?</h2>
  <p style="margin-bottom: 20px; font-size: 1.1rem; line-height: 1.7; color: #334155;">An EMR is a digital version of a patient's paper chart within a
  single practice or hospital. It contains the medical and treatment
  history of patients seen at that one provider only. EMRs are primarily
  clinical tools used by doctors and nurses to diagnose and treat patients
  within their own facility.</p>
  <ul style="margin-bottom: 30px; padding-left: 20px; line-height: 1.7; color: #334155;">
    <li>Patient history, diagnoses, medications and treatment plans</li>
    <li>Lab results and imaging reports within the facility</li>
    <li>Appointment scheduling and billing integration</li>
    <li>Accessible only within the specific clinic or hospital</li>
  </ul>

  <h2 style="font-size: 1.8rem; color: #1e293b; margin: 40px 0 15px;">What is an EHR (Electronic Health Record)?</h2>
  <p style="margin-bottom: 20px; font-size: 1.1rem; line-height: 1.7; color: #334155;">An EHR goes beyond the single practice. It is a comprehensive,
  interoperable digital health record designed to be shared across
  multiple healthcare providers, labs, pharmacies, and hospitals. EHRs
  give a complete picture of a patient's health history — regardless of
  where they received care.</p>
  <ul style="margin-bottom: 30px; padding-left: 20px; line-height: 1.7; color: #334155;">
    <li>Interoperable across hospitals, labs, and pharmacies</li>
    <li>Supports ABDM/ABHA ID integration in India</li>
    <li>Enables continuity of care across providers</li>
    <li>Compliant with MoHFW EHR Standards India</li>
  </ul>

  <h2 style="font-size: 1.8rem; color: #1e293b; margin: 40px 0 15px;">EMR vs EHR — Side by Side Comparison</h2>
  <table style="width:100%;border-collapse:collapse;margin:20px 0; font-size: 1.05rem;">
    <thead style="background:#0066cc;color:#fff;">
      <tr>
        <th style="padding:12px;text-align:left;">Feature</th>
        <th style="padding:12px;text-align:left;">EMR</th>
        <th style="padding:12px;text-align:left;">EHR</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom:1px solid #eee;">
        <td style="padding:10px;">Scope</td>
        <td style="padding:10px;">Single facility</td>
        <td style="padding:10px;">Multiple providers</td>
      </tr>
      <tr style="border-bottom:1px solid #eee;background:#f9f9f9;">
        <td style="padding:10px;">Data Sharing</td>
        <td style="padding:10px;">Internal only</td>
        <td style="padding:10px;">Cross-facility</td>
      </tr>
      <tr style="border-bottom:1px solid #eee;">
        <td style="padding:10px;">ABDM Compliance</td>
        <td style="padding:10px;">Partial</td>
        <td style="padding:10px;">Full</td>
      </tr>
      <tr style="border-bottom:1px solid #eee;background:#f9f9f9;">
        <td style="padding:10px;">ABHA ID Support</td>
        <td style="padding:10px;">Limited</td>
        <td style="padding:10px;">Native</td>
      </tr>
      <tr style="border-bottom:1px solid #eee;">
        <td style="padding:10px;">Best For</td>
        <td style="padding:10px;">Small clinics</td>
        <td style="padding:10px;">Hospitals & chains</td>
      </tr>
      <tr style="background:#f9f9f9;">
        <td style="padding:10px;">India Regulation</td>
        <td style="padding:10px;">Basic</td>
        <td style="padding:10px;">MoHFW EHR Standards</td>
      </tr>
    </tbody>
  </table>

  <h2 style="font-size: 1.8rem; color: #1e293b; margin: 40px 0 15px;">Which One Does Your Indian Hospital Need?</h2>
  <p style="margin-bottom: 20px; font-size: 1.1rem; line-height: 1.7; color: #334155;">For <strong>small clinics and single-specialty practices</strong> in
  India, a robust EMR system is often sufficient — it digitizes patient
  records, improves prescribing accuracy, and reduces paperwork.</p>
  <p style="margin-bottom: 30px; font-size: 1.1rem; line-height: 1.7; color: #334155;">For <strong>multi-specialty hospitals, hospital chains, and
  government-affiliated facilities</strong>, an EHR system is essential —
  especially with India's push toward ABDM and mandatory ABHA ID
  integration under Ayushman Bharat Digital Mission.</p>

  <h2 style="font-size: 1.8rem; color: #1e293b; margin: 40px 0 15px;">What Does ABDM Require in 2026?</h2>
  <p style="margin-bottom: 30px; font-size: 1.1rem; line-height: 1.7; color: #334155;">India's Ayushman Bharat Digital Mission requires healthcare providers
  to support ABHA ID generation and linking, FHIR-compliant data exchange,
  and adherence to MoHFW EHR Standards. This makes a full EHR system the
  standard for Indian hospitals and clinics in 2026 and beyond.</p>

  <h2 style="font-size: 1.8rem; color: #1e293b; margin: 40px 0 15px;">How Medical365 Solves Both</h2>
  <p style="margin-bottom: 30px; font-size: 1.1rem; line-height: 1.7; color: #334155;">Medical365 combines the clinical depth of an EMR with the
  interoperability of a full EHR — built specifically for Indian healthcare
  compliance. Our platform supports ABDM integration, ABHA ID management,
  FHIR-compliant data storage, and MoHFW EHR Standards — ideal for
  clinics, hospitals, and multi-facility chains across India.</p>

  <div style="background:#f0f7ff;padding:24px;border-radius:8px;margin:32px 0;border-left:4px solid #0066cc;">
    <h3 style="margin-top:0; font-size: 1.5rem; color: #1e3a8a;">Ready to Go Paperless with Medical365?</h3>
    <p style="margin-bottom: 20px; font-size: 1.05rem; color: #1e40af;">Join 500+ hospitals across India. Book a free demo — on-site or
    online, anywhere in India.</p>
    <a href="https://www.medical365.in/book-demo"
       style="background:#0066cc;color:#fff;padding:12px 28px;border-radius:6px;text-decoration:none;display:inline-block;font-weight:bold;">
      Book Free Demo →
    </a>
  </div>

  <h2 style="font-size: 1.8rem; color: #1e293b; margin: 40px 0 15px;">Frequently Asked Questions</h2>

  <h3 style="font-size: 1.3rem; color: #334155; margin-top: 20px;">Is EMR and EHR the same thing in India?</h3>
  <p style="margin-bottom: 20px; font-size: 1.1rem; line-height: 1.7; color: #334155;">Not exactly. EMR is a single-facility digital record while EHR is
  cross-facility and interoperable, aligned with ABDM and MoHFW standards.</p>

  <h3 style="font-size: 1.3rem; color: #334155; margin-top: 20px;">Does Medical365 support ABDM EHR compliance?</h3>
  <p style="margin-bottom: 20px; font-size: 1.1rem; line-height: 1.7; color: #334155;">Yes. Medical365 is fully compliant with ABDM, supports ABHA ID
  generation, meets MoHFW EHR Standards, and is DPDP Act 2023 ready.</p>

  <h3 style="font-size: 1.3rem; color: #334155; margin-top: 20px;">What is the cost of EMR software in India?</h3>
  <p style="margin-bottom: 20px; font-size: 1.1rem; line-height: 1.7; color: #334155;">Medical365 starts at ₹6,000/year for individual doctors and clinics.
  Multi-doctor clinic plans from ₹15,000/year. Enterprise hospital pricing
  available on request.</p>

</article>
`
    },
    {
        filename: 'nabh-compliance-guide.html',
        head: `
<title>What is NABH Compliance? Complete Guide for Indian Hospitals 2026 | Medical365</title>
<meta name="description" content="Complete NABH compliance guide for Indian hospitals 2026. Requirements, accreditation process, and how the right HMS software helps you achieve it faster.">
<meta name="keywords" content="NABH compliance India, NABH accreditation guide, NABH hospital software, NABH compliant HMS, hospital accreditation India 2026, Medical365">
<link rel="canonical" href="https://www.medical365.in/blogs/nabh-compliance-guide">
`,
        schema: `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "What is NABH Compliance? Complete Guide for Indian Hospitals 2026",
  "description": "Complete NABH compliance guide for Indian hospitals 2026. Requirements, accreditation process, and how the right HMS software helps you achieve it faster.",
  "image": "https://www.medical365.in/medical365logo1.png",
  "datePublished": "2026-06-03",
  "dateModified": "2026-06-03",
  "author": {"@type": "Organization", "name": "Medical365", "url": "https://www.medical365.in"},
  "publisher": {
    "@type": "Organization",
    "name": "Medical365",
    "logo": {"@type": "ImageObject", "url": "https://www.medical365.in/medical365logo1.png"}
  },
  "mainEntityOfPage": {"@type": "WebPage", "@id": "https://www.medical365.in/blogs/nabh-compliance-guide"}
}
</script>
`,
        body: `
<article style="max-width:800px;margin:0 auto;padding:40px 20px;">

  <nav aria-label="breadcrumb" style="margin-bottom: 20px; font-size: 0.9rem;">
    <a href="/">Home</a> &rsaquo;
    <a href="/blogs">Insights & Blogs</a> &rsaquo;
    NABH Compliance Guide
  </nav>

  <h1 style="font-family:'Fraunces',serif; font-size: 2.5rem; color: #0f172a; margin-bottom: 10px;">What is NABH Compliance? Complete Guide for Indian Hospitals 2026</h1>
  <p style="color: #64748b; margin-bottom: 30px;"><em>By Medical365 Team &nbsp;|&nbsp; June 2026 &nbsp;|&nbsp; 6 min read</em></p>

  <p style="margin-bottom: 20px; font-size: 1.1rem; line-height: 1.7; color: #334155;">NABH — National Accreditation Board for Hospitals & Healthcare Providers —
  is India's gold standard for hospital quality and patient safety. For any
  hospital or clinic in India looking to attract insurance empanelment, government
  contracts, and patient trust, NABH accreditation is no longer optional — it is
  essential.</p>

  <h2 style="font-size: 1.8rem; color: #1e293b; margin: 40px 0 15px;">What is NABH?</h2>
  <p style="margin-bottom: 20px; font-size: 1.1rem; line-height: 1.7; color: #334155;">NABH is a constituent board of the Quality Council of India (QCI), set up to
  establish and operate an accreditation programme for healthcare organizations.
  It sets standards for hospital infrastructure, clinical care, patient rights,
  infection control, quality management, and information management systems.</p>

  <h2 style="font-size: 1.8rem; color: #1e293b; margin: 40px 0 15px;">Why Does NABH Compliance Matter for Indian Hospitals?</h2>
  <ul style="margin-bottom: 30px; padding-left: 20px; line-height: 1.7; color: #334155;">
    <li><strong>Insurance empanelment:</strong> Most private insurers and TPA
    companies require NABH accreditation for cashless empanelment</li>
    <li><strong>Government contracts:</strong> Ayushman Bharat (PMJAY) empanelment
    prefers or requires NABH status</li>
    <li><strong>Patient trust:</strong> NABH accreditation signals quality care
    to patients choosing a hospital</li>
    <li><strong>Reduced medical errors:</strong> NABH processes reduce adverse
    events and improve clinical outcomes</li>
    <li><strong>Staff efficiency:</strong> Standardized SOPs improve workflow
    and reduce operational chaos</li>
  </ul>

  <h2 style="font-size: 1.8rem; color: #1e293b; margin: 40px 0 15px;">NABH Accreditation Requirements — Key Areas</h2>
  <p style="margin-bottom: 10px; font-size: 1.1rem; color: #334155;">NABH evaluates hospitals across 10 chapters of standards:</p>
  <ol style="margin-bottom: 30px; padding-left: 20px; line-height: 1.7; color: #334155;">
    <li>Access, Assessment and Continuity of Care (AAC)</li>
    <li>Care of Patients (COP)</li>
    <li>Management of Medication (MOM)</li>
    <li>Patient Rights and Education (PRE)</li>
    <li>Hospital Infection Control (HIC)</li>
    <li>Continuous Quality Improvement (CQI)</li>
    <li>Responsibilities of Management (ROM)</li>
    <li>Facility Management and Safety (FMS)</li>
    <li>Human Resource Management (HRM)</li>
    <li>Information Management System (IMS)</li>
  </ol>

  <h2 style="font-size: 1.8rem; color: #1e293b; margin: 40px 0 15px;">How the Right HMS Software Helps You Achieve NABH Faster</h2>
  <p style="margin-bottom: 20px; font-size: 1.1rem; line-height: 1.7; color: #334155;">Chapter 10 of NABH standards — Information Management System (IMS) —
  directly requires hospitals to maintain structured electronic records,
  controlled documentation, and data security systems. A NABH-ready HMS
  like Medical365 automatically meets these requirements by providing:</p>
  <ul style="margin-bottom: 30px; padding-left: 20px; line-height: 1.7; color: #334155;">
    <li>ABDM and DPDP Act 2023 compliant patient data management</li>
    <li>Role-based access control with complete audit trails</li>
    <li>Structured EMR with standardized clinical documentation</li>
    <li>Automated billing with GST compliance and TPA management</li>
    <li>Real-time quality dashboards and incident reporting</li>
    <li>ISO 27001 certified cloud infrastructure</li>
  </ul>

  <h2 style="font-size: 1.8rem; color: #1e293b; margin: 40px 0 15px;">Step-by-Step NABH Accreditation Process</h2>
  <ol style="margin-bottom: 30px; padding-left: 20px; line-height: 1.7; color: #334155;">
    <li><strong>Gap Assessment:</strong> Evaluate current hospital practices
    against NABH standards</li>
    <li><strong>SOP Development:</strong> Create Standard Operating Procedures
    for all departments</li>
    <li><strong>Staff Training:</strong> Train all staff on NABH standards and
    SOPs</li>
    <li><strong>Implementation:</strong> Deploy compliant HMS and documentation
    systems</li>
    <li><strong>Internal Audit:</strong> Conduct mock NABH assessments internally</li>
    <li><strong>Application:</strong> Apply to NABH with required documentation</li>
    <li><strong>Assessment Visit:</strong> NABH assessors visit your facility</li>
    <li><strong>Accreditation:</strong> Certificate awarded for 3 years</li>
  </ol>

  <div style="background:#f0f7ff;padding:24px;border-radius:8px;margin:32px 0;border-left:4px solid #0066cc;">
    <h3 style="margin-top:0; font-size: 1.5rem; color: #1e3a8a;">Get NABH-Ready with Medical365</h3>
    <p style="margin-bottom: 20px; font-size: 1.05rem; color: #1e40af;">Medical365 is built to meet NABH IMS chapter requirements out of the box.
    Book a free demo and see how we can accelerate your accreditation journey.</p>
    <a href="https://www.medical365.in/book-demo"
       style="background:#0066cc;color:#fff;padding:12px 28px;border-radius:6px;text-decoration:none;display:inline-block;font-weight:bold;">
      Book Free Demo →
    </a>
  </div>

  <h2 style="font-size: 1.8rem; color: #1e293b; margin: 40px 0 15px;">Frequently Asked Questions</h2>

  <h3 style="font-size: 1.3rem; color: #334155; margin-top: 20px;">Is NABH accreditation mandatory for Indian hospitals?</h3>
  <p style="margin-bottom: 20px; font-size: 1.1rem; line-height: 1.7; color: #334155;">NABH is not legally mandatory for all hospitals, but it is required for
  insurance TPA empanelment, Ayushman Bharat (PMJAY) listing, and is increasingly
  expected by patients and corporate health plans.</p>

  <h3 style="font-size: 1.3rem; color: #334155; margin-top: 20px;">How long does NABH accreditation take?</h3>
  <p style="margin-bottom: 20px; font-size: 1.1rem; line-height: 1.7; color: #334155;">The NABH accreditation process typically takes 12 to 18 months from gap
  assessment to receiving the certificate, depending on the hospital's current
  compliance level and size.</p>

  <h3 style="font-size: 1.3rem; color: #334155; margin-top: 20px;">Does Medical365 help with NABH compliance?</h3>
  <p style="margin-bottom: 20px; font-size: 1.1rem; line-height: 1.7; color: #334155;">Yes. Medical365 meets the NABH Information Management System (IMS) chapter
  requirements with ABDM compliance, ISO 27001 certified infrastructure, role-based
  access, audit trails, and standardized EMR documentation.</p>

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

// Remove existing LD+JSON schemas
baseTopPart = baseTopPart.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');

blogs.forEach(blog => {
    let top = baseTopPart;
    // Insert new head contents just before </head>
    top = top.replace('</head>', blog.head + '\n' + blog.schema + '\n</head>');
    
    let fullHtml = top + '\n<main id="main">\n' + blog.body + '\n</main>\n' + baseBottomPart;
    let destPath = path.join(blogsDir, blog.filename);
    fs.writeFileSync(destPath, fullHtml, 'utf8');
    console.log("Created blog: " + blog.filename);
});
