const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// Title verification - ensure it's exact
let newTitle = '<title>Medical365 | #1 Hospital Management Software India | ABDM & NABH Compliant</title>';
content = content.replace(/<title>.*?<\/title>/is, newTitle);

// Add missing meta tags
const metaTags = `
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
<meta http-equiv="content-language" content="en-IN" />
<meta name="geo.region" content="IN-RJ" />
<meta name="geo.placename" content="Jaipur, Rajasthan, India" />
<meta name="geo.position" content="26.9124;75.7873" />
<meta name="ICBM" content="26.9124, 75.7873" />
<meta property="og:locale" content="en_IN" />
<meta property="og:site_name" content="Medical365" />
<meta name="twitter:site" content="@medical_365" />
<meta name="twitter:creator" content="@medical_365" />
`;

// Simple check so we don't duplicate
if (!content.includes('name="geo.region" content="IN-RJ"')) {
    content = content.replace('</head>', metaTags + '\n</head>');
}

const orgSchema = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Medical365",
  "alternateName": "Medical365 by Chonexa Technologies",
  "url": "https://www.medical365.in",
  "logo": "https://www.medical365.in/medical365logo1.png",
  "description": "India's #1 ABDM compliant Hospital Management Software for hospitals, clinics and multi-specialty facilities.",
  "telephone": "+91-77919-10007",
  "email": "teammedical365@gmail.com",
  "foundingDate": "2020",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Malviya Nagar",
    "addressLocality": "Jaipur",
    "addressRegion": "Rajasthan",
    "postalCode": "302017",
    "addressCountry": "IN"
  },
  "areaServed": "IN",
  "sameAs": [
    "https://www.linkedin.com/in/medical-hms-612628405/",
    "https://x.com/medical_365",
    "https://www.facebook.com/medical365HMS/",
    "https://www.youtube.com/@Medical365-HMS",
    "https://www.instagram.com/medical365_hms/"
  ]
}
</script>
`;

if (!content.includes('"@type": "Organization"')) {
    content = content.replace('</head>', orgSchema + '\n</head>');
}

const webSiteSchema = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
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
}
</script>
`;

if (!content.includes('"@type": "WebSite"')) {
    content = content.replace('</head>', webSiteSchema + '\n</head>');
}

fs.writeFileSync(indexPath, content, 'utf8');
console.log('Updated index.html successfully!');
