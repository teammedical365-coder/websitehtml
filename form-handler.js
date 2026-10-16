/**
 * Medical365 - AJAX Form Handler for Web3Forms
 * Migrated from legacy PHP to serverless Web3Forms API.
 */

document.addEventListener('DOMContentLoaded', function() {
    // --- CONFIGURATION ---
    var WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
    var THANK_YOU_PAGE = "thank-you.html";

    // --- FORM SELECTORS ---
    var forms = {
        'demo-form': document.getElementById('demo-form'),
        'contact-form': document.getElementById('contact-form')
    };

    // --- MATH CAPTCHA STATE ---
    var mathCaptchaState = {};

    // --- INITIALIZATION ---
    // Handle Topic Chips in Contact Form (Keep original functionality)
    initTopicChips();
    initMathCaptcha();

    // Attach AJAX handlers to both forms
    Object.keys(forms).forEach(function(formId) {
        var form = forms[formId];
        if (form) {
            form.addEventListener('submit', function(e) {
                handleFormSubmit(e);
            });
        }
    });

    /**
     * AJAX Submission Handler
     */
    function handleFormSubmit(event) {
        event.preventDefault();
        var form = event.target;
        var submitBtn = form.querySelector('button[type="submit"]');
        var originalBtnText = submitBtn.innerHTML;

        // Basic validation check
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Math Captcha validation
        var captchaContainer = form.querySelector('.math-captcha-container');
        if (captchaContainer) {
            var captchaInput = captchaContainer.querySelector('.math-captcha-input');
            var errorEl = captchaContainer.querySelector('.captcha-error-msg');
            var expectedAnswer = mathCaptchaState[form.id];
            var userAnswer = parseInt(captchaInput ? captchaInput.value.trim() : '', 10);

            if (isNaN(userAnswer) || userAnswer !== expectedAnswer) {
                if (errorEl) {
                    errorEl.style.display = 'block';
                }
                if (captchaInput) {
                    captchaInput.focus();
                    captchaInput.style.borderColor = '#dc2626';
                }
                if (typeof mathCaptchaState[form.id + '_refresh'] === 'function') {
                    mathCaptchaState[form.id + '_refresh']();
                }
                return;
            } else {
                if (errorEl) {
                    errorEl.style.display = 'none';
                }
                if (captchaInput) {
                    captchaInput.style.borderColor = '';
                }
            }
        }

        // 1. UI State: Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span style="display:flex; align-items:center; justify-content:center; gap:10px;">' +
            '<svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">' +
                '<circle cx="12" cy="12" r="10" stroke-opacity="0.25" stroke="currentColor"></circle>' +
                '<path d="M4 12a8 8 0 018-8" stroke="currentColor"></path>' +
            '</svg>' +
            'Sending...' +
            '</span>';

        // 2. Prepare Data
        var formData = new FormData(form);
        var object = {};
        formData.forEach(function(value, key){
            object[key] = value;
        });

        // Capture attribution metadata
        object.source_page_url = window.location.href;
        object.page_title = document.title;
        object.submitted_at = new Date().toISOString();

        // ══════════════════════════════════════════════════════════
        // SYNC DIRECTLY TO MEDICAL365 CRM
        // ══════════════════════════════════════════════════════════
        try {
            var existingLeads = JSON.parse(localStorage.getItem('m365_crm_leads') || '[]');
            var leadFullName = [object.first_name, object.last_name].filter(Boolean).join(' ') || object.name || 'Anonymous Website Visitor';
            var formattedDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            
            var crmLead = {
                id: 'MED-' + Math.floor(1000 + Math.random() * 9000),
                name: leadFullName,
                phone: object.phone_number || object.phone || '',
                email: object.email || '',
                status: 'New',
                source: 'Website',
                organization: object.organization_name || object.facility_name || '',
                facilityType: object.facility_type || '',
                bedCount: object.bed_count || '',
                challenges: object.challenges || object.message || '',
                addedOn: formattedDate,
                timestamp: Date.now()
            };

            existingLeads.unshift(crmLead);
            localStorage.setItem('m365_crm_leads', JSON.stringify(existingLeads));

            // Also send to backend webhook relay
            fetch('/api/webhooks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(object)
            }).catch(function() {});
        } catch(e) {
            console.warn('CRM sync error:', e);
        }

        var json = JSON.stringify(object);

        // 3. Submit using fetch (supported by all modern browsers, for IE fallback would need XHR)
        fetch(WEB3FORMS_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: json,
        })
        .then(function(response) {
            return response.json().then(function(result) {
                if (response.status === 200) {
                    // 4. Success: Redirect to thank you page
                    window.location.href = THANK_YOU_PAGE;
                } else {
                    // Handle API error response
                    console.error("Web3Forms Error:", result);
                    alert(result.message || "Something went wrong. Please try again.");
                    resetButton();
                }
            });
        })
        .catch(function(error) {
            // 5. Network / Fetch error
            console.error("Connection Error:", error);
            alert("Could not connect to the form server. Please check your internet or try again later.");
            resetButton();
        });

        function resetButton() {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
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
                var num1 = Math.floor(Math.random() * 9) + 1; // 1 to 9
                var num2 = Math.floor(Math.random() * 9) + 1; // 1 to 9
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
