const fs = require('fs');
const path = require('path');

/**
 * Modern High-Resolution SVG Diagram Generator with Official Medical365 Brand Logo
 */
function generateSvgDiagram(item) {
    const boxWidth = 152;
    const boxHeight = 78;
    const gap = 34;
    const startX = 30;
    const startY = 185;

    const nodeElements = item.nodes.map((nodeText, idx) => {
        const x = startX + idx * (boxWidth + gap);
        const y = startY;
        const arrow = idx < item.nodes.length - 1 ? `
        <!-- Connector ${idx+1} to ${idx+2} -->
        <g transform="translate(${x + boxWidth}, ${y + boxHeight/2})">
            <line x1="4" y1="0" x2="${gap - 6}" y2="0" stroke="${item.color}" stroke-width="2.5" stroke-dasharray="5,3"/>
            <polygon points="${gap - 2},0 ${gap - 10},-5 ${gap - 10},5" fill="${item.color}"/>
            <circle cx="${gap/2}" cy="0" r="3" fill="#ffffff" stroke="${item.color}" stroke-width="2"/>
        </g>` : '';

        const words = nodeText.split(' ');
        const line1 = words.slice(0, 2).join(' ');
        const line2 = words.slice(2, 4).join(' ');
        const line3 = words.slice(4).join(' ');

        return `
        <!-- Node ${idx+1}: ${nodeText} -->
        <g transform="translate(${x}, ${y})">
            <rect width="${boxWidth}" height="${boxHeight}" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" filter="url(#cardShadow)"/>
            <rect width="${boxWidth}" height="5" rx="2.5" fill="${item.color}"/>
            <rect x="10" y="12" width="52" height="18" rx="9" fill="${item.color}15"/>
            <text x="36" y="24" text-anchor="middle" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-size="9" font-weight="800" fill="${item.color}" letter-spacing="0.5">
                STEP 0${idx+1}
            </text>
            <text x="12" y="44" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-size="11" font-weight="750" fill="#0f172a">
                ${line1}
            </text>
            <text x="12" y="58" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-size="10" font-weight="600" fill="#475569">
                ${line2}
            </text>
            ${line3 ? `<text x="12" y="70" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-size="9.5" fill="#64748b">${line3}</text>` : ''}
        </g>
        ${arrow}`;
    }).join('\n');

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 440" width="100%" height="100%" style="background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display:block;">
    <defs>
        <filter id="cardShadow" x="-10%" y="-10%" width="125%" height="130%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#0f172a" flood-opacity="0.06"/>
        </filter>
        <linearGradient id="brandBarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#1A56DB"/>
            <stop offset="60%" stop-color="${item.color}"/>
            <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
        <linearGradient id="logoCrossGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#37B39C"/>
            <stop offset="100%" stop-color="#1A56DB"/>
        </linearGradient>
        <pattern id="bgGrid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#f1f5f9" stroke-width="1"/>
        </pattern>
    </defs>

    <!-- Subtle Background Grid -->
    <rect width="960" height="440" fill="url(#bgGrid)"/>

    <!-- Top Header Bar with Medical365 Brand Logo -->
    <rect x="0" y="0" width="960" height="74" fill="#0f172a"/>
    <rect x="0" y="71" width="960" height="3" fill="url(#brandBarGrad)"/>

    <!-- Official Medical365 Logo Vector Mark -->
    <g transform="translate(32, 18)">
        <!-- Logo Shield / Cross Icon -->
        <rect x="0" y="0" width="38" height="38" rx="10" fill="url(#logoCrossGrad)"/>
        <path d="M 19 9 L 19 29 M 9 19 L 29 19" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round"/>
        <!-- Brand Typography -->
        <text x="48" y="22" font-size="18" font-weight="900" fill="#ffffff" letter-spacing="-0.3">MEDICAL<tspan fill="#37B39C">365</tspan></text>
        <text x="49" y="34" font-size="8.5" font-weight="700" fill="#94a3b8" letter-spacing="1">HOSPITAL MANAGEMENT SYSTEM</text>
    </g>

    <!-- Top-Right Category Pill -->
    <g transform="translate(720, 22)">
        <rect width="208" height="30" rx="15" fill="rgba(255,255,255,0.1)"/>
        <circle cx="16" cy="15" r="5" fill="#37B39C"/>
        <text x="30" y="19" font-size="10.5" font-weight="800" fill="#ffffff" letter-spacing="0.5">
            ${item.cluster} CLINICAL PIPELINE
        </text>
    </g>

    <!-- Diagram Title & Subtitle Banner -->
    <g transform="translate(32, 104)">
        <text x="0" y="20" font-size="18" font-weight="850" fill="#0f172a" letter-spacing="-0.3">
            ${item.diagramTitle}
        </text>
        <text x="0" y="42" font-size="12.5" font-weight="500" fill="#64748b">
            Closed-loop bidirectional data flow integrating point-of-care clinical capture, diagnostic instruments, and EMR records.
        </text>
    </g>

    <!-- 5-Node Interactive Workflow Flowchart -->
    ${nodeElements}

    <!-- Bottom Regulatory Trust Bar -->
    <g transform="translate(32, 375)">
        <rect width="896" height="42" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
        
        <!-- Trust Badge 1: ABDM -->
        <g transform="translate(24, 14)">
            <circle cx="7" cy="7" r="6" fill="#059669"/>
            <path d="M 4 7 L 6 9 L 10 5" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/>
            <text x="20" y="11" font-size="11" font-weight="750" fill="#1e293b">ABDM Milestone 1, 2, 3</text>
            <text x="148" y="11" font-size="10" font-weight="500" fill="#64748b">| Full ABHA Linkage</text>
        </g>

        <!-- Trust Badge 2: DPDP Act -->
        <g transform="translate(340, 14)">
            <circle cx="7" cy="7" r="6" fill="#1A56DB"/>
            <path d="M 4 7 L 6 9 L 10 5" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/>
            <text x="20" y="11" font-size="11" font-weight="750" fill="#1e293b">DPDP Act 2023</text>
            <text x="105" y="11" font-size="10" font-weight="500" fill="#64748b">| AES-256 Encrypted</text>
        </g>

        <!-- Trust Badge 3: NABH -->
        <g transform="translate(630, 14)">
            <circle cx="7" cy="7" r="6" fill="#7c3aed"/>
            <path d="M 4 7 L 6 9 L 10 5" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/>
            <text x="20" y="11" font-size="11" font-weight="750" fill="#1e293b">NABH 5th Edition</text>
            <text x="125" y="11" font-size="10" font-weight="500" fill="#64748b">| Digital Audit-Proof</text>
        </g>
    </g>
</svg>`;
}

/**
 * Generates Premium Modern UI/UX HTML with Guaranteed 100% Inline SVG Loading
 * PRESERVES HEADER AND FOOTER COMPLETELY UNTOUCHED.
 */
function generateFullPageHtml(slug, item, preHeader, postFooter) {
    // Clean old JSON-LD scripts from preHeader so we never have duplicates
    const cleanPreHeader = preHeader.replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>\s*/gi, '');

    // 1. Generate Modern SVG Diagram with Medical365 Logo
    const svgContent = generateSvgDiagram(item);

    // 2. Specialized Capability Cards (6 deep cards with modern UI)
    const capabilitiesHtml = item.capabilities.map((c, i) => `
      <div class="capability-card" style="padding:32px 26px; background:#ffffff; border-radius:18px; border:1px solid #e2e8f0; box-shadow:0 4px 20px -2px rgba(15,23,42,0.04); transition:all 0.25s cubic-bezier(0.16, 1, 0.3, 1); display:flex; flex-direction:column;">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px;">
          <div style="width:48px; height:48px; border-radius:14px; background:${item.color}15; display:flex; align-items:center; justify-content:center; color:${item.color};">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
          <span style="font-family:'Plus Jakarta Sans',sans-serif; font-weight:800; font-size:0.85rem; color:${item.color}; background:${item.color}10; padding:4px 10px; border-radius:9999px;">0${i+1}</span>
        </div>
        <h3 style="font-family:'Plus Jakarta Sans',sans-serif; font-size:1.22rem; font-weight:800; color:#0f172a; margin-bottom:12px; line-height:1.35;">${c.title}</h3>
        <p style="font-size:0.96rem; color:#475569; line-height:1.65; margin:0; flex-grow:1;">${c.text}</p>
      </div>`).join('\n');

    // 3. Step Workflow (5 connected steps)
    const workflowHtml = item.workflowSteps.map((w, i) => `
      <div class="wf-step-box" style="padding:28px 22px; background:#ffffff; border-radius:16px; border:1px solid #e2e8f0; box-shadow:0 4px 16px -2px rgba(15,23,42,0.03); text-align:center; position:relative; transition:all 0.25s cubic-bezier(0.16, 1, 0.3, 1);">
        <div style="width:44px; height:44px; border-radius:50%; background:linear-gradient(135deg, ${item.color}, #0f172a); color:#ffffff; font-weight:900; display:flex; align-items:center; justify-content:center; margin:0 auto 16px; font-size:1.05rem; box-shadow:0 4px 12px ${item.color}35;">
          ${i+1}
        </div>
        <h4 style="font-family:'Plus Jakarta Sans',sans-serif; font-size:1.08rem; font-weight:800; color:#0f172a; margin-bottom:8px;">${w.step}</h4>
        <p style="font-size:0.9rem; color:#64748b; line-height:1.55; margin:0;">${w.desc}</p>
      </div>`).join('\n');

    // 4. Comparison Table Rows
    const tableRows = item.table.map(r => `
      <tr style="border-bottom:1px solid #e2e8f0; transition:background 0.15s ease;">
        <td style="padding:18px 22px; font-weight:750; color:#1e293b; background:#f8fafc; font-size:0.96rem;">${r.feature}</td>
        <td style="padding:18px 22px; color:#64748b; font-size:0.92rem; line-height:1.55;">
          <span style="display:inline-flex; align-items:center; gap:6px; color:#ef4444; font-weight:700; margin-bottom:4px;">✕ Manual Method:</span><br/>${r.manual}
        </td>
        <td style="padding:18px 22px; color:#0f766e; font-weight:650; background:#f0fdfa; font-size:0.92rem; line-height:1.55;">
          <span style="display:inline-flex; align-items:center; gap:6px; color:#059669; font-weight:800; margin-bottom:4px;">✓ Medical365 Solution:</span><br/>${r.m365}
        </td>
      </tr>`).join('\n');

    // 5. In-depth FAQs (6 structured items)
    const faqsHtml = item.faqs.map(f => `
      <div class="faq-item" style="border:1px solid #e2e8f0; border-radius:14px; padding:24px 28px; margin-bottom:16px; background:#ffffff; box-shadow:0 2px 8px rgba(15,23,42,0.02); transition:all 0.25s cubic-bezier(0.16, 1, 0.3, 1);">
        <div style="display:flex; align-items:flex-start; gap:14px;">
          <span style="display:flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:50%; background:#eff6ff; color:#1A56DB; font-weight:900; font-size:0.9rem; flex-shrink:0;">Q</span>
          <div>
            <h3 style="font-family:'Plus Jakarta Sans',sans-serif; font-size:1.15rem; font-weight:800; color:#0f172a; margin:0 0 10px 0; line-height:1.35;">${f.q}</h3>
            <p style="font-size:0.98rem; color:#475569; line-height:1.68; margin:0;">${f.a}</p>
          </div>
        </div>
      </div>`).join('\n');

    // Assemble deep body content
    const bodyContent = `
<!-- ══════════════════════════════════════════════════
     ${item.cluster} SPECIALTY PAGE: ${slug.toUpperCase()}
     PREMIUM UI/UX STYLES (HEADER AND FOOTER UNTOUCHED)
     ══════════════════════════════════════════════════ -->
<style>
  .capability-card:hover { transform: translateY(-4px); box-shadow: 0 14px 30px -4px rgba(15,23,42,0.09) !important; border-color: #cbd5e1 !important; }
  .wf-step-box:hover { transform: translateY(-3px); box-shadow: 0 10px 24px -2px rgba(15,23,42,0.07) !important; border-color: #cbd5e1 !important; }
  .faq-item:hover { border-color: #cbd5e1 !important; box-shadow: 0 4px 16px rgba(15,23,42,0.05) !important; }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 28px -4px rgba(26,86,219,0.45) !important; }
  .btn-secondary:hover { background: #f8fafc !important; border-color: #94a3b8 !important; }
  .btn-cta-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 30px rgba(0,0,0,0.25) !important; }
  .btn-cta-secondary:hover { background: rgba(255,255,255,0.15) !important; }
</style>

<section class="page-hero" style="padding:100px 24px 65px; background:radial-gradient(120% 120% at 50% 0%, rgba(26,86,219,0.08) 0%, rgba(55,179,156,0.04) 50%, #ffffff 100%);">
  <div class="container" style="max-width:1160px; margin:0 auto;">
    <div style="max-width:920px; margin:0 auto; text-align:center;">
      <div class="badge" style="display:inline-flex; align-items:center; gap:8px; padding:6px 18px; border-radius:9999px; background:#eff6ff; border:1px solid #bfdbfe; color:#1A56DB; font-weight:800; font-size:0.85rem; margin-bottom:24px; text-transform:uppercase; letter-spacing:0.5px;">
        <span style="width:7px; height:7px; border-radius:50%; background:#1A56DB; display:inline-block;"></span>
        ${item.cluster} EMR SPECIALTY SUITE
      </div>
      <h1 style="font-family:'Plus Jakarta Sans',-apple-system,sans-serif; font-size:clamp(2.3rem, 5vw, 3.4rem); font-weight:850; line-height:1.15; color:#0f172a; margin-bottom:22px; letter-spacing:-0.6px;">
        ${item.h1}
      </h1>
      <p style="font-size:1.2rem; color:#475569; line-height:1.65; margin-bottom:36px; max-width:820px; margin-left:auto; margin-right:auto;">
        ${item.metaDesc}
      </p>
      <div style="display:flex; gap:16px; justify-content:center; flex-wrap:wrap; margin-bottom:32px;">
        <a href="https://www.medical365.in/book-demo" class="btn-primary" style="padding:16px 36px; border-radius:50px; font-weight:800; font-size:1.05rem; text-decoration:none; background:linear-gradient(135deg, #1A56DB 0%, #1d4ed8 100%); color:#ffffff; box-shadow:0 10px 25px -5px rgba(26,86,219,0.35); touch-action:manipulation;">Book a Free On-Site Demo</a>
        <a href="/pricing" class="btn-secondary" style="padding:16px 34px; border-radius:50px; font-weight:700; font-size:1.05rem; text-decoration:none; border:1.5px solid #cbd5e1; color:#334155; background:#ffffff; box-shadow:0 2px 8px rgba(0,0,0,0.04); touch-action:manipulation;">View Transparent Pricing</a>
      </div>
      <div style="display:flex; gap:24px; justify-content:center; align-items:center; flex-wrap:wrap; font-size:0.88rem; color:#64748b; font-weight:600;">
        <span>⭐ 4.9/5 Rating (500+ Hospitals)</span>
        <span>•</span>
        <span>🛡️ 100% ABDM M1-M3 Certified</span>
        <span>•</span>
        <span>🇮🇳 24/7 Dedicated Support in India</span>
      </div>
    </div>
  </div>
</section>

<!-- Section 1: AEO Quick Answer & Executive Summary Card -->
<section class="quick-answer-section" style="padding:40px 24px; background:#ffffff; border-top:1px solid #e2e8f0; border-bottom:1px solid #e2e8f0;">
  <div class="container" style="max-width:980px; margin:0 auto;">
    <div style="background:linear-gradient(135deg, #f8fafc 0%, #ffffff 100%); border:1px solid #e2e8f0; border-left:5px solid ${item.color}; padding:30px 34px; border-radius:16px; box-shadow:0 4px 16px rgba(15,23,42,0.03);">
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; flex-wrap:wrap; gap:10px;">
        <span style="display:inline-flex; align-items:center; gap:6px; font-family:'Plus Jakarta Sans',sans-serif; font-size:0.85rem; font-weight:800; color:${item.color}; text-transform:uppercase; letter-spacing:0.5px;">
          ✨ Executive Clinical Summary & AEO Definition
        </span>
        <span style="font-size:0.75rem; font-weight:700; color:#059669; background:#dcfce7; padding:3px 10px; border-radius:9999px;">Verified Clinical Review</span>
      </div>
      <h2 style="font-family:'Plus Jakarta Sans',sans-serif; font-size:1.35rem; font-weight:800; color:#0f172a; margin-bottom:12px;">What is ${item.h1.toLowerCase()}?</h2>
      <p style="font-size:1.06rem; color:#334155; line-height:1.75; margin:0;">
        ${item.quickAnswer}
      </p>
    </div>
  </div>
</section>

<!-- Section 2: Clinical Landscape & Operational Challenges in India -->
<section class="clinical-context-section" style="padding:85px 24px; background:#f8fafc;">
  <div class="container" style="max-width:1160px; margin:0 auto;">
    <div style="max-width:920px; margin:0 auto;">
      <div style="text-align:center; margin-bottom:45px;">
        <div style="display:inline-flex; align-items:center; gap:8px; padding:5px 16px; border-radius:9999px; background:rgba(26,86,219,0.08); color:#1A56DB; font-weight:800; font-size:0.82rem; margin-bottom:14px; text-transform:uppercase;">
          🏥 Indian Clinical Context & Epidemiology
        </div>
        <h2 style="font-family:'Plus Jakarta Sans',sans-serif; font-size:2.2rem; font-weight:850; color:#0f172a; margin-bottom:14px; line-height:1.25;">
          Clinical Landscape & Specialty Healthcare Challenges in India
        </h2>
        <p style="font-size:1.1rem; color:#64748b;">Addressing high-volume OPD congestion, diagnostic fragmentation, and statutory healthcare regulations.</p>
      </div>
      <div style="background:#ffffff; padding:44px 38px; border-radius:20px; border:1px solid #e2e8f0; box-shadow:0 6px 24px -2px rgba(15,23,42,0.04); font-size:1.08rem; color:#334155; line-height:1.8;">
        ${item.bgText.split('\n\n').map((p, idx) => `<p style="${idx > 0 ? 'margin-top:20px;' : 'margin-top:0;'} margin-bottom:0;">${p}</p>`).join('\n')}
      </div>
    </div>
  </div>
</section>

<!-- Section 3: Comprehensive Specialized Capabilities -->
<section class="capabilities-section" style="padding:85px 24px; background:#ffffff;">
  <div class="container" style="max-width:1160px; margin:0 auto;">
    <div style="text-align:center; max-width:800px; margin:0 auto 55px;">
      <div style="display:inline-flex; align-items:center; gap:8px; padding:5px 16px; border-radius:9999px; background:${item.color}15; color:${item.color}; font-weight:800; font-size:0.82rem; margin-bottom:14px; text-transform:uppercase;">
        ⚡ Enterprise Capabilities
      </div>
      <h2 style="font-family:'Plus Jakarta Sans',sans-serif; font-size:2.2rem; font-weight:850; color:#0f172a; margin-bottom:16px;">Comprehensive Clinical & Operational Capabilities</h2>
      <p style="font-size:1.12rem; color:#64748b;">Engineered with medical sub-specialists to eliminate manual charting friction and enforce clinical protocol rigor.</p>
    </div>
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(330px, 1fr)); gap:26px;">
      ${capabilitiesHtml}
    </div>
  </div>
</section>

<!-- Section 4: System Architecture & Workflow Diagram (GUARANTEED 100% INLINE SVG WITH MEDICAL365 LOGO) -->
<section class="diagram-section" style="padding:85px 24px; background:#f8fafc;">
  <div class="container" style="max-width:1040px; margin:0 auto;">
    <div style="text-align:center; margin-bottom:45px;">
      <div style="display:inline-flex; align-items:center; gap:8px; padding:5px 16px; border-radius:9999px; background:rgba(26,86,219,0.08); color:#1A56DB; font-weight:800; font-size:0.82rem; margin-bottom:14px; text-transform:uppercase;">
        📊 Visual Architecture
      </div>
      <h2 style="font-family:'Plus Jakarta Sans',sans-serif; font-size:2.2rem; font-weight:850; color:#0f172a; margin-bottom:14px;">System Architecture & Data Integration Pipeline</h2>
      <p style="font-size:1.1rem; color:#64748b;">High-resolution data flow architecture connecting point-of-care capture, diagnostic instruments, and national health registries.</p>
    </div>
    <div class="diagram-container" style="background:#ffffff; border-radius:20px; border:1px solid #e2e8f0; box-shadow:0 12px 35px -5px rgba(15,23,42,0.06); overflow:hidden;">
      <!-- Top Control Bar with Brand Logo -->
      <div style="display:flex; align-items:center; justify-content:space-between; padding:16px 24px; background:#0f172a; border-bottom:1px solid #1e293b;">
        <div style="display:flex; align-items:center; gap:12px;">
          <div style="width:34px; height:34px; border-radius:8px; background:linear-gradient(135deg, #37B39C, #1A56DB); display:flex; align-items:center; justify-content:center; color:#fff; font-weight:900; font-size:18px;">+</div>
          <div>
            <span style="font-weight:900; font-size:1.15rem; color:#ffffff; letter-spacing:-0.3px; font-family:'Plus Jakarta Sans',sans-serif;">MEDICAL<span style="color:#37B39C;">365</span></span>
            <span style="display:block; font-size:0.7rem; font-weight:700; color:#94a3b8; letter-spacing:1px; text-transform:uppercase;">Verified Clinical Architecture</span>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="display:inline-flex; align-items:center; gap:6px; font-size:0.75rem; font-weight:750; color:#10b981; background:rgba(16,185,129,0.12); padding:5px 12px; border-radius:9999px; border:1px solid rgba(16,185,129,0.25);">
            <span style="width:6px; height:6px; border-radius:50%; background:#10b981; display:inline-block;"></span>
            ABDM & DPDP VERIFIED
          </span>
        </div>
      </div>
      <!-- INLINE SVG: 100% Guaranteed Visual Rendering in All Browsers, Offline, and Local File Systems -->
      <div class="diagram-render-box" style="padding:16px; background:#ffffff; overflow-x:auto;">
        ${svgContent}
      </div>
    </div>
  </div>
</section>

<!-- Section 5: End-to-End Clinical & Departmental Workflow -->
<section class="workflow-section" style="padding:85px 24px; background:#ffffff;">
  <div class="container" style="max-width:1160px; margin:0 auto;">
    <div style="text-align:center; max-width:800px; margin:0 auto 55px;">
      <div style="display:inline-flex; align-items:center; gap:8px; padding:5px 16px; border-radius:9999px; background:${item.color}15; color:${item.color}; font-weight:800; font-size:0.82rem; margin-bottom:14px; text-transform:uppercase;">
        🔄 Care Pathway
      </div>
      <h2 style="font-family:'Plus Jakarta Sans',sans-serif; font-size:2.2rem; font-weight:850; color:#0f172a; margin-bottom:16px;">Step-by-Step Clinical & Departmental Workflow</h2>
      <p style="font-size:1.12rem; color:#64748b;">A transparent 5-stage digital pathway standardizing patient care from initial requisition to longitudinal review.</p>
    </div>
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:22px;">
      ${workflowHtml}
    </div>
  </div>
</section>

<!-- Section 6: Standards, Regulatory Compliance & Data Security -->
<section class="compliance-section" style="padding:85px 24px; background:#f8fafc;">
  <div class="container" style="max-width:1160px; margin:0 auto;">
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(340px, 1fr)); gap:45px; align-items:center;">
      <div>
        <div style="display:inline-flex; align-items:center; gap:8px; padding:5px 14px; border-radius:9999px; background:rgba(16,185,129,0.1); color:#059669; font-weight:750; font-size:0.82rem; margin-bottom:16px; text-transform:uppercase;">
          🛡️ Compliance & Statutory Adherence
        </div>
        <h2 style="font-family:'Plus Jakarta Sans',sans-serif; font-size:2.2rem; font-weight:850; color:#0f172a; margin-bottom:18px; line-height:1.25;">ABDM, DPDP Act 2023 & NABH Digital Standards</h2>
        <p style="font-size:1.06rem; color:#475569; line-height:1.75; margin-bottom:20px;">
          ${item.compliance.split('\n\n')[0]}
        </p>
        <p style="font-size:1.06rem; color:#475569; line-height:1.75; margin:0;">
          ${item.compliance.split('\n\n')[1] || ''}
        </p>
      </div>
      <div style="background:#ffffff; padding:40px 36px; border-radius:20px; border:1px solid #e2e8f0; box-shadow:0 8px 24px rgba(15,23,42,0.03);">
        <h3 style="font-family:'Plus Jakarta Sans',sans-serif; font-size:1.35rem; font-weight:800; color:#0f172a; margin-bottom:22px;">Regulatory Certifications at a Glance</h3>
        <ul style="list-style:none; padding:0; margin:0;">
          <li style="display:flex; gap:14px; margin-bottom:18px; font-size:0.98rem; color:#334155; line-height:1.55;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" style="flex-shrink:0;"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span><strong>ABDM Milestone 1, 2, 3:</strong> Seamless ABHA health ID creation, health facility registry (HFR), and health locker record linkage.</span>
          </li>
          <li style="display:flex; gap:14px; margin-bottom:18px; font-size:0.98rem; color:#334155; line-height:1.55;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" style="flex-shrink:0;"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span><strong>DPDP Act 2023 Compliant:</strong> Granular digital consent management, role-based access control (RBAC), and full audit logging.</span>
          </li>
          <li style="display:flex; gap:14px; margin-bottom:18px; font-size:0.98rem; color:#334155; line-height:1.55;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" style="flex-shrink:0;"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span><strong>NABH 5th Edition Ready:</strong> Standardized digital clinical documentation, tamper-evident consultation records, and clinical audit readiness.</span>
          </li>
          <li style="display:flex; gap:14px; margin-bottom:0; font-size:0.98rem; color:#334155; line-height:1.55;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" style="flex-shrink:0;"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span><strong>Indian IT Act 2000:</strong> Fully valid digital doctor electronic signatures and verifiable QR-coded medical records.</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- Section 7: Objective Comparative Clinical Matrix (Table) -->
<section class="table-section" style="padding:85px 24px; background:#ffffff;">
  <div class="container" style="max-width:1160px; margin:0 auto;">
    <div style="text-align:center; max-width:800px; margin:0 auto 55px;">
      <div style="display:inline-flex; align-items:center; gap:8px; padding:5px 16px; border-radius:9999px; background:rgba(26,86,219,0.08); color:#1A56DB; font-weight:800; font-size:0.82rem; margin-bottom:14px; text-transform:uppercase;">
        ⚖️ Feature Comparison
      </div>
      <h2 style="font-family:'Plus Jakarta Sans',sans-serif; font-size:2.2rem; font-weight:850; color:#0f172a; margin-bottom:16px;">Manual Hospital Practices vs. Medical365 Solution</h2>
      <p style="font-size:1.12rem; color:#64748b;">See how automated digital intelligence transforms efficiency, reduces diagnostic turnaround times, and protects clinical revenue.</p>
    </div>
    <div style="overflow-x:auto; border-radius:18px; border:1px solid #e2e8f0; box-shadow:0 8px 30px -4px rgba(15,23,42,0.05);">
      <table style="width:100%; border-collapse:collapse; text-align:left; background:#ffffff; min-width:680px;">
        <thead>
          <tr style="background:#0f172a; color:#ffffff;">
            <th style="padding:20px 22px; font-family:'Plus Jakarta Sans',sans-serif; font-size:0.98rem; font-weight:800; width:26%;">Feature / Requirement</th>
            <th style="padding:20px 22px; font-family:'Plus Jakarta Sans',sans-serif; font-size:0.98rem; font-weight:750; color:#cbd5e1; width:37%;">Conventional Manual Practice</th>
            <th style="padding:20px 22px; font-family:'Plus Jakarta Sans',sans-serif; font-size:0.98rem; font-weight:800; color:#37B39C; background:#134e4a; width:37%;">Medical365 EMR Solution ★</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </div>
  </div>
</section>

<!-- Section 8: Related Modules & Interoperability Cross-Links -->
<section class="crosslinks-section" style="padding:60px 24px; background:#f8fafc; border-top:1px solid #e2e8f0; border-bottom:1px solid #e2e8f0;">
  <div class="container" style="max-width:1160px; margin:0 auto; text-align:center;">
    <h3 style="font-family:'Plus Jakarta Sans',sans-serif; font-size:1.35rem; font-weight:800; color:#0f172a; margin-bottom:12px;">Interconnected Healthcare Modalities & Core Modules</h3>
    <p style="font-size:1.02rem; color:#64748b; margin-bottom:28px;">Seamless bidirectional data sharing across all hospital clinical departments and diagnostics.</p>
    <div style="display:flex; flex-wrap:wrap; gap:12px; justify-content:center;">
      <a href="opd-management.html" style="padding:9px 20px; background:#ffffff; border:1px solid #cbd5e1; border-radius:30px; color:#334155; font-size:0.92rem; font-weight:700; text-decoration:none;">OPD Management</a>
      <a href="ipd-management.html" style="padding:9px 20px; background:#ffffff; border:1px solid #cbd5e1; border-radius:30px; color:#334155; font-size:0.92rem; font-weight:700; text-decoration:none;">IPD Management</a>
      <a href="laboratory-management.html" style="padding:9px 20px; background:#ffffff; border:1px solid #cbd5e1; border-radius:30px; color:#334155; font-size:0.92rem; font-weight:700; text-decoration:none;">Laboratory LIS</a>
      <a href="radiology-management.html" style="padding:9px 20px; background:#ffffff; border:1px solid #cbd5e1; border-radius:30px; color:#334155; font-size:0.92rem; font-weight:700; text-decoration:none;">Radiology PACS</a>
      <a href="pharmacy-management.html" style="padding:9px 20px; background:#ffffff; border:1px solid #cbd5e1; border-radius:30px; color:#334155; font-size:0.92rem; font-weight:700; text-decoration:none;">Pharmacy E-Rx</a>
      <a href="/pricing" style="padding:9px 20px; background:#1A56DB; color:#ffffff; border-radius:30px; font-size:0.92rem; font-weight:800; text-decoration:none;">View Pricing Plans</a>
    </div>
  </div>
</section>

<!-- Section 9: Frequently Asked Questions (Structured Accordion Cards) -->
<section class="faq-section" style="padding:85px 24px; background:#ffffff;">
  <div class="container" style="max-width:960px; margin:0 auto;">
    <div style="text-align:center; margin-bottom:50px;">
      <div style="display:inline-flex; align-items:center; gap:8px; padding:5px 16px; border-radius:9999px; background:rgba(26,86,219,0.08); color:#1A56DB; font-weight:800; font-size:0.82rem; margin-bottom:14px; text-transform:uppercase;">
        💬 Got Questions?
      </div>
      <h2 style="font-family:'Plus Jakarta Sans',sans-serif; font-size:2.2rem; font-weight:850; color:#0f172a; margin-bottom:14px;">Frequently Asked Questions</h2>
      <p style="font-size:1.1rem; color:#64748b;">Clinical, technical, and regulatory answers for hospital directors and medical specialists.</p>
    </div>
    <div class="faq-list">
      ${faqsHtml}
    </div>
  </div>
</section>

<!-- Section 10: High-Impact Bottom CTA Banner -->
<section class="cta-banner" style="padding:75px 24px; background:linear-gradient(135deg, #1A56DB 0%, #0f766e 100%); color:#ffffff;">
  <div class="container" style="max-width:960px; margin:0 auto; text-align:center;">
    <div style="display:inline-flex; align-items:center; gap:8px; padding:6px 18px; border-radius:9999px; background:rgba(255,255,255,0.18); font-weight:800; font-size:0.85rem; margin-bottom:24px; text-transform:uppercase; letter-spacing:0.5px;">
      🚀 Fast 48-Hour Hospital Deployment
    </div>
    <h2 style="font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(2rem, 4vw, 2.9rem); font-weight:900; line-height:1.2; margin-bottom:20px; letter-spacing:-0.4px;">
      Transform your ${item.cluster.toLowerCase()} workflow with Medical365 today
    </h2>
    <p style="font-size:1.18rem; opacity:0.92; line-height:1.65; max-width:720px; margin:0 auto 36px;">
      Join 500+ Indian hospitals and clinics delivering faster, safer, and compliant patient care.
    </p>
    <div style="display:flex; gap:16px; justify-content:center; flex-wrap:wrap;">
      <a href="https://www.medical365.in/book-demo" class="btn-cta-primary" style="padding:16px 40px; border-radius:50px; font-weight:850; font-size:1.08rem; text-decoration:none; background:#ffffff; color:#1A56DB; box-shadow:0 10px 25px rgba(0,0,0,0.18); touch-action:manipulation;">Book an On-Site Demo</a>
      <a href="/pricing" class="btn-cta-secondary" style="padding:16px 36px; border-radius:50px; font-weight:750; font-size:1.08rem; text-decoration:none; border:2px solid rgba(255,255,255,0.85); color:#ffffff; background:transparent; touch-action:manipulation;">Explore All Modules</a>
    </div>
  </div>
</section>
`;

    // 4 Clean JSON-LD Schema Blocks
    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        "name": item.title,
        "url": `https://www.medical365.in/${slug}`,
        "description": item.metaDesc,
        "about": {
          "@type": "MedicalSpecialty",
          "name": item.cluster
        },
        "publisher": {
          "@type": "Organization",
          "name": "Medical365",
          "url": "https://www.medical365.in",
          "logo": "https://www.medical365.in/medical365logo1.png"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": `Medical365 ${item.h1}`,
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Web, Android, iOS",
        "description": item.metaDesc,
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": item.faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a
          }
        }))
      },
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
            "name": `${item.cluster} Software`,
            "item": `https://www.medical365.in/${slug}`
          }
        ]
      }
    ];

    const schemasHtml = schemas.map(s => `<script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n</script>`).join('\n');

    return `${cleanPreHeader}
${bodyContent}
${schemasHtml}
${postFooter}`;
}

