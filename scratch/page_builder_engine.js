const fs = require('fs');
const path = require('path');

function generateSvgDiagram(item) {
    const boxWidth = 150;
    const boxHeight = 70;
    const gap = 35;
    const startX = 30;
    const startY = 175;

    const nodeElements = item.nodes.map((nodeText, idx) => {
        const x = startX + idx * (boxWidth + gap);
        const y = startY;
        const arrow = idx < item.nodes.length - 1 ? `
        <!-- Arrow ${idx+1} -->
        <g transform="translate(${x + boxWidth}, ${y + boxHeight/2})">
            <line x1="5" y1="0" x2="${gap - 5}" y2="0" stroke="${item.color}" stroke-width="2.5" stroke-dasharray="4,2"/>
            <polygon points="${gap - 2},0 ${gap - 10},-5 ${gap - 10},5" fill="${item.color}"/>
        </g>` : '';

        return `
        <!-- Node ${idx+1}: ${nodeText} -->
        <g transform="translate(${x}, ${y})">
            <rect width="${boxWidth}" height="${boxHeight}" rx="12" fill="#ffffff" stroke="${item.color}" stroke-width="2" filter="url(#shadow)"/>
            <rect width="${boxWidth}" height="6" rx="3" fill="${item.color}"/>
            <text x="${boxWidth/2}" y="32" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#1e293b">
                STEP ${idx+1}
            </text>
            <text x="${boxWidth/2}" y="50" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="600" fill="#475569">
                ${nodeText.split(' ').slice(0, 2).join(' ')}
            </text>
            <text x="${boxWidth/2}" y="62" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9.5" fill="#64748b">
                ${nodeText.split(' ').slice(2).join(' ')}
            </text>
        </g>
        ${arrow}`;
    }).join('\n');

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 420" width="100%" height="100%" style="background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%); border-radius: 16px; border: 1px solid #e2e8f0;">
    <defs>
        <filter id="shadow" x="-5%" y="-10%" width="115%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.06"/>
        </filter>
        <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="${item.color}"/>
            <stop offset="100%" stop-color="#1e293b"/>
        </linearGradient>
    </defs>
    <!-- Background grid -->
    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#f1f5f9" stroke-width="1"/>
    </pattern>
    <rect width="960" height="420" fill="url(#grid)"/>

    <!-- Header Banner -->
    <rect x="0" y="0" width="960" height="70" fill="url(#headerGrad)"/>
    <text x="35" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="800" fill="#ffffff" letter-spacing="0.5">
        MEDICAL365 CLINICAL WORKFLOW ARCHITECTURE
    </text>
    <text x="925" y="42" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#cbd5e1">
        ${item.cluster} EMR MODULE
    </text>

    <!-- Subtitle -->
    <text x="35" y="115" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" fill="#0f172a">
        ${item.diagramTitle}
    </text>
    <text x="35" y="138" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="#64748b">
        Automated bidirectional data flow connecting diagnostic modalities, clinical reviews, and hospital EMR.
    </text>

    <!-- Workflow Nodes -->
    ${nodeElements}

    <!-- Footer Certification Badge -->
    <rect x="35" y="345" width="890" height="45" rx="8" fill="#f8fafc" stroke="#e2e8f0"/>
    <circle cx="55" cy="367" r="8" fill="#10b981"/>
    <path d="M 52 367 L 55 370 L 60 364" fill="none" stroke="#ffffff" stroke-width="2"/>
    <text x="75" y="371" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11.5" font-weight="600" fill="#334155">
        ABDM M1/M2/M3 Compliant • DPDP Act 2023 End-to-End Encryption • ISO 27001 Certified Health Cloud
    </text>
