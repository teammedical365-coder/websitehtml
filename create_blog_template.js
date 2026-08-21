const fs = require('fs');
const path = require('path');

// Target Directories
const rootDir = __dirname;
const blogsDir = path.join(rootDir, 'blogs');
if (!fs.existsSync(blogsDir)) fs.mkdirSync(blogsDir);

// 1. Extract Header and Footer from index.html
const indexContent = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');

// Find Header: from <header to </header>
let headerMatch = indexContent.match(/<header[\s\S]*?<\/header>/i);
let headerStr = headerMatch ? headerMatch[0] : '';
// Fix paths for blogs directory
headerStr = headerStr.replace(/href="([^"http#]+)"/g, (match, p1) => {
    if (!p1.startsWith('http') && !p1.startsWith('//') && !p1.startsWith('tel:') && !p1.startsWith('mailto:') && !p1.startsWith('../') && !p1.startsWith('#')) {
        return 'href="../' + p1 + '"';
    }
    return match;
});
headerStr = headerStr.replace(/src="([^"http#]+)"/g, (match, p1) => {
    if (!p1.startsWith('http') && !p1.startsWith('//') && !p1.startsWith('../')) {
        return 'src="../' + p1 + '"';
    }
    return match;
});

// Find Footer
let footerStartMatch = indexContent.match(/<!-- ═══════════════════════════════════════════════════════════════\s*MEDICAL365 MEGA FOOTER/i);
let fallbackFooterMatch = indexContent.match(/<footer id="mega-footer"/i);
let footerStartIndex = footerStartMatch ? footerStartMatch.index : (fallbackFooterMatch ? fallbackFooterMatch.index : -1);
let footerStr = footerStartIndex !== -1 ? indexContent.substring(footerStartIndex) : '';

footerStr = footerStr.replace(/href="([^"http#]+)"/g, (match, p1) => {
    if (!p1.startsWith('http') && !p1.startsWith('//') && !p1.startsWith('tel:') && !p1.startsWith('mailto:') && !p1.startsWith('../') && !p1.startsWith('#')) {
        return 'href="../' + p1 + '"';
    }
    return match;
});
footerStr = footerStr.replace(/src="([^"http#]+)"/g, (match, p1) => {
    if (!p1.startsWith('http') && !p1.startsWith('//') && !p1.startsWith('../')) {
        return 'src="../' + p1 + '"';
    }
    return match;
});

