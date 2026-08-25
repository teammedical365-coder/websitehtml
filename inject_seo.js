const fs = require('fs');
const path = require('path');

const targetFile = 'C:/Users/USER/Downloads/website medical365 html-main/websitehtml-main/healthcare-digital-marketing-services-rajasthan.html';
const seoContentFile = 'C:/Users/USER/Downloads/website medical365 html-main/websitehtml-main/seo_content.html';

const htmlContent = fs.readFileSync(targetFile, 'utf8');
const seoContent = fs.readFileSync(seoContentFile, 'utf8');

// The hero-section ends with:
//         </div>
//     </section>
// We want to insert our SEO content after this exact `</section>`.
// To be safe, we'll split at the string `<section class="hero-section">`
// Then find its closing `</section>`.

const parts = htmlContent.split('<section class="hero-section">');
if (parts.length > 1) {
    const afterHeroStart = parts[1];
    
    // Find the first </section> in afterHeroStart
    const sectionEndIndex = afterHeroStart.indexOf('</section>');
    
    if (sectionEndIndex !== -1) {
        const fullEndIndex = sectionEndIndex + '</section>'.length;
        
        const newHtmlContent = parts[0] + '<section class="hero-section">' + 
            afterHeroStart.substring(0, fullEndIndex) + 
            '\n\n<!-- SEO Content Added by Script -->\n' + seoContent + '\n' +
            afterHeroStart.substring(fullEndIndex);
            
        fs.writeFileSync(targetFile, newHtmlContent, 'utf8');
        console.log('Successfully injected SEO content.');
    } else {
        console.error('Could not find closing </section>');
    }
} else {
    console.error('Could not find <section class="hero-section">');
}