</svg>`;
}

function generateFullPageHtml(slug, item, preHeader, postFooter) {
    // 1. Capability Cards (6 deep cards)
    const capCardsHtml = item.capabilities.map((c, i) => `
      <div class="cap-card" style="background:#ffffff; padding:32px 28px; border-radius:16px; border:1px solid #e2e8f0; box-shadow:0 4px 14px rgba(0,0,0,0.03); display:flex; flex-direction:column;">
        <div style="width:46px; height:46px; border-radius:12px; background:rgba(26,86,219,0.08); display:flex; align-items:center; justify-content:center; color:${item.color}; font-weight:800; font-size:1.1rem; margin-bottom:18px;">
          0${i+1}
        </div>
        <h3 style="font-size:1.2rem; font-weight:800; color:#0f172a; margin-bottom:12px; line-height:1.35;">${c.title}</h3>
        <p style="font-size:0.96rem; color:#475569; line-height:1.65; margin:0; flex-grow:1;">${c.text}</p>
      </div>`).join('\n');

    // 2. Step Workflow (5 deep steps)
    const workflowHtml = item.workflowSteps.map((w, i) => `
      <div class="wf-step-box" style="padding:28px 22px; background:#ffffff; border-radius:14px; border:1px solid #e2e8f0; box-shadow:0 2px 10px rgba(0,0,0,0.02); text-align:center;">
        <div style="width:38px; height:38px; border-radius:50%; background:${item.color}; color:#ffffff; font-weight:800; display:flex; align-items:center; justify-content:center; margin:0 auto 14px; font-size:0.95rem;">
          ${i+1}
        </div>
        <h4 style="font-size:1.08rem; font-weight:800; color:#0f172a; margin-bottom:8px;">${w.step}</h4>
        <p style="font-size:0.9rem; color:#64748b; line-height:1.55; margin:0;">${w.desc}</p>
      </div>`).join('\n');

    // 3. Comparison Table Rows
    const tableRows = item.table.map(r => `
      <tr style="border-bottom:1px solid #e2e8f0;">
        <td style="padding:16px 20px; font-weight:700; color:#1e293b; background:#f8fafc; font-size:0.95rem;">${r.feature}</td>
        <td style="padding:16px 20px; color:#64748b; font-size:0.92rem; line-height:1.5;">${r.manual}</td>
        <td style="padding:16px 20px; color:#0f766e; font-weight:600; background:#f0fdfa; font-size:0.92rem; line-height:1.5;">${r.m365}</td>
      </tr>`).join('\n');

    // 4. In-depth FAQs (6 questions)
    const faqsHtml = item.faqs.map(f => `
      <div class="faq-item" style="border-bottom:1px solid #e2e8f0; padding:24px 0;">
        <h3 style="font-size:1.15rem; font-weight:800; color:#0f172a; margin-bottom:10px;">${f.q}</h3>
        <p style="font-size:0.98rem; color:#475569; line-height:1.68; margin:0;">${f.a}</p>
      </div>`).join('\n');

    // Assemble deep body content
    const bodyContent = `
<!-- ══════════════════════════════════════════════════
     ${item.cluster} SPECIALTY PAGE: ${slug.toUpperCase()}
     ══════════════════════════════════════════════════ -->
<section class="page-hero" style="padding:110px 24px 70px; background:radial-gradient(circle at top right, rgba(26,86,219,0.06), transparent 60%);">
  <div class="container" style="max-width:1160px; margin:0 auto;">
    <div style="max-width:900px; margin:0 auto; text-align:center;">
      <div class="badge" style="display:inline-block; padding:6px 18px; border-radius:20px; background:rgba(26,86,219,0.1); color:#1A56DB; font-weight:800; font-size:0.85rem; margin-bottom:22px; text-transform:uppercase; letter-spacing:0.5px;">
        ✨ ${item.cluster} EMR MODULE
      </div>
      <h1 style="font-size:clamp(2.3rem, 5vw, 3.4rem); font-weight:850; line-height:1.15; color:#0f172a; margin-bottom:22px; letter-spacing:-0.5px;">
        ${item.h1}
      </h1>
      <p style="font-size:1.22rem; color:#475569; line-height:1.65; margin-bottom:38px;">
        ${item.metaDesc}
      </p>
      <div style="display:flex; gap:16px; justify-content:center; flex-wrap:wrap; margin-bottom:30px;">
        <a href="https://www.medical365.in/book-demo" class="btn-primary" style="padding:15px 36px; border-radius:50px; font-weight:750; font-size:1.05rem; text-decoration:none; touch-action:manipulation; box-shadow:0 8px 20px rgba(26,86,219,0.25);">Book a Free On-Site Demo</a>
        <a href="/pricing" class="btn-secondary" style="padding:15px 34px; border-radius:50px; font-weight:650; font-size:1.05rem; text-decoration:none; border:1px solid #cbd5e1; color:#334155; touch-action:manipulation; background:#fff;">View Transparent Pricing</a>
      </div>
    </div>
  </div>