// Template Base
const templateBase = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BLOG_TITLE | Medical365</title>
  <meta name="description" content="BLOG_META_DESCRIPTION">
  <meta name="keywords" content="BLOG_KEYWORDS">
  <meta name="author" content="Medical365">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
  <link rel="canonical" href="https://www.medical365.in/blogs/BLOG_SLUG">

  <!-- Open Graph -->
  <meta property="og:title" content="BLOG_TITLE">
  <meta property="og:description" content="BLOG_META_DESCRIPTION">
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://www.medical365.in/blogs/BLOG_SLUG">
  <meta property="og:image" content="https://www.medical365.in/medical365logo1.png">
  <meta property="og:locale" content="en_IN">
  <meta property="og:site_name" content="Medical365">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="BLOG_TITLE">
  <meta name="twitter:description" content="BLOG_META_DESCRIPTION">
  <meta name="twitter:image" content="https://www.medical365.in/medical365logo1.png">
  <meta name="twitter:site" content="@medical_365">

  <!-- Geo -->
  <meta name="geo.region" content="IN-RJ">
  <meta name="geo.placename" content="Jaipur, Rajasthan, India">
  <meta name="geo.position" content="26.9124;75.7873">
  <meta name="ICBM" content="26.9124, 75.7873">
  <meta http-equiv="content-language" content="en-IN">

  <!-- Favicon -->
  <link rel="icon" href="../medical365fav.jpg" type="image/jpeg">
  <link rel="preload" as="image" href="../medical365fav.jpg">
  
  <link rel="stylesheet" href="../style.css">
  <link rel="stylesheet" href="../global-styles.css">

  <!-- GTM -->
  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-W5H82GQ7');</script>
  <!-- End Google Tag Manager -->

  <!-- JSON-LD Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "BLOG_TITLE",
    "description": "BLOG_META_DESCRIPTION",
    "image": "https://www.medical365.in/medical365logo1.png",
    "datePublished": "BLOG_DATE",
    "dateModified": "BLOG_DATE",
    "author": {"@type": "Organization", "name": "Medical365", "url": "https://www.medical365.in"},
    "publisher": {
      "@type": "Organization",
      "name": "Medical365",
      "logo": {"@type": "ImageObject", "url": "https://www.medical365.in/medical365logo1.png"}
    },
    "mainEntityOfPage": {"@type": "WebPage", "@id": "https://www.medical365.in/blogs/BLOG_SLUG"}
  }
  </script>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.medical365.in/"},
      {"@type": "ListItem", "position": 2, "name": "Insights & Blogs", "item": "https://www.medical365.in/blogs"},
      {"@type": "ListItem", "position": 3, "name": "BLOG_TITLE", "item": "https://www.medical365.in/blogs/BLOG_SLUG"}
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
        "name": "FAQ_Q1",
        "acceptedAnswer": {"@type": "Answer", "text": "FAQ_A1"}
      },
      {
        "@type": "Question",
        "name": "FAQ_Q2",
        "acceptedAnswer": {"@type": "Answer", "text": "FAQ_A2"}
      },
      {
        "@type": "Question",
        "name": "FAQ_Q3",
        "acceptedAnswer": {"@type": "Answer", "text": "FAQ_A3"}
      }
    ]
  }
  </script>

  <!-- Blog Styles — Self-contained, won't affect other pages -->
  <style>
    :root {
      --c-primary:    #0066cc;
      --c-primary-dk: #004fa3;
      --c-dark:       #1e2327;
      --c-text:       #1a1a2e;
      --c-muted:      #6b7280;
      --c-border:     #e5e7eb;
      --c-bg-light:   #f4f8ff;
      --c-white:      #ffffff;
      --c-success:    #10b981;
      --c-accent:     #0ea5e9;
      --gradient:     linear-gradient(135deg, #0066cc 0%, #0ea5e9 100%);
      --radius:       12px;
      --shadow:       0 4px 24px rgba(0,102,204,0.10);
      --shadow-lg:    0 8px 48px rgba(0,102,204,0.16);
      --font-body:    'Segoe UI', system-ui, -apple-system, sans-serif;
      --font-display: Georgia, 'Times New Roman', serif;
      --max-w:        760px;
      --max-w-wide:   1100px;
    }

    html { scroll-behavior: smooth; }

    /* ── Blog Hero Banner ────────────────────────────── */
    .blog-hero {
      background: var(--gradient);
      color: var(--c-white);
      padding: 72px 24px 56px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .blog-hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }
    .blog-hero-inner {
      position: relative;
      max-width: var(--max-w);
      margin: 0 auto;
    }
    .blog-hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(255,255,255,0.18);
      border: 1px solid rgba(255,255,255,0.30);
      color: var(--c-white);
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 5px 14px;
      border-radius: 100px;
      margin-bottom: 20px;
    }
    .blog-hero h1 {
      font-family: var(--font-display);
      font-size: clamp(1.6rem, 4vw, 2.4rem);
      font-weight: 700;
      line-height: 1.25;
      color: var(--c-white);
      margin-bottom: 18px;
      letter-spacing: -0.02em;
    }
    .blog-hero-meta {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 16px;
      color: rgba(255,255,255,0.85);
      font-size: 0.88rem;
    }
    .blog-hero-meta span {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .blog-hero-meta .dot { width: 4px; height: 4px; background: rgba(255,255,255,0.5); border-radius: 50%; }

    /* ── Breadcrumb ──────────────────────────────────── */
    .blog-breadcrumb {
      background: var(--c-bg-light);
      border-bottom: 1px solid var(--c-border);
      padding: 12px 24px;
    }
    .blog-breadcrumb-inner {
      max-width: var(--max-w-wide);
      margin: 0 auto;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.83rem;
      color: var(--c-muted);
      flex-wrap: wrap;
    }
    .blog-breadcrumb a {
      color: var(--c-primary);
      text-decoration: none;
      font-weight: 500;
    }
    .blog-breadcrumb a:hover { text-decoration: underline; }
    .blog-breadcrumb svg { color: var(--c-muted); flex-shrink: 0; }

    /* ── Layout ──────────────────────────────────────── */
    .blog-layout {
      max-width: var(--max-w-wide);
      margin: 0 auto;
      padding: 48px 24px 80px;
      display: grid;
      grid-template-columns: 1fr 300px;
      gap: 48px;
      align-items: start;
    }
    @media (max-width: 900px) {
      .blog-layout { grid-template-columns: 1fr; gap: 32px; }
      .blog-sidebar { order: 2; }
    }

    /* ── Article Body ────────────────────────────────── */
    .blog-article {
      min-width: 0;
    }
    .blog-article h2 {
      font-family: var(--font-display);
      font-size: clamp(1.2rem, 2.5vw, 1.5rem);
      font-weight: 700;
      color: var(--c-text);
      margin: 40px 0 16px;
      padding-bottom: 10px;
      border-bottom: 2px solid var(--c-border);
      line-height: 1.3;
    }
    .blog-article h3 {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--c-primary);
      margin: 28px 0 10px;
      line-height: 1.4;
    }
    .blog-article p {
      color: var(--c-text);
      margin-bottom: 18px;
      line-height: 1.8;
      font-size: 1rem;
    }
    .blog-article ul, .blog-article ol {
      margin: 0 0 20px 0;
      padding-left: 24px;
    }
    .blog-article li {
      color: var(--c-text);
      margin-bottom: 8px;
      line-height: 1.7;
      font-size: 1rem;
    }
    .blog-article strong { color: var(--c-text); font-weight: 700; }
    .blog-article a { color: var(--c-primary); text-decoration: underline; }
    .blog-article a:hover { color: var(--c-primary-dk); }

    /* ── Comparison Table ────────────────────────────── */
    .blog-table-wrap {
      overflow-x: auto;
      margin: 24px 0;
      border-radius: var(--radius);
      border: 1px solid var(--c-border);
      box-shadow: var(--shadow);
    }
    .blog-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.92rem;
      background: var(--c-white);
    }
    .blog-table thead tr {
      background: var(--gradient);
    }
    .blog-table thead th {
      padding: 14px 16px;
      text-align: left;
      font-weight: 700;
      color: var(--c-white);
      white-space: nowrap;
    }
    .blog-table tbody tr { border-bottom: 1px solid var(--c-border); }
    .blog-table tbody tr:last-child { border-bottom: none; }
    .blog-table tbody tr:nth-child(even) { background: var(--c-bg-light); }
    .blog-table tbody td {
      padding: 12px 16px;
      color: var(--c-text);
      vertical-align: top;
    }

    /* ── Info Box ────────────────────────────────────── */
    .info-box {
      background: var(--c-bg-light);
      border-left: 4px solid var(--c-primary);
      border-radius: 0 var(--radius) var(--radius) 0;
      padding: 20px 24px;
      margin: 28px 0;
    }
    .info-box p { color: var(--c-text); margin-bottom: 0; }
    .info-box strong { color: var(--c-primary); }

    /* ── Checklist ───────────────────────────────────── */
    .checklist {
      list-style: none;
      padding: 0;
      margin: 0 0 24px 0;
    }
    .checklist li {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 8px 0;
      border-bottom: 1px solid var(--c-border);
      color: var(--c-text);
      font-size: 1rem;
    }
    .checklist li:last-child { border-bottom: none; }
    .checklist li::before {
      content: '✓';
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      min-width: 20px;
      background: var(--c-success);
      color: var(--c-white);
      font-size: 0.72rem;
      font-weight: 900;
      border-radius: 50%;
      margin-top: 2px;
    }

    /* ── Numbered Steps ──────────────────────────────── */
    .steps-list {
      list-style: none;
      padding: 0;
      margin: 0 0 24px 0;
      counter-reset: steps;
    }
    .steps-list li {
      counter-increment: steps;
      display: flex;
      gap: 16px;
      padding: 16px 0;
      border-bottom: 1px solid var(--c-border);
      color: var(--c-text);
      align-items: flex-start;
    }
    .steps-list li:last-child { border-bottom: none; }
    .steps-list li::before {
      content: counter(steps);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      min-width: 32px;
      background: var(--gradient);
      color: var(--c-white);
      font-weight: 800;
      font-size: 0.85rem;
      border-radius: 50%;
      margin-top: 2px;
    }

    /* ── CTA Box ─────────────────────────────────────── */
    .cta-box {
      background: var(--gradient);
      border-radius: var(--radius);
      padding: 36px 32px;
      margin: 40px 0;
      text-align: center;
      box-shadow: var(--shadow-lg);
      position: relative;
      overflow: hidden;
    }
    .cta-box::before {
      content: '';
      position: absolute;
      top: -40px; right: -40px;
      width: 180px; height: 180px;
      background: rgba(255,255,255,0.06);
      border-radius: 50%;
    }
    .cta-box::after {
      content: '';
      position: absolute;
      bottom: -60px; left: -30px;
      width: 220px; height: 220px;
      background: rgba(255,255,255,0.04);
      border-radius: 50%;
    }
    .cta-box h3 {
      font-family: var(--font-display);
      font-size: clamp(1.1rem, 2.5vw, 1.4rem);
      font-weight: 700;
      color: var(--c-white) !important;
      margin-bottom: 12px;
      position: relative;
    }
    .cta-box p {
      color: rgba(255,255,255,0.90) !important;
      margin-bottom: 24px;
      font-size: 0.97rem;
      position: relative;
    }
    .cta-btn {
      display: inline-block;
      background: var(--c-white);
      color: var(--c-primary) !important;
      font-weight: 800;
      font-size: 0.97rem;
      padding: 14px 32px;
      border-radius: 8px;
      text-decoration: none !important;
      position: relative;
      transition: transform 0.2s, box-shadow 0.2s;
      box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    }
    .cta-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.20);
      color: var(--c-primary-dk) !important;
    }
    .cta-stats {
      display: flex;
      justify-content: center;
      gap: 32px;
      flex-wrap: wrap;
      margin-top: 24px;
      position: relative;
    }
    .cta-stat { text-align: center; color: var(--c-white); }
    .cta-stat-num {
      display: block;
      font-size: 1.5rem;
      font-weight: 800;
      line-height: 1;
      margin-bottom: 4px;
    }
    .cta-stat-label {
      font-size: 0.75rem;
      opacity: 0.85;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* ── FAQ Section ─────────────────────────────────── */
    .faq-section {
      background: var(--c-bg-light);
      border-radius: var(--radius);
      padding: 32px;
      margin: 40px 0;
    }
    .faq-section h2 {
      font-family: var(--font-display);
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--c-text);
      margin-bottom: 24px;
      border-bottom: none !important;
      padding-bottom: 0 !important;
    }
    .faq-item {
      border-bottom: 1px solid var(--c-border);
      padding: 16px 0;
    }
    .faq-item:last-child { border-bottom: none; }
    .faq-q {
      font-weight: 700;
      color: var(--c-text);
      font-size: 0.97rem;
      margin-bottom: 8px;
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }
    .faq-q::before {
      content: 'Q';
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      min-width: 22px;
      background: var(--c-primary);
      color: var(--c-white);
      font-size: 0.72rem;
      font-weight: 900;
      border-radius: 4px;
      margin-top: 1px;
    }
    .faq-a {
      color: var(--c-text);
      font-size: 0.95rem;
      line-height: 1.7;
      padding-left: 32px;
    }

    /* ── Sidebar ─────────────────────────────────────── */
    .blog-sidebar {
      position: sticky;
      top: 90px;
    }
    .sidebar-card {
      background: var(--c-white);
      border: 1px solid var(--c-border);
      border-radius: var(--radius);
      padding: 24px;
      margin-bottom: 24px;
      box-shadow: var(--shadow);
    }
    .sidebar-card h3 {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--c-text);
      margin-bottom: 16px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding-bottom: 10px;
      border-bottom: 2px solid var(--c-primary);
    }
    .toc-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .toc-list li { margin-bottom: 6px; }
    .toc-list a {
      color: var(--c-muted);
      text-decoration: none;
      font-size: 0.88rem;
      display: flex;
      align-items: flex-start;
      gap: 6px;
      line-height: 1.5;
      transition: color 0.2s;
    }
    .toc-list a:hover { color: var(--c-primary); }
    .toc-list a::before {
      content: '→';
      color: var(--c-primary);
      font-size: 0.75rem;
      margin-top: 2px;
      flex-shrink: 0;
    }
    .related-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .related-list li { border-bottom: 1px solid var(--c-border); }
    .related-list li:last-child { border-bottom: none; }
    .related-list a {
      display: block;
      padding: 10px 0;
      color: var(--c-text);
      text-decoration: none;
      font-size: 0.88rem;
      line-height: 1.4;
      transition: color 0.2s;
    }
    .related-list a:hover { color: var(--c-primary); }
    .sidebar-cta-btn {
      display: block;
      background: var(--gradient);
      color: var(--c-white) !important;
      text-align: center;
      padding: 14px;
      border-radius: 8px;
      font-weight: 700;
      text-decoration: none;
      font-size: 0.95rem;
      margin-top: 16px;
      transition: opacity 0.2s, transform 0.2s;
    }
    .sidebar-cta-btn:hover { opacity: 0.9; transform: translateY(-1px); }
    .trust-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 12px;
    }
    .trust-badge {
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--c-success);
      background: rgba(16,185,129,0.10);
      border: 1px solid rgba(16,185,129,0.25);
      padding: 3px 8px;
      border-radius: 4px;
    }

    /* ── Related Blogs Grid ──────────────────────────── */
    .related-posts-section {
      max-width: var(--max-w-wide);
      margin: 0 auto;
      padding: 0 24px 64px;
    }
    .related-posts-section h2 {
      font-family: var(--font-display);
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--c-text);
      margin-bottom: 28px;
      padding-bottom: 12px;
      border-bottom: 2px solid var(--c-border);
    }
    .related-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 24px;
    }
    .related-card {
      background: var(--c-white);
      border: 1px solid var(--c-border);
      border-radius: var(--radius);
      overflow: hidden;
      box-shadow: var(--shadow);
      transition: transform 0.2s, box-shadow 0.2s;
      display: flex;
      flex-direction: column;
    }
    .related-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }
    .related-card-top {
      background: var(--gradient);
      height: 6px;
    }
    .related-card-body {
      padding: 20px;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .related-card-tag {
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--c-primary);
      margin-bottom: 8px;
    }
    .related-card h3 {
      font-size: 0.97rem;
      font-weight: 700;
      color: var(--c-text);
      line-height: 1.4;
      margin-bottom: 10px;
    }
    .related-card p {
      font-size: 0.85rem;
      color: var(--c-muted);
      line-height: 1.55;
      flex: 1;
      margin-bottom: 16px;
    }
    .related-card a {
      color: var(--c-primary);
      font-size: 0.88rem;
      font-weight: 700;
      text-decoration: none;
    }
    .related-card a:hover { text-decoration: underline; }

    /* ── Responsive ──────────────────────────────────── */
    @media (max-width: 600px) {
      .blog-hero { padding: 48px 16px 40px; }
      .blog-layout { padding: 28px 16px 48px; }
      .cta-box { padding: 28px 20px; }
      .faq-section { padding: 24px 16px; }
      .cta-stats { gap: 20px; }
      .blog-table thead th, .blog-table tbody td { padding: 10px 12px; font-size: 0.85rem; }
    }
  </style>
