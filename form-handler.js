/**
 * Medical365 - Form Handler
 * - Contact Form (#contact-form): Handled via Web3Forms API and redirects to thank-you.html (No Leads365 CRM call)
 * - Book a Demo Form (#demo-form): Integrated with Leads365 CRM API (source: 'Medical365 Website - Book a Demo')
 */

document.addEventListener('DOMContentLoaded', function() {
    // --- LEADS365 CRM CONFIGURATION (BOOK A DEMO FORM ONLY) ---
    var LEADS365_ENDPOINT = "https://leadmanagementsystem-hdtp.onrender.com/api/integrations/leads/website";
    var LEADS365_SITE_KEY = "lf_site_09935392e422b89c71c5bffbeb959c97";

    // --- WEB3FORMS CONFIGURATION (CONTACT FORM ONLY) ---
    var WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
    var THANK_YOU_PAGE = "thank-you.html";

    // --- MATH CAPTCHA STATE ---
    var mathCaptchaState = {};

    // --- INITIALIZATION ---
    initTopicChips();
    initMathCaptcha();

    // 1. Attach Contact Form Handler (Web3Forms API - completely separated from Leads365 CRM)
    var contactForm = document.getElementById('contact-form');
    if (contactForm && !contactForm.dataset.handlerAttached) {
        contactForm.dataset.handlerAttached = 'true';
        contactForm.addEventListener('submit', function(e) {
            handleContactFormSubmit(e);
        });
    }

    // 2. Attach Book a Demo Form Handler (Leads365 CRM API Integration)
    var demoForm = document.getElementById('demo-form');
    if (demoForm && !demoForm.dataset.handlerAttached) {
        demoForm.dataset.handlerAttached = 'true';
        demoForm.addEventListener('submit', function(e) {
            handleDemoFormSubmit(e);
        });
    }

    /**
     * Unique Idempotency Key generator with crypto.randomUUID() and fallback
     */
    function generateIdempotencyKey() {
        if (window.crypto && typeof window.crypto.randomUUID === 'function') {
            return window.crypto.randomUUID();
        }
        return 'ik_' + Date.now() + '_' + Math.random().toString(36).substring(2, 15);
    }

    /**
     * CONTACT FORM HANDLER - Web3Forms (Original restored behaviour)
     * NOTE: Does NOT send any requests to Leads365 CRM.
     */
    function handleContactFormSubmit(event) {
        event.preventDefault();
        var form = event.target;
        var submitBtn = form.querySelector('button[type="submit"]');
        var originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send Message';

        // Basic HTML5 validation
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Math Captcha validation
        if (!validateMathCaptcha(form)) {
            return;
        }

        // Loading state
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span style="display:flex; align-items:center; justify-content:center; gap:10px;">' +
                '<svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">' +
                    '<circle cx="12" cy="12" r="10" stroke-opacity="0.25" stroke="currentColor"></circle>' +
                    '<path d="M4 12a8 8 0 018-8" stroke="currentColor"></path>' +
                '</svg>' +
                'Sending...' +
                '</span>';
        }

        var formData = new FormData(form);
        var object = {};
        formData.forEach(function(value, key) {
            object[key] = value;
        });

        object.source_page_url = window.location.href;
        object.page_title = document.title;
        object.submitted_at = new Date().toISOString();

        // Local storage demo sync for website demo dashboard
        syncLocalLeadStorage(form, object);

        // Submit to Web3Forms API
        fetch(WEB3FORMS_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(object)
        })
        .then(function(response) {
            return response.json().then(function(result) {
                if (response.status === 200) {
                    window.location.href = THANK_YOU_PAGE;
                } else {
                    alert(result.message || "Something went wrong. Please try again.");
                    resetBtn();
                }
            });
        })
        .catch(function(error) {
            console.error("Connection Error:", error);
            alert("Could not connect to the form server. Please check your internet or try again later.");
            resetBtn();
        });

        function resetBtn() {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        }
    }

    /**
     * BOOK A DEMO FORM HANDLER - Leads365 CRM API Integration
     * Specifically connects #demo-form to Leads365 CRM.
     */
    async function handleDemoFormSubmit(event) {
        event.preventDefault();
        var form = event.target;
        var btn = form.querySelector('#leads365-demo-submit-btn') || 
                  form.querySelector('#leads365-submit-btn') || 
                  form.querySelector('button[type="submit"]');
        var statusDiv = form.querySelector('#leads365-status') || 
                        form.querySelector('#leads365-demo-status') || 
                        document.getElementById('leads365-status') || 
                        document.getElementById('leads365-demo-status');

        if (!btn) return;
        var originalBtnText = btn.innerHTML;

        // Prevent double submissions
        if (btn.disabled || form.dataset.submitting === 'true') {
            return;
        }

        // Basic HTML5 validation
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Math Captcha validation
        if (!validateMathCaptcha(form)) {
            return;
        }

        // 1. UI State: Disable button and show Sending...
        btn.disabled = true;
        form.dataset.submitting = 'true';
        btn.textContent = 'Sending...';
        if (statusDiv) {
            statusDiv.style.display = 'none';
            statusDiv.textContent = '';
        }

        // 2. Prepare Data & Map Form Fields to Leads365 CRM Payload
        var formData = new FormData(form);

        var firstName = formData.get('first_name') || '';
        var lastName = formData.get('last_name') || '';
        var fullName = (firstName + ' ' + lastName).trim() || formData.get('name') || 'Demo Inquirer';
        var email = (formData.get('email') || '').trim();
        var phone = (formData.get('phone_number') || formData.get('phone') || '').trim();

        // Additional demo fields preserved in message
        var orgName = formData.get('organization_name') || '';
        var facType = formData.get('facility_type') || '';
        var bedCount = formData.get('bed_count') || '';
        var challenges = formData.get('challenges') || formData.get('message') || '';

        var demoDetails = [];
        if (orgName) demoDetails.push('Organization: ' + orgName);
        if (facType) demoDetails.push('Facility Type: ' + facType);
        if (bedCount) demoDetails.push('Beds/Doctors: ' + bedCount);
        if (challenges) demoDetails.push('Challenges: ' + challenges);

        var message = challenges;
        if (demoDetails.length > 0) {
            message = challenges ? (challenges + '\n\n[' + demoDetails.join(' | ') + ']') : demoDetails.join(' | ');
        }

        var payload = {
            name: fullName,
            email: email,
            phone: phone,
            message: message,
            _hp_trap: formData.get('_hp_trap') || '',
            landingPage: window.location.href,
            source: 'Medical365 Website - Book a Demo'
        };

        // Sync local demo storage
        var localObj = {};
        formData.forEach(function(v, k) { localObj[k] = v; });
        syncLocalLeadStorage(form, localObj);

        // 3. API Submission with Idempotency Key & Safe Error Handling
        try {
            var idempotencyKey = generateIdempotencyKey();
            var response = await fetch(LEADS365_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Site-Key': LEADS365_SITE_KEY,
                    'X-Idempotency-Key': idempotencyKey
                },
                body: JSON.stringify(payload)
            });

            var data;
            try {
                data = await response.json();
            } catch (jsonErr) {
                throw new Error('Server returned an unreadable response (HTTP ' + response.status + ')');
            }

            if (!response.ok || !data || !data.success) {
                throw new Error(
                    (data && (data.error || data.message)) ||
                    'Failed to submit demo enquiry (HTTP ' + response.status + ')'
                );
            }

            // Confirmed Success
            if (statusDiv) {
                statusDiv.textContent = 'Thank you! Your demo request has been received.';
                statusDiv.style.color = '#15803d';
                statusDiv.style.backgroundColor = '#f0fdf4';
                statusDiv.style.border = '1px solid #bbf7d0';
                statusDiv.style.display = 'block';
            }
            form.reset();

            // Refresh captcha on successful submit
            if (typeof mathCaptchaState[form.id + '_refresh'] === 'function') {
                mathCaptchaState[form.id + '_refresh']();
            }
        } catch (err) {
            if (statusDiv) {
                statusDiv.textContent = 'Error: ' + err.message;
                statusDiv.style.color = '#b91c1c';
                statusDiv.style.backgroundColor = '#fef2f2';
                statusDiv.style.border = '1px solid #fecaca';
                statusDiv.style.display = 'block';
            }
            console.error('Leads365 CRM demo submission error:', err);
        } finally {
            btn.disabled = false;
            form.dataset.submitting = 'false';
            btn.innerHTML = originalBtnText;
        }
    }

    /**
     * Shared Math Captcha Validation
     */
    function validateMathCaptcha(form) {
        var captchaContainer = form.querySelector('.math-captcha-container');
        if (!captchaContainer) return true;

        var captchaInput = captchaContainer.querySelector('.math-captcha-input');
        var errorEl = captchaContainer.querySelector('.captcha-error-msg');
        var expectedAnswer = mathCaptchaState[form.id];
        var userAnswer = parseInt(captchaInput ? captchaInput.value.trim() : '', 10);

        if (isNaN(userAnswer) || userAnswer !== expectedAnswer) {
            if (errorEl) errorEl.style.display = 'block';
            if (captchaInput) {
                captchaInput.focus();
                captchaInput.style.borderColor = '#dc2626';
            }
            if (typeof mathCaptchaState[form.id + '_refresh'] === 'function') {
                mathCaptchaState[form.id + '_refresh']();
            }
            return false;
        } else {
            if (errorEl) errorEl.style.display = 'none';
            if (captchaInput) captchaInput.style.borderColor = '';
            return true;
        }
    }

    /**
     * Local storage lead sync helper for website demo tools
     */
    function syncLocalLeadStorage(form, object) {
        try {
            var existingLeads = JSON.parse(localStorage.getItem('m365_crm_leads') || '[]');
            var leadFullName = [object.first_name, object.last_name].filter(Boolean).join(' ') || object.name || 'Website Inquirer';
            var formattedDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            var crmLead = {
                id: 'MED-' + Math.floor(1000 + Math.random() * 9000),
                name: leadFullName,
                firstName: object.first_name || '',
                lastName: object.last_name || '',
                phone: object.phone_number || object.phone || '',
                email: object.email || '',
                status: 'New',
                source: form.id === 'demo-form' ? 'Medical365 Website - Book a Demo' : 'Website',
                organization: object.organization_name || object.facility_name || '',
                facilityType: object.facility_type || '',
                bedCount: object.bed_count || '',
                challenges: object.challenges || object.message || '',
                sourcePageUrl: window.location.href,
                pageTitle: document.title,
                submittedAt: new Date().toISOString(),
                caller: 'Pooja Sharma',
                addedOn: formattedDate,
                timestamp: Date.now()
            };
            existingLeads.unshift(crmLead);
            localStorage.setItem('m365_crm_leads', JSON.stringify(existingLeads.slice(0, 100)));
            window.dispatchEvent(new CustomEvent('m365_lead_captured', { detail: crmLead }));
        } catch(e) {}
    }

    /**
     * Logic for interactive topic selection chips
     */
    function initTopicChips() {
        var chips = document.querySelectorAll('.topic-chips .chip');
        var topicInput = document.getElementById('topic-value');
        if (chips.length && topicInput) {
            chips.forEach(function(chip) {
                chip.addEventListener('click', function() {
                    chips.forEach(function(c) { c.classList.remove('selected'); });
                    this.classList.add('selected');
                    topicInput.value = this.getAttribute('data-value');
                });
            });
        }
    }

    /**
     * Logic for Free Interactive Math Captcha
     */
    function initMathCaptcha() {
        var captchaContainers = document.querySelectorAll('.math-captcha-container');
        captchaContainers.forEach(function(container) {
            var form = container.closest('form');
            if (!form) return;
            var formId = form.id;
            var problemEl = container.querySelector('.math-problem-text');
            var inputEl = container.querySelector('.math-captcha-input');
            var refreshBtn = container.querySelector('.math-captcha-refresh');
            var errorEl = container.querySelector('.captcha-error-msg');

            function generateProblem() {
                var num1 = Math.floor(Math.random() * 9) + 1;
                var num2 = Math.floor(Math.random() * 9) + 1;
                mathCaptchaState[formId] = num1 + num2;
                if (problemEl) {
                    problemEl.textContent = num1 + ' + ' + num2 + ' = ?';
                }
                if (inputEl) {
                    inputEl.value = '';
                    inputEl.style.borderColor = '';
                }
                if (errorEl) {
                    errorEl.style.display = 'none';
                }
            }

            generateProblem();

            if (refreshBtn) {
                refreshBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    generateProblem();
                });
            }

            mathCaptchaState[formId + '_refresh'] = generateProblem;
        });
    }

    /**
     * Inject necessary CSS for the loading spinner
     */
    if (!document.getElementById('medical365-form-handler-styles')) {
        var style = document.createElement('style');
        style.id = 'medical365-form-handler-styles';
        style.innerHTML = '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } .animate-spin { animation: spin 1s linear infinite; }';
        document.head.appendChild(style);
    }
});
