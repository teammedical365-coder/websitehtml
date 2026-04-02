
document.addEventListener('DOMContentLoaded', function () {

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
    const slideUp = (target, duration = 300) => {
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
        window.setTimeout(() => {
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

    const slideDown = (target, duration = 300) => {
        target.style.removeProperty('display');
        let display = window.getComputedStyle(target).display;
        if (display === 'none') display = 'block';
        target.style.display = display;
        let height = target.offsetHeight;
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
        window.setTimeout(() => {
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
    var solBtn     = document.querySelector('.solutions-toggle');
    var megaMenu   = document.getElementById('mega-menu-content');
    var prevFocus  = null;

    function openMenu() {
        if (!nav) return;
        prevFocus = document.activeElement;
        nav.classList.add('active');
        if (overlay) { overlay.classList.add('active'); overlay.setAttribute('aria-hidden', 'false'); }
        document.body.style.overflow    = 'hidden';
        document.body.style.touchAction = 'none';
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
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
        document.body.style.overflow    = '';
        document.body.style.touchAction = '';
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
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
        toggleBtn.addEventListener('click', function() {
            if (nav && nav.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }
    if (overlay)   overlay.addEventListener('click',     closeMenu);
    if (overlay)   overlay.addEventListener('touchend', function(e) { e.preventDefault(); closeMenu(); });

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

        /* close on any real link click */
        nav.querySelectorAll('a[href]').forEach(function (a) {
            a.addEventListener('click', function () {
                var href = a.getAttribute('href');
                if (href && !href.startsWith('#')) closeMenu();
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
                if (en.isIntersecting) { en.target.classList.add('is-visible'); o.unobserve(en.target); }
            });
        }, { threshold: 0.08 });
        document.querySelectorAll('.fade-in-up, .fade-in-right, .fade-in-left').forEach(function (el) {
            revObs.observe(el);
        });
    } else {
        /* fallback: just show everything */
        document.querySelectorAll('.fade-in-up, .fade-in-right, .fade-in-left').forEach(function (el) {
            el.classList.add('is-visible');
        });
    }

    /* ── Mega Footer injection (shared component) ── */
    function loadMegaFooter() {
        if (document.getElementById('mega-footer')) return; // already present

        var footerUrlAbs = '/components/footer.html';
        var footerUrlRel = 'components/footer.html';

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

});
