const fs = require('fs');

function removePricingFrom(file) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    
    // The exact text we are looking for
    const startMarker = '<section class="pricing-section" id="pricing">';
    
    let startIndex = content.indexOf(startMarker);
    
    if (startIndex !== -1) {
        // We need to find the matching </section>
        // It's followed by a footer or another section, so let's find the end of this section.
        let tempStr = content.substring(startIndex);
        // The section has an id="pricing".
        // In seo_template.html, the end was right before '<footer id="mega-footer"'. Let's see if that's true for index and blogs.
        let footerIndex = tempStr.indexOf('<footer');
        let nextSectionIndex = tempStr.indexOf('<section', 10);
        
        let endIndex = -1;
        if (footerIndex !== -1 && nextSectionIndex !== -1) {
            endIndex = Math.min(footerIndex, nextSectionIndex);
        } else if (footerIndex !== -1) {
            endIndex = footerIndex;
        } else if (nextSectionIndex !== -1) {
            endIndex = nextSectionIndex;
        }
        
        if (endIndex !== -1) {
            let actualEndIndex = startIndex + endIndex;
            // Go back slightly to grab any preceding whitespaces, but it's okay to just remove the exact chunk
            let sectionToRemove = content.substring(startIndex, actualEndIndex);
            
            // Just double check it contains "Scalable Pricing" to ensure we're deleting the right one
            if (sectionToRemove.includes('Scalable Pricing')) {
                content = content.replace(sectionToRemove, '');
                fs.writeFileSync(file, content);
                console.log(`Successfully removed old pricing from ${file}`);
            } else {
                console.log(`Found a pricing section in ${file}, but it wasn't the old 'Scalable Pricing' one! Skipping.`);
            }
        }
    } else {
        console.log(`No pricing section found in ${file}`);
    }
}

removePricingFrom('index.html');
removePricingFrom('blogs.html');