</head>

<body>
<!-- GTM noscript -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W5H82GQ7" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

<!-- HEADER -->
${headerStr}

<!-- ── Blog Hero ──────────────────────────────────── -->
<section class="blog-hero">
  <div class="blog-hero-inner">
    <span class="blog-hero-badge">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
      Medical365 Insights
    </span>
    <h1>BLOG_TITLE</h1>
    <div class="blog-hero-meta">
      <span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        BLOG_DATE_DISPLAY
      </span>
      <span class="dot"></span>
      <span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        BLOG_READ_TIME min read
      </span>
      <span class="dot"></span>
      <span>By Medical365 Team</span>
    </div>
  </div>
</section>

<!-- ── Breadcrumb ──────────────────────────────────── -->
<nav class="blog-breadcrumb" aria-label="breadcrumb">
  <div class="blog-breadcrumb-inner">
    <a href="https://www.medical365.in/">Home</a>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
    <a href="https://www.medical365.in/blogs">Insights & Blogs</a>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
    <span style="color:var(--c-text);">BLOG_SHORT_TITLE</span>
  </div>
</nav>

<!-- ── Main Layout ────────────────────────────────── -->
<div class="blog-layout">

  <!-- Article -->
  <main class="blog-article" id="main">

    ARTICLE_CONTENT_GOES_HERE

    <!-- CTA Box -->
    <div class="cta-box">
      <h3>Ready to Transform Your Hospital?</h3>
      <p>Join 500+ healthcare facilities across India using Medical365's ABDM-compliant platform. Get a free on-site or online demo today.</p>
      <a href="https://www.medical365.in/book-demo" class="cta-btn" aria-label="Book free Medical365 demo">Book Free Demo →</a>
      <div class="cta-stats">
        <div class="cta-stat"><span class="cta-stat-num">500+</span><span class="cta-stat-label">Hospitals</span></div>
        <div class="cta-stat"><span class="cta-stat-num">99.9%</span><span class="cta-stat-label">Uptime</span></div>
        <div class="cta-stat"><span class="cta-stat-num">40%</span><span class="cta-stat-label">Cost Saved</span></div>
        <div class="cta-stat"><span class="cta-stat-num">2 Weeks</span><span class="cta-stat-label">Go Live</span></div>
      </div>
    </div>

    <!-- FAQ -->
    <div class="faq-section">
      <h2>Frequently Asked Questions</h2>
      FAQ_ITEMS_GO_HERE
    </div>

  </main>

  <!-- Sidebar -->
  <aside class="blog-sidebar">

    <!-- Table of Contents -->
    <div class="sidebar-card">
      <h3>In This Article</h3>
      <ul class="toc-list">
        TOC_ITEMS_GO_HERE
      </ul>
    </div>

    <!-- Book Demo -->
    <div class="sidebar-card" style="background:var(--c-bg-light);border-color:var(--c-primary);">
      <h3 style="color:var(--c-primary);">Free Demo</h3>
      <p style="font-size:0.88rem;color:var(--c-text);margin-bottom:12px;">See Medical365 live for your hospital. On-site or online, anywhere in India.</p>
      <a href="https://www.medical365.in/book-demo" class="sidebar-cta-btn" aria-label="Book a free Medical365 demo">Book Free Demo →</a>
      <div class="trust-badges">
        <span class="trust-badge">✓ ABDM</span>
        <span class="trust-badge">✓ NABH</span>
        <span class="trust-badge">✓ ISO 27001</span>
        <span class="trust-badge">✓ DPDP 2023</span>
      </div>
    </div>

    <!-- Related Posts -->
    <div class="sidebar-card">
      <h3>Related Articles</h3>
      <ul class="related-list">
        <li><a href="https://www.medical365.in/blogs/emr-vs-ehr-india">EMR vs EHR for Indian Hospitals</a></li>
        <li><a href="https://www.medical365.in/blogs/nabh-compliance-guide">NABH Compliance Guide 2026</a></li>
        <li><a href="https://www.medical365.in/blogs/abha-integration-guide">ABHA Integration Guide</a></li>
        <li><a href="https://www.medical365.in/blogs/hospital-software-rajasthan">Top HMS in Rajasthan 2026</a></li>
      </ul>
    </div>

  </aside>
