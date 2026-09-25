import re
from pathlib import Path

index_path = Path("index.html")
content = index_path.read_text(encoding="utf-8")

# Let's replace the head section from </style> (after btn-pricing) down to </head>
target_head_pattern = r'</style>\s*<!-- Deferred Styles -->.*?</head>'

new_head_content = """</style>

    <!-- Primary Stylesheets -->
    <link rel="stylesheet" href="global-styles.css?v=4.5">
    <link rel="stylesheet" href="redesign.css?v=1.2">

    <title>Medical365 | #1 Hospital Management Software India | ABDM & NABH Compliant</title>
    <meta name="description" content="Streamline clinical workflows with Medical365's cloud-based HMS and EMR platform. Fully ABDM & DPDP Act 2023 compliant solutions for hospitals in Rajasthan.">
    <meta name="keywords" content="Hospital Management System, EMR Software Rajasthan, ABDM Compliant HMS, Clinic Management Software Jaipur, Cloud-based Healthcare SaaS">
    <meta name="author" content="Medical365">
    
    <!-- Open Graph & Social -->
    <meta property="og:title" content="Medical365 | #1 Hospital Management Software India | ABDM & NABH Compliant">
    <meta property="og:description" content="Discover Medical365's cloud-based hospital management system, EMR, ABDM APIs, and clinical workflows for healthcare providers in India.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.medical365.in/">
    <meta property="og:image" content="https://www.medical365.in/medical365logo1.png">
    <meta property="og:locale" content="en_IN">
    <meta property="og:site_name" content="Medical365">
    
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@medical_365">
    <meta name="twitter:creator" content="@medical_365">
    <meta name="twitter:title" content="Medical365 | #1 Hospital Management Software India | ABDM & NABH Compliant">
    <meta name="twitter:description" content="Discover Medical365's cloud-based hospital management system, EMR, ABDM APIs, and clinical workflows for healthcare providers in India.">
    <meta name="twitter:image" content="https://www.medical365.in/medical365logo1.png">

    <!-- AI Search & LLM Engine Optimization (AEO / GEO) -->
    <link rel="alternate" type="text/markdown" title="LLM Context Summary" href="/llms.txt">
    <link rel="alternate" type="text/markdown" title="Full LLM Knowledge Base" href="/llms-full.txt">

    <!-- Geo Meta Tags for Local Authority -->
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
    <meta http-equiv="content-language" content="en-IN">
    <meta name="geo.region" content="IN-RJ">
    <meta name="geo.placename" content="Jaipur, Rajasthan, India">
    <meta name="geo.position" content="26.8532;75.8052">
    <meta name="ICBM" content="26.8532, 75.8052">

    <style>
        /* Essential Section-Specific Overrides */
        .roi-section p {
            color: #ffffff !important;
            opacity: 0.95 !important;
            font-weight: 600 !important;
        }

        .process-steps .step-card div[style*="width: 60px"] {
            background-color: #1D5A9F !important;
            color: #ffffff !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            font-weight: 800 !important;
        }

        .stat-card div[style*="color: #37B39C"] {
            color: #37B39C !important;
        }

        .br-desktop { display: block; }
        @media (max-width: 768px) { .br-desktop { display: inline; } }
    </style>
    <script src="global-scripts.js?v=4.8" defer></script>

    <!-- Comprehensive JSON-LD Knowledge Graph (Software + Organization + LocalBusiness + FAQ + WebSite) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "SoftwareApplication",
          "@id": "https://www.medical365.in/#software",
          "name": "Medical365 Hospital & Clinic Management System",
          "operatingSystem": "Web, Cloud, Android, iOS",
          "applicationCategory": "HealthcareApplication, BusinessApplication",
          "applicationSubCategory": "Hospital Information Management System (HIMS) & Electronic Health Records (EHR)",
          "description": "Cloud-based, ABDM-compliant Hospital Information Management System and EMR software for Indian hospitals and clinics.",
          "featureList": [
            "ABDM Milestones M1, M2, M3 Integration",
            "Specialty EMR & Clinical Documentation",
            "Revenue Cycle Management & GST Invoicing",
            "OPD Token Queue & Appointment Booking",
            "LIMS & Pathology Lab Automation",
            "Hospital Pharmacy & Inventory Management",
            "Offline-First Hybrid Local Sync Engine"
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "240",
            "bestRating": "5",
            "worstRating": "1"
          },
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock"
          }
        },
        {
          "@type": "Organization",
          "@id": "https://www.medical365.in/#organization",
          "name": "Medical365",
          "url": "https://www.medical365.in",
          "logo": "https://www.medical365.in/medical365logo1.png",
          "email": "info@medical365.in",
          "telephone": "+917791910007",
          "sameAs": [
            "https://www.facebook.com/medical365.in",
            "https://www.linkedin.com/in/medical-hms-612628405/"
          ],
          "knowsAbout": [
            "Ayushman Bharat Digital Mission (ABDM)",
            "Electronic Medical Records (EMR)",
            "Hospital Information System (HIS)",
            "Digital Personal Data Protection Act (DPDP Act 2023)",
            "NABH Accreditation Compliance",
            "Ministry of Health and Family Welfare (MoHFW) EHR Standards"
          ]
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://www.medical365.in/#localbusiness",
          "name": "Medical365 Healthcare Solutions",
          "description": "India's leading cloud-based hospital management system and EMR platform headquartered in Jaipur.",
          "image": "https://www.medical365.in/medical365logo1.png",
          "telephone": "+917791910007",
          "priceRange": "₹₹",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Bhamashah Techno Hub, Sansthan Path, Jhalana Gram, Malviya Nagar",
            "addressLocality": "Jaipur",
            "addressRegion": "Rajasthan",
            "postalCode": "302017",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 26.8532,
            "longitude": 75.8052
          },
          "areaServed": [
            {"@type": "Country", "name": "India"},
            {"@type": "State", "name": "Rajasthan"},
            {"@type": "City", "name": "Jaipur"},
            {"@type": "City", "name": "Jodhpur"},
            {"@type": "City", "name": "Udaipur"},
            {"@type": "City", "name": "Kota"},
            {"@type": "City", "name": "Ajmer"},
            {"@type": "City", "name": "Bikaner"}
          ],
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "09:00",
            "closes": "18:30"
          }
        },
        {
          "@type": "WebSite",
          "@id": "https://www.medical365.in/#website",
          "name": "Medical365",
          "url": "https://www.medical365.in",
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://www.medical365.in/?s={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.medical365.in/"
            }
          ]
        },
        {
          "@type": "FAQPage",
          "@id": "https://www.medical365.in/#faq",
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
      ]
    }
    </script>
</head>"""

updated_content, count = re.subn(target_head_pattern, new_head_content, content, flags=re.DOTALL)
if count > 0:
    index_path.write_text(updated_content, encoding="utf-8")
    print("Successfully updated index.html head & schema!")
else:
    print("Pattern not found, checking...")