</section>

<!-- Section 1: AEO Quick Answer & Executive Summary -->
<section class="quick-answer-section" style="padding:45px 24px; background:#ffffff; border-top:1px solid #e2e8f0; border-bottom:1px solid #e2e8f0;">
  <div class="container" style="max-width:960px; margin:0 auto;">
    <div style="background:#f8fafc; border-left:5px solid ${item.color}; padding:28px 32px; border-radius:10px; box-shadow:0 2px 8px rgba(0,0,0,0.02);">
      <h2 style="font-size:1.35rem; font-weight:800; color:#0f172a; margin-bottom:14px;">What is ${item.h1.toLowerCase()}?</h2>
      <p style="font-size:1.08rem; color:#334155; line-height:1.7; margin:0;">
        ${item.quickAnswer}
      </p>
    </div>
  </div>
</section>

<!-- Section 2: Clinical Landscape & Operational Challenges in India -->
<section class="clinical-context-section" style="padding:85px 24px; background:#f8fafc;">
  <div class="container" style="max-width:1160px; margin:0 auto;">
    <div style="max-width:850px; margin:0 auto; text-align:center; margin-bottom:45px;">
      <h2 style="font-size:2.1rem; font-weight:850; color:#0f172a; margin-bottom:16px;">Clinical Landscape & Specialty Healthcare Challenges in India</h2>
      <p style="font-size:1.12rem; color:#64748b; line-height:1.6;">Addressing the systemic bottlenecks of manual workflows, delayed turnaround, and fragmented patient records in Indian medical institutions.</p>
    </div>
    <div style="background:#ffffff; padding:45px; border-radius:20px; border:1px solid #e2e8f0; box-shadow:0 4px 20px rgba(0,0,0,0.03); font-size:1.06rem; color:#334155; line-height:1.75;">
      ${item.bgText.split('\n\n').map(para => `<p style="margin-bottom:20px;">${para}</p>`).join('\n')}
    </div>
  </div>
</section>

<!-- Section 3: Core Capabilities & Detailed Feature Breakdown -->
<section class="features-section" style="padding:85px 24px; background:#ffffff;">
  <div class="container" style="max-width:1160px; margin:0 auto;">
    <div style="text-align:center; max-width:800px; margin:0 auto 55px;">
      <h2 style="font-size:2.1rem; font-weight:850; color:#0f172a; margin-bottom:16px;">Comprehensive Clinical & Operational Capabilities</h2>
      <p style="font-size:1.12rem; color:#64748b; line-height:1.6;">Engineered with deep clinical specificity to eliminate manual documentation errors, speed up consultations, and support high-volume hospital operations.</p>
    </div>
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(330px, 1fr)); gap:28px;">
      ${capCardsHtml}
    </div>
  </div>
</section>

<!-- Section 4: Visual Architecture Diagram -->
<section class="diagram-section" style="padding:60px 24px 85px; background:#f8fafc; border-top:1px solid #e2e8f0; border-bottom:1px solid #e2e8f0;">
  <div class="container" style="max-width:1040px; margin:0 auto;">
    <div style="text-align:center; margin-bottom:35px;">
      <h2 style="font-size:1.9rem; font-weight:850; color:#0f172a; margin-bottom:12px;">System Architecture & Data Integration Pipeline</h2>
      <p style="font-size:1.08rem; color:#64748b;">Visualizing the end-to-end clinical data flow from diagnostic hardware acquisition to centralized EMR synchronization.</p>
    </div>
    <div style="border-radius:18px; overflow:hidden; box-shadow:0 8px 30px rgba(0,0,0,0.06);">
      <img src="/images/diagrams/${slug}-workflow.svg" alt="Medical365 ${item.diagramTitle}" width="960" height="420" loading="lazy" style="display:block; width:100%; height:auto;" />
    </div>
  </div>
</section>

