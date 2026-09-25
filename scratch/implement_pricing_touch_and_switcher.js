const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
console.log('=== IMPLEMENTING ZERO-LATENCY PLAN SWITCHER ON /pricing ===');

// 1. Update global-styles.css for universal Android touch latency elimination
const globalStylesPath = path.join(repoRoot, 'global-styles.css');
let globalCss = fs.readFileSync(globalStylesPath, 'utf8');

const touchOptimizationCss = `
/* ==========================================================================
   Zero Android Touch Latency & Mobile Tap Optimization (Core Web Vitals INP)
   ========================================================================== */
html {
    touch-action: manipulation;
}

button, 
a, 
input, 
select, 
textarea, 
label,
[role="button"], 
[role="tab"],
.btn, 
.btn-pricing,
.tab-btn, 
.mobile-toggle,
.solutions-toggle {
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
}
`;

if (!globalCss.includes('Zero Android Touch Latency')) {
    globalCss = touchOptimizationCss + '\n' + globalCss;
    fs.writeFileSync(globalStylesPath, globalCss, 'utf8');
    console.log('Added universal Android touch optimization to global-styles.css.');
}

// 2. Update pricing.html
const pricingPath = path.join(repoRoot, 'pricing.html');
let pricingHtml = fs.readFileSync(pricingPath, 'utf8');

// A. Insert Switcher CSS into <style>
const switcherCss = `
    /* Plan Switcher Styling & Zero-Latency Touch */
    .pricing-switcher-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto 40px;
      padding: 0 16px;
    }
    .pricing-switcher {
      display: inline-flex;
      background: #e2e8f0;
      padding: 6px;
      border-radius: 9999px;
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.06);
      position: relative;
      touch-action: manipulation;
    }
    .switch-btn {
      border: none;
      background: transparent;
      padding: 12px 28px;
      border-radius: 9999px;
      font-size: 1rem;
      font-weight: 600;
      color: #475569;
      transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
      display: inline-flex;
      align-items: center;
      gap: 10px;
      outline: none;
      cursor: pointer;
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
      -webkit-user-select: none;
    }
    .switch-btn.active {
      background: #1A56DB;
      color: #ffffff;
      box-shadow: 0 4px 14px rgba(26, 86, 219, 0.28);
    }
    .discount-pill {
      background: #10b981;
      color: #ffffff;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 9999px;
      letter-spacing: 0.02em;
      transition: background 0.15s ease, color 0.15s ease;
    }
    .switch-btn.active .discount-pill {
      background: #ffffff;
      color: #047857;
    }
    .plan-price-sub {
      font-size: 0.85rem;
      color: #64748b;
      margin-top: 6px;
      display: block;
      font-weight: 500;
    }
    .btn-pricing {
      touch-action: manipulation !important;
      -webkit-tap-highlight-color: transparent !important;
    }
`;

if (!pricingHtml.includes('.pricing-switcher-wrapper')) {
    pricingHtml = pricingHtml.replace('</style>', switcherCss + '\n  </style>');
    console.log('Injected Plan Switcher CSS into pricing.html.');
}

// B. Insert Switcher HTML inside section#full-pricing right before the pricing-grid
const switcherHtml = `
            <!-- Interactive Zero-Latency Plan Switcher -->
            <div class="pricing-switcher-wrapper">
                <div class="pricing-switcher" role="tablist" aria-label="Billing frequency toggle">
                    <button type="button" class="switch-btn active" id="btn-annual" role="tab" aria-selected="true" aria-controls="full-pricing">
                        Billed Annually <span class="discount-pill">Save 50%</span>
                    </button>
                    <button type="button" class="switch-btn" id="btn-monthly" role="tab" aria-selected="false" aria-controls="full-pricing">
                        Billed Monthly
                    </button>
                </div>
            </div>
`;

if (!pricingHtml.includes('pricing-switcher-wrapper') && pricingHtml.includes('<div class="pricing-grid"')) {
    pricingHtml = pricingHtml.replace('<div class="pricing-grid"', switcherHtml + '\n            <div class="pricing-grid"');
    console.log('Injected Plan Switcher HTML into pricing.html.');
}

// C. Update Prices in Cards to dynamic elements
// Starter Plan
const oldStarter = `<div class="plan-price"><span>₹</span>6,000<span> / Year</span></div>\n                        <span class="plan-worth">Worth: ₹12,000</span>`;
const newStarter = `<div class="plan-price"><span>₹</span><span id="price-starter">6,000</span><span id="period-starter"> / Year</span></div>
                        <span class="plan-worth" id="worth-starter">Worth: ₹12,000</span>
                        <span class="plan-price-sub" id="sub-starter">₹500/month (billed annually)</span>`;
if (pricingHtml.includes(oldStarter)) {
    pricingHtml = pricingHtml.replace(oldStarter, newStarter);
    console.log('Updated Starter Plan price wrapper.');
}

// Clinic Basic
const oldClinic = `<div class="plan-price"><span>₹</span>15,000<span> / Year</span></div>\n                        <span class="plan-worth">Worth: ₹30,000</span>`;
const newClinic = `<div class="plan-price"><span>₹</span><span id="price-clinic">15,000</span><span id="period-clinic"> / Year</span></div>
                        <span class="plan-worth" id="worth-clinic">Worth: ₹30,000</span>
                        <span class="plan-price-sub" id="sub-clinic">₹1,250/month (billed annually)</span>`;
