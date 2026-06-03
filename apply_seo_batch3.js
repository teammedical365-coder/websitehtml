const fs = require('fs');
const path = require('path');

const config = [
    {
        file: 'cardiac-risk-scoring.html',
        title: 'Cardiac Risk Scoring Software India | ECG & EMR | Medical365',
        desc: 'Medical365 Cardiac Risk Scoring software calculates Framingham, GRACE & TIMI scores within EMR. ABDM compliant cardiology solution for Indian hospitals. Free demo.',
        keywords: 'cardiac risk scoring software, Framingham score EMR, cardiology software India, GRACE score calculator, ABDM cardiology, Medical365',
        h1Append: ' — Framingham, GRACE & TIMI Score Integration',
        serviceName: 'Cardiac Risk Scoring',
        condition: 'Cardiovascular Disease',
        parentSlug: 'ecg-ekg-integration',
        parentCat: 'Cardiology',
        canonical: 'https://www.medical365.in/cardiac-risk-scoring',
        boost: `<p>Medical365's Cardiac Risk Scoring module integrates Framingham, GRACE, TIMI, and HEART score calculators directly into the patient EMR — no manual entry, no switching tabs. Risk levels auto-flag high-risk patients for follow-up, helping cardiologists in India make faster, evidence-based clinical decisions within a fully ABDM and NABH compliant platform.</p>`
    },
    {
        file: 'ecg-ekg-integration.html',
        title: 'ECG EKG Integration Software India | Cardiology EMR | Medical365',
        desc: 'Medical365 ECG/EKG Integration auto-links results to patient EMR records. Real-time cardiology data for Indian hospitals. ABDM compliant. Book free demo today.',
        keywords: 'ECG EKG integration software, cardiology EMR India, ECG report software, hospital ECG management, ABDM compliant cardiology, Medical365',
        h1Append: ' — Auto EMR Sync & ABDM Compliant',
        serviceName: 'ECG/EKG Integration',
        condition: 'Cardiac Arrhythmia',
        parentSlug: 'cardiac-history-templates',
        parentCat: 'Cardiology',
        canonical: 'https://www.medical365.in/ecg-ekg-integration',
        boost: `<p>Medical365 ECG/EKG Integration connects your cardiology equipment directly to the patient record — ECG traces, measurements, and interpreted reports are automatically uploaded and linked to the correct patient file. Compatible with major ECG machine brands used in Indian hospitals, our bidirectional integration eliminates manual transcription and supports ABDM-compliant data storage.</p>`
    },
    {
        file: 'dental-tooth-chart.html',
        title: 'Dental Tooth Chart Software India | Odontogram & EMR | Medical365',
        desc: 'Medical365 Dental Tooth Chart (Odontogram) tracks procedures per tooth, supports imaging & insurance billing. ABDM compliant dental EMR India. Book free demo.',
        keywords: 'dental tooth chart software, odontogram software India, dental EMR, dental practice software India, ABDM dental software, Medical365',
        h1Append: ' — Full Odontogram & Procedure Tracking',
        serviceName: 'Dental Tooth Chart',
        condition: 'Dental Conditions',
        parentSlug: 'dental-imaging',
        parentCat: 'Dental',
        canonical: 'https://www.medical365.in/dental-tooth-chart',
        boost: `<p>Medical365's Dental Tooth Chart (Odontogram) provides a fully interactive, graphical tooth-by-tooth tracking interface — dentists can record procedures, note conditions, and track treatment history per tooth with a single click. Integrated with treatment planning, imaging, and insurance billing, it is the most complete ABDM-compliant dental EMR solution for Indian dental practices.</p>`
    },
    {
        file: 'dental-treatment-planning.html',
        title: 'Dental Treatment Planning Software India | ABDM | Medical365',
        desc: 'Medical365 Dental Treatment Planning Software creates multi-visit plans, cost estimates & consent forms. ABDM compliant dental EMR India. Book free demo today.',
        keywords: 'dental treatment planning software, dental practice management India, dental EMR software, dental billing India, ABDM dental, Medical365',
        h1Append: ' — Multi-Visit Plans & Cost Estimates',
        serviceName: 'Dental Treatment Planning',
        condition: 'Dental Disease',
        parentSlug: 'dental-tooth-chart',
        parentCat: 'Dental',
        canonical: 'https://www.medical365.in/dental-treatment-planning',
        boost: `<p>Medical365 Dental Treatment Planning enables dentists to create structured, multi-visit treatment plans with cost estimates, patient consent forms, and appointment scheduling — all from one screen. Plans are automatically linked to the patient's tooth chart and billing module, ensuring complete end-to-end dental practice management that is fully ABDM compliant for India.</p>`
    },
    {
        file: 'dermatology-photos.html',
        title: 'Dermatology Before After Photo Software India | EMR | Medical365',
        desc: 'Medical365 Dermatology Photo Software stores before/after images, tracks skin conditions & treatment progress. ABDM compliant dermatology EMR. Book free demo.',
        keywords: 'dermatology photo software, before after skin photo EMR, dermatology EMR India, skin treatment tracking, ABDM dermatology, Medical365',
        h1Append: ' — Before/After Photo Tracking & ABDM Compliant',
        serviceName: 'Dermatology Photo Management',
        condition: 'Dermatological Conditions',
        parentSlug: 'dermatology-treatment-plans',
        parentCat: 'Dermatology',
        canonical: 'https://www.medical365.in/dermatology-photos',
        boost: `<p>Medical365 Dermatology Photo Management provides a secure, structured system for storing before and after clinical photographs — organized by body region, visit date, and treatment type. Every image is linked directly to the patient's EMR record, treatment plan, and consent form, making Medical365 the most comprehensive ABDM-compliant dermatology EMR platform for Indian clinics.</p>`
    },
    {
        file: 'cancer-staging.html',
        title: 'Cancer Staging Software India | Oncology EMR | Medical365',
        desc: 'Medical365 Cancer Staging Software supports TNM classification, chemotherapy plans & oncology reports. ABDM compliant for Indian hospitals. Book free demo today.',
        keywords: 'cancer staging software India, oncology EMR, TNM staging software, chemotherapy planning software, ABDM oncology, Medical365',
        h1Append: ' — TNM Classification & Oncology Reporting',
        serviceName: 'Cancer Staging',
        condition: 'Cancer',
        parentSlug: 'chemotherapy-plans',
        parentCat: 'Oncology',
        canonical: 'https://www.medical365.in/cancer-staging',
        boost: `<p>Medical365 Cancer Staging supports TNM classification, AJCC staging, and custom oncology staging protocols directly within the patient EMR. Staging data automatically feeds into chemotherapy planning, radiation therapy records, and oncology reports — giving Indian oncologists a fully integrated, ABDM and NABH compliant cancer care management platform.</p>`
    },
    {
        file: 'fertility-treatment-tracking.html',
        title: 'Fertility Treatment Tracking Software India | IVF EMR | Medical365',
        desc: 'Medical365 Fertility Treatment Tracking manages IVF cycles, hormone charts & embryo records. ABDM compliant gynecology EMR for India. Book free demo today.',
        keywords: 'fertility treatment tracking software, IVF EMR India, gynecology software India, embryo tracking software, ABDM fertility, Medical365',
        h1Append: ' — IVF Cycle & Embryo Record Management',
        serviceName: 'Fertility Treatment Tracking',
        condition: 'Infertility',
        parentSlug: 'antenatal-care-records',
        parentCat: 'Gynecology',
        canonical: 'https://www.medical365.in/fertility-treatment-tracking',
        boost: `<p>Medical365 Fertility Treatment Tracking manages complete IVF cycles, ovulation induction protocols, hormone level charts, sperm analysis, embryo grading, and transfer records — all within the patient EMR. Designed for Indian IVF centers and gynecology hospitals, our system is fully ABDM compliant and integrates with lab results, ultrasound reports, and billing.</p>`
    },
    {
        file: 'growth-charts.html',
        title: 'Pediatric Growth Chart Software India | BMI Tracking | Medical365',
        desc: 'Medical365 Pediatric Growth Chart Software tracks BMI, height & weight with WHO standards. ABDM compliant pediatrics EMR for India. Book free demo today.',
        keywords: 'pediatric growth chart software India, BMI tracking software, child health EMR, pediatric EMR India, ABDM pediatrics, Medical365',
        h1Append: ' — WHO Standard BMI & Height Tracking',
        serviceName: 'Pediatric Growth Charts',
        condition: 'Pediatric Development',
        parentSlug: 'developmental-milestones',
        parentCat: 'Pediatrics',
        canonical: 'https://www.medical365.in/growth-charts',
        boost: `<p>Medical365 Pediatric Growth Charts track height, weight, BMI, and head circumference against WHO and IAP growth standards — with automatic percentile calculation and visual graph generation. Integrated with vaccination tracking and developmental milestones, Medical365 is India's most comprehensive ABDM compliant pediatric EMR platform for child health management.</p>`
    },
    {
        file: 'cognitive-assessment.html',
        title: 'Cognitive Assessment Software India | Neurology EMR | Medical365',
        desc: 'Medical365 Cognitive Assessment Software includes MMSE, MoCA & custom neuro forms within EMR. ABDM compliant neurology solution India. Book free demo today.',
        keywords: 'cognitive assessment software India, MMSE software, neurology EMR India, MoCA assessment tool, ABDM neurology, Medical365',
        h1Append: ' — MMSE, MoCA & Custom Neuro Forms',
        serviceName: 'Cognitive Assessment',
        condition: 'Cognitive Impairment',
        parentSlug: 'eeg-reports',
        parentCat: 'Neurology',
        canonical: 'https://www.medical365.in/cognitive-assessment',
        boost: `<p>Medical365 Cognitive Assessment Software includes standardized tools like MMSE, MoCA, CDR, and GPCOG — all embedded within the patient EMR for seamless neurological evaluation. Results auto-generate structured reports, track cognitive decline over time, and flag patients requiring urgent review. Fully ABDM compliant and designed for Indian neurology and psychiatry clinics.</p>`
    },
    {
        file: 'antenatal-care-records.html',
        title: 'Antenatal Care Records Software India | OB/GYN EMR | Medical365',
        desc: 'Medical365 Antenatal Care Records manage pregnancy visits, ultrasound reports & delivery planning. ABDM compliant OB/GYN EMR for India. Book free demo today.',
        keywords: 'antenatal care records software, pregnancy tracking EMR India, OB GYN software India, maternity EMR, ABDM gynecology, Medical365',
        h1Append: ' — Pregnancy Visits & Delivery Planning',
        serviceName: 'Antenatal Care Records',
        condition: 'Pregnancy',
        parentSlug: 'delivery-records',
        parentCat: 'Gynecology',
        canonical: 'https://www.medical365.in/antenatal-care-records',
        boost: `<p>Medical365 Antenatal Care Records manage the complete pregnancy journey — from first booking visit to delivery planning. Each visit auto-populates weight, BP, fundal height, fetal heart rate, and lab values into structured trimester-wise records. Integrated with ultrasound reports, ABDM-compliant ABHA ID, and delivery records for India's most complete obstetric EMR.</p>`
    }
];