<!-- Section 5: End-to-End Clinical & Departmental Workflow -->
<section class="workflow-section" style="padding:85px 24px; background:#ffffff;">
  <div class="container" style="max-width:1160px; margin:0 auto;">
    <div style="text-align:center; max-width:800px; margin:0 auto 50px;">
      <h2 style="font-size:2.1rem; font-weight:850; color:#0f172a; margin-bottom:16px;">Step-by-Step Clinical & Departmental Workflow</h2>
      <p style="font-size:1.12rem; color:#64748b;">A transparent 5-stage digital pathway standardizing patient care from initial requisition to longitudinal review.</p>
    </div>
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:20px;">
      ${workflowHtml}
    </div>
  </div>
</section>

<!-- Section 6: Standards, Regulatory Compliance & Data Security -->
<section class="compliance-section" style="padding:85px 24px; background:#f8fafc;">
  <div class="container" style="max-width:1160px; margin:0 auto;">
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(340px, 1fr)); gap:45px; align-items:center;">
      <div>
        <div style="display:inline-block; padding:5px 14px; border-radius:20px; background:rgba(16,185,129,0.1); color:#059669; font-weight:750; font-size:0.82rem; margin-bottom:16px; text-transform:uppercase;">
          🛡️ Compliance & Statutory Adherence
        </div>
        <h2 style="font-size:2.1rem; font-weight:850; color:#0f172a; margin-bottom:18px; line-height:1.25;">ABDM, DPDP Act 2023 & NABH Digital Standards</h2>
        <p style="font-size:1.06rem; color:#475569; line-height:1.75; margin-bottom:20px;">
          ${item.compliance.split('\n\n')[0]}
        </p>
        <p style="font-size:1.06rem; color:#475569; line-height:1.75; margin:0;">
          ${item.compliance.split('\n\n')[1] || ''}
        </p>
      </div>
      <div style="background:#ffffff; padding:40px 36px; border-radius:20px; border:1px solid #e2e8f0; box-shadow:0 8px 24px rgba(0,0,0,0.03);">
        <h3 style="font-size:1.35rem; font-weight:800; color:#0f172a; margin-bottom:22px;">Regulatory Certifications at a Glance</h3>
        <ul style="list-style:none; padding:0; margin:0;">
          <li style="display:flex; gap:14px; margin-bottom:18px; font-size:0.98rem; color:#334155; line-height:1.55;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span><strong>ABDM Milestone 1, 2, 3:</strong> Seamless ABHA health ID creation, health facility registry (HFR), and health locker record linkage.</span>
          </li>
          <li style="display:flex; gap:14px; margin-bottom:18px; font-size:0.98rem; color:#334155; line-height:1.55;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span><strong>DPDP Act 2023 Compliant:</strong> Granular digital consent management, role-based access control (RBAC), and full audit logging.</span>
          </li>
          <li style="display:flex; gap:14px; margin-bottom:18px; font-size:0.98rem; color:#334155; line-height:1.55;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span><strong>NABH 5th Edition Ready:</strong> Standardized digital clinical documentation, tamper-evident consultation records, and clinical audit readiness.</span>
          </li>
          <li style="display:flex; gap:14px; margin-bottom:0; font-size:0.98rem; color:#334155; line-height:1.55;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span><strong>Enterprise Bank-Grade Security:</strong> AES-256 encryption at rest and TLS 1.3 protocol encryption across all network transmissions.</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- Section 7: Operational Comparison Table -->
<section class="comparison-section" style="padding:85px 24px; background:#ffffff;">
  <div class="container" style="max-width:1140px; margin:0 auto;">
    <div style="text-align:center; max-width:800px; margin:0 auto 50px;">
      <h2 style="font-size:2.1rem; font-weight:850; color:#0f172a; margin-bottom:16px;">Traditional Manual Workflows vs. Medical365 Digital Automation</h2>
      <p style="font-size:1.12rem; color:#64748b;">A transparent operational comparison showing tangible improvements in clinical speed, documentation accuracy, and patient experience.</p>
    </div>
    <div style="overflow-x:auto; border-radius:16px; border:1px solid #e2e8f0; box-shadow:0 4px 16px rgba(0,0,0,0.02);">
      <table style="width:100%; border-collapse:collapse; text-align:left;">
        <thead>
          <tr style="background:#0f172a; color:#ffffff;">
            <th style="padding:18px 20px; font-size:1rem; font-weight:800; width:25%;">Clinical Parameter</th>
            <th style="padding:18px 20px; font-size:1rem; font-weight:800; width:37.5%;">Traditional / Paper Process</th>
            <th style="padding:18px 20px; font-size:1rem; font-weight:800; width:37.5%; background:#134e4a;">Medical365 Digital Platform</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </div>
  </div>
