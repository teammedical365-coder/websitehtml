const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const templateSource = fs.readFileSync(path.join(repoRoot, 'multilingual-hims.html'), 'utf8');

// Exact Header slice up to <section class="page-hero">
const heroStartIdx = templateSource.indexOf('<section class="page-hero">');
let headerPart = templateSource.substring(0, heroStartIdx);

// Exact Footer slice from <footer id="mega-footer"
const footerStartIdx = templateSource.indexOf('<footer id="mega-footer"');
let footerPart = templateSource.substring(footerStartIdx);

// Update meta and title in headerPart
headerPart = headerPart.replace(/<title>[\s\S]*?<\/title>/i, '<title>HIMS Software India | Cloud Hospital Management System — Medical365</title>');
headerPart = headerPart.replace(/<link rel="canonical" href="[^"]*" \/>/i, '<link rel="canonical" href="https://www.medical365.in/hims-software" />');
headerPart = headerPart.replace(/<meta name="description" content="[^"]*">/i, '<meta name="description" content="Enterprise HIMS software in India for multi-specialty hospitals & clinics. Streamline OPD, IPD, OT, bed management, pharmacy, billing, and ABDM compliance.">');
headerPart = headerPart.replace(/<meta name="keywords" content="[^"]*">/i, '<meta name="keywords" content="HIMS software India, hospital management system, hospital information management system, cloud HIMS software, OPD IPD hospital software, ABDM compliant HMS">');

// Update Open Graph
headerPart = headerPart.replace(/<meta property="og:title" content="[^"]*">/i, '<meta property="og:title" content="HIMS Software India | Cloud Hospital Management System — Medical365">');
headerPart = headerPart.replace(/<meta property="og:description" content="[^"]*">/i, '<meta property="og:description" content="Enterprise HIMS software in India for multi-specialty hospitals & clinics. Streamline OPD, IPD, OT, bed management, pharmacy, billing, and ABDM compliance.">');
headerPart = headerPart.replace(/<meta name="twitter:title" content="[^"]*">/i, '<meta name="twitter:title" content="HIMS Software India | Cloud Hospital Management System — Medical365">');
headerPart = headerPart.replace(/<meta name="twitter:description" content="[^"]*">/i, '<meta name="twitter:description" content="Enterprise HIMS software in India for multi-specialty hospitals & clinics. Streamline OPD, IPD, OT, bed management, pharmacy, billing, and ABDM compliance.">');

// Replace all JSON-LD blocks in headerPart with single clean schema
headerPart = headerPart.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');

