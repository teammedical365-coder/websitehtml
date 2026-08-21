const fs = require('fs');
const path = require('path');

const sourceFile = path.join(__dirname, 'e-prescriptions.html');
const destFile = path.join(__dirname, 'blogs', 'emr-vs-ehr-india.html');

let content = fs.readFileSync(sourceFile, 'utf8');

let headerEndMatch = content.match(/<\/header>/i);
let headerEndIndex = headerEndMatch.index + 9;

let footerStartMatch = content.match(/<!-- ═══════════════════════════════════════════════════════════════\s*MEDICAL365 MEGA FOOTER/i);
let fallbackFooterMatch = content.match(/<footer id="mega-footer"/i);
let footerStartIndex = footerStartMatch ? footerStartMatch.index : (fallbackFooterMatch ? fallbackFooterMatch.index : -1);

let topPart = content.substring(0, headerEndIndex);
let bottomPart = content.substring(footerStartIndex);

topPart = topPart.replace(/<title>.*?<\/title>/is, "<title>EMR vs EHR — What's the Difference for Indian Hospitals? | Medical365</title>");
topPart = topPart.replace(/<meta name="description" content="[^"]*"/i, '<meta name="description" content="EMR vs EHR explained for Indian hospitals. Understand the key differences, which system suits your clinic, and why ABDM compliance matters. Medical365 guide."');
if (topPart.match(/<meta name="keywords" content="[^"]*"/i)) {
    topPart = topPart.replace(/<meta name="keywords" content="[^"]*"/i, '<meta name="keywords" content="EMR vs EHR India, electronic medical records vs electronic health records, difference EMR EHR, ABDM EMR, hospital software India, Medical365"');
}

topPart = topPart.replace(/href="style\.css"/g, 'href="../style.css"');
topPart = topPart.replace(/href="medical365fav\.jpg"/g, 'href="../medical365fav.jpg"');
topPart = topPart.replace(/src="medical365fav\.jpg"/g, 'src="../medical365fav.jpg"');
topPart = topPart.replace(/href="([^"http#]+)"/g, (match, p1) => {
    if (!p1.startsWith('http') && !p1.startsWith('//') && !p1.startsWith('tel:') && !p1.startsWith('mailto:')) {
        return 'href="../' + p1 + '"';
    }
    return match;
});
bottomPart = bottomPart.replace(/src="global-scripts\.js/g, 'src="../global-scripts.js');
bottomPart = bottomPart.replace(/href="([^"http#]+)"/g, (match, p1) => {
    if (!p1.startsWith('http') && !p1.startsWith('//') && !p1.startsWith('tel:') && !p1.startsWith('mailto:')) {
        return 'href="../' + p1 + '"';
    }
    return match;
});

let newTopPart = topPart.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');

const blogSchema = `
    <link rel="canonical" href="https://www.medical365.in/blogs/emr-vs-ehr-india">
    <meta property="og:title" content="EMR vs EHR — What's the Difference for Indian Hospitals?">
    <meta property="og:description" content="Understand EMR vs EHR for Indian hospitals. Key differences, compliance requirements & which system suits your clinic. Complete guide by Medical365.">
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "EMR vs EHR — What's the Difference for Indian Hospitals?",
      "description": "EMR vs EHR explained for Indian hospitals. Key differences, compliance requirements and which system suits your clinic.",
      "image": "https://www.medical365.in/medical365logo1.png",
      "author": {
        "@type": "Organization",
        "name": "Medical365",
        "url": "https://www.medical365.in"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Medical365",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.medical365.in/medical365logo1.png"
        }
      },
      "datePublished": "2026-06-03",
      "dateModified": "2026-06-03",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://www.medical365.in/blogs/emr-vs-ehr-india"
      }
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
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Not exactly. In Indian healthcare, both terms are often used interchangeably, but technically an EMR is a single-facility digital record while an EHR is a cross-facility interoperable system aligned with ABDM and MoHFW standards."
          }
        },
        {
          "@type": "Question",
          "name": "Does Medical365 support ABDM EHR compliance?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Medical365 is fully compliant with ABDM, supports ABHA ID generation and linking, meets MoHFW EHR Standards, and is ready for the DPDP Act 2023."
          }
        },
        {
          "@type": "Question",
          "name": "What is the cost of EMR software in India?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Medical365 starts at ₹6,000 per year for individual doctors and clinics, and ₹15,000 per year for multi-doctor clinics. Enterprise pricing for hospitals is available on request."
          }
        }
      ]
    }
    </script>
`;