</section>

<!-- Section 8: Contextual Hospital Ecosystem & Internal Links -->
<section class="ecosystem-section" style="padding:75px 24px; background:#f8fafc; border-top:1px solid #e2e8f0; border-bottom:1px solid #e2e8f0;">
  <div class="container" style="max-width:1140px; margin:0 auto; text-align:center;">
    <h2 style="font-size:2rem; font-weight:850; color:#0f172a; margin-bottom:16px;">Tightly Interconnected with Medical365 Core Healthcare Modules</h2>
    <p style="font-size:1.1rem; color:#475569; max-width:820px; margin:0 auto 35px; line-height:1.65;">
      This module functions as an integral component of the broader <a href="/hims-software" style="color:#1A56DB; font-weight:700;">Medical365 HIMS Software</a> ecosystem. Diagnostic data seamlessly connects with the <a href="/emr-ehr-system" style="color:#1A56DB; font-weight:700;">hospital EMR</a>, outpatient appointment scheduling, inpatient bed management, and <a href="/nabh-compliant-hospital-software" style="color:#1A56DB; font-weight:700;">NABH compliance audits</a>.
    </p>
    <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
      <a href="/hims-software" style="padding:10px 22px; background:#ffffff; border:1px solid #cbd5e1; border-radius:30px; text-decoration:none; color:#1e293b; font-weight:650; font-size:0.92rem;">Core HIMS Platform →</a>
      <a href="/emr-ehr-system" style="padding:10px 22px; background:#ffffff; border:1px solid #cbd5e1; border-radius:30px; text-decoration:none; color:#1e293b; font-weight:650; font-size:0.92rem;">EMR/EHR System →</a>
      <a href="/nabh-compliant-hospital-software" style="padding:10px 22px; background:#ffffff; border:1px solid #cbd5e1; border-radius:30px; text-decoration:none; color:#1e293b; font-weight:650; font-size:0.92rem;">NABH Compliance →</a>
      <a href="/patient-registration" style="padding:10px 22px; background:#ffffff; border:1px solid #cbd5e1; border-radius:30px; text-decoration:none; color:#1e293b; font-weight:650; font-size:0.92rem;">Patient Registration →</a>
      <a href="/pricing" style="padding:10px 22px; background:#ffffff; border:1px solid #cbd5e1; border-radius:30px; text-decoration:none; color:#1e293b; font-weight:650; font-size:0.92rem;">Transparent Pricing →</a>
    </div>
  </div>
</section>

<!-- Section 9: Comprehensive AEO FAQ Section -->
<section class="faq-section" style="padding:85px 24px; background:#ffffff;">
  <div class="container" style="max-width:900px; margin:0 auto;">
    <div style="text-align:center; margin-bottom:50px;">
      <h2 style="font-size:2.1rem; font-weight:850; color:#0f172a; margin-bottom:14px;">Frequently Asked Questions</h2>
      <p style="font-size:1.12rem; color:#64748b;">Direct clinical and technical answers regarding ${item.h1.toLowerCase()}.</p>
    </div>
    <div class="faq-list">
      ${faqsHtml}
    </div>
  </div>
</section>

