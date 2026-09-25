const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
console.log('=== CREATING APPOINTMENT-SCHEDULING.HTML ===');

// Read patient-registration.html as the structural template
const baseHtml = fs.readFileSync(path.join(repoRoot, 'patient-registration.html'), 'utf8');

// 1. Extract Pre-Header (up to </header>) and Post-Footer (from <footer id="mega-footer")
const headerEndIdx = baseHtml.indexOf('</header>');
let footerStartIdx = baseHtml.indexOf('<!-- ═══════════════════════════════════════════════════\n     MEDICAL365 MEGA FOOTER');
if (footerStartIdx === -1) footerStartIdx = baseHtml.indexOf('<!-- ═══════════════════════════════════════════════════\r\n     MEDICAL365 MEGA FOOTER');
if (footerStartIdx === -1) footerStartIdx = baseHtml.indexOf('<footer id="mega-footer"');

let preHeader = baseHtml.substring(0, headerEndIdx + '</header>'.length);
const postFooter = baseHtml.substring(footerStartIdx);

// 2. Replace Head Metadata
preHeader = preHeader.replace(/<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i, '<link rel="canonical" href="https://www.medical365.in/appointment-scheduling" />');
preHeader = preHeader.replace(/<title>[\s\S]*?<\/title>/i, '<title>Hospital Appointment Scheduling Software & Doctor Booking | Medical365</title>');
preHeader = preHeader.replace(/<meta\s+name=["']description["']\s+content=["'][\s\S]*?["']/i, '<meta name="description" content="Medical365 hospital appointment scheduling software: Multi-channel doctor booking (web, WhatsApp, desk), real-time calendar sync, queue tokens & automated SMS reminders. ABDM compliant.">');

// Update OG and Twitter tags
preHeader = preHeader.replace(/<meta\s+property=["']og:title["']\s+content=["'][\s\S]*?["']/i, '<meta property="og:title" content="Hospital Appointment Scheduling Software & Doctor Booking | Medical365">');
preHeader = preHeader.replace(/<meta\s+property=["']og:description["']\s+content=["'][\s\S]*?["']/i, '<meta property="og:description" content="Multi-channel doctor appointment scheduling, real-time slot management, automated WhatsApp reminders, and live queue token tracking for Indian hospitals and clinics.">');

// 3. Build Structured Data (JSON-LD)
const jsonLdBlocks = `
    <!-- Legitimate Structured Data (SoftwareApplication, WebPage, BreadcrumbList, FAQPage) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Medical365 — Hospital Appointment Scheduling Software",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web, Android, iOS, Windows",
      "url": "https://www.medical365.in/appointment-scheduling",
      "description": "Multi-channel doctor appointment scheduling, real-time slot management, automated WhatsApp reminders, and live queue token tracking for Indian hospitals and clinics.",
      "offers": {
        "@type": "Offer",
        "price": "6000",
        "priceCurrency": "INR",
        "priceValidUntil": "2026-12-31"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Medical365 by Chonexa Technologies",
        "url": "https://www.medical365.in",
        "logo": "https://www.medical365.in/medical365logo1.png",
        "telephone": "+91-77919-10007"
      }
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Hospital Appointment Scheduling Software & Doctor Booking | Medical365",
      "url": "https://www.medical365.in/appointment-scheduling",
      "description": "Multi-channel doctor appointment scheduling, real-time slot management, automated WhatsApp reminders, and live queue token tracking for Indian hospitals and clinics.",
      "publisher": {
        "@type": "Organization",
        "name": "Medical365",
        "url": "https://www.medical365.in"
      }
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
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
          "name": "Core Platform",
          "item": "https://www.medical365.in/hims-software"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Appointment Scheduling",
          "item": "https://www.medical365.in/appointment-scheduling"
        }
      ]
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is hospital appointment scheduling software?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Hospital appointment scheduling software is a centralized digital system that manages patient consultation bookings across multiple channels—including online patient portals, WhatsApp bots, front-desk reception, and telephone inquiries. It coordinates real-time doctor availability calendars, prevents double bookings, and sends automated reminder notifications."
          }
        },
        {
          "@type": "Question",
          "name": "How does Medical365 reduce patient no-shows?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Medical365 automatically dispatches personalized appointment confirmations and reminder alerts via WhatsApp and SMS 24 hours and 2 hours prior to the scheduled slot. Patients can easily confirm, reschedule, or cancel with a single tap, allowing vacant slots to be instantly offered to waiting walk-in patients."
          }
        },
        {
          "@type": "Question",
          "name": "Can patients book appointments through WhatsApp?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Medical365 includes built-in WhatsApp Business API integration. Patients can message the hospital's verified WhatsApp number, view available doctor specialties and timing slots, select a convenient time, and receive an instant digital QR confirmation token directly on WhatsApp."
          }
        },
        {
          "@type": "Question",
          "name": "Does the scheduling software integrate with hospital OPD queues and tokens?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Scheduled appointments flow directly into the OPD token and queue management system. When patients arrive and check in via kiosk or front desk, they receive a dynamic queue number that displays on waiting area screens along with live estimated wait times."
          }
        }
      ]
    }
    </script>
`;

preHeader = preHeader.replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '');
preHeader = preHeader.replace('</head>', jsonLdBlocks + '\n</head>');

// 4. Construct Non-Templated, Purpose-Built Scheduling Body
const bodyContent = `
<!-- ══════════════════════════════════════════════════
     APPOINTMENT SCHEDULING MODULE CONTENT
     ══════════════════════════════════════════════════ -->
<section class="page-hero" style="padding:100px 24px 60px; background:radial-gradient(circle at top right, rgba(26,86,219,0.06), transparent 60%);">
  <div class="container" style="max-width:1140px; margin:0 auto;">
    <div style="max-width:850px; margin:0 auto; text-align:center;">
      <div class="badge" style="display:inline-block; padding:6px 16px; border-radius:20px; background:rgba(26,86,219,0.1); color:#1A56DB; font-weight:700; font-size:0.85rem; margin-bottom:20px;">
        ⚡ Core Platform Module
      </div>
      <h1 style="font-size:clamp(2.2rem, 5vw, 3.2rem); font-weight:800; line-height:1.15; color:#0f172a; margin-bottom:20px;">
        Hospital Appointment Scheduling Software & Doctor Booking
      </h1>
      <p style="font-size:1.2rem; color:#475569; line-height:1.6; margin-bottom:36px;">
        Streamline multi-channel patient bookings, doctor shift allocations, queue tokens, and automated WhatsApp reminders across outpatient clinics and hospital departments.
      </p>
      <div style="display:flex; gap:16px; justify-content:center; flex-wrap:wrap; margin-bottom:40px;">
        <a href="https://www.medical365.in/book-demo" class="btn-primary" style="padding:14px 32px; border-radius:50px; font-weight:700; text-decoration:none; touch-action:manipulation;">Book a Free Demo</a>
        <a href="/pricing" class="btn-secondary" style="padding:14px 32px; border-radius:50px; font-weight:600; text-decoration:none; border:1px solid #cbd5e1; color:#334155; touch-action:manipulation;">View Transparent Pricing</a>
      </div>
    </div>
  </div>
</section>

<!-- Quick Answer / Definition Box (AEO Direct Extraction) -->
<section class="quick-answer-section" style="padding:40px 24px; background:#fff; border-top:1px solid #e2e8f0; border-bottom:1px solid #e2e8f0;">
  <div class="container" style="max-width:900px; margin:0 auto;">
    <div style="background:#f8fafc; border-left:4px solid #1A56DB; padding:24px 28px; border-radius:8px;">
      <h2 style="font-size:1.25rem; font-weight:800; color:#0f172a; margin-bottom:12px;">What is hospital appointment scheduling software?</h2>
      <p style="font-size:1.05rem; color:#334155; line-height:1.65; margin:0;">
        <strong>Hospital appointment scheduling software</strong> is a centralized digital management system that organizes doctor availability calendars, allocates outpatient consultation slots, and automates patient bookings across web, WhatsApp, phone, and front-desk reception. It connects directly with hospital <a href="/patient-registration" style="color:#1A56DB; font-weight:600;">patient registration</a> and <a href="/emr-ehr-system" style="color:#1A56DB; font-weight:600;">EMR records</a>, minimizing patient waiting times and eliminating booking conflicts.
      </p>
    </div>
  </div>
</section>

<!-- 6 Real Scheduling Capabilities -->
<section class="features-section" style="padding:80px 24px; background:#f8fafc;">
  <div class="container" style="max-width:1140px; margin:0 auto;">
    <div style="text-align:center; max-width:700px; margin:0 auto 50px;">
      <h2 style="font-size:2rem; font-weight:800; color:#0f172a; margin-bottom:12px;">Smart Scheduling Capabilities</h2>
      <p style="font-size:1.1rem; color:#64748b;">Designed specifically for high-volume outpatient departments, private clinics, and multi-specialty hospitals.</p>
    </div>
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:24px;">
      
      <div class="feature-card" style="background:#fff; padding:28px; border-radius:16px; border:1px solid #e2e8f0; box-shadow:0 4px 12px rgba(0,0,0,0.03);">
        <div style="width:48px; height:48px; border-radius:12px; background:rgba(26,86,219,0.08); display:flex; align-items:center; justify-content:center; color:#1A56DB; margin-bottom:16px;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
        </div>
        <h3 style="font-size:1.15rem; font-weight:700; margin-bottom:8px; color:#1e293b;">Multi-Channel Online Booking</h3>
        <p style="font-size:0.92rem; color:#64748b; line-height:1.6;">Allow patients to book consultations 24/7 through your hospital website, custom branded patient mobile app, or conversational WhatsApp chatbot.</p>
      </div>

      <div class="feature-card" style="background:#fff; padding:28px; border-radius:16px; border:1px solid #e2e8f0; box-shadow:0 4px 12px rgba(0,0,0,0.03);">
        <div style="width:48px; height:48px; border-radius:12px; background:rgba(26,86,219,0.08); display:flex; align-items:center; justify-content:center; color:#1A56DB; margin-bottom:16px;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        </div>
        <h3 style="font-size:1.15rem; font-weight:700; margin-bottom:8px; color:#1e293b;">Doctor Roster & Shift Allocation</h3>
        <p style="font-size:0.92rem; color:#64748b; line-height:1.6;">Configure granular consultation hours, buffer durations between patients, emergency block-out slots, and multi-doctor room allocation rules.</p>
      </div>

      <div class="feature-card" style="background:#fff; padding:28px; border-radius:16px; border:1px solid #e2e8f0; box-shadow:0 4px 12px rgba(0,0,0,0.03);">
        <div style="width:48px; height:48px; border-radius:12px; background:rgba(26,86,219,0.08); display:flex; align-items:center; justify-content:center; color:#1A56DB; margin-bottom:16px;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </div>
        <h3 style="font-size:1.15rem; font-weight:700; margin-bottom:8px; color:#1e293b;">Automated WhatsApp & SMS Alerts</h3>
        <p style="font-size:0.92rem; color:#64748b; line-height:1.6;">Drastically decrease no-shows with timed automated reminders containing digital booking slips, directions, and 1-tap confirmation or rescheduling options.</p>
      </div>

      <div class="feature-card" style="background:#fff; padding:28px; border-radius:16px; border:1px solid #e2e8f0; box-shadow:0 4px 12px rgba(0,0,0,0.03);">
        <div style="width:48px; height:48px; border-radius:12px; background:rgba(26,86,219,0.08); display:flex; align-items:center; justify-content:center; color:#1A56DB; margin-bottom:16px;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
        </div>
        <h3 style="font-size:1.15rem; font-weight:700; margin-bottom:8px; color:#1e293b;">Smart OPD Token & Queue Sync</h3>
        <p style="font-size:0.92rem; color:#64748b; line-height:1.6;">Bookings feed straight into outpatient waiting hall displays, dynamically calculating estimated wait times and prioritizing appointments over walk-ins.</p>
      </div>

      <div class="feature-card" style="background:#fff; padding:28px; border-radius:16px; border:1px solid #e2e8f0; box-shadow:0 4px 12px rgba(0,0,0,0.03);">
        <div style="width:48px; height:48px; border-radius:12px; background:rgba(26,86,219,0.08); display:flex; align-items:center; justify-content:center; color:#1A56DB; margin-bottom:16px;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 10l5 5-5 5"></path><path d="M4 4v7a4 4 0 0 0 4 4h11"></path></svg>
        </div>
        <h3 style="font-size:1.15rem; font-weight:700; margin-bottom:8px; color:#1e293b;">Drag-and-Drop Front-Desk Rescheduling</h3>
        <p style="font-size:0.92rem; color:#64748b; line-height:1.6;">Receptionists can adjust doctor schedules in seconds with an interactive visual calendar, instantly notifying impacted patients about doctor delays or leave.</p>
      </div>

      <div class="feature-card" style="background:#fff; padding:28px; border-radius:16px; border:1px solid #e2e8f0; box-shadow:0 4px 12px rgba(0,0,0,0.03);">
        <div style="width:48px; height:48px; border-radius:12px; background:rgba(26,86,219,0.08); display:flex; align-items:center; justify-content:center; color:#1A56DB; margin-bottom:16px;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
        </div>
        <h3 style="font-size:1.15rem; font-weight:700; margin-bottom:8px; color:#1e293b;">Coordinated Department Bookings</h3>
        <p style="font-size:0.92rem; color:#64748b; line-height:1.6;">Schedule consecutive appointments for doctor consultations, diagnostic imaging (X-ray, MRI), and lab blood collections in one single visit flow.</p>
      </div>

    </div>
  </div>
</section>

<!-- Purpose-Built Scheduling Workflow -->
<section class="workflow-section" style="padding:80px 24px; background:#fff;">
  <div class="container" style="max-width:1140px; margin:0 auto;">
    <div style="text-align:center; max-width:700px; margin:0 auto 50px;">
      <h2 style="font-size:2rem; font-weight:800; color:#0f172a; margin-bottom:12px;">The Complete Patient Booking Lifecycle</h2>
      <p style="font-size:1.1rem; color:#64748b;">From the first booking inquiry to post-consultation follow-up scheduling.</p>
    </div>
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:20px; text-align:center;">
      
      <div style="padding:24px; background:#f8fafc; border-radius:12px; border:1px solid #e2e8f0;">
        <div style="width:36px; height:36px; background:#1A56DB; color:#fff; font-weight:800; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 12px;">1</div>
        <h4 style="font-size:1.05rem; font-weight:700; color:#0f172a; margin-bottom:6px;">Booking Request</h4>
        <p style="font-size:0.88rem; color:#64748b; margin:0;">Patient selects doctor, specialty, and preferred slot online, via WhatsApp, or over phone.</p>
      </div>

      <div style="padding:24px; background:#f8fafc; border-radius:12px; border:1px solid #e2e8f0;">
        <div style="width:36px; height:36px; background:#1A56DB; color:#fff; font-weight:800; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 12px;">2</div>
        <h4 style="font-size:1.05rem; font-weight:700; color:#0f172a; margin-bottom:6px;">Slot Validation</h4>
        <p style="font-size:0.88rem; color:#64748b; margin:0;">System checks real-time doctor roster, consultation room, and quota limits without collision.</p>
      </div>

      <div style="padding:24px; background:#f8fafc; border-radius:12px; border:1px solid #e2e8f0;">
        <div style="width:36px; height:36px; background:#1A56DB; color:#fff; font-weight:800; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 12px;">3</div>
        <h4 style="font-size:1.05rem; font-weight:700; color:#0f172a; margin-bottom:6px;">Instant Confirmation</h4>
        <p style="font-size:0.88rem; color:#64748b; margin:0;">Patient receives digital pass with QR code, UHID, and reminder alerts via WhatsApp/SMS.</p>
      </div>

      <div style="padding:24px; background:#f8fafc; border-radius:12px; border:1px solid #e2e8f0;">
        <div style="width:36px; height:36px; background:#1A56DB; color:#fff; font-weight:800; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 12px;">4</div>
        <h4 style="font-size:1.05rem; font-weight:700; color:#0f172a; margin-bottom:6px;">OPD Check-In</h4>
        <p style="font-size:0.88rem; color:#64748b; margin:0;">Patient scans QR at reception kiosk, automatically activating their spot in the live queue.</p>
      </div>

      <div style="padding:24px; background:#f8fafc; border-radius:12px; border:1px solid #e2e8f0;">
        <div style="width:36px; height:36px; background:#1A56DB; color:#fff; font-weight:800; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 12px;">5</div>
        <h4 style="font-size:1.05rem; font-weight:700; color:#0f172a; margin-bottom:6px;">Follow-up Scheduling</h4>
        <p style="font-size:0.88rem; color:#64748b; margin:0;">Doctor books next review appointment directly within EMR consultation notes.</p>
      </div>

    </div>
  </div>
</section>

<!-- Ecosystem Integration -->
<section class="ecosystem-section" style="padding:80px 24px; background:#f8fafc;">
  <div class="container" style="max-width:1140px; margin:0 auto;">
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:40px; align-items:center;">
      <div>
        <h2 style="font-size:2rem; font-weight:800; color:#0f172a; margin-bottom:16px;">Tightly Connected to Medical365 Hospital Systems</h2>
        <p style="font-size:1.05rem; color:#475569; line-height:1.6; margin-bottom:24px;">
          Appointment scheduling is the primary entry gate to your hospital. Medical365 seamlessly coordinates bookings with <a href="/patient-registration" style="color:#1A56DB; font-weight:600;">patient registration</a>, <a href="/billing-invoicing" style="color:#1A56DB; font-weight:600;">OPD billing</a>, doctor <a href="/emr-ehr-system" style="color:#1A56DB; font-weight:600;">EMR workstations</a>, and teleconsultations.
        </p>
        <div style="margin-top:20px;">
          <h4 style="font-size:1rem; font-weight:700; color:#1e293b; margin-bottom:10px;">Explore Related Core Platform Modules:</h4>
          <a href="/patient-registration" style="display:inline-block; padding:10px 20px; background:#e2e8f0; border-radius:30px; text-decoration:none; color:#1e293b; font-weight:600; font-size:0.9rem; margin:6px;">Patient Registration →</a>
          <a href="/billing-invoicing" style="display:inline-block; padding:10px 20px; background:#e2e8f0; border-radius:30px; text-decoration:none; color:#1e293b; font-weight:600; font-size:0.9rem; margin:6px;">Billing & Invoicing →</a>
          <a href="/emr-ehr-system" style="display:inline-block; padding:10px 20px; background:#e2e8f0; border-radius:30px; text-decoration:none; color:#1e293b; font-weight:600; font-size:0.9rem; margin:6px;">EMR/EHR System →</a>
        </div>
      </div>
      <div style="background:#fff; padding:36px; border-radius:20px; border:1px solid #e2e8f0; box-shadow:0 10px 30px rgba(0,0,0,0.04);">
        <h3 style="font-size:1.3rem; font-weight:800; color:#0f172a; margin-bottom:20px;">Key Operational Benefits</h3>
        <ul style="list-style:none; padding:0; margin:0;">
          <li style="display:flex; gap:12px; margin-bottom:16px; font-size:0.95rem; color:#334155; line-height:1.5;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span><strong>Zero Double-Bookings:</strong> Unified central database prevents overlapping appointments across physical and teleconsult channels.</span>
          </li>
          <li style="display:flex; gap:12px; margin-bottom:16px; font-size:0.95rem; color:#334155; line-height:1.5;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span><strong>Reduced Patient Waiting Times:</strong> Smooth slot spacing prevents crowded waiting rooms and balances physician workloads.</span>
          </li>
          <li style="display:flex; gap:12px; margin-bottom:16px; font-size:0.95rem; color:#334155; line-height:1.5;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span><strong>Lower No-Show Rates:</strong> Automated WhatsApp and SMS reminders keep patients on schedule and allow timely cancellations.</span>
          </li>
          <li style="display:flex; gap:12px; margin-bottom:0; font-size:0.95rem; color:#334155; line-height:1.5;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span><strong>Front-Desk Efficiency:</strong> Staff spend less time managing phone calls and paper appointment registers.</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- Frequently Asked Questions -->
<section class="faq-section" style="padding:80px 24px; background:#fff;">
  <div class="container" style="max-width:850px; margin:0 auto;">
    <div style="text-align:center; margin-bottom:50px;">
      <h2 style="font-size:2rem; font-weight:800; color:#0f172a; margin-bottom:12px;">Frequently Asked Questions</h2>
      <p style="font-size:1.1rem; color:#64748b;">Direct answers to common questions about hospital appointment scheduling software.</p>
    </div>
    <div class="faq-list">
      <div class="faq-item" style="border-bottom:1px solid #e2e8f0; padding:20px 0;">
        <h3 style="font-size:1.1rem; font-weight:700; color:#1e293b; margin-bottom:10px;">What is hospital appointment scheduling software?</h3>
        <p style="font-size:0.95rem; color:#475569; line-height:1.6;">Hospital appointment scheduling software is a centralized digital system that manages patient consultation bookings across multiple channels—including online patient portals, WhatsApp bots, front-desk reception, and telephone inquiries. It coordinates real-time doctor availability calendars, prevents double bookings, and sends automated reminder notifications.</p>
      </div>
      <div class="faq-item" style="border-bottom:1px solid #e2e8f0; padding:20px 0;">
        <h3 style="font-size:1.1rem; font-weight:700; color:#1e293b; margin-bottom:10px;">How does Medical365 reduce patient no-shows?</h3>
        <p style="font-size:0.95rem; color:#475569; line-height:1.6;">Medical365 automatically dispatches personalized appointment confirmations and reminder alerts via WhatsApp and SMS 24 hours and 2 hours prior to the scheduled slot. Patients can easily confirm, reschedule, or cancel with a single tap, allowing vacant slots to be instantly offered to waiting walk-in patients.</p>
      </div>
      <div class="faq-item" style="border-bottom:1px solid #e2e8f0; padding:20px 0;">
        <h3 style="font-size:1.1rem; font-weight:700; color:#1e293b; margin-bottom:10px;">Can patients book appointments through WhatsApp?</h3>
        <p style="font-size:0.95rem; color:#475569; line-height:1.6;">Yes. Medical365 includes built-in WhatsApp Business API integration. Patients can message the hospital's verified WhatsApp number, view available doctor specialties and timing slots, select a convenient time, and receive an instant digital QR confirmation token directly on WhatsApp.</p>
      </div>
      <div class="faq-item" style="border-bottom:1px solid #e2e8f0; padding:20px 0;">
        <h3 style="font-size:1.1rem; font-weight:700; color:#1e293b; margin-bottom:10px;">Does the scheduling software integrate with hospital OPD queues and tokens?</h3>
        <p style="font-size:0.95rem; color:#475569; line-height:1.6;">Yes. Scheduled appointments flow directly into the OPD token and queue management system. When patients arrive and check in via kiosk or front desk, they receive a dynamic queue number that displays on waiting area screens along with live estimated wait times.</p>
      </div>
    </div>
  </div>
</section>

<!-- Bottom CTA Banner -->
<section class="bottom-cta" style="padding:70px 24px; background:linear-gradient(135deg, #1A56DB, #0D9488); color:#fff; text-align:center;">
  <div class="container" style="max-width:800px; margin:0 auto;">
    <h2 style="font-size:2.2rem; font-weight:800; margin-bottom:16px; color:#fff;">Modernize your hospital scheduling workflow today.</h2>
    <p style="font-size:1.15rem; opacity:0.9; margin-bottom:36px;">Schedule an on-site or online interactive walkthrough customized for your hospital.</p>
    <div style="display:flex; gap:16px; justify-content:center; flex-wrap:wrap;">
      <a href="https://www.medical365.in/book-demo" class="btn-primary" style="background:#fff !important; color:#1A56DB !important; padding:15px 36px; font-size:1.05rem; font-weight:700; border-radius:50px; text-decoration:none; touch-action:manipulation;">Book a Free Demo</a>
      <a href="/pricing" class="btn-secondary" style="background:transparent !important; color:#fff !important; border:2px solid #fff; padding:13px 32px; font-size:1.05rem; font-weight:600; border-radius:50px; text-decoration:none; touch-action:manipulation;">Explore Pricing Plans</a>
    </div>
  </div>
</section>
`;

const finalAppointmentHtml = preHeader + '\n' + bodyContent + '\n' + postFooter;

const targetFile = path.join(repoRoot, 'appointment-scheduling.html');
fs.writeFileSync(targetFile, finalAppointmentHtml, 'utf8');
console.log('Successfully created appointment-scheduling.html!');