newTopPart = newTopPart.replace('</head>', blogSchema + '\n</head>');

const articleContent = `
<main style="padding: 120px 20px 60px; max-width: 800px; margin: 0 auto; color: #334155; line-height: 1.8; font-family: 'Plus Jakarta Sans', sans-serif;">
<article>
  <h1 style="font-size: 2.5rem; color: #0f172a; margin-bottom: 10px; line-height: 1.2;">EMR vs EHR — What's the Difference for Indian Hospitals?</h1>
  <p class="blog-meta" style="color: #64748b; font-size: 0.9rem; margin-bottom: 30px; font-weight: 500;">By Medical365 Team | June 2026 | 5 min read</p>

  <p style="margin-bottom: 20px;">If you're evaluating hospital software in India, you've likely come
  across both terms — EMR and EHR — often used interchangeably. But they
  are not the same thing, and choosing the right one matters for your
  hospital's compliance, operations, and growth.</p>

  <h2 style="font-size: 1.8rem; color: #1e293b; margin: 40px 0 15px;">What is an EMR (Electronic Medical Record)?</h2>
  <p style="margin-bottom: 20px;">An EMR is a digital version of a patient's paper chart within a
  single practice or hospital. It contains the medical and treatment
  history of patients from that one provider only. EMRs are primarily
  clinical tools — used by doctors and nurses to diagnose and treat
  patients within their own facility.</p>
  <p style="margin-bottom: 10px;"><strong>Key features of an EMR:</strong></p>
  <ul style="margin-bottom: 30px; padding-left: 20px;">
    <li style="margin-bottom: 8px;">Patient history, diagnoses, medications, and treatment plans</li>
    <li style="margin-bottom: 8px;">Lab results and imaging reports within the facility</li>
    <li style="margin-bottom: 8px;">Appointment scheduling and billing integration</li>
    <li style="margin-bottom: 8px;">Accessible only within the specific clinic or hospital</li>
  </ul>

  <h2 style="font-size: 1.8rem; color: #1e293b; margin: 40px 0 15px;">What is an EHR (Electronic Health Record)?</h2>
  <p style="margin-bottom: 20px;">An EHR goes beyond the single practice. It is a comprehensive,
  interoperable digital health record designed to be shared across
  multiple healthcare providers, labs, pharmacies, and hospitals. EHRs
  give a complete picture of a patient's health history — regardless of
  where they received care.</p>
  <p style="margin-bottom: 10px;"><strong>Key features of an EHR:</strong></p>
  <ul style="margin-bottom: 30px; padding-left: 20px;">
    <li style="margin-bottom: 8px;">Interoperable across hospitals, labs, and pharmacies</li>
    <li style="margin-bottom: 8px;">Supports ABDM/ABHA ID integration in India</li>
    <li style="margin-bottom: 8px;">Enables continuity of care across providers</li>
    <li style="margin-bottom: 8px;">Compliant with MoHFW EHR Standards India</li>
  </ul>

  <h2 style="font-size: 1.8rem; color: #1e293b; margin: 40px 0 15px;">EMR vs EHR — Side by Side Comparison</h2>
  <div style="overflow-x: auto; margin-bottom: 30px;">
      <table style="width: 100%; border-collapse: collapse; text-align: left;">
        <thead>
          <tr style="background-color: #f1f5f9; border-bottom: 2px solid #cbd5e1;">
            <th style="padding: 12px; font-weight: 600;">Feature</th>
            <th style="padding: 12px; font-weight: 600;">EMR</th>
            <th style="padding: 12px; font-weight: 600;">EHR</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px;">Scope</td><td style="padding: 12px;">Single facility</td><td style="padding: 12px;">Multiple providers</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px;">Data Sharing</td><td style="padding: 12px;">Internal only</td><td style="padding: 12px;">Cross-facility</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px;">ABDM Compliance</td><td style="padding: 12px;">Partial</td><td style="padding: 12px;">Full</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px;">ABHA ID Support</td><td style="padding: 12px;">Limited</td><td style="padding: 12px;">Native</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px;">Best For</td><td style="padding: 12px;">Small clinics</td><td style="padding: 12px;">Hospitals & chains</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px;">India Regulation</td><td style="padding: 12px;">Basic</td><td style="padding: 12px;">MoHFW EHR Standards</td>
          </tr>
        </tbody>
      </table>
  </div>

  <h2 style="font-size: 1.8rem; color: #1e293b; margin: 40px 0 15px;">Which One Does Your Indian Hospital Need?</h2>
  <p style="margin-bottom: 20px;">For <strong>small clinics and single-specialty practices</strong> in
  India, a robust EMR system is often sufficient — it digitizes patient
  records, improves prescribing accuracy, and reduces paperwork without
  the complexity of full interoperability.</p>
  <p style="margin-bottom: 30px;">For <strong>multi-specialty hospitals, hospital chains, and
  government-affiliated facilities</strong>, an EHR system is essential —
  especially with India's push toward the Ayushman Bharat Digital Mission
  (ABDM) and mandatory ABHA ID integration.</p>

  <h2 style="font-size: 1.8rem; color: #1e293b; margin: 40px 0 15px;">What Does ABDM Require?</h2>
  <p style="margin-bottom: 30px;">India's Ayushman Bharat Digital Mission requires healthcare providers
  to adopt systems that support ABHA (Ayushman Bharat Health Account) ID
  generation and linking, FHIR-compliant data exchange, and adherence to
  MoHFW EHR Standards. This makes a full EHR system — not just an EMR —
  the standard for Indian hospitals in 2026 and beyond.</p>

  <h2 style="font-size: 1.8rem; color: #1e293b; margin: 40px 0 15px;">How Medical365 Solves Both</h2>
  <p style="margin-bottom: 30px;">Medical365 is a unified platform that combines the clinical depth of
  an EMR with the interoperability of a full EHR — built specifically for
  Indian healthcare compliance. Our platform supports ABDM integration,
  ABHA ID management, FHIR-compliant data storage, and MoHFW EHR
  Standards — making it the ideal choice for clinics, hospitals, and
  multi-facility chains across India.</p>

  <div style="background:#f0f7ff;padding:30px;border-radius:12px;margin:40px 0;border: 1px solid #bfdbfe;">
    <h3 style="margin-top:0; color:#1e3a8a; font-size: 1.5rem;">Ready to Go Paperless with Medical365?</h3>
    <p style="margin-bottom: 20px; color:#1e40af;">Join 500+ hospitals across India using Medical365's ABDM-compliant
    EMR/EHR platform. Book a free demo today — on-site or online,
    anywhere in Rajasthan and India.</p>
    <a href="https://www.medical365.in/book-demo"
       style="background:#0284c7;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;display:inline-block;font-weight:600;box-shadow: 0 4px 6px -1px rgba(2, 132, 199, 0.2);">
      Book Free Demo
    </a>
  </div>

  <h2 style="font-size: 1.8rem; color: #1e293b; margin: 40px 0 15px;">Frequently Asked Questions</h2>

  <h3 style="font-size: 1.3rem; color: #334155; margin-top: 20px;">Is EMR and EHR the same thing in India?</h3>
  <p style="margin-bottom: 20px;">Not exactly. In Indian healthcare, both terms are often used
  interchangeably, but technically an EMR is a single-facility digital
  record while an EHR is a cross-facility interoperable system aligned
  with ABDM and MoHFW standards.</p>

  <h3 style="font-size: 1.3rem; color: #334155; margin-top: 20px;">Does Medical365 support ABDM EHR compliance?</h3>
  <p style="margin-bottom: 20px;">Yes. Medical365 is fully compliant with ABDM, supports ABHA ID
  generation and linking, meets MoHFW EHR Standards, and is ready for
  the DPDP Act 2023 — making it one of the most compliant healthcare
  platforms in India.</p>

  <h3 style="font-size: 1.3rem; color: #334155; margin-top: 20px;">What is the cost of EMR software in India?</h3>
  <p style="margin-bottom: 20px;">Medical365 starts at ₹6,000 per year for individual doctors and
  clinics, and ₹15,000 per year for multi-doctor clinics. Enterprise
  pricing for hospitals is available on request.</p>

</article>
</main>
`;

let finalFileContent = newTopPart + '\n' + articleContent + '\n' + bottomPart;

fs.writeFileSync(destFile, finalFileContent, 'utf8');
console.log("Blog created successfully!");
