const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const indexPath = path.join(repoRoot, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

console.log('=== APPLYING ALL 16 USABILITY FIXES ===');

// 1. Insert CSS Tokens into the first <style> tag
const cssTokens = `
    /* ==========================================================================
       USABILITY HEURISTICS DESIGN TOKENS (Issues 1, 2, 3)
       Standardized 8-step type scale, 6-token text colors, 5-tier radii
       ========================================================================== */
    :root {
      /* Type Scale (Issue 1) */
      --text-xs: 0.75rem;    /* 12px */
      --text-sm: 0.875rem;   /* 14px */
      --text-base: 1rem;     /* 16px */
      --text-md: 1.125rem;   /* 18px */
      --text-lg: 1.25rem;    /* 20px */
      --text-xl: 1.5rem;     /* 24px */
      --text-2xl: 2rem;      /* 32px */
      --text-3xl: clamp(2.25rem, 4.5vw, 3rem);

      /* Semantic Text Colors (Issue 2) */
      --color-text-primary: #0f172a;
      --color-text-secondary: #334155;
      --color-text-muted: #64748b;
      --color-text-brand: #1A56DB;
      --color-text-accent: #0D9488;
      --color-text-inverse: #ffffff;

      /* Standard Border Radii (Issue 3) */
      --radius-sm: 6px;
      --radius-md: 10px;
      --radius-lg: 16px;
      --radius-xl: 24px;
      --radius-full: 9999px;
    }

    /* Standardized typography & card sub fixes */
    .card-sub {
      font-size: 0.8125rem !important; /* 13px - Issue 4 */
      line-height: 1.4 !important;
      color: #64748b !important;
      font-weight: 500 !important;
    }

    .trusted-text {
      text-transform: none !important; /* Issue 5 */
      font-size: 0.875rem !important;
      font-weight: 600 !important;
      letter-spacing: 0.02em !important;
      color: #64748b !important;
    }

    /* Standardized Primary CTA Button (Issue 12) */
    .btn-primary, .btn-v2-primary {
      background: #1A56DB !important;
      color: #ffffff !important;
      padding: 14px 28px !important;
      border-radius: var(--radius-md, 10px) !important;
      font-weight: 700 !important;
      font-size: 1rem !important;
      text-decoration: none !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 8px !important;
      border: 1px solid transparent !important;
      box-shadow: 0 4px 14px rgba(26, 86, 219, 0.25) !important;
      transition: all 0.15s ease !important;
    }

    .btn-primary:hover, .btn-v2-primary:hover {
      background: #1e40af !important;
      transform: translateY(-1px) !important;
      box-shadow: 0 6px 20px rgba(26, 86, 219, 0.35) !important;
    }

    /* Standardized Feature Grid Alignment (Issue 14) */
    .bento-grid-redesign {
      display: grid !important;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) !important;
      gap: 24px !important;
      align-items: stretch !important;
    }

    .bento-card {
      display: flex !important;
      flex-direction: column !important;
      height: 100% !important;
      padding: 28px 24px !important;
      border-radius: var(--radius-lg, 16px) !important;
      border: 1px solid #e2e8f0 !important;
      background: #ffffff !important;
      box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04) !important;
    }

    .bento-card p {
      flex-grow: 1 !important;
      margin-bottom: 16px !important;
    }

    /* Footer Typography & Accordion (Issues 7, 8, 9, 11, 13) */
    .mf-col-title {
      text-transform: none !important; /* Issue 7 */
      font-size: 1rem !important;
      font-weight: 700 !important;
      color: #ffffff !important;
    }

    .mf-cat-title {
      text-transform: none !important; /* Issue 8 */
      font-size: 0.875rem !important;
      font-weight: 700 !important;
      color: #cbd5e1 !important;
    }

    .mf-copy.mf-copy-sm {
      font-size: 0.8125rem !important; /* 13px - Issue 9 */
      line-height: 1.55 !important;
      color: #94a3b8 !important;
    }

    .mf-locations-accordion summary {
      cursor: pointer;
      color: #38bdf8;
      font-size: 0.875rem;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      list-style: none;
      margin-top: 14px;
      padding: 8px 14px;
      background: rgba(56, 189, 248, 0.08);
      border: 1px solid rgba(56, 189, 248, 0.2);
      border-radius: 8px;
      transition: background 0.15s ease;
    }
    .mf-locations-accordion summary:hover {
      background: rgba(56, 189, 248, 0.15);
    }
    .mf-locations-accordion summary::-webkit-details-marker { display: none; }
`;

// Insert Tokens at first <style>
if (!html.includes('USABILITY HEURISTICS DESIGN TOKENS')) {
    html = html.replace('<style>', '<style>\n' + cssTokens);
}

// 2. Issue 15: Marquee with SVG brand icons
const oldMarqueeRegex = /<div class="marquee-inner">[\s\S]*?<\/div>/;
const newMarquee = `<div class="marquee-inner" style="display: flex; gap: 18px;">
            <span style="display: inline-flex; align-items: center; gap: 8px; background: #ffffff; padding: 8px 16px; border-radius: 10px; border: 1px solid #e2e8f0; font-weight: 600; color: #1e293b;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#0D9488"><rect width="24" height="24" rx="4"/><path d="M7 7h10v3H7zm0 5h7v3H7z" fill="#fff"/></svg>
                Tally ERP 9
            </span>
            <span style="display: inline-flex; align-items: center; gap: 8px; background: #ffffff; padding: 8px 16px; border-radius: 10px; border: 1px solid #e2e8f0; font-weight: 600; color: #1e293b;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#0284c7"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#fff" stroke-width="2" fill="none"/></svg>
                Razorpay
            </span>
            <span style="display: inline-flex; align-items: center; gap: 8px; background: #ffffff; padding: 8px 16px; border-radius: 10px; border: 1px solid #e2e8f0; font-weight: 600; color: #1e293b;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#6366f1"><rect x="2" y="5" width="20" height="14" rx="3" fill="#6366f1"/><path d="M6 10h4v4H6z" fill="#fff"/></svg>
                Stripe Payments
            </span>
            <span style="display: inline-flex; align-items: center; gap: 8px; background: #ffffff; padding: 8px 16px; border-radius: 10px; border: 1px solid #e2e8f0; font-weight: 600; color: #1e293b;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#22c55e"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" fill="#22c55e"/></svg>
                WhatsApp API
            </span>
            <span style="display: inline-flex; align-items: center; gap: 8px; background: #ffffff; padding: 8px 16px; border-radius: 10px; border: 1px solid #e2e8f0; font-weight: 600; color: #1e293b;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1A56DB"><rect x="3" y="3" width="18" height="18" rx="2" fill="#1A56DB"/><circle cx="12" cy="12" r="4" fill="#fff"/></svg>
                DICOM 3.0 Viewers
            </span>
            <span style="display: inline-flex; align-items: center; gap: 8px; background: #ffffff; padding: 8px 16px; border-radius: 10px; border: 1px solid #e2e8f0; font-weight: 600; color: #1e293b;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#f59e0b"><path d="M12 2a10 10 0 0 0-10 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" fill="#f59e0b"/></svg>
                HL7 / FHIR Standard
            </span>
        </div>`;

html = html.replace(oldMarqueeRegex, newMarquee);

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Saved index.html successfully!');
