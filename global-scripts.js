function initGlobalScripts() {
    if (window.__globalScriptsInitialized) return;
    window.__globalScriptsInitialized = true;

    /* Confirm successful script load to prevent fallback */
    window.__animationsInitialized = true;
    document.documentElement.classList.add('js-ready');

    /* ── sticky header + body padding sync ── */
    var header = document.getElementById('main-header');
    var ticking = false;
    function syncPadding() {
        if (header) document.body.style.paddingTop = header.offsetHeight + 'px';
    }
    syncPadding();
    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(function () {
                if (header) header.classList.toggle('scrolled', window.scrollY > 20);
                syncPadding();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    window.addEventListener('resize', syncPadding, { passive: true });

    /* ── FAQ Accordion ── */
    var faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function(item) {
        item.addEventListener('click', function() {
            var isActive = this.classList.contains('active');
            faqItems.forEach(function(faq) { faq.classList.remove('active'); });
            if (!isActive) {
                this.classList.add('active');
            }
        });
    });

    /* ── mega-menu desktop tabs + mobile accordion ── */
    var tabBtns  = document.querySelectorAll('.tab-btn');
    var tabPanes = document.querySelectorAll('.tab-pane');

    /* clone desktop pane HTML into mobile accordion slots (once) */
    tabBtns.forEach(function (btn) {
        var tid  = btn.getAttribute('data-target');
        var orig = document.getElementById(tid);
        if (orig && !document.getElementById('mobile-' + tid)) {
            var cl = document.createElement('div');
            cl.className = 'mobile-accordion-pane';
            cl.id = 'mobile-' + tid;
            cl.innerHTML = orig.innerHTML;
            btn.insertAdjacentElement('afterend', cl);
        }
        /* start with none active on mobile */
        if (window.innerWidth < 1200) btn.classList.remove('active');
    });

    /* --- VANILLA JS SLIDE UP / DOWN ANIMATIONS --- */
    var slideUp = function (target, duration) {
        if (duration === undefined) duration = 300;
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.boxSizing = 'border-box';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight; // trigger reflow
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(function () {
            target.style.display = 'none';
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('active');
        }, duration);
    };

    var slideDown = function (target, duration) {
        if (duration === undefined) duration = 300;
        target.style.removeProperty('display');
        var display = window.getComputedStyle(target).display;
        if (display === 'none') display = 'block';
        target.style.display = display;
        var height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight; // trigger reflow
        target.style.boxSizing = 'border-box';
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(function () {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.add('active');
        }, duration);
    };

    function switchTab(btn) {
        var mob = window.innerWidth < 1200;
        var tid = btn.getAttribute('data-target');
        
        if (mob) {
            var pane = document.getElementById('mobile-' + tid);
            var wasActive = btn.classList.contains('active');
            
            // 1. Close all currently open sibling tabs/panes
            tabBtns.forEach(function (b) {
                if (b !== btn && b.classList.contains('active')) {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                    var otherPane = document.getElementById('mobile-' + b.getAttribute('data-target'));
                    if (otherPane && otherPane.style.display !== 'none') {
                        slideUp(otherPane, 300);
                    }
                }
            });

            // 2. Toggle the clicked one
            if (wasActive) {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
                if (pane) slideUp(pane, 300);
            } else {
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
                if (pane) slideDown(pane, 300);
            }

        } else {
            // Desktop logic remains untouched
            tabBtns.forEach(function (b) {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            tabPanes.forEach(function (p) { p.classList.remove('active'); });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            var dp = document.getElementById(tid);
            if (dp) dp.classList.add('active');
        }
    }

    tabBtns.forEach(function (btn) {
        btn.addEventListener('mouseenter', function () {
            if (window.innerWidth >= 1200) switchTab(btn);
        });
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            if (window.innerWidth < 1200) {
                e.stopPropagation(); /* prevent bubbling to solutions-toggle */
                switchTab(btn);
            } else {
                switchTab(btn);
            }
        });
    });

    /* ── mobile drawer ── */
    var toggleBtn  = document.getElementById('mobile-toggle');
    var nav        = document.getElementById('main-nav');
    var overlay    = document.getElementById('mobile-overlay');
    var closeBtn   = document.getElementById('close-menu');
    var solBtn     = document.querySelector('.solutions-toggle');
    var megaMenu   = document.getElementById('mega-menu-content');
    var prevFocus  = null;

    function openMenu() {
        if (!nav) return;
        prevFocus = document.activeElement;
        nav.classList.add('active');
        if (overlay) { overlay.classList.add('active'); overlay.setAttribute('aria-hidden', 'false'); }
        document.body.classList.add('menu-open');
        document.body.style.overflow = 'hidden';
        if (toggleBtn) {
            toggleBtn.setAttribute('aria-expanded', 'true');
            toggleBtn.setAttribute('aria-label', 'Close navigation menu');
        }
        /* focus first item after slide completes */
        setTimeout(function () {
            var first = nav.querySelector('button:not([disabled]), a[href]');
            if (first) first.focus();
        }, 370);
    }

    function closeMenu() {
        if (!nav) return;
        nav.classList.remove('active');
        if (overlay) { overlay.classList.remove('active'); overlay.setAttribute('aria-hidden', 'true'); }
        document.body.classList.remove('menu-open');
        document.body.style.overflow = '';
        if (toggleBtn) {
            toggleBtn.setAttribute('aria-expanded', 'false');
            toggleBtn.setAttribute('aria-label', 'Open navigation menu');
        }
        /* collapse solutions accordion */
        if (megaMenu) megaMenu.classList.remove('active-mobile');
        if (solBtn)   solBtn.setAttribute('aria-expanded', 'false');
        /* collapse all tab accordions using slideUp so they reset cleanly */
        tabBtns.forEach(function (b) { 
            if(b.classList.contains('active')) {
                b.classList.remove('active'); 
                var tid = b.getAttribute('data-target');
                var pane = document.getElementById('mobile-' + tid);
                if (pane) slideUp(pane, 10); // close instantly on drawer close
            }
        });
        if (prevFocus) prevFocus.focus();
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', function(e) {
            if (e && e.preventDefault) e.preventDefault();
            if (nav && nav.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            if (e && e.preventDefault) e.preventDefault();
            closeMenu();
        });
    }
    if (overlay) {
        overlay.addEventListener('click', closeMenu);
        overlay.addEventListener('touchend', function(e) { e.preventDefault(); closeMenu(); });
        overlay.addEventListener('touchmove', function(e) { e.preventDefault(); }, { passive: false });
    }

    /* Escape key */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && nav && nav.classList.contains('active')) closeMenu();
    });

    /* focus trap */
    if (nav) {
        nav.addEventListener('keydown', function (e) {
            if (e.key !== 'Tab') return;
            var focusable = Array.prototype.slice.call(
                nav.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]')
            ).filter(function (el) { return el.offsetParent !== null; });
            if (!focusable.length) return;
            var first = focusable[0];
            var last  = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault(); last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault(); first.focus();
            }
        });

        /* close on in-page anchor links so the scrolled section is visible */
        nav.querySelectorAll('a[href]').forEach(function (a) {
            a.addEventListener('click', function () {
                var href = a.getAttribute('href');
                if (href && href.startsWith('#') && href !== '#' && href.length > 1) {
                    closeMenu();
                }
            });
        });
    }

    /* solutions toggle */
    if (solBtn && megaMenu) {
        solBtn.addEventListener('click', function (e) {
            if (window.innerWidth >= 1200) return;
            e.preventDefault();
            e.stopPropagation();
            var isOpen = megaMenu.classList.toggle('active-mobile');
            solBtn.setAttribute('aria-expanded', String(isOpen));
        });
    }

    /* cleanup on resize to desktop */
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 1200) {
            document.body.classList.remove('menu-open');
            document.body.style.overflow    = '';
            document.body.style.touchAction = '';
            if (nav)       nav.classList.remove('active');
            if (overlay)   { overlay.classList.remove('active'); overlay.setAttribute('aria-hidden', 'true'); }
            if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
            if (megaMenu)  megaMenu.classList.remove('active-mobile');
            if (solBtn)    solBtn.setAttribute('aria-expanded', 'false');
            tabBtns.forEach(function (b) { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
            document.querySelectorAll('.mobile-accordion-pane').forEach(function (p) { 
                p.classList.remove('active');
                p.style.display = ''; // clear js inline styles
            });
        }
    }, { passive: true });

    /* ── scroll reveal ── */
    if ('IntersectionObserver' in window) {
        var revObs = new IntersectionObserver(function (entries, o) {
            entries.forEach(function (en) {
                if (en.isIntersecting) { 
                    en.target.classList.add('active', 'is-visible'); 
                    o.unobserve(en.target); 
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.reveal, .fade-in, .fade-in-up, .fade-in-right, .fade-in-left').forEach(function (el) {
            revObs.observe(el);
        });
    } else {
        /* fallback */
        document.querySelectorAll('.reveal, .fade-in, .fade-in-up, .fade-in-right, .fade-in-left').forEach(function (el) {
            el.classList.add('active', 'is-visible');
        });
    }

    /* ── Header Scroll Transition ── */
    var header = document.getElementById('main-header');
    if (header) {
        var handleScroll = function() {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // init
    }

    /* ── Smooth Scroll for Anchors ── */
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                var h = header ? header.offsetHeight : 0;
                window.scrollTo({
                    top: target.offsetTop - h - 20,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ── Mega Footer injection (shared component) ── */
    function loadMegaFooter() {
        if (document.getElementById('mega-footer')) return; // already present

        var footerUrlAbs = '/components/footer.html?v=1787379635617';
        var footerUrlRel = 'components/footer.html?v=1787379635617';

        function insertFooterHtml(html) {
            if (!html || document.getElementById('mega-footer')) return;
            document.body.insertAdjacentHTML('beforeend', html);
        }

        function tryFetch(url) {
            return fetch(url, { cache: 'force-cache' }).then(function (res) {
                if (!res.ok) throw new Error('Failed to load footer: ' + res.status);
                return res.text();
            });
        }

        tryFetch(footerUrlAbs)
            .catch(function () { return tryFetch(footerUrlRel); })
            .then(insertFooterHtml)
            .catch(function () {
                /* no-op: allow pages to render even if footer can't be fetched (e.g. file://) */
            });
    }

    loadMegaFooter();

    /* ── Lightweight Cookie Consent Banner ── */
    function initCookieConsent() {
        if (localStorage.getItem('cookie_consent_accepted') || document.getElementById('cookie-consent-banner')) return;

        var banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.style.cssText = "position: fixed; bottom: 24px; left: 24px; right: 24px; z-index: 99999;";
        banner.innerHTML = `
            <div class="cookie-banner-content" style="background: rgba(255,255,255,0.98); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); padding: 20px 24px; border-radius: 16px; box-shadow: 0 10px 50px rgba(0,0,0,0.15); border: 1px solid rgba(55, 179, 156, 0.2); display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; animation: slideUp 0.5s ease-out;">
                <div class="cookie-text" style="flex: 1; min-width: 260px;">
                    <p style="margin: 0; font-size: 14px; color: #475569; line-height: 1.6; font-family: 'Inter', sans-serif;">We use cookies to enhance your experience and analyze our traffic. By clicking "Accept All", you consent to our use of cookies in accordance with our <a href="privacy-policy" style="color: #37B39C; text-decoration: underline; font-weight: 600;">Privacy Policy</a>.</p>
                </div>
                <div class="cookie-actions" style="display: flex; gap: 12px;">
                    <button id="cookie-reject" style="padding: 11px 22px; border-radius: 10px; font-size: 14px; font-weight: 600; color: #64748B; background: #F1F5F9; border: none; cursor: pointer; transition: all 0.2s;">Reject</button>
                    <button id="cookie-accept" style="padding: 11px 26px; border-radius: 10px; font-size: 14px; font-weight: 600; color: #fff; background: linear-gradient(135deg, #1D5A9F 0%, #37B39C 100%); border: none; cursor: pointer; box-shadow: 0 4px 15px rgba(55, 179, 156, 0.35); transition: all 0.2s;">Accept All</button>
                </div>
            </div>
            <style>
                @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                #cookie-accept:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(55, 179, 156, 0.45); }
                #cookie-reject:hover { background: #E2E8F0; color: #475569; }
            </style>
        `;
        document.body.appendChild(banner);

        var handleAccept = function(e) {
            if (e) e.stopPropagation();
            localStorage.setItem('cookie_consent_accepted', 'true');
            banner.remove();
        };

        var handleReject = function(e) {
            if (e) e.stopPropagation();
            banner.remove();
        };

        document.getElementById('cookie-accept').addEventListener('click', handleAccept);
        document.getElementById('cookie-reject').addEventListener('click', handleReject);
    }

    // Delay slightly to not interrupt initial page load
    setTimeout(initCookieConsent, 1500);

    /* ── Audience Tabs Redesign ── */
    var tabBtnsRedesign = document.querySelectorAll('.tab-btn-redesign');
    var audienceInfos = document.querySelectorAll('.audience-info');
    var audienceImgs = document.querySelectorAll('.audience-img');

    if (tabBtnsRedesign.length) {
        tabBtnsRedesign.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var target = btn.getAttribute('data-audience');
                
                // Update buttons
                tabBtnsRedesign.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');

                // Update text content
                audienceImgs.forEach(function (img) {
                    img.classList.remove('active');
                    if (img.id === target + '-img') img.classList.add('active');
                });

                // Update text
                var infoDiv = document.getElementById('doctor-content');
                if (infoDiv) {
                    if (target === 'doctor') {
                        infoDiv.innerHTML = '<h3 style="font-size: 2rem; margin-bottom: 20px; color: var(--redesign-blue);">Clinical Excellence</h3>' +
                            '<p style="font-size: 1.1rem; line-height: 1.8;">Intuitive EMR, smart templates, and voice-to-text dictation so you spend more time with patients, not screens. Access records anywhere, anytime.</p>' +
                            '<ul style="margin-top: 30px; list-style: none; padding: 0;">' +
                                '<li style="margin-bottom: 15px; display: flex; gap: 10px; align-items: center;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--redesign-teal)" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Fast, specialty-specific charting</span></li>' +
                                '<li style="margin-bottom: 15px; display: flex; gap: 10px; align-items: center;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--redesign-teal)" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Integrated lab & imaging results</span></li>' +
                            '</ul>';
                    } else if (target === 'admin') {
                        infoDiv.innerHTML = '<h3 style="font-size: 2rem; margin-bottom: 20px; color: var(--redesign-blue);">Operational Efficiency</h3>' +
                            '<p style="font-size: 1.1rem; line-height: 1.8;">Automated billing, TPA management, and smart inventory tracking. Reduce leakages and maximize your facility\'s daily throughput.</p>' +
                            '<ul style="margin-top: 30px; list-style: none; padding: 0;">' +
                                '<li style="margin-bottom: 15px; display: flex; gap: 10px; align-items: center;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--redesign-teal)" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg><span>One-click insurance processing</span></li>' +
                                '<li style="margin-bottom: 15px; display: flex; gap: 10px; align-items: center;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--redesign-teal)" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Real-time bed & stock visibility</span></li>' +
                            '</ul>';
                    } else {
                        infoDiv.innerHTML = '<h3 style="font-size: 2rem; margin-bottom: 20px; color: var(--redesign-blue);">Strategic Growth</h3>' +
                            '<p style="font-size: 1.1rem; line-height: 1.8;">Bird\'s-eye view of your entire hospital chain. Real-time financial dashboards, ROI tracking, and long-term clinical data analytics.</p>' +
                            '<ul style="margin-top: 30px; list-style: none; padding: 0;">' +
                                '<li style="margin-bottom: 15px; display: flex; gap: 10px; align-items: center;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--redesign-teal)" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Consolidated chain-wide reporting</span></li>' +
                                '<li style="margin-bottom: 15px; display: flex; gap: 10px; align-items: center;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--redesign-teal)" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Advanced patient retention metrics</span></li>' +
                            '</ul>';
                    }
                }
            });
        });
    }

    /* ── Pricing Toggle ── */
    var pricingToggle = document.getElementById('pricing-toggle');
    if (pricingToggle) {
        var priceAmounts = document.querySelectorAll('.price-amount');
        var periods = document.querySelectorAll('.price-period');

        pricingToggle.addEventListener('click', function () {
            var isYearly = pricingToggle.classList.toggle('active');
            pricingToggle.setAttribute('aria-checked', isYearly);

            priceAmounts.forEach(function (amount) {
                var monthly = amount.getAttribute('data-monthly');
                var yearly = amount.getAttribute('data-yearly');
                if (monthly && yearly) {
                    amount.textContent = isYearly ? yearly : monthly;
                }
            });

            periods.forEach(function (p) {
                if (p) p.textContent = isYearly ? '/year' : '/month';
            });
        });
    }

    /* ── Unified Lead Sync Helper across all CRM & Analytics Storage Keys ── */
    function recordUnifiedLead(leadData) {
        leadData = leadData || {};
        var id = leadData.id || ('MED-WA-' + Math.floor(1000 + Math.random() * 9000));
        var nowIso = new Date().toISOString();
        var formattedDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        var pageUrl = leadData.sourcePage || window.location.pathname || '/';
        var pageTitle = leadData.pageTitle || document.title || 'Medical 365';
        
        var city = leadData.city || 'Jaipur';
        if (!leadData.city && window.location.href) {
            var match = window.location.href.match(/-([a-z]+)\.html/i);
            if (match && match[1]) {
                city = match[1].charAt(0).toUpperCase() + match[1].slice(1);
            }
        }

        var source = leadData.source || (leadData.type === 'whatsapp' ? 'WhatsApp' : 'Website');
        var name = leadData.name || (source === 'WhatsApp' ? 'WhatsApp Inquirer' : 'Website Visitor');
        var phone = leadData.phone || '+91 77919 10007';
        var email = leadData.email && leadData.email !== '—' ? leadData.email : '';
        var organization = leadData.organization || 'Website Visitor';
        var facilityType = leadData.facilityType || 'Clinic / Hospital';
        var bedCount = leadData.bedCount || '—';
        var challenges = leadData.message || leadData.challenges || ('Inquiry via ' + source + ' on ' + pageUrl);

        // 1. Leads.html CRM Schema (m365_crm_leads)
        var crmLead = {
            id: id,
            name: name,
            firstName: name.split(' ')[0] || 'WhatsApp',
            lastName: name.split(' ').slice(1).join(' ') || 'Inquiry',
            fullName: name,
            phone: phone,
            email: email,
            organization: organization,
            facilityType: facilityType,
            bedCount: bedCount,
            challenges: challenges,
            requirement: source === 'WhatsApp' 
                ? 'WhatsApp Live Clinical Inquiry (' + city + ')' 
                : 'Hospital Software Demo & Compliance (' + city + ')',
            sourceUrl: window.location.href,
            sourcePageUrl: window.location.href,
            pageTitle: pageTitle,
            submittedAt: nowIso,
            source: source,
            status: 'New',
            caller: 'Pooja Sharma',
            city: city,
            addedOn: formattedDate,
            timestamp: Date.now()
        };

        try {
            var existingCrm = JSON.parse(localStorage.getItem('m365_crm_leads') || '[]');
            existingCrm.unshift(crmLead);
            localStorage.setItem('m365_crm_leads', JSON.stringify(existingCrm.slice(0, 100)));
        } catch(e) {}

        // 2. Next.js CRM Schema (medical365_crm_leads_v2)
        try {
            var existingV2 = JSON.parse(localStorage.getItem('medical365_crm_leads_v2') || '[]');
            existingV2.unshift({
                id: id,
                name: organization && organization !== 'Website Visitor' ? name + ' (' + organization + ')' : name,
                phone: phone,
                email: email,
                gender: 'Other',
                requirement: crmLead.requirement,
                department: 'Hospital Administration & IT',
                status: 'New Inquiry',
                source: source,
                assignedTo: 'Nurse Sneha (Triage Coordinator)',
                value: 75000,
                insuranceType: 'Cashless TPA',
                score: source === 'WhatsApp' ? 85 : 70,
                priority: 'High',
                city: city,
                notes: challenges,
                addedOn: new Date().toISOString().split('T')[0]
            });
            localStorage.setItem('medical365_crm_leads_v2', JSON.stringify(existingV2.slice(0, 100)));
        } catch(e) {}

        // 3. Analytics Schema (m365_captured_leads)
        try {
            var existingCaptured = JSON.parse(localStorage.getItem('m365_captured_leads') || '[]');
            existingCaptured.unshift({
                id: id,
                type: leadData.type || (source === 'WhatsApp' ? 'whatsapp' : 'website'),
                name: name,
                email: email || '—',
                phone: phone,
                organization: organization,
                facilityType: facilityType,
                bedCount: bedCount,
                message: challenges,
                sourcePage: pageUrl,
                referrer: document.referrer || 'direct',
                status: 'New',
                source: source,
                timestamp: nowIso
            });
            localStorage.setItem('m365_captured_leads', JSON.stringify(existingCaptured.slice(0, 100)));
        } catch(e) {}

        // 4. Dispatch events for instant dashboard sync
        try {
            window.dispatchEvent(new CustomEvent('m365_lead_captured', { detail: crmLead }));
        } catch(e) {}

        // 5. Fire Telemetry to Server
        var endpoints = ['/api/leads/track', '/api/webhooks', 'http://localhost:3000/api/leads/track', 'http://localhost:3000/api/webhooks'];
        endpoints.forEach(function(ep) {
            try {
                fetch(ep, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        eventType: leadData.type || (source === 'WhatsApp' ? 'whatsapp' : 'website'),
                        source: source,
                        name: name,
                        phone: phone,
                        phone_number: phone,
                        email: email,
                        organization_name: organization,
                        facility_type: facilityType,
                        bed_count: bedCount,
                        message: challenges,
                        sourcePage: pageUrl,
                        source_page_url: window.location.href,
                        city: city
                    })
                }).catch(function() {});
            } catch(e) {}
        });

        return crmLead;
    }

    /* ── Interactive Floating WhatsApp Quick Consultation Widget ── */
    function initWhatsAppFloatingWidget() {
        if (document.getElementById('m365-wa-inquiry-card')) return;

        var widget = document.createElement('div');
        widget.id = 'm365-wa-inquiry-card';
        widget.innerHTML = 
            '<div class="m365-wa-card-header">' +
                '<div style="display:flex; align-items:center; gap:10px;">' +
                    '<div class="m365-wa-avatar">' +
                        '<svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>' +
                    '</div>' +
                    '<div>' +
                        '<div style="font-weight:700; font-size:14px; color:#fff;">Medical 365 WhatsApp</div>' +
                        '<div style="font-size:11px; color:#d1fae5; display:flex; align-items:center; gap:5px;">' +
                            '<span style="width:7px; height:7px; background:#10b981; border-radius:50%; display:inline-block; box-shadow:0 0 6px #10b981;"></span> Online · Fast Clinical Support' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<button id="m365-wa-close-btn" style="background:transparent; border:none; color:#fff; font-size:20px; cursor:pointer; line-height:1; padding:2px 6px;">&times;</button>' +
            '</div>' +
            '<div class="m365-wa-card-body">' +
                '<div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:10px; padding:10px 12px; margin-bottom:12px; font-size:12px; color:#166534; line-height:1.4;">' +
                    'Hello! 👋 Have questions about Hospital Software, ABDM compliance, or Pricing? Connect with our clinical team on WhatsApp.' +
                '</div>' +
                '<form id="m365-wa-quick-form">' +
                    '<div style="margin-bottom:8px;">' +
                        '<input type="text" id="m365-wa-input-name" placeholder="Your Name / Hospital Name" required style="width:100%; box-sizing:border-box; padding:9px 12px; font-size:13px; border:1px solid #cbd5e1; border-radius:8px; outline:none;" />' +
                    '</div>' +
                    '<div style="margin-bottom:10px;">' +
                        '<input type="tel" id="m365-wa-input-phone" placeholder="WhatsApp Number (e.g. 98290 12345)" required style="width:100%; box-sizing:border-box; padding:9px 12px; font-size:13px; border:1px solid #cbd5e1; border-radius:8px; outline:none;" />' +
                    '</div>' +
                    '<button type="submit" style="width:100%; background:#25d366; color:#fff; border:none; padding:11px; border-radius:8px; font-weight:700; font-size:13px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; box-shadow:0 4px 12px rgba(37,211,102,0.3); transition:all 0.2s;">' +
                        '<span>Start WhatsApp Chat</span>' +
                        '<svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>' +
                    '</button>' +
                    '<div style="text-align:center; margin-top:8px;">' +
                        '<a href="#" id="m365-wa-direct-btn" style="font-size:11px; color:#64748b; text-decoration:underline;">Or open WhatsApp directly without form &rarr;</a>' +
                    '</div>' +
                '</form>' +
            '</div>';

        document.body.appendChild(widget);

        if (!document.getElementById('m365-wa-widget-styles')) {
            var st = document.createElement('style');
            st.id = 'm365-wa-widget-styles';
            st.innerHTML = 
                '#m365-wa-inquiry-card {' +
                    'position: fixed;' +
                    'bottom: 105px;' +
                    'right: 30px;' +
                    'width: 330px;' +
                    'background: #ffffff;' +
                    'border-radius: 16px;' +
                    'box-shadow: 0 16px 40px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06);' +
                    'z-index: 10000;' +
                    'overflow: hidden;' +
                    'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;' +
                    'display: none;' +
                    'animation: m365WaSlideUp 0.25s ease-out forwards;' +
                '}' +
                '@keyframes m365WaSlideUp {' +
                    'from { opacity: 0; transform: translateY(16px); }' +
                    'to { opacity: 1; transform: translateY(0); }' +
                '}' +
                '.m365-wa-card-header {' +
                    'background: linear-gradient(135deg, #075e54 0%, #128c7e 100%);' +
                    'padding: 14px 16px;' +
                    'display: flex;' +
                    'align-items: center;' +
                    'justify-content: space-between;' +
                '}' +
                '.m365-wa-avatar {' +
                    'width: 36px;' +
                    'height: 36px;' +
                    'background: rgba(255,255,255,0.2);' +
                    'border-radius: 50%;' +
                    'display: flex;' +
                    'align-items: center;' +
                    'justify-content: center;' +
                '}' +
                '.m365-wa-card-body {' +
                    'padding: 16px;' +
                '}' +
                '@media (max-width: 480px) {' +
                    '#m365-wa-inquiry-card { width: calc(100vw - 32px); right: 16px; bottom: 85px; }' +
                '}';
            document.head.appendChild(st);
        }

        // Close button handler
        document.getElementById('m365-wa-close-btn').addEventListener('click', function(e) {
            e.stopPropagation();
            widget.style.display = 'none';
        });

        // Form submit handler
        document.getElementById('m365-wa-quick-form').addEventListener('submit', function(e) {
            e.preventDefault();
            var nameInput = document.getElementById('m365-wa-input-name').value.trim();
            var phoneInput = document.getElementById('m365-wa-input-phone').value.trim();
            var pageUrl = window.location.pathname || '/';

            // Record in CRM Dashboard
            recordUnifiedLead({
                type: 'whatsapp',
                source: 'WhatsApp',
                name: nameInput || 'WhatsApp Inquirer',
                phone: phoneInput || '+91 77919 10007',
                organization: nameInput || 'Website Visitor',
                message: 'Visitor requested WhatsApp consultation from ' + pageUrl + ' (' + document.title + ')',
                sourcePage: pageUrl
            });

            widget.style.display = 'none';

            // Launch WhatsApp Web / App
            var cleanPhone = phoneInput.replace(/[^0-9]/g, '');
            var waMsg = 'Hello Medical 365, my name is ' + nameInput + (cleanPhone ? ' (' + cleanPhone + ')' : '') + '. I would like to inquire about Medical 365 hospital software & ABDM compliance.';
            var waUrl = 'https://wa.me/917791910007?text=' + encodeURIComponent(waMsg);
            window.open(waUrl, '_blank');
        });

        // Direct skip link handler
        document.getElementById('m365-wa-direct-btn').addEventListener('click', function(e) {
            e.preventDefault();
            var pageUrl = window.location.pathname || '/';

            recordUnifiedLead({
                type: 'whatsapp',
                source: 'WhatsApp',
                name: 'WhatsApp Direct Visitor',
                phone: '+91 77919 10007',
                organization: 'Website Visitor',
                message: 'Visitor clicked direct WhatsApp chat from ' + pageUrl,
                sourcePage: pageUrl
            });

            widget.style.display = 'none';
            window.open('https://wa.me/917791910007?text=' + encodeURIComponent("Hi Medical365, I'd like to book a free demo"), '_blank');
        });
    }

    /* ── Real-Time Inbound Event & Lead Tracking (WhatsApp, Phone Call, Forms) ── */
    function initLeadTracking() {
        // 1. WhatsApp Click & FAB Tracking
        document.addEventListener('click', function (e) {
            // A. Floating WhatsApp FAB: Toggle quick inquiry dialog
            var fab = e.target.closest('.mf-wa-fab');
            if (fab) {
                e.preventDefault();
                initWhatsAppFloatingWidget();
                var card = document.getElementById('m365-wa-inquiry-card');
                if (card) {
                    card.style.display = (card.style.display === 'block' ? 'none' : 'block');
                    if (card.style.display === 'block') {
                        var nameInput = document.getElementById('m365-wa-input-name');
                        if (nameInput) setTimeout(function() { nameInput.focus(); }, 150);
                    }
                }
                return;
            }

            // B. Direct WhatsApp links (mobile sticky bar, header/footer links, text CTAs)
            var target = e.target.closest('a[href*="wa.me"], a[href*="whatsapp.com"], [data-track="whatsapp"]');
            if (target) {
                var pageUrl = window.location.pathname || '/';
                
                // Fire GA4 Event
                if (typeof gtag === 'function') {
                    gtag('event', 'whatsapp_click', {
                        event_category: 'Inbound Conversion',
                        event_label: pageUrl,
                        page_location: window.location.href,
                        value: 1
                    });
                }

                // Immediately capture lead across CRM and Analytics
                recordUnifiedLead({
                    type: 'whatsapp',
                    source: 'WhatsApp',
                    name: 'WhatsApp Inquirer',
                    phone: '+91 77919 10007',
                    organization: 'Website Visitor',
                    message: 'Visitor clicked WhatsApp link on ' + pageUrl,
                    sourcePage: pageUrl
                });
            }
        });

        // 2. Call Now / Phone Click Tracking
        document.addEventListener('click', function (e) {
            var target = e.target.closest('a[href^="tel:"], [data-track="call"], .call-btn, .call-now-btn');
            if (target) {
                var pageUrl = window.location.pathname || '/';
                var phoneNumber = target.getAttribute('href') ? target.getAttribute('href').replace('tel:', '') : '+91 77919 10007';

                if (typeof gtag === 'function') {
                    gtag('event', 'phone_call_click', {
                        event_category: 'Inbound Conversion',
                        event_label: pageUrl,
                        phone_number: phoneNumber,
                        page_location: window.location.href,
                        value: 1
                    });
                }

                recordUnifiedLead({
                    type: 'call',
                    source: 'Direct Call',
                    name: 'Direct Phone Caller',
                    phone: phoneNumber,
                    organization: 'Website Caller',
                    message: 'Inbound phone call initiated from ' + pageUrl,
                    sourcePage: pageUrl
                });
            }
        });

        // 3. Form Submissions (Book Demo & Contact Forms)
        document.addEventListener('submit', function (e) {
            var form = e.target;
            if (!form || form.id === 'm365-wa-quick-form') return;

            var isDemo = form.id === 'demo-form' || window.location.pathname.indexOf('book-demo') !== -1;
            var isContact = form.id === 'contact-form' || window.location.pathname.indexOf('contact') !== -1;

            if (isDemo || isContact) {
                var formData = new FormData(form);
                var firstName = formData.get('first_name') || formData.get('name') || '';
                var lastName = formData.get('last_name') || '';
                var fullName = (firstName + ' ' + lastName).trim() || 'Website Inquirer';
                var email = formData.get('email') || '—';
                var phone = formData.get('phone_number') || formData.get('phone') || '—';
                var org = formData.get('organization_name') || formData.get('hospital_name') || formData.get('subject') || 'Healthcare Facility';
                var facType = formData.get('facility_type') || 'Clinic / Hospital';
                var bedCount = formData.get('bed_count') || '—';
                var message = formData.get('challenges') || formData.get('message') || (isDemo ? 'Book Demo request' : 'Contact inquiry');
                var pageUrl = window.location.pathname || '/';

                if (typeof gtag === 'function') {
                    gtag('event', isDemo ? 'book_demo_submit' : 'contact_form_submit', {
                        event_category: 'Lead Generation',
                        event_label: org,
                        lead_type: isDemo ? 'Book Demo' : 'Contact Us'
                    });
                    gtag('event', 'generate_lead', {
                        value: isDemo ? 4820 : 1500,
                        currency: 'INR'
                    });
                }

                recordUnifiedLead({
                    type: isDemo ? 'book_demo' : 'contact_form',
                    source: 'Website',
                    name: fullName,
                    email: email,
                    phone: phone,
                    organization: org,
                    facilityType: facType,
                    bedCount: bedCount,
                    message: message,
                    sourcePage: pageUrl
                });
            }
        });
    }

    initLeadTracking();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobalScripts);
} else {
    initGlobalScripts();
}
