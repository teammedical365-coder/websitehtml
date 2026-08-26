const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

function extractSections($) {
    const seoBlock = $('.seo-content-block');
    if (!seoBlock.length) return null;
    seoBlock.removeAttr('style');

    let execSummaryHtml = '';
    let coreFeaturesHtml = '';
    let localImpactHtml = '';
    let faqHtml = '';

    let currentSection = 'execSummary'; 
    let flatChildren = [];
    seoBlock.children().each((i, el) => {
        if ($(el).is('div') && !$(el).hasClass('container') && !$(el).hasClass('seo-faq-item')) {
            let hasFaqItems = $(el).find('.seo-faq-item').length > 0;
            if (hasFaqItems) {
                $(el).children().each((j, child) => flatChildren.push(child));
            } else {
                $(el).children().each((j, child) => flatChildren.push(child));
            }
        } else {
            flatChildren.push(el);
        }
    });

    for (let el of flatChildren) {
        let text = $(el).text().toLowerCase();
        
        if ($(el).is('h2')) {
            if (text.includes('feature') || text.includes('benefit') || text.includes('core')) {
                currentSection = 'coreFeatures';
                continue;
            } else if (text.includes('local') || text.includes('impact') || text.includes('rajasthan') || text.includes('jaipur') || text.includes('jodhpur') || text.includes('kota')) {
                currentSection = 'localImpact';
                continue;
            } else if (text.includes('faq') || text.includes('frequent') || text.includes('question')) {
                currentSection = 'faq';
                continue;
            }
        } else if ($(el).is('h3') && currentSection === 'execSummary') {
             if (text.includes('feature') || text.includes('benefit') || text.includes('core')) {
                currentSection = 'coreFeatures';
                continue;
            } else if (text.includes('local') || text.includes('impact') || text.includes('rajasthan') || text.includes('jaipur') || text.includes('jodhpur') || text.includes('kota')) {
                currentSection = 'localImpact';
                continue;
            } else if (text.includes('faq') || text.includes('frequent') || text.includes('question')) {
                currentSection = 'faq';
                continue;
            }
        }

        $(el).removeAttr('style');
        $(el).find('*').removeAttr('style');

        if (currentSection === 'execSummary' && (!$(el).is('h2') && !$(el).is('h1')) && !$(el).is('style')) execSummaryHtml += $.html(el);
        if (currentSection === 'coreFeatures') coreFeaturesHtml += $.html(el);
        if (currentSection === 'localImpact') localImpactHtml += $.html(el);
        if (currentSection === 'faq') faqHtml += $.html(el);
    }
    
    const faqPairs = [];
    if (faqHtml) {
        const $f = cheerio.load(`<div>${faqHtml}</div>`);
        let faqItems = $f('.seo-faq-item, .faq-item');
        if (faqItems.length > 0) {
            faqItems.each((i, el) => {
                let q = $f(el).find('.seo-faq-question, .faq-question, h3, strong').first().text().replace(/^[Q0-9]+\.\s*/, '').trim();
                let a = $f(el).find('.seo-faq-answer, .faq-answer, p').last().html();
                if (!a) a = $f(el).text().replace(q, '').trim(); 
                if (q) faqPairs.push({q, a});
            });
        } else {
            let currentQ = '';
            let currentA = '';
            $f('div').children().each((i, el) => {
                if ($(el).is('h3') || $(el).is('h4') || ($(el).find('strong').length > 0 && $(el).text().includes('?'))) {
                    if (currentQ) faqPairs.push({q: currentQ, a: currentA});
                    currentQ = $(el).text().replace(/^[Q0-9]+\.\s*/, '').trim();
                    currentA = '';
                } else {
                    currentA += $.html(el);
                }
            });
            if (currentQ) faqPairs.push({q: currentQ, a: currentA});
        }
    }

    return { execSummaryHtml, coreFeaturesHtml, localImpactHtml, faqPairs, originalEl: seoBlock };
}

