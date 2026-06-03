const fs = require('fs');
const path = require('path');

const config = [
    {
        file: 'e-prescriptions.html',
        title: 'E-Prescription Software India | ABDM Compliant | Medical365',
        desc: 'Medical365 e-Prescription software — ABDM compliant digital prescriptions with drug database & pharmacy integration. Paperless clinic solution. Free demo.',
        h1Append: ' — ABDM Compliant Digital Prescriptions',
        serviceName: 'e-Prescription Software',
        canonical: 'https://www.medical365.in/e-prescriptions',
        city: 'India',
        hasTestimonial: false,
        boost: "<p>Medical365's e-Prescription Software enables Indian doctors to generate ABDM-compliant digital prescriptions in seconds — with auto drug name suggestions, dosage calculators, and direct pharmacy integration. Accessible on any device, our system reduces prescription errors and supports India's paperless healthcare mission under Ayushman Bharat Digital Mission.</p>"
    },
    {
        file: 'telemedicine.html',
        title: 'Telemedicine Software India | Secure HD Video | Medical365',
        desc: 'Medical365 Telemedicine — secure HD video OPD, WhatsApp consults & digital prescriptions for Indian hospitals. ABDM compliant. Book free demo today.',
        h1Append: ' — Secure HD Video OPD India',
        serviceName: 'Telemedicine Software',
        canonical: 'https://www.medical365.in/telemedicine',
        city: 'India',
        hasTestimonial: false,
        boost: '<p>Medical365 Telemedicine connects patients and doctors across Rajasthan and India through secure HD video consultations, WhatsApp-based OPD, and AI-assisted triage. ABDM-compliant and integrated with EMR, billing, and pharmacy, our telemedicine module enables complete virtual care delivery without leaving the HMS platform.</p>'
    },
    {
        file: 'billing-invoicing.html',
        title: 'Hospital Billing & Invoicing Software India | GST Ready | Medical365',
        desc: 'Automate hospital billing with Medical365 — GST-compliant invoicing, TPA billing & revenue reports. NABH ready. Trusted by 500+ facilities. Free demo.',
        h1Append: ' — GST & TPA Billing Automation',
        serviceName: 'Billing & Invoicing Software',
        canonical: 'https://www.medical365.in/billing-invoicing',
        city: 'India',
        hasTestimonial: false,
        boost: "<p>Medical365's Hospital Billing & Invoicing Software automates the entire revenue cycle — from OPD billing and pharmacy charges to TPA claim submission and GST-compliant invoicing. Integrated directly with EMR, lab, and pharmacy modules, it eliminates manual entry errors and ensures zero revenue leakage for hospitals across India.</p>"
    },
    {
        file: 'lims.html',
        title: 'LIMS Laboratory Software India | Auto Reports | Medical365',
        desc: 'Medical365 LIMS — lab analyzer integration, auto-reports & direct EMR sync. ABDM compliant laboratory software for Indian hospitals. Book free demo.',
        h1Append: ' — Auto Lab Reports & EMR Sync',
        serviceName: 'LIMS Software',
        canonical: 'https://www.medical365.in/lims',
        city: 'India',
        hasTestimonial: false,
        boost: '<p>Medical365 LIMS (Laboratory Information Management System) supports bidirectional integration with major lab analyzers, enabling auto-upload of test results directly into patient EMR records. With customizable report templates, QC tracking, and ABDM-compliant data handling, our LIMS eliminates manual transcription errors and speeds up diagnostic turnaround for hospitals and diagnostic centers across India.</p>'
    },
    {
        file: 'pharmacy.html',
        title: 'Pharmacy Management Software India | Inventory & Billing | Medical365',
        desc: 'Medical365 Pharmacy Management — real-time expiry tracking, e-prescription fulfillment & auto PO generation. Integrated HMS for India. Free demo available.',
        h1Append: ' — Expiry Tracking & e-Prescription Integration',
        serviceName: 'Pharmacy Software',
        canonical: 'https://www.medical365.in/pharmacy',
        city: 'India',
        hasTestimonial: false,
        boost: "<p>Medical365 Pharmacy Management Software provides real-time inventory control, batch expiry tracking, e-prescription fulfillment, and automated purchase order generation. Fully integrated with the EMR and billing modules, it eliminates stock-outs, reduces wastage, and ensures every dispensed drug is auto-linked to the patient's medical record.</p>"
    },
    {
        file: 'emr-software-jaipur.html',
        title: 'Best EMR Software Jaipur | ABDM & NABH Compliant | Medical365',
        desc: 'Medical365 EMR Software in Jaipur — specialty-specific charting, ABDM & DPDP 2023 compliant. Trusted by 500+ Rajasthan hospitals. Book free on-site demo today.',
        h1Append: ' — ABDM & NABH Compliant EMR',
        serviceName: 'EMR Software',
        canonical: 'https://www.medical365.in/emr-software-jaipur',
        city: 'Jaipur',
        hasTestimonial: true,
        boost: "<p>Medical365's EMR Software in Jaipur is purpose-built for Indian clinical workflows, supporting specialty-specific templates for cardiology, orthopedics, gynecology, dermatology, and more. Fully compliant with ABDM, DPDP Act 2023, and MoHFW EHR Standards, our system ensures every patient record is secure, structured, and instantly accessible — even during internet outages thanks to our offline-first architecture.</p>"
    },
    {
        file: 'abha-compliance-software-jaipur.html',
        title: 'ABHA Compliance Software Jaipur | ABDM Ready | Medical365',
        desc: 'Get ABHA-compliant software for your Jaipur hospital. Medical365 supports ABDM, ABHA ID generation & MoHFW EHR standards. Book free on-site demo today.',
        h1Append: ' — ABDM & ABHA ID Integration',
        serviceName: 'ABHA Compliance Software',
        canonical: 'https://www.medical365.in/abha-compliance-software-jaipur',
        city: 'Jaipur',
        hasTestimonial: true,
        boost: null
    },
    {
        file: 'healthcare-crm-udaipur.html',
        title: 'Healthcare CRM Software India | Patient Management | Medical365',
        desc: 'Boost patient retention with Medical365 Healthcare CRM. Referral tracking, campaign analytics & WhatsApp integration for Indian hospitals. Free demo available.',
        h1Append: ' — Patient Retention & Analytics',
        serviceName: 'Healthcare CRM',
        canonical: 'https://www.medical365.in/healthcare-crm-udaipur',
        city: 'Udaipur',
        hasTestimonial: true,
        boost: null
    },
    {
        file: 'dental-imaging.html',
        title: 'Dental EHR Software India | Tooth Chart & Billing | Medical365',
        desc: 'Medical365 Dental EHR — tooth chart, treatment planning, imaging & insurance billing. ABDM compliant dental practice software for India. Book free demo.',
        h1Append: ' — Tooth Chart, Imaging & Billing',
        serviceName: 'Dental EHR Software',
        canonical: 'https://www.medical365.in/dental-imaging',
        city: 'India',
        hasTestimonial: false,
        boost: null
    },
    {
        file: 'dermatology-treatment-plans.html',
        title: 'Dermatology Treatment Plan Software | EMR India | Medical365',
        desc: 'Medical365 Dermatology EMR — before/after photo storage, treatment plans & cosmetic procedure records. ABDM compliant. Book free demo for your clinic.',
        h1Append: ' — Photo Tracking & ABDM Compliant',
        serviceName: 'Dermatology EMR',
        canonical: 'https://www.medical365.in/dermatology-treatment-plans',
        city: 'India',
        hasTestimonial: false,
        boost: null
    }
];