const cleanSchema = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Medical365 HIMS Software India",
      "operatingSystem": "Web, Cloud, Android, iOS",
      "applicationCategory": "BusinessApplication, HealthcareApplication",
      "description": "Comprehensive cloud-based hospital information management system (HIMS) for Indian hospitals, supporting OPD, IPD, OT, pharmacy, diagnostics, billing, and ABDM compliance.",
      "url": "https://www.medical365.in/hims-software",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@type": "Organization",
      "name": "Medical365",
      "url": "https://www.medical365.in",
      "logo": "https://www.medical365.in/medical365logo1.png",
      "telephone": "+917791910007"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.medical365.in/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "HIMS Software India",
          "item": "https://www.medical365.in/hims-software"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is HIMS software?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "HIMS (Hospital Information Management System) is an enterprise healthcare software platform that unifies and automates all clinical, administrative, inventory, and financial operations across hospital departments including OPD, IPD, OT, pharmacy, laboratory, and billing."
          }
        },
        {
          "@type": "Question",
          "name": "Is Medical365 HIMS software ABDM compliant?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Medical365 natively supports Ayushman Bharat Digital Mission (ABDM) Milestone 1, 2, and 3 integrations, enabling ABHA ID creation, paperless scan-and-share OPD registration, and secure health record exchange."
          }
        },
        {
          "@type": "Question",
          "name": "Can Medical365 HIMS scale from a 20-bed hospital to a 500-bed facility?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Medical365's modular cloud architecture is engineered to support single-specialty clinics, nursing homes, and multi-bed tertiary care hospital chains with role-based access control and high concurrent throughput."
          }
        }
      ]
    }
  ]
}
</script>
`;

headerPart = headerPart.replace('</head>', cleanSchema + '</head>');

// Build rich, crawlable HIMS Body Content
const himsBodyContent = `
    <!-- HERO SECTION -->
    <section class="hero-section" style="padding: 70px 24px; background: radial-gradient(circle at top right, rgba(26, 86, 219, 0.08), transparent 45%);">
        <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
            <span style="display: inline-block; padding: 6px 16px; background: rgba(26, 86, 219, 0.1); color: #1A56DB; border-radius: 30px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 16px;">
                Enterprise Hospital Information Management System
            </span>
            <h1 style="font-size: clamp(2.2rem, 5vw, 3.6rem); font-weight: 800; color: #1E293B; line-height: 1.15; margin-bottom: 20px;">
                HIMS Software India: Complete Hospital Operations &amp; ABDM Management
            </h1>
            <p style="font-size: 1.15rem; color: #475569; max-width: 840px; margin: 0 auto 32px; line-height: 1.6;">
                Unify OPD registrations, IPD ward workflows, real-time bed tracking, pharmacy inventory, and medical billing on a single, secure cloud platform built specifically for Indian hospitals and clinics.
            </p>
            <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
                <a href="book-demo" class="btn-primary" style="padding: 14px 32px; font-size: 15px; font-weight: 700; border-radius: 8px; text-decoration: none;">Book a Free Hospital Demo</a>
                <a href="https://wa.me/917791910007?text=Hi%20Medical365,%20we%20are%20looking%20for%20HIMS%20Software%20for%20our%20hospital." target="_blank" rel="noopener" class="btn-secondary" style="padding: 14px 28px; font-size: 15px; font-weight: 600; border: 1px solid #CBD5E1; border-radius: 8px; text-decoration: none; color: #1E293B; background: #FFF; display: inline-flex; align-items: center; gap: 8px;">
                    <span>💬 Chat on WhatsApp</span>
                </a>
            </div>
        </div>
    </section>

    <!-- EXTRACTABLE AEO DEFINITION BLOCK -->
    <section style="padding: 50px 24px; background: #FFFFFF; border-top: 1px solid #E2E8F0; border-bottom: 1px solid #E2E8F0;">
        <div style="max-width: 1000px; margin: 0 auto;">
            <div style="background: #F8FAFC; border-left: 4px solid #1A56DB; padding: 28px 32px; border-radius: 8px;">
                <h2 style="font-size: 1.4rem; font-weight: 700; color: #1E293B; margin-top: 0; margin-bottom: 12px;">
                    What is HIMS Software?
                </h2>
                <p style="font-size: 15px; color: #334155; line-height: 1.7; margin: 0;">
                    <strong>HIMS (Hospital Information Management System)</strong> software is a centralized digital healthcare platform that manages clinical data, patient admissions, doctor schedules, pharmacy stock, diagnostic orders, and revenue billing. Modern HIMS software in India automates departmental coordination, supports ABDM M1–M3 standards, and reduces administrative overhead across outpatient and inpatient care.
                </p>
            </div>
        </div>
    </section>

    <!-- COMPREHENSIVE CLINICAL MODULE MATRIX -->
    <section style="padding: 70px 24px; background: #F8FAFC;">
        <div style="max-width: 1200px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 48px;">
                <h2 style="font-size: 2rem; font-weight: 800; color: #1E293B; margin-bottom: 12px;">
                    Integrated Core Modules in Medical365 HIMS
                </h2>
                <p style="font-size: 15px; color: #64748B; max-width: 700px; margin: 0 auto;">
                    Every department in your hospital operates from a single synchronized database, eliminating manual paper records and departmental communication gaps.
                </p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
                <!-- Module 1: OPD & Queue -->
                <div style="background: #FFF; padding: 28px; border-radius: 12px; border: 1px solid #E2E8F0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);">
                    <div style="font-size: 28px; margin-bottom: 12px;">🏥</div>
                    <h3 style="font-size: 1.2rem; font-weight: 700; color: #1E293B; margin-bottom: 8px;">OPD &amp; Token Queue Management</h3>
                    <p style="font-size: 14px; color: #475569; line-height: 1.6; margin-bottom: 14px;">
                        Fast patient registration, digital token generation, doctor OPD queue display, and ABHA scan-and-share integration for rapid outpatient flow.
                    </p>
                    <a href="book-demo" style="font-size: 13px; font-weight: 600; color: #1A56DB; text-decoration: none;">Explore OPD Workflow &rarr;</a>
                </div>

                <!-- Module 2: IPD & Ward Management -->
                <div style="background: #FFF; padding: 28px; border-radius: 12px; border: 1px solid #E2E8F0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);">
                    <div style="font-size: 28px; margin-bottom: 12px;">🛏️</div>
                    <h3 style="font-size: 1.2rem; font-weight: 700; color: #1E293B; margin-bottom: 8px;">Hospital Bed &amp; Ward Management</h3>
                    <p style="font-size: 14px; color: #475569; line-height: 1.6; margin-bottom: 14px;">
                        Interactive visual bed occupancy grid showing real-time occupied, vacant, cleaning, and isolation beds. Direct integration with inpatient billing.
                    </p>
                    <a href="hospital-bed-management" style="font-size: 13px; font-weight: 600; color: #1A56DB; text-decoration: none;">View Bed Management Module &rarr;</a>
                </div>

                <!-- Module 3: Pharmacy & Inventory -->
                <div style="background: #FFF; padding: 28px; border-radius: 12px; border: 1px solid #E2E8F0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);">
                    <div style="font-size: 28px; margin-bottom: 12px;">💊</div>
                    <h3 style="font-size: 1.2rem; font-weight: 700; color: #1E293B; margin-bottom: 8px;">Hospital Pharmacy &amp; Central Store</h3>
                    <p style="font-size: 14px; color: #475569; line-height: 1.6; margin-bottom: 14px;">
                        Automated batch tracking, expiry date alerts, barcode scanning, purchase order automation, and instant bedside prescription dispensing.
                    </p>
                    <a href="pricing" style="font-size: 13px; font-weight: 600; color: #1A56DB; text-decoration: none;">View Pharmacy Pricing Plans &rarr;</a>
                </div>

                <!-- Module 4: Blood Bank Management -->
                <div style="background: #FFF; padding: 28px; border-radius: 12px; border: 1px solid #E2E8F0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);">
                    <div style="font-size: 28px; margin-bottom: 12px;">🩸</div>
                    <h3 style="font-size: 1.2rem; font-weight: 700; color: #1E293B; margin-bottom: 8px;">Blood Bank Software Integration</h3>
                    <p style="font-size: 14px; color: #475569; line-height: 1.6; margin-bottom: 14px;">
                        Comprehensive donor screening, component separation (PRBC, FFP, Platelets), cross-matching compatibility, and cold-chain logging.
                    </p>
                    <a href="blood-bank" style="font-size: 13px; font-weight: 600; color: #1A56DB; text-decoration: none;">Explore Blood Bank Software &rarr;</a>
                </div>

                <!-- Module 5: ABDM & Ayushman Bharat -->
                <div style="background: #FFF; padding: 28px; border-radius: 12px; border: 1px solid #E2E8F0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);">
                    <div style="font-size: 28px; margin-bottom: 12px;">🇮🇳</div>
                    <h3 style="font-size: 1.2rem; font-weight: 700; color: #1E293B; margin-bottom: 8px;">ABDM Milestone 1–3 Integration</h3>
                    <p style="font-size: 14px; color: #475569; line-height: 1.6; margin-bottom: 14px;">
                        Native compliance with National Health Authority guidelines. ABHA ID generation, consent management, and PMJAY claim documentation.
                    </p>
                    <a href="blogs/abha-integration-guide" style="font-size: 13px; font-weight: 600; color: #1A56DB; text-decoration: none;">Read ABDM Integration Guide &rarr;</a>
                </div>

                <!-- Module 6: NABH Quality Documentation -->
                <div style="background: #FFF; padding: 28px; border-radius: 12px; border: 1px solid #E2E8F0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);">
                    <div style="font-size: 28px; margin-bottom: 12px;">✅</div>
                    <h3 style="font-size: 1.2rem; font-weight: 700; color: #1E293B; margin-bottom: 8px;">NABH Digital Accreditation Readiness</h3>
                    <p style="font-size: 14px; color: #475569; line-height: 1.6; margin-bottom: 14px;">
                        Standardized clinical indicators, medication safety tracking, incident reporting registers, and complete digital audit trails for 5th Edition NABH standards.
                    </p>
                    <a href="nabh-compliant-hospital-software" style="font-size: 13px; font-weight: 600; color: #1A56DB; text-decoration: none;">Explore NABH Compliance Suite &rarr;</a>
                </div>
            </div>
        </div>
    </section>

    <!-- HOSPITAL USE CASES -->
    <section style="padding: 70px 24px; background: #FFFFFF;">
        <div style="max-width: 1100px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 40px;">
                <h2 style="font-size: 2rem; font-weight: 800; color: #1E293B;">Engineered for Healthcare Facilities of Every Size</h2>
                <p style="font-size: 15px; color: #64748B;">From multi-doctor polyclinics to multi-specialty tertiary care hospitals.</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
                <div style="padding: 24px; border: 1px solid #E2E8F0; border-radius: 8px; background: #F8FAFC;">
                    <h3 style="font-size: 1.15rem; font-weight: 700; color: #1E293B; margin-bottom: 8px;">Multi-Specialty Hospitals</h3>
                    <p style="font-size: 14px; color: #475569; line-height: 1.6;">
                        Connect multi-floor operations, intensive care units, diagnostic labs, and insurance desk with unified billing and role-based staff permissions.
                    </p>
                </div>
                <div style="padding: 24px; border: 1px solid #E2E8F0; border-radius: 8px; background: #F8FAFC;">
                    <h3 style="font-size: 1.15rem; font-weight: 700; color: #1E293B; margin-bottom: 8px;">Nursing Homes &amp; Daycare Centers</h3>
                    <p style="font-size: 14px; color: #475569; line-height: 1.6;">
                        Fast patient onboarding, automated OT packages, simplified discharge summaries, and transparent patient pricing without enterprise complexity.
                    </p>
                </div>
                <div style="padding: 24px; border: 1px solid #E2E8F0; border-radius: 8px; background: #F8FAFC;">
                    <h3 style="font-size: 1.15rem; font-weight: 700; color: #1E293B; margin-bottom: 8px;">Clinic &amp; Polyclinic Networks</h3>
                    <p style="font-size: 14px; color: #475569; line-height: 1.6;">
                        Multi-branch centralization, doctor schedule management, electronic prescriptions, and WhatsApp appointment confirmations.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- TRANSPARENT PRICING CALLOUT -->
    <section style="padding: 60px 24px; background: linear-gradient(135deg, #1E293B, #0F172A); color: #FFF; text-align: center;">
        <div style="max-width: 800px; margin: 0 auto;">
            <h2 style="font-size: 1.9rem; font-weight: 800; margin-bottom: 16px; color: #FFF;">
                Transparent Hospital Software Pricing — Zero Hidden Lock-ins
            </h2>
            <p style="font-size: 15px; color: #94A3B8; line-height: 1.7; margin-bottom: 28px;">
                Unlike legacy software vendors who require weeks of sales meetings just to see pricing, Medical365 publishes transparent subscription tiers designed for Indian healthcare providers.
            </p>
            <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
                <a href="pricing" class="btn-primary" style="background: #10B981; padding: 12px 28px; font-weight: 700; border-radius: 8px; text-decoration: none; color: #FFF;">View Transparent Pricing Plans &rarr;</a>
                <a href="book-demo" style="padding: 12px 24px; font-weight: 600; border: 1px solid rgba(255,255,255,0.25); border-radius: 8px; text-decoration: none; color: #FFF; display: inline-block;">Schedule Live Product Tour</a>
            </div>
        </div>
    </section>
`;

const fullHimsPage = headerPart + himsBodyContent + footerPart;
fs.writeFileSync(path.join(repoRoot, 'hims-software.html'), fullHimsPage, 'utf8');
console.log('Successfully re-created hims-software.html with clean single H1 and clean schema!');
