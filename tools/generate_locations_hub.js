const fs = require('fs');
const path = require('path');

const dir = __dirname;

// Read about.html to extract common header & footer
const aboutHtml = fs.readFileSync(path.join(dir, 'about.html'), 'utf8');

// Extract header and footer
const headerMatch = aboutHtml.match(/(<!-- Google Tag Manager[\s\S]*?<header[\s\S]*?<\/header>)/i);
const footerMatch = aboutHtml.match(/(<footer[\s\S]*?<\/html>)/i);

const headerHtml = headerMatch ? headerMatch[1] : '';
const footerHtml = footerMatch ? footerMatch[1] : '</body></html>';

const cityCategories = [
  {
    region: 'Tier 1 & Metros',
    icon: '🏙️',
    description: 'Leading healthcare software for multispecialty hospitals & clinics across India’s major metropolitan hubs.',
    cities: [
      { name: 'Delhi NCR', slug: 'delhi' },
      { name: 'Mumbai', slug: 'mumbai' },
      { name: 'Bengaluru', slug: 'bengaluru' },
      { name: 'Hyderabad', slug: 'hyderabad' },
      { name: 'Chennai', slug: 'chennai' },
      { name: 'Kolkata', slug: 'kolkata' },
      { name: 'Pune', slug: 'pune' },
      { name: 'Ahmedabad', slug: 'ahmedabad' }
    ]
  },
  {
    region: 'Rajasthan Cities & Healthcare Hubs',
    icon: '🏛️',
    description: 'Cloud-based ABDM & DPDP compliant hospital software for Rajasthan’s premier medical institutions.',
    cities: [
      { name: 'Jaipur', slug: 'jaipur' },
      { name: 'Jodhpur', slug: 'jodhpur' },
      { name: 'Udaipur', slug: 'udaipur' },
      { name: 'Kota', slug: 'kota' },
      { name: 'Ajmer', slug: 'ajmer' },
      { name: 'Bikaner', slug: 'bikaner' },
      { name: 'Alwar', slug: 'alwar' },
      { name: 'Sikar', slug: 'sikar' },
      { name: 'Bhilwara', slug: 'bhilwara' },
      { name: 'Sri Ganganagar', slug: 'sri-ganganagar' },
      { name: 'Pali', slug: 'pali' },
      { name: 'Bharatpur', slug: 'bharatpur' }
    ]
  },
  {
    region: 'Jaipur Localities & Sub-Zones',
    icon: '📍',
    description: 'Hyper-localized EMR and clinic automation systems for doctors across Jaipur districts.',
    cities: [
      { name: 'Mansarovar', slug: 'mansarovar' },
      { name: 'Vaishali Nagar', slug: 'vaishali-nagar' },
      { name: 'Malviya Nagar', slug: 'malviya-nagar' },
      { name: 'C-Scheme', slug: 'c-scheme' },
      { name: 'Tonk Road', slug: 'tonk-road' },
      { name: 'Jagatpura', slug: 'jagatpura' },
      { name: 'Raja Park', slug: 'raja-park' },
      { name: 'Jhotwara', slug: 'jhotwara' },
      { name: 'Vidyadhar Nagar', slug: 'vidyadhar-nagar' },
      { name: 'Bapu Nagar', slug: 'bapu-nagar' }
    ]
  },
  {
    region: 'North & Central India',
    icon: '🏥',
    description: 'Enterprise hospital information management systems for leading regional clinical centers.',
    cities: [
      { name: 'Lucknow', slug: 'lucknow' },
      { name: 'Kanpur', slug: 'kanpur' },
      { name: 'Agra', slug: 'agra' },
      { name: 'Bhopal', slug: 'bhopal' },
      { name: 'Indore', slug: 'indore' },
      { name: 'Chandigarh', slug: 'chandigarh' },
      { name: 'Dehradun', slug: 'dehradun' },
      { name: 'Ludhiana', slug: 'ludhiana' }
    ]
  },
  {
    region: 'East, West & South India',
    icon: '🌐',
    description: 'Modern hospital automation, ABHA compliance, and telemedicine software for healthcare providers.',
    cities: [
      { name: 'Patna', slug: 'patna' },
      { name: 'Ranchi', slug: 'ranchi' },
      { name: 'Bhubaneswar', slug: 'bhubaneswar' },
      { name: 'Guwahati', slug: 'guwahati' },
      { name: 'Kochi', slug: 'kochi' },
      { name: 'Coimbatore', slug: 'coimbatore' },
      { name: 'Visakhapatnam', slug: 'visakhapatnam' },
      { name: 'Surat', slug: 'surat' },
      { name: 'Vadodara', slug: 'vadodara' },
      { name: 'Nagpur', slug: 'nagpur' },
      { name: 'Nashik', slug: 'nashik' },
      { name: 'Rajkot', slug: 'rajkot' }
    ]
  }
];

