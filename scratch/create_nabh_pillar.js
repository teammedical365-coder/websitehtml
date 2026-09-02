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
headerPart = headerPart.replace(/<title>[\s\S]*?<\/title>/i, '<title>NABH Compliant Hospital Software | 5th Edition Digital Ready — Medical365</title>');
headerPart = headerPart.replace(/<link rel="canonical" href="[^"]*" \/>/i, '<link rel="canonical" href="https://www.medical365.in/nabh-compliant-hospital-software" />');
headerPart = headerPart.replace(/<meta name="description" content="[^"]*">/i, '<meta name="description" content="Cloud-based hospital management software supporting NABH 5th Edition standards, patient safety protocols, digital audit trails, and quality indicator tracking.">');
headerPart = headerPart.replace(/<meta name="keywords" content="[^"]*">/i, '<meta name="keywords" content="NABH compliant hospital software, NABH software India, hospital accreditation software, NABH 5th edition compliance, hospital quality management software">');

// Update Open Graph
headerPart = headerPart.replace(/<meta property="og:title" content="[^"]*">/i, '<meta property="og:title" content="NABH Compliant Hospital Software | 5th Edition Digital Ready — Medical365">');
headerPart = headerPart.replace(/<meta property="og:description" content="[^"]*">/i, '<meta property="og:description" content="Cloud-based hospital management software supporting NABH 5th Edition standards, patient safety protocols, digital audit trails, and quality indicator tracking.">');
headerPart = headerPart.replace(/<meta name="twitter:title" content="[^"]*">/i, '<meta name="twitter:title" content="NABH Compliant Hospital Software | 5th Edition Digital Ready — Medical365">');
headerPart = headerPart.replace(/<meta name="twitter:description" content="[^"]*">/i, '<meta name="twitter:description" content="Cloud-based hospital management software supporting NABH 5th Edition standards, patient safety protocols, digital audit trails, and quality indicator tracking.">');

// Replace all JSON-LD blocks in headerPart with single clean schema
headerPart = headerPart.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');