config.forEach(item => {
    let filePath = path.join(__dirname, item.file);
    if (!fs.existsSync(filePath)) {
        console.error("File not found: " + item.file);
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove old schema blocks in <head> safely by finding everything up to </head>
    let headEnd = content.indexOf('</head>');
    if (headEnd !== -1) {
        let headContent = content.substring(0, headEnd);
        let newHeadContent = headContent.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');
        content = content.replace(headContent, newHeadContent);
    }

    // Replace Title
    content = content.replace(/<title>.*?<\/title>/is, '<title>' + item.title + '</title>');

    // Replace Meta Description
    if (content.match(/<meta name="description" content="[^"]*"/is)) {
        content = content.replace(/<meta name="description" content="[^"]*"/is, '<meta name="description" content="' + item.desc + '"');
    } else {
        content = content.replace(/<title>/, '<meta name="description" content="' + item.desc + '" />\n    <title>');
    }

    // Replace Meta Keywords
    if (content.match(/<meta name="keywords" content="[^"]*"/is)) {
        content = content.replace(/<meta name="keywords" content="[^"]*"/is, '<meta name="keywords" content="' + item.keywords + '"');
    } else {
        content = content.replace(/<title>/, '<meta name="keywords" content="' + item.keywords + '" />\n    <title>');
    }
    
    // Replace OG tags if they exist
    if (content.match(/<meta property="og:title" content="[^"]*"/i)) {
        content = content.replace(/<meta property="og:title" content="[^"]*"/i, '<meta property="og:title" content="' + item.title + '"');
    } else {
        content = content.replace(/<title>/, '<meta property="og:title" content="' + item.title + '" />\n    <title>');
    }
    
    if (content.match(/<meta property="og:description" content="[^"]*"/i)) {
        content = content.replace(/<meta property="og:description" content="[^"]*"/i, '<meta property="og:description" content="' + item.desc + '"');
    } else {
        content = content.replace(/<title>/, '<meta property="og:description" content="' + item.desc + '" />\n    <title>');
    }

    let allSchema = `
    <!-- 4 JSON-LD Schema Blocks -->
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
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "name": "${item.title}",
      "url": "${item.canonical}",
      "description": "${item.desc}",
      "about": {
        "@type": "MedicalCondition",
        "name": "${item.condition}"
      },
      "audience": {
        "@type": "MedicalAudience",
        "audienceType": "Clinician"
      },
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
          "name": "Specialty Care EHR",
          "item": "https://www.medical365.in/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "${item.parentCat}",
          "item": "https://www.medical365.in/${item.parentSlug}"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "${item.serviceName}",
          "item": "${item.canonical}"
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
          "name": "Is your software fully compliant with Indian healthcare laws?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Medical365 acts as a highly secure, ABDM-compliant vault for patient data. We strictly adhere to the DPDP Act 2023 and the EHR Standards designated by the MoHFW in India."
          }
        },
        {
          "@type": "Question",
          "name": "Do you provide on-site deployment and training?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. While our platform is completely cloud-based, our specialized regional deployment teams visit facilities to assist with onboarding, data migration, and on-the-ground staff training."
          }
        },
        {
          "@type": "Question",
          "name": "What if our internet connection drops mid-consultation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can continue providing uninterrupted care. Our offline-first sync engine caches data locally and pushes it to the master servers automatically the moment your internet connection is restored."
          }
        }
      ]
    }
    </script>
    `;

    // Inject Schemas before </head>
    content = content.replace('</head>', allSchema + '\n</head>');

    // H1 Append
    let h1Regex = /<h1([^>]*)>(.*?)<\/h1>/i;
    let h1Match = content.match(h1Regex);
    if (h1Match && !h1Match[2].includes(item.h1Append.trim())) {
        let newH1 = "<h1" + h1Match[1] + ">" + h1Match[2] + item.h1Append + "</h1>";
        content = content.replace(h1Regex, newH1);
    }

    // Canonical
    let canonicalTag = '<link rel="canonical" href="' + item.canonical + '" />';
    if (content.match(/<link[^>]*rel=["']canonical["'][^>]*>/i)) {
        content = content.replace(/<link[^>]*rel=["']canonical["'][^>]*>/ig, canonicalTag);
    } else {
        content = content.replace('</head>', canonicalTag + '\n</head>');
    }

    // Ensure only 1 canonical
    let canons = content.match(/<link[^>]*rel=["']canonical["'][^>]*>/ig);
    if(canons && canons.length > 1) {
        content = content.replace(/<link[^>]*rel=["']canonical["'][^>]*>/ig, '');
        content = content.replace('</head>', canonicalTag + '\n</head>');
    }

    // Content Boost
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
