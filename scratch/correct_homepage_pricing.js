const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
console.log('=== CHECKING AND CORRECTING PRICING SECTION ON HOME PAGE (index.html) ===');

const indexPath = path.join(repoRoot, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Fix navigation link from pricing.html to /pricing
if (html.includes('href="pricing.html" class="nav-item"')) {
    html = html.replace('href="pricing.html" class="nav-item"', 'href="/pricing" class="nav-item"');
    console.log('Updated header nav pricing link to clean canonical /pricing.');
}

// 2. Add Pricing Switcher CSS to <head><style>
const switcherCss = `
    /* Home Page Zero-Latency Plan Switcher */
    .pricing-switcher-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 30px auto 40px;
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

if (!html.includes('.pricing-switcher-wrapper')) {
    html = html.replace('</style>', switcherCss + '\n    </style>');
    console.log('Injected Pricing Switcher CSS into index.html <style>.');
}

// 3. Build Clean & Corrected Pricing Section
const newPricingSection = `    <section class="pricing-section" id="pricing">
        <div class="container">
            <div class="pricing-header">
                <h2>Transparent, Predictable Pricing</h2>
                <p>Choose the perfect plan for your healthcare facility. Built for India, compliant with ABDM and DPDP.</p>
            </div>

            <!-- Interactive Zero-Latency Plan Switcher -->
            <div class="pricing-switcher-wrapper">
                <div class="pricing-switcher" role="tablist" aria-label="Billing frequency toggle">
                    <button type="button" class="switch-btn active" id="home-btn-annual" role="tab" aria-selected="true" aria-controls="pricing">
                        Billed Annually <span class="discount-pill">Save 50%</span>
                    </button>
                    <button type="button" class="switch-btn" id="home-btn-monthly" role="tab" aria-selected="false" aria-controls="pricing">
                        Billed Monthly
                    </button>
                </div>
            </div>

            <div class="pricing-grid">
                <!-- Plan 1 -->
                <div class="pricing-card">
                    <div class="badge-offer">50% SPECIAL OFF</div>
                    <h3 class="plan-name">Starter Plan</h3>
                    <p class="plan-desc">Optimized for individual Doctors & Clinics.</p>
                    
                    <div class="plan-price-wrapper">
                        <div class="plan-price"><span>₹</span><span id="home-price-starter">6,000</span><span id="home-period-starter"> / Year</span></div>
                        <span class="plan-worth" id="home-worth-starter">Worth: ₹12,000</span>
                        <span class="plan-price-sub" id="home-sub-starter">₹500/month (billed annually)</span>
                    </div>

                    <ul class="plan-features">
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg> 1 Doctor Account</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg> 1 Receptionist Account</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg> Unlimited Patients</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg> All Facilities Included*</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg> Dedicated Support</li>
                    </ul>

                    <div class="digital-addon-box" style="margin: 20px 0; padding: 14px; background: rgba(26, 86, 219, 0.04); border: 1px dashed rgba(26, 86, 219, 0.25); border-radius: 12px;">
                        <div style="font-size: 0.85rem; font-weight: 700; color: var(--brand-blue); display: flex; align-items: center; justify-content: space-between;">
                            <span>🌐 Digital Presence Add-On</span>
                            <span style="background: rgba(26,86,219,0.1); padding: 2px 8px; border-radius: 6px;">+ ₹5,000</span>
                        </div>
                        <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 6px 0 0; line-height: 1.4;">
                            Includes 5-page custom website, 1-yr hosting, .in domain, WhatsApp integration & on-page SEO.
                        </p>
                    </div>

                    <a href="https://www.medical365.in/book-demo" class="btn-pricing btn-pricing-outline">Get Started</a>
                </div>

                <!-- Plan 2 -->
                <div class="pricing-card popular">
                    <div class="badge-popular">Most Popular</div>
                    <div class="badge-offer">50% SPECIAL OFF</div>
                    <h3 class="plan-name">Clinic Basic</h3>
                    <p class="plan-desc">Optimized For Multi Doctors & Clinics.</p>
                    
                    <div class="plan-price-wrapper">
                        <div class="plan-price"><span>₹</span><span id="home-price-clinic">15,000</span><span id="home-period-clinic"> / Year</span></div>
                        <span class="plan-worth" id="home-worth-clinic">Worth: ₹30,000</span>
                        <span class="plan-price-sub" id="home-sub-clinic">₹1,250/month (billed annually)</span>
                    </div>

                    <ul class="plan-features">
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg> Up to 5 Doctor Accounts</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg> 4 Staff Accounts (Admin + Reception)</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg> Unlimited Patients</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg> All Facilities Included*</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg> Dedicated Support</li>
                    </ul>

                    <div class="digital-addon-box" style="margin: 20px 0; padding: 14px; background: rgba(26, 86, 219, 0.04); border: 1px dashed rgba(26, 86, 219, 0.25); border-radius: 12px;">
                        <div style="font-size: 0.85rem; font-weight: 700; color: var(--brand-blue); display: flex; align-items: center; justify-content: space-between;">
                            <span>🌐 Digital Presence Add-On</span>
                            <span style="background: rgba(26,86,219,0.1); padding: 2px 8px; border-radius: 6px;">+ ₹5,000</span>
                        </div>
                        <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 6px 0 0; line-height: 1.4;">
                            Includes 5-page custom website, 1-yr hosting, .in domain, WhatsApp integration & on-page SEO.
                        </p>
                    </div>

                    <a href="https://www.medical365.in/book-demo" class="btn-pricing btn-pricing-primary">Get Started</a>
                </div>

                <!-- Plan 3 -->
                <div class="pricing-card">
                    <div class="badge-offer">50% SPECIAL OFF</div>
                    <h3 class="plan-name">Multi-Specialty Starter</h3>
                    <p class="plan-desc">Optimized For Multi-Specialty Hospitals & Diagnostic Centers.</p>
                    
                    <div class="plan-price-wrapper">
                        <div class="plan-price"><span>₹</span><span id="home-price-multi">30,000</span><span id="home-period-multi"> / Year</span></div>
                        <span class="plan-worth" id="home-worth-multi">Worth: ₹60,000</span>
                        <span class="plan-price-sub" id="home-sub-multi">₹2,500/month (billed annually)</span>
                    </div>

                    <ul class="plan-features">
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg> Up to 15 Doctor Accounts</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg> Up to 25 Staff Accounts</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg> 1 Branch Location</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg> All Facilities Included*</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg> Dedicated Support</li>
                    </ul>

                    <div class="digital-addon-box" style="margin: 20px 0; padding: 14px; background: rgba(26, 86, 219, 0.04); border: 1px dashed rgba(26, 86, 219, 0.25); border-radius: 12px;">
                        <div style="font-size: 0.85rem; font-weight: 700; color: var(--brand-blue); display: flex; align-items: center; justify-content: space-between;">
                            <span>🌐 Digital Presence Add-On</span>
                            <span style="background: rgba(26,86,219,0.1); padding: 2px 8px; border-radius: 6px;">+ ₹5,000</span>
                        </div>
                        <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 6px 0 0; line-height: 1.4;">
                            Includes 5-page custom website, 1-yr hosting, .in domain, WhatsApp integration & on-page SEO.
                        </p>
                    </div>

                    <a href="https://www.medical365.in/book-demo" class="btn-pricing btn-pricing-outline">Get Started</a>
                </div>
            </div>

            <div class="view-full-pricing">
                <a href="/pricing" class="btn-primary" style="display: inline-block; padding: 14px 36px; border-radius: 50px; text-decoration: none; font-weight: 700;">View Full Pricing Details & Enterprise Plans →</a>
            </div>
        </div>
    </section>`;

// Replace existing pricing section
const sectionStart = html.indexOf('<section class="pricing-section" id="pricing">');
const sectionEnd = html.indexOf('</section>', sectionStart) + '</section>'.length;

if (sectionStart !== -1 && sectionEnd !== -1) {
    html = html.substring(0, sectionStart) + newPricingSection + html.substring(sectionEnd);
    console.log('Replaced pricing section in index.html with corrected, structured section.');
}

// 4. Add Zero-Latency JavaScript Engine for Home Page
const homeSwitcherJs = `
  <script>
    // Zero-Latency Android Plan Switcher Engine for Home Page
    (function() {
        var btnAnnual = document.getElementById('home-btn-annual');
        var btnMonthly = document.getElementById('home-btn-monthly');
        if (!btnAnnual || !btnMonthly) return;

        var priceStarter = document.getElementById('home-price-starter');
        var periodStarter = document.getElementById('home-period-starter');
        var worthStarter = document.getElementById('home-worth-starter');
        var subStarter = document.getElementById('home-sub-starter');

        var priceClinic = document.getElementById('home-price-clinic');
        var periodClinic = document.getElementById('home-period-clinic');
        var worthClinic = document.getElementById('home-worth-clinic');
        var subClinic = document.getElementById('home-sub-clinic');

        var priceMulti = document.getElementById('home-price-multi');
        var periodMulti = document.getElementById('home-period-multi');
        var worthMulti = document.getElementById('home-worth-multi');
        var subMulti = document.getElementById('home-sub-multi');

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

if (!html.includes('Zero-Latency Android Plan Switcher Engine for Home Page')) {
    html = html.replace('</body>', homeSwitcherJs + '\n</body>');
    console.log('Injected Zero-Latency Plan Switcher JS into index.html.');
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('=== HOME PAGE PRICING SECTION CHECK & CORRECTION COMPLETE ===');