const cleanSchema = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Medical365 NABH Compliant Hospital Software",
      "operatingSystem": "Web, Cloud, Android, iOS",
      "applicationCategory": "BusinessApplication, HealthcareApplication",
      "description": "Healthcare management software designed to support Indian hospitals in meeting NABH 5th Edition digital documentation, clinical audit, and quality indicator tracking requirements.",
      "url": "https://www.medical365.in/nabh-compliant-hospital-software",
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
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "NABH Compliant Hospital Software",
          "item": "https://www.medical365.in/nabh-compliant-hospital-software"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is NABH compliant hospital software?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "NABH compliant hospital software is an information system designed to support healthcare organizations in adhering to National Accreditation Board for Hospitals & Healthcare Providers standards through digital clinical records, medication reconciliation, incident reporting, and objective quality indicator logs."
          }
        },
        {
          "@type": "Question",
          "name": "Does using Medical365 automatically guarantee NABH accreditation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No software can guarantee accreditation, as NABH evaluates clinical care, physical safety, and organizational processes. Medical365 facilitates compliance by providing structured digital workflows, audit-ready registers, and standardized documentation mandated by NABH 5th Edition standards."
          }
        },
        {
          "@type": "Question",
          "name": "How does Medical365 assist with clinical audits?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Medical365 logs every clinical entry, prescription modification, and medication administration with user timestamps and role-based tracking, enabling quality teams to generate automated audit reports during internal and external assessments."
          }
        }
      ]
    }
  ]
}
</script>
`;

headerPart = headerPart.replace('</head>', cleanSchema + '</head>');

// Build rich NABH Body Content
const nabhBodyContent = `
    <!-- HERO SECTION -->
    <section class="hero-section" style="padding: 70px 24px; background: radial-gradient(circle at top right, rgba(13, 148, 136, 0.08), transparent 45%);">
        <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
            <span style="display: inline-block; padding: 6px 16px; background: rgba(13, 148, 136, 0.1); color: #0D9488; border-radius: 30px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 16px;">
                Healthcare Quality &amp; Accreditation Enablement
            </span>
            <h1 style="font-size: clamp(2.1rem, 5vw, 3.4rem); font-weight: 800; color: #1E293B; line-height: 1.15; margin-bottom: 20px;">
                NABH Compliant Hospital Software: Built for Digital Quality &amp; Audit Readiness
            </h1>
            <p style="font-size: 1.15rem; color: #475569; max-width: 840px; margin: 0 auto 32px; line-height: 1.6;">
                Streamline compliance with NABH 5th Edition standards. Automate clinical documentation, medication error prevention, digital consent management, and mandatory quality indicator reporting.
            </p>
            <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
                <a href="book-demo" class="btn-primary" style="background: #0D9488; padding: 14px 32px; font-size: 15px; font-weight: 700; border-radius: 8px; text-decoration: none; color: #FFF;">Request NABH Workflow Demo</a>
                <a href="blogs/nabh-compliance-guide" style="padding: 14px 28px; font-size: 15px; font-weight: 600; border: 1px solid #CBD5E1; border-radius: 8px; text-decoration: none; color: #1E293B; background: #FFF; display: inline-flex; align-items: center; gap: 8px;">
                    <span>📖 Read NABH Compliance Guide</span>
                </a>
            </div>
        </div>
    </section>

    <!-- EXTRACTABLE AEO DEFINITION BLOCK -->
    <section style="padding: 50px 24px; background: #FFFFFF; border-top: 1px solid #E2E8F0; border-bottom: 1px solid #E2E8F0;">
        <div style="max-width: 1000px; margin: 0 auto;">
            <div style="background: #F0FDF4; border-left: 4px solid #10B981; padding: 28px 32px; border-radius: 8px;">
                <h2 style="font-size: 1.4rem; font-weight: 700; color: #1E293B; margin-top: 0; margin-bottom: 12px;">
                    What is NABH Compliant Hospital Software?
                </h2>
                <p style="font-size: 15px; color: #334155; line-height: 1.7; margin: 0;">
                    <strong>NABH compliant hospital software</strong> is a digital management system designed to support healthcare organizations in meeting National Accreditation Board for Hospitals &amp; Healthcare Providers (NABH) standards. It facilitates compliance by enforcing standardized clinical workflows, tamper-evident audit trails, digital consent forms, and automated tracking of key quality indicators.
                </p>
            </div>
        </div>
    </section>

    <!-- NABH 5TH EDITION WORKFLOW CAPABILITIES -->
    <section style="padding: 70px 24px; background: #F8FAFC;">
        <div style="max-width: 1200px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 48px;">
                <h2 style="font-size: 2rem; font-weight: 800; color: #1E293B; margin-bottom: 12px;">
                    Supported NABH 5th Edition Digital Workflows
                </h2>
                <p style="font-size: 15px; color: #64748B; max-width: 720px; margin: 0 auto;">
                    Medical365 provides out-of-the-box digital registers and checks aligned with National Quality Standards across hospital departments.
                </p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
                <!-- Workflow 1: Medication Safety -->
                <div style="background: #FFF; padding: 28px; border-radius: 12px; border: 1px solid #E2E8F0;">
                    <div style="font-size: 26px; margin-bottom: 12px;">💊</div>
                    <h3 style="font-size: 1.2rem; font-weight: 700; color: #1E293B; margin-bottom: 8px;">Medication Management &amp; Safety</h3>
                    <p style="font-size: 14px; color: #475569; line-height: 1.6; margin-bottom: 14px;">
                        Automated high-alert drug warnings, look-alike sound-alike (LASA) flags, drug allergy cross-checks, and digital nursing administration records.
                    </p>
                    <a href="hims-software" style="font-size: 13px; font-weight: 600; color: #0D9488; text-decoration: none;">Part of Core HIMS Suite &rarr;</a>
                </div>

                <!-- Workflow 2: Patient Safety & Consent -->
                <div style="background: #FFF; padding: 28px; border-radius: 12px; border: 1px solid #E2E8F0;">
                    <div style="font-size: 26px; margin-bottom: 12px;">📋</div>
                    <h3 style="font-size: 1.2rem; font-weight: 700; color: #1E293B; margin-bottom: 8px;">Digital Informed Consent &amp; Rights</h3>
                    <p style="font-size: 14px; color: #475569; line-height: 1.6; margin-bottom: 14px;">
                        Standardized multilingual procedure consent forms, patient rights documentation, and digital signature capture compliant with medical-legal standards.
                    </p>
                    <a href="pricing" style="font-size: 13px; font-weight: 600; color: #0D9488; text-decoration: none;">View Pricing Options &rarr;</a>
                </div>

                <!-- Workflow 3: Infection Control -->
                <div style="background: #FFF; padding: 28px; border-radius: 12px; border: 1px solid #E2E8F0;">
                    <div style="font-size: 26px; margin-bottom: 12px;">🛡️</div>
                    <h3 style="font-size: 1.2rem; font-weight: 700; color: #1E293B; margin-bottom: 8px;">Infection Control &amp; Incident Logs</h3>
                    <p style="font-size: 14px; color: #475569; line-height: 1.6; margin-bottom: 14px;">
                        Digital registers for hospital-acquired infections (HAI), needle-stick injuries, adverse drug reactions, and root-cause corrective action tracking.
                    </p>
                    <a href="hospital-bed-management" style="font-size: 13px; font-weight: 600; color: #0D9488; text-decoration: none;">Includes Isolation Bed Tracking &rarr;</a>
                </div>

                <!-- Workflow 4: OT Safety Checklist -->
                <div style="background: #FFF; padding: 28px; border-radius: 12px; border: 1px solid #E2E8F0;">
                    <div style="font-size: 26px; margin-bottom: 12px;">🩺</div>
                    <h3 style="font-size: 1.2rem; font-weight: 700; color: #1E293B; margin-bottom: 8px;">Surgical Safety &amp; OT Protocols</h3>
                    <p style="font-size: 14px; color: #475569; line-height: 1.6; margin-bottom: 14px;">
                        Mandatory digital WHO surgical safety checklists (Sign-in, Time-out, Sign-out) before incision, linked with anaesthesia record keeping.
                    </p>
                    <a href="hims-software" style="font-size: 13px; font-weight: 600; color: #0D9488; text-decoration: none;">Learn About OT Management &rarr;</a>
                </div>

                <!-- Workflow 5: Clinical Audit Trail -->
                <div style="background: #FFF; padding: 28px; border-radius: 12px; border: 1px solid #E2E8F0;">
                    <div style="font-size: 26px; margin-bottom: 12px;">🔍</div>
                    <h3 style="font-size: 1.2rem; font-weight: 700; color: #1E293B; margin-bottom: 8px;">Tamper-Evident Clinical Audit Trails</h3>
                    <p style="font-size: 14px; color: #475569; line-height: 1.6; margin-bottom: 14px;">
                        Every patient file edit, doctor consultation note, and test result entry is stamped with cryptographic user ID, date, and time to satisfy external inspectors.
                    </p>
                    <a href="blogs/nabh-compliance-guide" style="font-size: 13px; font-weight: 600; color: #0D9488; text-decoration: none;">View Audit Readiness Checklist &rarr;</a>
                </div>

                <!-- Workflow 6: Quality Indicators KPI Dashboard -->
                <div style="background: #FFF; padding: 28px; border-radius: 12px; border: 1px solid #E2E8F0;">
                    <div style="font-size: 26px; margin-bottom: 12px;">📊</div>
                    <h3 style="font-size: 1.2rem; font-weight: 700; color: #1E293B; margin-bottom: 8px;">Monthly Quality Indicator Reports</h3>
                    <p style="font-size: 14px; color: #475569; line-height: 1.6; margin-bottom: 14px;">
                        Automated calculation of bed occupancy rates, average length of stay (ALOS), re-admission rates, and medication reconciliation compliance.
                    </p>
                    <a href="pricing" style="font-size: 13px; font-weight: 600; color: #0D9488; text-decoration: none;">View SaaS Subscription Tiers &rarr;</a>
                </div>
            </div>
        </div>
    </section>

    <!-- PRICING & DEMO CALLOUT -->
    <section style="padding: 60px 24px; background: #0F172A; color: #FFF; text-align: center;">
        <div style="max-width: 800px; margin: 0 auto;">
            <h2 style="font-size: 1.9rem; font-weight: 800; margin-bottom: 16px; color: #FFF;">
                Ready to Digitize Your Hospital Quality &amp; Compliance?
            </h2>
            <p style="font-size: 15px; color: #94A3B8; line-height: 1.7; margin-bottom: 28px;">
                Medical365 helps Indian healthcare facilities replace scattered paper registers with structured digital workflows built for NABH inspection success.
            </p>
            <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
                <a href="pricing" class="btn-primary" style="background: #0D9488; padding: 12px 28px; font-weight: 700; border-radius: 8px; text-decoration: none; color: #FFF;">Check Transparent Pricing Plans &rarr;</a>
                <a href="book-demo" style="padding: 12px 24px; font-weight: 600; border: 1px solid rgba(255,255,255,0.25); border-radius: 8px; text-decoration: none; color: #FFF; display: inline-block;">Schedule Compliance Demo</a>
            </div>
        </div>
    </section>
`;

const fullNabhPage = headerPart + nabhBodyContent + footerPart;
fs.writeFileSync(path.join(repoRoot, 'nabh-compliant-hospital-software.html'), fullNabhPage, 'utf8');
console.log('Successfully re-created nabh-compliant-hospital-software.html with clean single H1 and clean schema!');