if (pricingHtml.includes(oldClinic)) {
    pricingHtml = pricingHtml.replace(oldClinic, newClinic);
    console.log('Updated Clinic Basic price wrapper.');
}

// Multi-Specialty
const oldMulti = `<div class="plan-price"><span>₹</span>30,000<span> / Year</span></div>\n                        <span class="plan-worth">Worth: ₹60,000</span>`;
const newMulti = `<div class="plan-price"><span>₹</span><span id="price-multi">30,000</span><span id="period-multi"> / Year</span></div>
                        <span class="plan-worth" id="worth-multi">Worth: ₹60,000</span>
                        <span class="plan-price-sub" id="sub-multi">₹2,500/month (billed annually)</span>`;
if (pricingHtml.includes(oldMulti)) {
    pricingHtml = pricingHtml.replace(oldMulti, newMulti);
    console.log('Updated Multi-Specialty price wrapper.');
}

// D. Add Zero-Latency JavaScript Engine
const switcherJs = `
  <script>
    // Zero-Latency Android Plan Switcher Engine
    (function() {
        var btnAnnual = document.getElementById('btn-annual');
        var btnMonthly = document.getElementById('btn-monthly');
        if (!btnAnnual || !btnMonthly) return;

        var priceStarter = document.getElementById('price-starter');
        var periodStarter = document.getElementById('period-starter');
        var worthStarter = document.getElementById('worth-starter');
        var subStarter = document.getElementById('sub-starter');

        var priceClinic = document.getElementById('price-clinic');
        var periodClinic = document.getElementById('period-clinic');
        var worthClinic = document.getElementById('worth-clinic');
        var subClinic = document.getElementById('sub-clinic');

        var priceMulti = document.getElementById('price-multi');
        var periodMulti = document.getElementById('period-multi');
        var worthMulti = document.getElementById('worth-multi');
        var subMulti = document.getElementById('sub-multi');

        function switchBilling(mode) {
            if (mode === 'annual') {
                btnAnnual.classList.add('active');
                btnAnnual.setAttribute('aria-selected', 'true');
                btnMonthly.classList.remove('active');
                btnMonthly.setAttribute('aria-selected', 'false');

                if (priceStarter) priceStarter.textContent = '6,000';
                if (periodStarter) periodStarter.textContent = ' / Year';
                if (worthStarter) worthStarter.style.display = 'inline-block';
                if (subStarter) subStarter.textContent = '₹500/month (billed annually)';

                if (priceClinic) priceClinic.textContent = '15,000';
                if (periodClinic) periodClinic.textContent = ' / Year';
                if (worthClinic) worthClinic.style.display = 'inline-block';
                if (subClinic) subClinic.textContent = '₹1,250/month (billed annually)';

                if (priceMulti) priceMulti.textContent = '30,000';
                if (periodMulti) periodMulti.textContent = ' / Year';
                if (worthMulti) worthMulti.style.display = 'inline-block';
                if (subMulti) subMulti.textContent = '₹2,500/month (billed annually)';
            } else {
                btnMonthly.classList.add('active');
                btnMonthly.setAttribute('aria-selected', 'true');
                btnAnnual.classList.remove('active');
                btnAnnual.setAttribute('aria-selected', 'false');

                if (priceStarter) priceStarter.textContent = '1,000';
                if (periodStarter) periodStarter.textContent = ' / Month';
                if (worthStarter) worthStarter.style.display = 'none';
                if (subStarter) subStarter.textContent = 'Flexible monthly billing';

                if (priceClinic) priceClinic.textContent = '2,500';
                if (periodClinic) periodClinic.textContent = ' / Month';
                if (worthClinic) worthClinic.style.display = 'none';
                if (subClinic) subClinic.textContent = 'Flexible monthly billing';

                if (priceMulti) priceMulti.textContent = '5,000';
                if (periodMulti) periodMulti.textContent = ' / Month';
                if (worthMulti) worthMulti.style.display = 'none';
                if (subMulti) subMulti.textContent = 'Flexible monthly billing';
            }
        }

        // Fast pointerdown event fires with 0ms latency on Android
        btnAnnual.addEventListener('pointerdown', function() {
            switchBilling('annual');
        }, { passive: true });

        btnMonthly.addEventListener('pointerdown', function() {
            switchBilling('monthly');
        }, { passive: true });

        // Standard click listener for keyboard and screen-readers
        btnAnnual.addEventListener('click', function(e) {
            e.preventDefault();
            switchBilling('annual');
        });

        btnMonthly.addEventListener('click', function(e) {
            e.preventDefault();
            switchBilling('monthly');
        });
    })();
  </script>
`;

if (!pricingHtml.includes('Zero-Latency Android Plan Switcher Engine')) {
    pricingHtml = pricingHtml.replace('</body>', switcherJs + '\n</body>');
    console.log('Injected Zero-Latency Plan Switcher JS into pricing.html.');
}

fs.writeFileSync(pricingPath, pricingHtml, 'utf8');
console.log('=== PRICING PLAN SWITCHER & TOUCH LATENCY FIX COMPLETE ===');
