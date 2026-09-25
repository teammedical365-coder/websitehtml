const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
console.log('=== FIXING: HIDING 50% SPECIAL OFF ON MONTHLY PLAN ===');

// 1. Update pricing.html
const pricingPath = path.join(repoRoot, 'pricing.html');
let pricingHtml = fs.readFileSync(pricingPath, 'utf8');

const oldPricingJs = `                if (priceMulti) priceMulti.textContent = '30,000';
                if (periodMulti) periodMulti.textContent = ' / Year';
                if (worthMulti) worthMulti.style.display = 'inline-block';
                if (subMulti) subMulti.textContent = '₹2,500/month (billed annually)';
            } else {`;

const newPricingJs = `                if (priceMulti) priceMulti.textContent = '30,000';
                if (periodMulti) periodMulti.textContent = ' / Year';
                if (worthMulti) worthMulti.style.display = 'inline-block';
                if (subMulti) subMulti.textContent = '₹2,500/month (billed annually)';

                // Show 50% OFF badges only on Annual Plan
                var offerBadges = document.querySelectorAll('#full-pricing .pricing-card .badge-offer');
                offerBadges.forEach(function(b) {
                    if (b.textContent.includes('OFF')) b.style.display = 'inline-block';
                });
            } else {`;

const oldPricingMonthlyJs = `                if (priceMulti) priceMulti.textContent = '5,000';
                if (periodMulti) periodMulti.textContent = ' / Month';
                if (worthMulti) worthMulti.style.display = 'none';
                if (subMulti) subMulti.textContent = 'Flexible monthly billing';
            }`;

const newPricingMonthlyJs = `                if (priceMulti) priceMulti.textContent = '5,000';
                if (periodMulti) periodMulti.textContent = ' / Month';
                if (worthMulti) worthMulti.style.display = 'none';
                if (subMulti) subMulti.textContent = 'Flexible monthly billing';

                // Hide 50% OFF badges on Monthly Plan
                var offerBadges = document.querySelectorAll('#full-pricing .pricing-card .badge-offer');
                offerBadges.forEach(function(b) {
                    if (b.textContent.includes('OFF')) b.style.display = 'none';
                });
            }`;

if (pricingHtml.includes(oldPricingJs) && pricingHtml.includes(oldPricingMonthlyJs)) {
    pricingHtml = pricingHtml.replace(oldPricingJs, newPricingJs).replace(oldPricingMonthlyJs, newPricingMonthlyJs);
    fs.writeFileSync(pricingPath, pricingHtml, 'utf8');
    console.log('Updated pricing.html switcher JS to toggle 50% OFF badge visibility.');
} else {
    console.log('Could not find exact JS block in pricing.html');
}

// 2. Update index.html
const indexPath = path.join(repoRoot, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

const oldIndexJs = `                if (priceMulti) priceMulti.textContent = '30,000';
                if (periodMulti) periodMulti.textContent = ' / Year';
                if (worthMulti) worthMulti.style.display = 'inline-block';
                if (subMulti) subMulti.textContent = '₹2,500/month (billed annually)';
            } else {`;

const newIndexJs = `                if (priceMulti) priceMulti.textContent = '30,000';
                if (periodMulti) periodMulti.textContent = ' / Year';
                if (worthMulti) worthMulti.style.display = 'inline-block';
                if (subMulti) subMulti.textContent = '₹2,500/month (billed annually)';

                // Show 50% OFF badges only on Annual Plan
                var offerBadges = document.querySelectorAll('#pricing .pricing-card .badge-offer');
                offerBadges.forEach(function(b) {
                    if (b.textContent.includes('OFF')) b.style.display = 'inline-block';
                });
            } else {`;

const oldIndexMonthlyJs = `                if (priceMulti) priceMulti.textContent = '5,000';
                if (periodMulti) periodMulti.textContent = ' / Month';
                if (worthMulti) worthMulti.style.display = 'none';
                if (subMulti) subMulti.textContent = 'Flexible monthly billing';
            }`;

const newIndexMonthlyJs = `                if (priceMulti) priceMulti.textContent = '5,000';
                if (periodMulti) periodMulti.textContent = ' / Month';
                if (worthMulti) worthMulti.style.display = 'none';
                if (subMulti) subMulti.textContent = 'Flexible monthly billing';

                // Hide 50% OFF badges on Monthly Plan
                var offerBadges = document.querySelectorAll('#pricing .pricing-card .badge-offer');
                offerBadges.forEach(function(b) {
                    if (b.textContent.includes('OFF')) b.style.display = 'none';
                });
            }`;

if (indexHtml.includes(oldIndexJs) && indexHtml.includes(oldIndexMonthlyJs)) {
    indexHtml = indexHtml.replace(oldIndexJs, newIndexJs).replace(oldIndexMonthlyJs, newIndexMonthlyJs);
    fs.writeFileSync(indexPath, indexHtml, 'utf8');
    console.log('Updated index.html switcher JS to toggle 50% OFF badge visibility.');
} else {
    console.log('Could not find exact JS block in index.html');
}

console.log('=== COMPLETE ===');