const seoBlock = `
    <!-- Medical365 SEO Enhancement Block -->
    <meta name="geo.region" content="IN-RJ" />
    <meta name="geo.placename" content="Jaipur, Rajasthan, India" />
    <meta name="geo.position" content="26.9124;75.7873" />
    <meta name="ICBM" content="26.9124, 75.7873" />
    <meta http-equiv="content-language" content="en-IN" />
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <meta property="og:locale" content="en_IN" />
    <meta property="og:site_name" content="Medical365" />
    <meta name="twitter:site" content="@medical_365" />
    <meta name="twitter:creator" content="@medical_365" />
    <link rel="preload" as="image" href="/medical365fav.jpg" />
    <link rel="preload" as="image" href="/img/redesign/medical365_dashboard_v2.png" />
    <link rel="dns-prefetch" href="//www.googletagmanager.com" />
    <link rel="dns-prefetch" href="//fonts.googleapis.com" />
    <link rel="dns-prefetch" href="//wa.me" />
`;

config.forEach(item => {
    let filePath = path.join(__dirname, item.file);
    if (!fs.existsSync(filePath)) {
        console.error("File not found: " + item.file);
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');

    // 1A. Title
    content = content.replace(/<title>.*?<\/title>/is, "<title>" + item.title + "</title>");

    // 1B. Meta Description
    if (content.match(/<meta name="description" content=".*?"/is)) {
        content = content.replace(/<meta name="description" content=".*?"/is, '<meta name="description" content="' + item.desc + '"');
    } else {
        content = content.replace(/<title>/, '<meta name="description" content="' + item.desc + '" />\n    <title>');
    }

    // 1C & 2. Meta Tags & Schema
    let schemaApp = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Medical365 — ${item.serviceName}",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web, Android, iOS",
      "url": "${item.canonical}",
      "description": "${item.desc}",
      "offers": {
        "@type": "Offer",
        "price": "6000",
        "priceCurrency": "INR",
        "priceValidUntil": "2026-12-31"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "500",
        "bestRating": "5"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Medical365 by Chonexa Technologies",
        "url": "https://www.medical365.in",
        "logo": "https://www.medical365.in/medical365logo1.png",
        "telephone": "+91-77919-10007",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Malviya Nagar",
          "addressLocality": "Jaipur",
          "addressRegion": "Rajasthan",
          "postalCode": "302017",
          "addressCountry": "IN"
        },
        "sameAs": [
          "https://www.linkedin.com/in/medical-hms-612628405/",
          "https://x.com/medical_365",
          "https://www.facebook.com/medical365HMS/",
          "https://www.youtube.com/@Medical365-HMS",
          "https://www.instagram.com/medical365_hms/"
        ]
      }
    }
    </script>
    `;

    let schemaLocal = item.city !== 'India' ? `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Medical365 — ${item.serviceName} in ${item.city}",
      "@id": "${item.canonical}",
      "url": "${item.canonical}",
      "telephone": "+91-77919-10007",
      "priceRange": "₹₹",
      "image": "https://www.medical365.in/medical365logo1.png",
      "description": "${item.desc}",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Malviya Nagar",
        "addressLocality": "Jaipur",
        "addressRegion": "Rajasthan",
        "postalCode": "302017",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 26.9124,
        "longitude": 75.7873
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      "areaServed": "Rajasthan, India",
      "serviceType": "${item.serviceName}"
    }
    </script>
    ` : '';

    let schemaBread = `
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
          "name": "Solutions",
          "item": "https://www.medical365.in/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "${item.serviceName}",
          "item": "${item.canonical}"
        }
      ]
    }
    </script>
    `;

    let schemaFAQ = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is your software fully compliant with Indian healthcare laws?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Medical365 acts as a highly secure, ABDM-compliant vault for patient data. We strictly adhere to the DPDP Act 2023 and the EHR Standards designated by the MoHFW in India."
          }
        }
      ]
    }
    </script>
    `;

    let allSchema = seoBlock + schemaApp + schemaLocal + schemaBread + schemaFAQ;
    
    if (!content.includes("<!-- Medical365 SEO Enhancement Block -->")) {
        content = content.replace('</head>', allSchema + '\n</head>');
    }

    // Task 3. H1 append
    let h1Regex = /<h1([^>]*)>(.*?)<\/h1>/i;
    let h1Match = content.match(h1Regex);
    if (h1Match && !h1Match[2].includes('ABDM')) {
        let newH1 = "<h1" + h1Match[1] + ">" + h1Match[2] + item.h1Append + "</h1>";
        content = content.replace(h1Regex, newH1);
    }

    // Task 4. Image alt text and lazy load
    const alts = {
        '/medical365fav.jpg': 'Medical365 Logo - ABDM Compliant Hospital Management Software India',
        '/img/redesign/medical365_dashboard_v2.png': 'Medical365 Hospital Management Software Dashboard - Cloud HMS India',
        '/img/redesign/clinic_management_isometric.png': 'Medical365 Clinic Management System Interface - Cloud Based India',
        '/img/redesign/medical365_doctor_ui_new.png': 'Medical365 Doctor EMR Interface - Smart EHR Software India',
        '/img/redesign/emr_icon_3d_1775221267246.png': 'Medical365 Smart EMR Icon - Electronic Medical Records India',
        '/img/redesign/rcm_icon_3d_1775221290252.png': 'Medical365 Revenue Cycle Management Icon - RCM Software India',
        '/img/redesign/secure_cloud_isometric.png': 'Medical365 Cloud Security - ABDM Compliant Healthcare Data Protection',
        '/img/redesign/avatar_set_3d_1775221404479.png': 'Medical365 Happy Customer - Hospital Software Review India'
    };

    for (let src in alts) {
        let imgRegex = new RegExp('<img[^>]*src=["\']' + src + '["\'][^>]*>', 'gi');
        content = content.replace(imgRegex, (match) => {
            let m = match;
            if (!m.includes('alt=')) {
                m = m.replace('<img', '<img alt="' + alts[src] + '"');
            }
            if (!m.includes('loading=') && src !== '/medical365fav.jpg') {
                m = m.replace('<img', '<img loading="lazy" decoding="async"');
            } else if (!m.includes('loading=') && src === '/medical365fav.jpg') {
                m = m.replace('<img', '<img loading="eager"');
            }
            return m;
        });
    }

    // Task 5. Review schema
    if (item.hasTestimonial && !content.includes('"@type": "Product"')) {
        let reviewSchema = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Medical365 ${item.serviceName}",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "500",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Dr. Harsh Vardhan"
          },
          "reviewBody": "We went completely paperless with Medical365. The offline-first synchronization handles local power cuts effortlessly, saving our team hours of administrative work.",
          "publisher": {
            "@type": "Organization",
            "name": "Jaipur Diagnostic & Care Center"
          }
        }
      ]
    }
    </script>`;
        content = content.replace(/(<section[^>]*class=["'][^"']*testimonial[^"']*["'][^>]*>.*?<\/section>)/is, '$1\n' + reviewSchema);
    }

    // Task 6. Weak Anchors
    content = content.replace(/(<a[^>]*href=["']\/emr["'][^>]*>)\s*Learn More\s*(<\/a>)/gi, '$1Learn More About Medical365 EMR Software India$2');
    content = content.replace(/(<a[^>]*href=["']https?:\/\/www\.medical365\.in\/book-demo["'][^>]*>)\s*Get Started\s*(<\/a>)/gi, '$1Get Free Hospital Software Demo$2');
    content = content.replace(/(<a[^>]*href=["']\/book-demo["'][^>]*>)\s*Get Started\s*(<\/a>)/gi, '$1Get Free Hospital Software Demo$2');
    content = content.replace(/(<a[^>]*href=["']https?:\/\/www\.medical365\.in\/book-demo["'][^>]*>)\s*Book Demo\s*(<\/a>)/gi, '$1Book Free Healthcare Software Demo$2');
    content = content.replace(/(<a[^>]*href=["']\/book-demo["'][^>]*>)\s*Book Demo\s*(<\/a>)/gi, '$1Book Free Healthcare Software Demo$2');
    content = content.replace(/(<a[^>]*href=["']\/pricing["'][^>]*>)\s*View Pricing\s*(<\/a>)/gi, '$1View Medical365 Pricing Plans India$2');
    content = content.replace(/(<a[^>]*href=["']\/about["'][^>]*>)\s*About Us\s*(<\/a>)/gi, '$1About Medical365 Healthcare Software$2');

    // Task 7. Canonical Fix
    let canonicalTag = '<link rel="canonical" href="' + item.canonical + '" />';
    if (content.match(/<link[^>]*rel=["']canonical["'][^>]*>/i)) {
        content = content.replace(/<link[^>]*rel=["']canonical["'][^>]*>/ig, canonicalTag);
    } else {
        content = content.replace('</head>', canonicalTag + '\n</head>');
    }
    let canons = content.match(/<link[^>]*rel=["']canonical["'][^>]*>/ig);
    if(canons && canons.length > 1) {
        content = content.replace(/<link[^>]*rel=["']canonical["'][^>]*>/ig, '');
        content = content.replace('</head>', canonicalTag + '\n</head>');
    }

    // Task 8. Aria Labels
    content = content.replace(/(<a[^>]*href=["']tel:\+917791910007["'])([^>]*>)/gi, (match, p1, p2) => {
        if(!p2.includes('aria-label')) return p1 + ' aria-label="Call Medical365 at +91 77919 10007"' + p2;
        return match;
    });
    content = content.replace(/(<a[^>]*href=["']https:\/\/wa\.me\/917791910007[^"']*["'])([^>]*>)/gi, (match, p1, p2) => {
        if(!p2.includes('aria-label')) return p1 + ' aria-label="Chat with Medical365 on WhatsApp"' + p2;
        return match;
    });
    content = content.replace(/(<a[^>]*href=["']https?:\/\/www\.medical365\.in\/book-demo["'])([^>]*>)/gi, (match, p1, p2) => {
        if(!p2.includes('aria-label')) return p1 + ' aria-label="Book a free Medical365 demo for your hospital"' + p2;
        return match;
    });
    content = content.replace(/(<a[^>]*href=["']\/book-demo["'])([^>]*>)/gi, (match, p1, p2) => {
        if(!p2.includes('aria-label')) return p1 + ' aria-label="Book a free Medical365 demo for your hospital"' + p2;
        return match;
    });

    // Task 9. External Links Security
    content = content.replace(/<a([^>]*target=["']_blank["'][^>]*)>/gi, (match, p1) => {
        if (!p1.includes('rel=')) {
            return '<a' + p1 + ' rel="noopener noreferrer">';
        } else if (p1.includes('rel="noopener"') && !p1.includes('noreferrer')) {
            return '<a' + p1.replace('rel="noopener"', 'rel="noopener noreferrer"') + '>';
        }
        return match;
    });

    // Task 10. Content Boost
    if (item.boost && !content.includes(item.boost.substring(0, 50))) {
        let featureRegex = /(<div class=["'][^"']*section-header[^"']*["'][^>]*>\s*<h2[^>]*>.*?<\/h2>\s*<p[^>]*>.*?<\/p>\s*<\/div>)/is;
        if (content.match(featureRegex)) {
            content = content.replace(featureRegex, '$1\n    <div class="container" style="margin-bottom: 40px; text-align: center;"><div class="content-boost" style="max-width: 800px; margin: 0 auto; color: #475569; line-height: 1.6;">' + item.boost + '</div></div>\n');
        } else {
            let fallbackRegex = /(<section class="features-section"[^>]*>\s*<div class="container">)/is;
            if (content.match(fallbackRegex)) {
                 content = content.replace(fallbackRegex, '$1\n    <div class="content-boost" style="margin-bottom: 30px;">' + item.boost + '</div>\n');
            }
        }
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Processed " + item.file);
});
