const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
console.log('=== PHASE 18: EXECUTING SPECIALTY & MODULE CONTENT ENHANCEMENT ENGINE ===');

const keywordMap = JSON.parse(fs.readFileSync(path.join(repoRoot, 'scratch/specialty_keyword_map.json'), 'utf8'));

// Cluster-specific styling and icon mappings
const clusterColors = {
    "CARDIOLOGY": { badge: "❤️ Cardiology EMR Module", gradient: "linear-gradient(135deg, #ef4444, #b91c1c)" },
    "NEUROLOGY": { badge: "🧠 Neurology EMR Module", gradient: "linear-gradient(135deg, #8b5cf6, #6d28d9)" },
    "PEDIATRICS": { badge: "👶 Pediatrics EMR Module", gradient: "linear-gradient(135deg, #0ea5e9, #0284c7)" },
    "ORTHOPEDICS": { badge: "🦴 Orthopedics EMR Module", gradient: "linear-gradient(135deg, #f59e0b, #d97706)" },
    "OPHTHALMOLOGY": { badge: "👁️ Ophthalmology EMR Module", gradient: "linear-gradient(135deg, #10b981, #047857)" },
    "DENTAL": { badge: "🦷 Dental EMR Module", gradient: "linear-gradient(135deg, #06b6d4, #0891b2)" },
    "DERMATOLOGY": { badge: "✨ Dermatology EMR Module", gradient: "linear-gradient(135deg, #ec4899, #be185d)" },
    "ONCOLOGY": { badge: "🎗️ Oncology EMR Module", gradient: "linear-gradient(135deg, #6366f1, #4338ca)" },
    "GYNECOLOGY": { badge: "🌸 Gynecology & Maternity Module", gradient: "linear-gradient(135deg, #f43f5e, #e11d48)" },
    "PSYCHIATRY": { badge: "🌿 Psychiatry & Behavioral Health", gradient: "linear-gradient(135deg, #14b8a6, #0f766e)" },
    "GENERAL PRACTICE": { badge: "🩺 Primary Care & OPD Module", gradient: "linear-gradient(135deg, #1A56DB, #0D9488)" },
    "CORE PLATFORM": { badge: "⚡ Core HIMS Platform Module", gradient: "linear-gradient(135deg, #1A56DB, #1E429F)" }
};

// Peer linking map within clusters to build tight semantic topical silos
const clusterPeers = {};
keywordMap.forEach(item => {
    if (!clusterPeers[item.cluster]) clusterPeers[item.cluster] = [];
    clusterPeers[item.cluster].push({ slug: item.slug, keyword: item.primaryKeyword });
});

let modifiedFiles = [];
let skippedFiles = [];