</div>

<!-- ── Related Posts Grid ─────────────────────────── -->
<section class="related-posts-section">
  <h2>More Healthcare Software Guides</h2>
  <div class="related-grid">

    <div class="related-card">
      <div class="related-card-top"></div>
      <div class="related-card-body">
        <div class="related-card-tag">EMR / EHR</div>
        <h3>EMR vs EHR — What's the Difference for Indian Hospitals?</h3>
        <p>Key differences, ABDM requirements and which system suits your facility type.</p>
        <a href="https://www.medical365.in/blogs/emr-vs-ehr-india">Read Article →</a>
      </div>
    </div>

    <div class="related-card">
      <div class="related-card-top"></div>
      <div class="related-card-body">
        <div class="related-card-tag">Compliance</div>
        <h3>NABH Compliance — Complete Guide for Indian Hospitals 2026</h3>
        <p>Step-by-step NABH accreditation process and how HMS software helps.</p>
        <a href="https://www.medical365.in/blogs/nabh-compliance-guide">Read Article →</a>
      </div>
    </div>

    <div class="related-card">
      <div class="related-card-top"></div>
      <div class="related-card-body">
        <div class="related-card-tag">ABDM</div>
        <h3>ABHA Integration Guide — How to Get ABDM Compliant in 2026</h3>
        <p>Step-by-step ABHA ID setup and ABDM compliance for Indian hospitals.</p>
        <a href="https://www.medical365.in/blogs/abha-integration-guide">Read Article →</a>
      </div>
    </div>

  </div>
</section>

<!-- FOOTER -->
${footerStr}

</body>
</html>`;

fs.writeFileSync('blog_template_generator.js', `module.exports = \`${templateBase.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;`);
console.log("Template generator created.");
