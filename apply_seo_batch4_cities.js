const fs = require('fs');
const path = require('path');

const cityMap = {
    'jaipur': { name: 'Jaipur', lat: '26.9124', lng: '75.7873' },
    'jodhpur': { name: 'Jodhpur', lat: '26.2389', lng: '73.0243' },
    'udaipur': { name: 'Udaipur', lat: '24.5854', lng: '73.7125' },
    'kota': { name: 'Kota', lat: '25.2138', lng: '75.8648' },
    'ajmer': { name: 'Ajmer', lat: '26.4499', lng: '74.6399' },
    'bikaner': { name: 'Bikaner', lat: '28.0229', lng: '73.3119' },
    'bhilwara': { name: 'Bhilwara', lat: '25.3407', lng: '74.6313' },
    'alwar': { name: 'Alwar', lat: '27.5530', lng: '76.6346' },
    'sikar': { name: 'Sikar', lat: '27.6094', lng: '75.1399' },
    'pali': { name: 'Pali', lat: '25.7711', lng: '73.3234' },
    'bharatpur': { name: 'Bharatpur', lat: '27.2152', lng: '77.4935' },
    'sri-ganganagar': { name: 'Sri Ganganagar', lat: '29.9094', lng: '73.8771' },
    'mansarovar-jaipur': { name: 'Mansarovar', lat: '26.8467', lng: '75.7520' },
    'vaishali-nagar-jaipur': { name: 'Vaishali Nagar', lat: '26.9200', lng: '75.7390' },
    'malviya-nagar-jaipur': { name: 'Malviya Nagar', lat: '26.8627', lng: '75.8245' },
    'c-scheme-jaipur': { name: 'C-Scheme', lat: '26.9115', lng: '75.7950' },
    'raja-park-jaipur': { name: 'Raja Park', lat: '26.9050', lng: '75.8270' },
    'jagatpura-jaipur': { name: 'Jagatpura', lat: '26.7810', lng: '75.8680' },
    'tonk-road-jaipur': { name: 'Tonk Road', lat: '26.8430', lng: '75.8130' },
    'bapu-nagar-jaipur': { name: 'Bapu Nagar', lat: '26.8900', lng: '75.8100' },
    'jhotwara-jaipur': { name: 'Jhotwara', lat: '26.9700', lng: '75.7700' },
    'vidyadhar-nagar-jaipur': { name: 'Vidyadhar Nagar', lat: '26.9390', lng: '75.7860' }
};

const dirPath = __dirname;
const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.html'));

function titleCase(str) {
    return str.toLowerCase().split('-').map(word => {
        if(word === 'hmis' || word === 'hms' || word === 'emr' || word === 'ehr') return word.toUpperCase();
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}

files.forEach(file => {
    let matchedCityKey = null;
    let serviceSlug = null;
    
    // Sort keys by length descending to match longest suffix first (e.g. mansarovar-jaipur before jaipur)
    let cityKeys = Object.keys(cityMap).sort((a,b) => b.length - a.length);

    for (let key of cityKeys) {
        if (file.endsWith(`-${key}.html`)) {
            matchedCityKey = key;
            serviceSlug = file.replace(`-${key}.html`, '');
            break;
        }
    }

    if (matchedCityKey) {
        let city = cityMap[matchedCityKey];
        let serviceName = titleCase(serviceSlug);
        let filePath = path.join(dirPath, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        let modified = false;

        // Meta tags for Geo
        const geoTags = `
    <!-- Geo Tags -->
    <meta name="geo.region" content="IN-RJ" />
    <meta name="geo.placename" content="${city.name}, Rajasthan, India" />
    <meta name="geo.position" content="${city.lat};${city.lng}" />
    <meta name="ICBM" content="${city.lat}, ${city.lng}" />`;
        
        if (!content.includes('geo.placename" content="' + city.name)) {
            if (content.includes('<meta name="geo.region"')) {
                // If it already has geo tags but maybe wrong ones, let's remove existing geo tags
                content = content.replace(/<meta name="geo\.region"[^>]*>\n?/gi, '');
                content = content.replace(/<meta name="geo\.placename"[^>]*>\n?/gi, '');
                content = content.replace(/<meta name="geo\.position"[^>]*>\n?/gi, '');
                content = content.replace(/<meta name="ICBM"[^>]*>\n?/gi, '');
            }
            content = content.replace('</head>', geoTags + '\n</head>');
            modified = true;
        }

        let descMatch = content.match(/<meta name="description" content="([^"]+)"/i);
        let correctDesc = descMatch ? descMatch[1] : '';
        
        let canonMatch = content.match(/<link rel="canonical" href="([^"]+)"/i);
        let canonicalUrl = canonMatch ? canonMatch[1] : `https://www.medical365.in/${file.replace('.html','')}`;

        // Inject Schema
        const schema = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Medical365 — ${serviceName} in ${city.name}",
      "@id": "${canonicalUrl}",
      "url": "${canonicalUrl}",
      "telephone": "+91-77919-10007",
      "priceRange": "₹₹",
      "image": "https://www.medical365.in/medical365logo1.png",
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
        "latitude": ${city.lat},
        "longitude": ${city.lng}
      },
      "areaServed": {
        "@type": "City",
        "name": "${city.name}"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      "serviceType": "${serviceName}"
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Medical365 — ${serviceName}",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web, Android, iOS",
      "url": "${canonicalUrl}",
      "description": "${correctDesc.replace(/"/g, '\\"')}",
      "offers": {
        "@type": "Offer",
        "price": "6000",
        "priceCurrency": "INR"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "500",
        "bestRating": "5"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Medical365",
        "url": "https://www.medical365.in"
      }
    }
    </script>`;
        
        if (!content.includes(`"name": "Medical365 — ${serviceName} in ${city.name}"`)) {
            // Check if there are already schemas in the head? 
            // The prompt says "Add LocalBusiness schema", "Add SoftwareApplication schema".
            content = content.replace('</head>', schema + '\n</head>');
            modified = true;
        }

        // Fix twitter tags if they still have old values (though Part A handled this, good to be safe)
        let titleMatch = content.match(/<title>([^<]+)<\/title>/i);
        let correctTitle = titleMatch ? titleMatch[1] : null;

        if (correctDesc) {
            if (content.match(/<meta name="twitter:description" content="Discover Medical365's[^"]*"/i)) {
                content = content.replace(/<meta name="twitter:description" content="Discover Medical365's[^"]*"/gi, 
                    '<meta name="twitter:description" content="' + correctDesc + '"');
                modified = true;
            }
        }
        if (correctTitle) {
            let twitterTitleMatch = content.match(/<meta name="twitter:title" content="([^"]+)"/i);
            if (twitterTitleMatch) {
                let twitterTitle = twitterTitleMatch[1];
                if (twitterTitle.includes('| Medical365') && twitterTitle !== correctTitle) {
                    content = content.replace(/<meta name="twitter:title" content="[^"]+"/gi, 
                        '<meta name="twitter:title" content="' + correctTitle + '"');
                    modified = true;
                }
            }
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log("Processed city page: " + file);
        }
    }
});