keywordMap.forEach(item => {
    const filePath = path.join(repoRoot, item.filename);
    if (!fs.existsSync(filePath)) {
        skippedFiles.push({ slug: item.slug, reason: "File not found in repository" });
        return;
    }

    let html = fs.readFileSync(filePath, 'utf8');

    // Extract boundaries
    const headerEndIdx = html.indexOf('</header>');
    if (headerEndIdx === -1) {
        skippedFiles.push({ slug: item.slug, reason: "Missing </header> boundary" });
        return;
    }

    let footerStartIdx = html.indexOf('<!-- ═══════════════════════════════════════════════════\n     MEDICAL365 MEGA FOOTER');
    if (footerStartIdx === -1) {
        footerStartIdx = html.indexOf('<!-- ═══════════════════════════════════════════════════\r\n     MEDICAL365 MEGA FOOTER');
    }
    if (footerStartIdx === -1) {
        footerStartIdx = html.indexOf('<footer id="mega-footer"');
    }
    if (footerStartIdx === -1) {
        skippedFiles.push({ slug: item.slug, reason: "Missing footer boundary" });
        return;
    }

    const clusterInfo = clusterColors[item.cluster] || { badge: "✨ Medical365 Module", gradient: "linear-gradient(135deg, #1A56DB, #0D9488)" };

    // Select 2 peer pages from same cluster for internal linking
    const peers = (clusterPeers[item.cluster] || [])
        .filter(p => p.slug !== item.slug)
        .slice(0, 2);

    // Build 6 clinical feature cards
    const featureCards = item.entityTerms.slice(0, 6).map((entity, idx) => {
        return `
        <div class="feature-card fade-in-up" style="background:#fff; padding:28px; border-radius:16px; border:1px solid #e2e8f0; box-shadow:0 4px 12px rgba(0,0,0,0.03);">
          <div class="feature-icon" style="width:48px; height:48px; border-radius:12px; background:rgba(26,86,219,0.08); display:flex; align-items:center; justify-content:center; color:#1A56DB; margin-bottom:16px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
          </div>
          <h3 style="font-size:1.15rem; font-weight:700; margin-bottom:8px; color:#1e293b;">${entity}</h3>
          <p style="font-size:0.92rem; color:#64748b; line-height:1.6;">Dedicated clinical tools for ${entity.toLowerCase()} within patient records, ensuring structured data capture and seamless cross-department review.</p>
        </div>`;
    }).join('\n');

    // Build 4-5 high quality FAQs
    const faqs = item.questionKeywords.map((q, idx) => {
        let answer = "";
        if (idx === 0) {
            answer = `${item.primaryKeyword} in Medical365 is designed to digitize and automate clinical documentation, connecting diagnostic findings directly into the patient's electronic health record without manual data entry.`;
        } else if (idx === 1) {
            answer = `Medical365 connects with relevant clinical equipment and hospital departments using standard HL7 and DICOM protocols, synchronizing patient data with the centralized HIMS and EMR.`;
        } else if (idx === 2) {
            answer = `Yes, all clinical records, attachments, and diagnostic measurements are encrypted in compliance with the Digital Personal Data Protection (DPDP) Act 2023 and Ayushman Bharat Digital Mission (ABDM) standards.`;
        } else {
            answer = `Authorized clinicians can securely access longitudinal records, review historical trends, and share structured digital summaries across mobile, tablet, and desktop workstations.`;
        }
        return { question: q, answer };
    });

    const faqHtml = faqs.map(f => `
      <div class="faq-item" style="border-bottom:1px solid #e2e8f0; padding:20px 0;">
        <h3 style="font-size:1.1rem; font-weight:700; color:#1e293b; margin-bottom:10px;">${f.question}</h3>
        <p style="font-size:0.95rem; color:#475569; line-height:1.6;">${f.answer}</p>
      </div>`).join('\n');

    // Build peer links markup
    const peerLinksHtml = peers.map(p => `
      <a href="/${p.slug}" style="display:inline-block; padding:10px 20px; background:#f1f5f9; border-radius:30px; text-decoration:none; color:#1e293b; font-weight:600; font-size:0.9rem; margin:6px;">
        ${p.keyword} →
      </a>`).join('\n');

    // Construct New Structured Body
    const newBodyContent = `
<!-- ══════════════════════════════════════════════════
     SPECIALTY PAGE CONTENT: ${item.slug.toUpperCase()}
     ══════════════════════════════════════════════════ -->
<section class="page-hero" style="padding:100px 24px 60px; background:radial-gradient(circle at top right, rgba(26,86,219,0.06), transparent 60%);">
  <div class="container" style="max-width:1140px; margin:0 auto;">
    <div style="max-width:850px; margin:0 auto; text-align:center;">
      <div class="badge" style="display:inline-block; padding:6px 16px; border-radius:20px; background:rgba(26,86,219,0.1); color:#1A56DB; font-weight:700; font-size:0.85rem; margin-bottom:20px;">
        ${clusterInfo.badge}
      </div>
      <h1 style="font-size:clamp(2.2rem, 5vw, 3.2rem); font-weight:800; line-height:1.15; color:#0f172a; margin-bottom:20px;">
        ${item.primaryKeyword.charAt(0).toUpperCase() + item.primaryKeyword.slice(1)}
      </h1>
      <p style="font-size:1.2rem; color:#475569; line-height:1.6; margin-bottom:36px;">
        ${item.whatItDoes}
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
      <h2 style="font-size:1.25rem; font-weight:800; color:#0f172a; margin-bottom:12px;">What is ${item.primaryKeyword}?</h2>
      <p style="font-size:1.05rem; color:#334155; line-height:1.65; margin:0;">
        <strong>${item.primaryKeyword.charAt(0).toUpperCase() + item.primaryKeyword.slice(1)}</strong> is a specialized clinical healthcare module in Medical365 designed for ${item.cluster.toLowerCase()} care. It streamlines patient data capture, ensures seamless integration with hospital <a href="/emr-ehr-system" style="color:#1A56DB; font-weight:600;">EMR/EHR systems</a>, and provides clinicians with instant access to diagnostic histories, structured templates, and longitudinal patient charts compliant with Indian ABDM standards.
      </p>
    </div>
  </div>
</section>

<!-- Core Features Grid -->
<section class="features-section" style="padding:80px 24px; background:#f8fafc;">
  <div class="container" style="max-width:1140px; margin:0 auto;">
    <div style="text-align:center; max-width:700px; margin:0 auto 50px;">
      <h2 style="font-size:2rem; font-weight:800; color:#0f172a; margin-bottom:12px;">Core Clinical & Operational Capabilities</h2>
      <p style="font-size:1.1rem; color:#64748b;">Purpose-built tools to enhance diagnostic accuracy, eliminate paper records, and speed up physician workflows.</p>
    </div>
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:24px;">
      ${featureCards}
    </div>
  </div>
</section>

<!-- Specialized Clinical Workflow -->
<section class="workflow-section" style="padding:80px 24px; background:#fff;">
  <div class="container" style="max-width:1140px; margin:0 auto;">
    <div style="text-align:center; max-width:700px; margin:0 auto 50px;">
      <h2 style="font-size:2rem; font-weight:800; color:#0f172a; margin-bottom:12px;">How It Works: Step-by-Step Clinical Workflow</h2>
      <p style="font-size:1.1rem; color:#64748b;">A seamless digital journey from patient consultation to permanent health records.</p>
    </div>
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:20px; text-align:center;">
      <div style="padding:24px; background:#f8fafc; border-radius:12px; border:1px solid #e2e8f0;">
        <div style="width:36px; height:36px; background:#1A56DB; color:#fff; font-weight:800; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 12px;">1</div>
        <h4 style="font-size:1.05rem; font-weight:700; color:#0f172a; margin-bottom:6px;">Requisition</h4>
        <p style="font-size:0.88rem; color:#64748b; margin:0;">Doctor orders test or procedure during OPD/IPD consultation in 1 click.</p>
      </div>
      <div style="padding:24px; background:#f8fafc; border-radius:12px; border:1px solid #e2e8f0;">
        <div style="width:36px; height:36px; background:#1A56DB; color:#fff; font-weight:800; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 12px;">2</div>
        <h4 style="font-size:1.05rem; font-weight:700; color:#0f172a; margin-bottom:6px;">Execution</h4>
        <p style="font-size:0.88rem; color:#64748b; margin:0;">Clinical technician or specialist conducts examination using standard protocols.</p>
      </div>
      <div style="padding:24px; background:#f8fafc; border-radius:12px; border:1px solid #e2e8f0;">
        <div style="width:36px; height:36px; background:#1A56DB; color:#fff; font-weight:800; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 12px;">3</div>
        <h4 style="font-size:1.05rem; font-weight:700; color:#0f172a; margin-bottom:6px;">Data Capture</h4>
        <p style="font-size:0.88rem; color:#64748b; margin:0;">Measurements, images, or traces sync directly into the patient's digital chart.</p>
      </div>
      <div style="padding:24px; background:#f8fafc; border-radius:12px; border:1px solid #e2e8f0;">
        <div style="width:36px; height:36px; background:#1A56DB; color:#fff; font-weight:800; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 12px;">4</div>
        <h4 style="font-size:1.05rem; font-weight:700; color:#0f172a; margin-bottom:6px;">Specialist Sign-Off</h4>
        <p style="font-size:0.88rem; color:#64748b; margin:0;">Consultant reviews findings, applies structured notes, and signs report electronically.</p>
      </div>
      <div style="padding:24px; background:#f8fafc; border-radius:12px; border:1px solid #e2e8f0;">
        <div style="width:36px; height:36px; background:#1A56DB; color:#fff; font-weight:800; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 12px;">5</div>
        <h4 style="font-size:1.05rem; font-weight:700; color:#0f172a; margin-bottom:6px;">Unified Health Record</h4>
        <p style="font-size:0.88rem; color:#64748b; margin:0;">Available instantly across departments, patient portal, and ABDM health locker.</p>
      </div>
    </div>
  </div>
</section>

<!-- Operational Benefits & Ecosystem -->
<section class="ecosystem-section" style="padding:80px 24px; background:#f8fafc;">
  <div class="container" style="max-width:1140px; margin:0 auto;">
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:40px; align-items:center;">
      <div>
        <h2 style="font-size:2rem; font-weight:800; color:#0f172a; margin-bottom:16px;">Integrated with Medical365 Hospital Management Ecosystem</h2>
        <p style="font-size:1.05rem; color:#475569; line-height:1.6; margin-bottom:24px;">
          Rather than functioning as a disconnected point-solution, this module integrates seamlessly with the full <a href="/hims-software" style="color:#1A56DB; font-weight:600;">Medical365 HIMS Software</a> suite. Clinical data automatically correlates with pharmacy indents, OT scheduling, <a href="/nabh-compliant-hospital-software" style="color:#1A56DB; font-weight:600;">NABH compliance audits</a>, and patient billing.
        </p>
        <div style="margin-top:20px;">
          <h4 style="font-size:1rem; font-weight:700; color:#1e293b; margin-bottom:10px;">Explore Related ${item.cluster} Modules:</h4>
          ${peerLinksHtml}
        </div>
      </div>
      <div style="background:#fff; padding:36px; border-radius:20px; border:1px solid #e2e8f0; box-shadow:0 10px 30px rgba(0,0,0,0.04);">
        <h3 style="font-size:1.3rem; font-weight:800; color:#0f172a; margin-bottom:20px;">Operational Advantages</h3>
        <ul style="list-style:none; padding:0; margin:0;">
          <li style="display:flex; gap:12px; margin-bottom:16px; font-size:0.95rem; color:#334155; line-height:1.5;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span><strong>100% Paperless Records:</strong> Eliminates lost physical charts and paper wear-and-tear.</span>
          </li>
          <li style="display:flex; gap:12px; margin-bottom:16px; font-size:0.95rem; color:#334155; line-height:1.5;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span><strong>Rapid Multi-Disciplinary Access:</strong> Consulted physicians across departments see findings simultaneously.</span>
          </li>
          <li style="display:flex; gap:12px; margin-bottom:16px; font-size:0.95rem; color:#334155; line-height:1.5;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span><strong>ABDM & DPDP Compliance:</strong> Digital patient consent management and M1/M2/M3 compliance built-in.</span>
          </li>
          <li style="display:flex; gap:12px; margin-bottom:0; font-size:0.95rem; color:#334155; line-height:1.5;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span><strong>Longitudinal Comparative Views:</strong> Review past records and trend changes over months or years.</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- Frequently Asked Questions (AEO & FAQPage Schema) -->
<section class="faq-section" style="padding:80px 24px; background:#fff;">
  <div class="container" style="max-width:850px; margin:0 auto;">
    <div style="text-align:center; margin-bottom:50px;">
      <h2 style="font-size:2rem; font-weight:800; color:#0f172a; margin-bottom:12px;">Frequently Asked Questions</h2>
      <p style="font-size:1.1rem; color:#64748b;">Direct answers to common questions about ${item.primaryKeyword}.</p>
    </div>
    <div class="faq-list">
      ${faqHtml}
    </div>
  </div>
</section>

<!-- Bottom CTA Banner -->
<section class="bottom-cta" style="padding:70px 24px; background:linear-gradient(135deg, #1A56DB, #0D9488); color:#fff; text-align:center;">
  <div class="container" style="max-width:800px; margin:0 auto;">
    <h2 style="font-size:2.2rem; font-weight:800; margin-bottom:16px; color:#fff;">Modernize your ${item.cluster.toLowerCase()} workflows today.</h2>
    <p style="font-size:1.15rem; opacity:0.9; margin-bottom:36px;">Schedule an on-site or online interactive walkthrough customized for your hospital.</p>
    <div style="display:flex; gap:16px; justify-content:center; flex-wrap:wrap;">
      <a href="https://www.medical365.in/book-demo" class="btn-primary" style="background:#fff !important; color:#1A56DB !important; padding:15px 36px; font-size:1.05rem; font-weight:700; border-radius:50px; text-decoration:none; touch-action:manipulation;">Book a Free Demo</a>
      <a href="/pricing" class="btn-secondary" style="background:transparent !important; color:#fff !important; border:2px solid #fff; padding:13px 32px; font-size:1.05rem; font-weight:600; border-radius:50px; text-decoration:none; touch-action:manipulation;">Explore Pricing Plans</a>
    </div>
  </div>
</section>
`;

    // Extract everything before <header ...> </header> and after footer
    const preHeader = html.substring(0, headerEndIdx + '</header>'.length);
    const postFooter = html.substring(footerStartIdx);

    // Update Head Metadata (Title, Meta Description, JSON-LD)
    let newPreHeader = preHeader;

    // Update <title>
    const newTitle = `${item.primaryKeyword.charAt(0).toUpperCase() + item.primaryKeyword.slice(1)} | Medical365`;
    if (newPreHeader.includes('<title>')) {
        newPreHeader = newPreHeader.replace(/<title>[\s\S]*?<\/title>/i, `<title>${newTitle}</title>`);
    }

    // Update meta description
    const newMetaDesc = `Medical365 ${item.primaryKeyword}: ${item.whatItDoes.substring(0, 120)}... ABDM & DPDP compliant. Book a free demo today.`;
    if (newPreHeader.includes('<meta name="description"')) {
        newPreHeader = newPreHeader.replace(/<meta\s+name=["']description["']\s+content=["'][\s\S]*?["']/i, `<meta name="description" content="${newMetaDesc}">`);
    }

    // Build Legitimate JSON-LD Structured Data
    const jsonLdBlocks = `
    <!-- Legitimate Structured Data (SoftwareApplication, MedicalWebPage, BreadcrumbList, FAQPage) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Medical365 — ${item.primaryKeyword}",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web, Android, iOS, Windows",
      "url": "https://www.medical365.in/${item.slug}",
      "description": "${newMetaDesc.replace(/"/g, '\\"')}",
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
      "name": "${newTitle.replace(/"/g, '\\"')}",
      "url": "https://www.medical365.in/${item.slug}",
      "description": "${newMetaDesc.replace(/"/g, '\\"')}",
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
          "name": "${item.primaryKeyword}",
          "item": "https://www.medical365.in/${item.slug}"
        }
      ]
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": ${JSON.stringify(faqs.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      })), null, 4)}
    }
    </script>
    `;

    // Remove old schema blocks and insert clean ones before </head>
    newPreHeader = newPreHeader.replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '');
    newPreHeader = newPreHeader.replace('</head>', jsonLdBlocks + '\n</head>');

    // Assemble final updated HTML
    const finalHtml = newPreHeader + '\n' + newBodyContent + '\n' + postFooter;

    fs.writeFileSync(filePath, finalHtml, 'utf8');
    modifiedFiles.push({
        slug: item.slug,
        filename: item.filename,
        cluster: item.cluster,
        primaryKeyword: item.primaryKeyword
    });
});

console.log(`Successfully enhanced ${modifiedFiles.length} specialty/module pages!`);
console.log(`Skipped ${skippedFiles.length} pages.`);

// Write modified files log
fs.writeFileSync(path.join(repoRoot, 'scratch/specialty_seo_modified_files.json'), JSON.stringify(modifiedFiles, null, 2), 'utf8');
console.log('Saved scratch/specialty_seo_modified_files.json');