<!-- Section 10: Bottom Conversion CTA Banner -->
<section class="bottom-cta" style="padding:80px 24px; background:linear-gradient(135deg, #1A56DB 0%, #0D9488 100%); color:#ffffff; text-align:center;">
  <div class="container" style="max-width:850px; margin:0 auto;">
    <h2 style="font-size:2.3rem; font-weight:850; margin-bottom:18px; color:#ffffff;">Modernize your ${item.cluster.toLowerCase()} workflows today.</h2>
    <p style="font-size:1.18rem; opacity:0.92; margin-bottom:38px; line-height:1.6;">Schedule an on-site or online interactive walkthrough customized for your hospital or clinical specialty.</p>
    <div style="display:flex; gap:18px; justify-content:center; flex-wrap:wrap;">
      <a href="https://www.medical365.in/book-demo" class="btn-primary" style="background:#ffffff !important; color:#1A56DB !important; padding:16px 38px; font-size:1.08rem; font-weight:800; border-radius:50px; text-decoration:none; touch-action:manipulation; box-shadow:0 10px 25px rgba(0,0,0,0.15);">Book a Free On-Site Demo</a>
      <a href="/pricing" class="btn-secondary" style="background:transparent !important; color:#ffffff !important; border:2px solid #ffffff; padding:14px 34px; font-size:1.08rem; font-weight:650; border-radius:50px; text-decoration:none; touch-action:manipulation;">Explore Pricing Plans</a>
    </div>
  </div>
</section>
`;

    // 5. Update Head Metadata & Structured Data
    let newPreHeader = preHeader;

    newPreHeader = newPreHeader.replace(/<title>[\s\S]*?<\/title>/i, `<title>${item.title}</title>`);
    newPreHeader = newPreHeader.replace(/<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta name="description" content="${item.metaDesc}">`);

    // Clean JSON-LD Structured Data
    const jsonLd = `
    <!-- Legitimate Structured Data (SoftwareApplication, WebPage, BreadcrumbList, FAQPage) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Medical365 — ${item.h1.replace(/"/g, '\\"')}",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web, Android, iOS, Windows",
      "url": "https://www.medical365.in/${slug}",
      "description": "${item.metaDesc.replace(/"/g, '\\"')}",
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
      "name": "${item.title.replace(/"/g, '\\"')}",
      "url": "https://www.medical365.in/${slug}",
      "description": "${item.metaDesc.replace(/"/g, '\\"')}",
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
          "name": "${item.cluster}",
          "item": "https://www.medical365.in/hims-software"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "${item.h1.replace(/"/g, '\\"')}",
          "item": "https://www.medical365.in/${slug}"
        }
      ]
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": ${JSON.stringify(item.faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      })), null, 4)}
    }
    </script>
    `;

    newPreHeader = newPreHeader.replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '');
    newPreHeader = newPreHeader.replace('</head>', jsonLd + '\n</head>');

    return newPreHeader + '\n' + bodyContent + '\n' + postFooter;
}

function buildPages(pagesData, repoRoot, diagramDir) {
    let successCount = 0;
    for (const [slug, item] of Object.entries(pagesData)) {
        const filename = slug + '.html';
        const filePath = path.join(repoRoot, filename);
        if (!fs.existsSync(filePath)) {
            console.warn(`File ${filename} not found, skipping.`);
            continue;
        }

        // 1. Generate and save SVG diagram
        const svgContent = generateSvgDiagram(item);
        const svgPath = path.join(diagramDir, `${slug}-workflow.svg`);
        fs.writeFileSync(svgPath, svgContent, 'utf8');

        // 2. Read existing file boundaries
        const html = fs.readFileSync(filePath, 'utf8');
        const headerEndIdx = html.indexOf('</header>');
        let footerStartIdx = html.indexOf('<!-- ═══════════════════════════════════════════════════\n     MEDICAL365 MEGA FOOTER');
        if (footerStartIdx === -1) footerStartIdx = html.indexOf('<!-- ═══════════════════════════════════════════════════\r\n     MEDICAL365 MEGA FOOTER');
        if (footerStartIdx === -1) footerStartIdx = html.indexOf('<footer id="mega-footer"');

        const preHeader = html.substring(0, headerEndIdx + '</header>'.length);
        const postFooter = html.substring(footerStartIdx);

        // 3. Generate expanded HTML
        const expandedHtml = generateFullPageHtml(slug, item, preHeader, postFooter);
        fs.writeFileSync(filePath, expandedHtml, 'utf8');

        // 4. Calculate word count (text only)
        const textOnly = expandedHtml
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        const wordCount = textOnly.split(' ').filter(w => w.length > 0).length;

        successCount++;
        console.log(`[${successCount}] Enhanced ${filename} -> Words: ${wordCount}, SVG: ${slug}-workflow.svg generated!`);
    }
    return successCount;
}

module.exports = {
    generateSvgDiagram,
    generateFullPageHtml,
    buildPages
};