let count = 0;
files.forEach(file => {
    const fullPath = path.join(__dirname, file);
    if (!fs.existsSync(fullPath)) return;
    
    let html = fs.readFileSync(fullPath, 'utf8');
    const $ = cheerio.load(html);
    
    const extracted = extractSections($);
    if (!extracted) return;

    const imageList = [
        "images/medical365-hospital-management-software-jaipur.jpg",
        "images/medical365-hospital-management-software-agra.jpg",
        "images/medical365-hospital-management-software-delhi.jpg",
        "images/medical365-hospital-management-software-ahmedabad.jpg"
    ];
    const randomImg = imageList[Math.floor(Math.random() * imageList.length)];

    let newHtml = `
<style>
.seo-modern-wrapper { font-family: 'Plus Jakarta Sans', sans-serif; color: #334155; }
.seo-exec-summary { display: flex; flex-wrap: wrap; gap: 40px; margin-bottom: 60px; align-items: center; }
.seo-exec-text { flex: 1 1 500px; font-size: 1.1rem; line-height: 1.8; }
.seo-exec-text p { margin-bottom: 20px; }
.seo-exec-image { flex: 1 1 400px; }
.seo-exec-image img { width: 100%; border-radius: 15px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
.seo-features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-bottom: 60px; }
.seo-feature-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); transition: transform 0.2s, box-shadow 0.2s; }
.seo-feature-card:hover { transform: translateY(-5px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); border-color: #37B39C; }
.seo-feature-card h3, .seo-feature-card strong { color: #1e3a8a; display: block; font-size: 1.25rem; margin-top: 0; margin-bottom: 10px; }
.seo-feature-card svg { color: #37B39C; width: 32px; height: 32px; margin-bottom: 15px; }
.seo-local-impact { background: #f8fafc; border-left: 5px solid #37B39C; padding: 30px 40px; border-radius: 0 12px 12px 0; margin-bottom: 60px; font-size: 1.1rem; line-height: 1.8; }
.seo-local-impact h3 { color: #1e3a8a; font-size: 1.5rem; margin-top: 30px; margin-bottom: 15px; }
.seo-faq-accordion details { background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 15px; overflow: hidden; }
.seo-faq-accordion summary { font-weight: 700; font-size: 1.1rem; padding: 20px; cursor: pointer; background: #f8fafc; color: #1e3a8a; list-style: none; position: relative; }
.seo-faq-accordion summary::-webkit-details-marker { display: none; }
.seo-faq-accordion summary::after { content: '+'; position: absolute; right: 20px; top: 50%; transform: translateY(-50%); font-size: 1.5rem; color: #37B39C; }
.seo-faq-accordion details[open] summary::after { content: '-'; }
.seo-faq-accordion .faq-answer { padding: 20px; border-top: 1px solid #e2e8f0; color: #475569; line-height: 1.7; }
.seo-section-title { color: #1e3a8a; font-size: 2rem; font-weight: 800; margin-bottom: 30px; }
</style>

<div class="seo-modern-wrapper">
    <div class="seo-exec-summary">
        <div class="seo-exec-text">
            ${extracted.execSummaryHtml}
        </div>
        <div class="seo-exec-image">
            <img src="${randomImg}" alt="Medical Software interface">
        </div>
    </div>

    <h2 class="seo-section-title">Core Features & Benefits</h2>
    <div class="seo-features-grid">
`;

    if (extracted.coreFeaturesHtml) {
        const $f = cheerio.load(`<div>${extracted.coreFeaturesHtml}</div>`);
        let featureBlocks = [];
        
        if ($f('li').length > 0) {
            $f('li').each((i, el) => {
                let html = $f(el).html();
                let strong = $f(el).find('strong').text();
                if (strong && html) {
                    html = html.replace(`<strong>${strong}</strong>`, `<h3>${strong}</h3><p>`) + '</p>';
                }
                featureBlocks.push(html);
            });
        } else {
            let currentBlock = '';
            $f('div').children().each((i, el) => {
                if ($(el).is('h3')) {
                    if (currentBlock) featureBlocks.push(currentBlock);
                    currentBlock = $.html(el);
                } else {
                    currentBlock += $.html(el);
                }
            });
            if (currentBlock) featureBlocks.push(currentBlock);
        }

        if (featureBlocks.length === 0) {
            newHtml += `<div class="seo-feature-card" style="grid-column: 1 / -1;">${extracted.coreFeaturesHtml}</div>`;
        } else {
            featureBlocks.forEach(block => {
                let cleanBlock = block.replace(/o"/g, '').replace(/•/g, '').replace(/✔/g, '');
                newHtml += `
                <div class="seo-feature-card">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    ${cleanBlock}
                </div>`;
            });
        }
    }

    newHtml += `
    </div>

    <h2 class="seo-section-title">Local Healthcare Impact</h2>
    <div class="seo-local-impact">
        ${extracted.localImpactHtml}
    </div>
`;

    extracted.originalEl.html(newHtml + '</div>');
    
    let nativeFaqSection = $('.faq-section .faq-grid');
    if (nativeFaqSection.length && extracted.faqPairs.length > 0) {
        let replacementHtml = '';
        extracted.faqPairs.forEach(pair => {
            replacementHtml += `
            <div class="faq-item">
                <h4>${pair.q} <span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></span></h4>
                <div style="display:none;" class="faq-answer-content"><p>${pair.a}</p></div>
            </div>`;
        });
        nativeFaqSection.html(replacementHtml);
    } else if (extracted.faqPairs.length > 0) {
        let fallbackHtml = `<h2 class="seo-section-title">Frequently Asked Questions</h2><div class="seo-faq-accordion">`;
        extracted.faqPairs.forEach(pair => {
            fallbackHtml += `
            <details>
                <summary>${pair.q}</summary>
                <div class="faq-answer">${pair.a}</div>
            </details>`;
        });
        fallbackHtml += `</div>`;
        extracted.originalEl.append(fallbackHtml);
    }

    try {
        fs.writeFileSync(fullPath, $.html(), 'utf8');
        count++;
    } catch(e) {
        console.error('Failed to write ' + file, e.message);
    }
});
console.log(`Successfully upgraded ${count} files!`);