/**
 * Builds pages with exact header & footer preservation AND guaranteed inline SVG rendering
 */
function buildPages(pagesData, repoRoot, diagramDir) {
    let count = 0;
    for (const [slug, item] of Object.entries(pagesData)) {
        const filename = slug + '.html';
        const filePath = path.join(repoRoot, filename);
        if (!fs.existsSync(filePath)) {
            console.warn(`File ${filename} not found, skipping.`);
            continue;
        }

        const html = fs.readFileSync(filePath, 'utf8');

        // Extract exact preHeader and postFooter
        const headerIdx = html.indexOf('</header>');
        const headerEnd = headerIdx !== -1 ? headerIdx + '</header>'.length : -1;
        const footerIdx = html.indexOf('<footer');
        const footerStart = footerIdx !== -1 ? footerIdx : -1;

        if (headerEnd === -1 || footerStart === -1) {
            console.error(`Could not locate header/footer in ${filename}`);
            continue;
        }

        const preHeader = html.substring(0, headerEnd);
        const postFooter = html.substring(footerStart);

        // 1. Also save standalone SVG diagram file in images/diagrams/
        const svgContent = generateSvgDiagram(item);
        const svgPath = path.join(diagramDir, `${slug}-workflow.svg`);
        fs.writeFileSync(svgPath, svgContent, 'utf8');

        // 2. Generate Full Page HTML with INLINE SVG (100% Guaranteed Load Reliability)
        const fullHtml = generateFullPageHtml(slug, item, preHeader, postFooter);
        fs.writeFileSync(filePath, fullHtml, 'utf8');

        // Check word count
        const textOnly = fullHtml
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        const wordCount = textOnly.split(' ').filter(w => w.length > 0).length;

        count++;
        console.log(`[${count.toString().padStart(2)}] Enhanced UI/UX + Inline SVG: ${filename.padEnd(32)} -> Words: ${wordCount}`);
    }
    return count;
}

module.exports = {
    generateSvgDiagram,
    generateFullPageHtml,
    buildPages
};
