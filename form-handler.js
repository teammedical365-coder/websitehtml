/**
 * Medical365 - Universal Form Handler v2.0
 * Centralizes all form submissions to TEAMMEDICAL365@GMAIL.COM using Formspree.
 * Redirects to thank-you.html on success.
 */

document.addEventListener('DOMContentLoaded', function() {
    // --- CONFIGURATION ---
    // IMPORTANT: Get your free ID at formspree.io and replace 'xovqpwyk' below
    // to connect submissions to TEAMMEDICAL365@GMAIL.COM
    const FORMSPREE_ID = "xovqpwyk"; 
    const TARGET_EMAIL = "TEAMMEDICAL365@GMAIL.COM";

    if (window.location.protocol === 'file:') {
        console.warn("Medical365: Forms may not submit correctly when opened directly as a file. Please use a local server or upload to hosting.");
    }

    // --- FORM SELECTORS ---
    const forms = {
        'demo-form': document.getElementById('demo-form'),
        'contact-form': document.getElementById('contact-form')
    };

    // --- INITIALIZATION ---
    initTopicChips();

    Object.keys(forms).forEach(formId => {
        const form = forms[formId];
        if (form) {
            form.addEventListener('submit', function(e) {
                handleFormSubmit(e, formId);
            });
            console.log(`Medical365: Form handler active for ${formId}`);
        }
    });

    /**
     * Main Submission Handler
     */
    async function handleFormSubmit(event, formId) {
        event.preventDefault();
        const form = event.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;

        // 1. Browser validation check
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // 2. UI State: Submitting
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span style="display:flex; align-items:center; justify-content:center; gap:10px;">
                <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="animation: spin 1s linear infinite;">
                    <circle cx="12" cy="12" r="10" stroke-opacity="0.25" stroke="currentColor"></circle>
                    <path d="M4 12a8 8 0 018-8" stroke="currentColor"></path>
                </svg>
                Processing...
            </span>
        `;

        // 3. Prepare Data
        const formData = new FormData(form);
        
        // Add metadata for better tracking in the inbox
        formData.append('_subject', `New Lead: ${formId === 'demo-form' ? 'Demo Request' : 'Contact Message'}`);
        formData.append('submission_url', window.location.href);

        try {
            // 4. Submit to Formspree
            const response = await fetch(`https://www.formspree.io/f/${FORMSPREE_ID}`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // 5. SUCCESS: Redirect to Thank You page
                window.location.href = 'thank-you.html';
            } else {
                throw new Error('Server error');
            }

        } catch (error) {
            console.error('Medical365 Submission Error:', error);
            
            // FALLBACK: If AJAX fails, perform a standard POST submission
            // This ensures the lead is delivered even in restricted environments
            form.action = `https://www.formspree.io/f/${FORMSPREE_ID}`;
            form.method = "POST";
            form.submit();
        }
    }

    /**
     * Handle Topic Chips in Contact Form
     */
    function initTopicChips() {
        const chips = document.querySelectorAll('.topic-chips .chip');
        const topicInput = document.getElementById('topic-value');
        
        if (chips.length && topicInput) {
            chips.forEach(chip => {
                chip.addEventListener('click', function() {
                    chips.forEach(c => c.classList.remove('selected'));
                    this.classList.add('selected');
                    topicInput.value = this.getAttribute('data-value');
                });
            });
        }
    }

    // Global Spinner Style
    if (!document.getElementById('medical365-form-styles')) {
        const style = document.createElement('style');
        style.id = 'medical365-form-styles';
        style.innerHTML = `
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            .animate-spin { animation: spin 1s linear infinite; }
        `;
        document.head.appendChild(style);
    }
});