const keyModules = [
  { prefix: 'hospital-management-software', label: 'Hospital Management (HMS)' },
  { prefix: 'emr-software', label: 'Electronic Medical Records (EMR)' },
  { prefix: 'clinic-management-system', label: 'Clinic Management System' },
  { prefix: 'abha-compliance-software', label: 'ABHA Compliance Software' },
  { prefix: 'lims-laboratory-information-management', label: 'LIMS & Lab Automation' },
  { prefix: 'hospital-bed-management-software', label: 'Bed & IPD Management' },
  { prefix: 'telemedicine-platform', label: 'Telemedicine Platform' },
  { prefix: 'revenue-cycle-management', label: 'Revenue Cycle Management' }
];

let hubHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="canonical" href="https://www.medical365.in/locations">
    <title>Locations & Regional Healthcare Solutions | Medical365 India</title>
    <meta name="description" content="Explore Medical365's ABDM-compliant Hospital Management Software, EMR, and Clinic Management solutions across 50+ Indian cities and medical hubs.">
    <meta name="keywords" content="Hospital Management Software India, EMR Software Delhi, HMS Jaipur, Clinic Software Mumbai, ABHA Software Bengaluru, Medical365 Locations">
    <link rel="stylesheet" href="/global-styles.css?v=4.5">
    <link rel="icon" type="image/jpeg" href="/medical365fav.jpg">

    <!-- Schema Markup -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "name": "Medical365 Healthcare Software Locations Across India",
      "url": "https://www.medical365.in/locations",
      "description": "Directory of Medical365 cloud hospital management, clinic, and EMR software across Indian cities.",
      "publisher": {
        "@type": "Organization",
        "name": "Medical365",
        "url": "https://www.medical365.in",
        "logo": "https://www.medical365.in/medical365logo1.png"
      }
    }
    </script>

    <style>
        :root {
            --primary-blue: #1A56DB;
            --primary-teal: #0D9488;
            --text-dark: #0F172A;
            --text-muted: #475569;
            --bg-light: #F8FAFC;
            --card-border: #E2E8F0;
        }
        body { font-family: 'Inter', system-ui, -apple-system, sans-serif; background: var(--bg-light); color: var(--text-dark); margin: 0; padding-top: 88px; }
        .hero-hub { background: linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%); color: #fff; padding: 70px 24px 80px; text-align: center; }
        .hero-hub h1 { font-size: clamp(2.2rem, 5vw, 3.4rem); font-weight: 800; margin-bottom: 16px; letter-spacing: -0.02em; }
        .hero-hub p { font-size: 1.2rem; max-width: 780px; margin: 0 auto 30px; color: #E2E8F0; line-height: 1.6; }
        .badge-pill { display: inline-block; background: rgba(59, 130, 246, 0.25); border: 1px solid rgba(147, 197, 253, 0.4); color: #93C5FD; padding: 6px 18px; border-radius: 50px; font-weight: 600; font-size: 0.9rem; margin-bottom: 20px; }
        
        .container-hub { max-width: 1300px; margin: -40px auto 80px; padding: 0 20px; }
        .region-card { background: #fff; border-radius: 16px; border: 1px solid var(--card-border); box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.05); padding: 36px 32px; margin-bottom: 40px; }
        .region-header { display: flex; align-items: center; gap: 14px; margin-bottom: 12px; }
        .region-icon { font-size: 2rem; }
        .region-title { font-size: 1.6rem; font-weight: 700; color: var(--text-dark); margin: 0; }
        .region-desc { color: var(--text-muted); font-size: 1rem; margin-bottom: 28px; }
        
        .city-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
        .city-box { background: #F8FAFC; border: 1px solid var(--card-border); border-radius: 12px; padding: 20px; transition: all 0.2s ease-in-out; }
        .city-box:hover { transform: translateY(-3px); border-color: var(--primary-blue); box-shadow: 0 8px 20px rgba(26, 86, 219, 0.08); background: #FFFFFF; }
        .city-name { font-size: 1.15rem; font-weight: 700; color: var(--primary-blue); margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; }
        .city-links { list-style: none; padding: 0; margin: 0; font-size: 0.9rem; line-height: 1.8; }
        .city-links a { color: var(--text-muted); text-decoration: none; transition: color 0.15s; }
        .city-links a:hover { color: var(--primary-teal); font-weight: 600; text-decoration: underline; }
        
        .cta-banner { background: linear-gradient(135deg, var(--primary-blue), var(--primary-teal)); color: #fff; border-radius: 16px; padding: 48px; text-align: center; margin-top: 50px; }
        .cta-banner h2 { font-size: 2rem; font-weight: 800; margin-bottom: 14px; }
        .cta-banner p { font-size: 1.1rem; max-width: 650px; margin: 0 auto 28px; opacity: 0.95; }
        .btn-cta { background: #FFFFFF; color: var(--primary-blue); padding: 14px 34px; font-weight: 700; border-radius: 10px; text-decoration: none; display: inline-block; box-shadow: 0 4px 14px rgba(0,0,0,0.15); }
    </style>
</head>
<body>
`;

// Insert the site header
hubHtml += `
    <header class="main-header" style="position: fixed; top: 0; width: 100%; background: #fff; z-index: 10000; border-bottom: 1px solid rgba(226, 232, 240, 0.6);">
        <div class="header-container" style="max-width: 1400px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; height: 88px;">
            <a href="/" style="display: flex; align-items: center; gap: 10px; text-decoration: none;">
                <img src="/medical365logo1.png" alt="Medical365 Logo" style="height: 44px; width: auto;">
            </a>
            <nav style="display: flex; gap: 24px; align-items: center;">
                <a href="/" style="text-decoration: none; color: #1E293B; font-weight: 600;">Home</a>
                <a href="/hospitals" style="text-decoration: none; color: #1E293B; font-weight: 600;">Hospitals</a>
                <a href="/clinics" style="text-decoration: none; color: #1E293B; font-weight: 600;">Clinics</a>
                <a href="/emr" style="text-decoration: none; color: #1E293B; font-weight: 600;">EMR</a>
                <a href="/pricing" style="text-decoration: none; color: #1E293B; font-weight: 600;">Pricing</a>
                <a href="/locations" style="text-decoration: none; color: #1A56DB; font-weight: 700; border-bottom: 2px solid #1A56DB;">Locations</a>
                <a href="/book-demo" style="background: linear-gradient(135deg, #1A56DB, #0D9488); color: #fff; padding: 10px 22px; border-radius: 8px; text-decoration: none; font-weight: 600;">Book Demo</a>
            </nav>
        </div>
    </header>

    <div class="hero-hub">
        <span class="badge-pill">Nationwide Coverage & ABDM Infrastructure</span>
        <h1>Medical365 Regional Healthcare Directory</h1>
        <p>Explore India's most advanced cloud Hospital Management Software (HMS), EMR, ABHA Integration, and Clinic Management systems across leading medical districts.</p>
    </div>

    <div class="container-hub">
`;

// Render city clusters
cityCategories.forEach(cat => {
  hubHtml += `
        <div class="region-card">
            <div class="region-header">
                <span class="region-icon">${cat.icon}</span>
                <h2 class="region-title">${cat.region}</h2>
            </div>
            <p class="region-desc">${cat.description}</p>
            <div class="city-grid">
  `;

  cat.cities.forEach(city => {
    hubHtml += `
                <div class="city-box">
                    <div class="city-name">
                        <span>${city.name}</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                    <ul class="city-links">
    `;
    
    keyModules.forEach(mod => {
      const slug = `${mod.prefix}-${city.slug}`;
      hubHtml += `                        <li><a href="/${slug}">• ${mod.label} in ${city.name}</a></li>\n`;
    });

    hubHtml += `
                    </ul>
                </div>
    `;
  });

  hubHtml += `
            </div>
        </div>
  `;
});

hubHtml += `
        <div class="cta-banner">
            <h2>Ready to Digitize Your Clinic or Hospital?</h2>
            <p>Join hundreds of doctors and healthcare facilities across India powered by Medical365's cloud EMR & HMS.</p>
            <a href="/book-demo" class="btn-cta">Schedule a Free Live Demo</a>
        </div>
    </div>
`;

// Append Footer
if (footerHtml) {
  hubHtml += footerHtml;
} else {
  hubHtml += `</body></html>`;
}

fs.writeFileSync(path.join(dir, 'locations.html'), hubHtml, 'utf8');
console.log('Successfully created locations.html hub directory.');
