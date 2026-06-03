const fs = require('fs');
const path = require('path');

const dirPath = __dirname;
const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.html'));

function titleCase(str) {
    return str.toLowerCase().split('-').map(word => {
        if(word === 'hmis' || word === 'hms' || word === 'emr' || word === 'ehr' || word === 'opd' || word === 'ipd') return word.toUpperCase();
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}

let processedCount = 0;

files.forEach(file => {
    let filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // If it doesn't have SoftwareApplication schema, process it
    if (!content.includes('"@type": "SoftwareApplication"')) {
        let modified = false;
        
        let canonMatch = content.match(/<link rel="canonical" href="([^"]+)"/i);
        let canonicalUrl = canonMatch ? canonMatch[1] : `https://www.medical365.in/${file.replace('.html','')}`;
        
        let descMatch = content.match(/<meta name="description" content="([^"]+)"/i);
        let correctDesc = descMatch ? descMatch[1] : '';

        // Derive a service name from the filename
        let serviceName = titleCase(file.replace('.html', ''));

        // 1. Add minimal SoftwareApplication schema
        const schema = `
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
        
        if (!content.includes('"@type": "SoftwareApplication"')) {
            content = content.replace('</head>', schema + '\n</head>');
            modified = true;
        }

        // 2. Add geo tags if missing (fallback to Jaipur/Rajasthan for bulk pages)
        const geoTags = `
    <!-- Geo Tags -->
    <meta name="geo.region" content="IN-RJ" />
    <meta name="geo.placename" content="Jaipur, Rajasthan, India" />
    <meta name="geo.position" content="26.9124;75.7873" />
    <meta name="ICBM" content="26.9124, 75.7873" />`;
        
        if (!content.includes('geo.region')) {
            content = content.replace('</head>', geoTags + '\n</head>');
            modified = true;
        }

        // 3. Just to be absolutely certain OG tags are fixed for these files
        let titleMatch = content.match(/<title>([^<]+)<\/title>/i);
        let trueTitle = titleMatch ? titleMatch[1] : null;

        if (correctDesc) {
            if (content.match(/<meta property="og:description" content="Discover Medical365's[^"]*"/i)) {
                content = content.replace(/<meta property="og:description" content="Discover Medical365's[^"]*"/gi, 
                    '<meta property="og:description" content="' + correctDesc + '"');
                modified = true;
            }
            if (content.match(/<meta name="twitter:description" content="Discover Medical365's[^"]*"/i)) {
                content = content.replace(/<meta name="twitter:description" content="Discover Medical365's[^"]*"/gi, 
                    '<meta name="twitter:description" content="' + correctDesc + '"');
                modified = true;
            }
        }

        if (trueTitle) {
            let ogTitleMatch = content.match(/<meta property="og:title" content="([^"]+)"/i);
            if (ogTitleMatch) {
                let ogTitle = ogTitleMatch[1];
                if (ogTitle !== trueTitle) {
                    content = content.replace(/<meta property="og:title" content="[^"]+"/gi, 
                        '<meta property="og:title" content="' + trueTitle + '"');
                    modified = true;
                }
            }
            let twitterTitleMatch = content.match(/<meta name="twitter:title" content="([^"]+)"/i);
            if (twitterTitleMatch) {
                let twitterTitle = twitterTitleMatch[1];
                if (twitterTitle !== trueTitle) {
                    content = content.replace(/<meta name="twitter:title" content="[^"]+"/gi, 
                        '<meta name="twitter:title" content="' + trueTitle + '"');
                    modified = true;
                }
            }
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            processedCount++;
        }
    }
});

console.log(`Bulk processed ${processedCount} remaining files.`);
