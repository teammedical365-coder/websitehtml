/**
 * Medical365 - Universal Form Handler v3.0 (PHP Version)
 * Centralizes all form submissions to TEAMMEDICAL365@GMAIL.COM using local PHP.
 */

document.addEventListener('DOMContentLoaded', function() {
    // --- CONFIGURATION ---
    const API_ENDPOINT = "/api/send-mail";
    const TARGET_EMAIL = "TEAMMEDICAL365@GMAIL.COM";

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
            // Update form action for standard fallback (though Vercel won't run PHP)
            form.action = API_ENDPOINT;
            form.method = "POST";
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

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // UI State: Submitting
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span style="display:flex; align-items:center; justify-content:center; gap:10px;">
                <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <circle cx="12" cy="12" r="10" stroke-opacity="0.25" stroke="currentColor"></circle>
                    <path d="M4 12a8 8 0 018-8" stroke="currentColor"></path>
                </svg>
                Processing...
            </span>
        `;

        // Prepare Data as JSON
        const formData = new FormData(form);
        const jsonData = Object.fromEntries(formData.entries());

        try {
            // Submit to Vercel API
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                body: JSON.stringify(jsonData),
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            if (response.ok) {
                // SUCCESS: Redirect to Thank You page
                window.location.href = 'thank-you.html';
            } else {
                throw new Error('Server error');
            }

        } catch (error) {
            console.error('Medical365 Submission Error:', error);
            
            // FALLBACK: Standard post (Vercel will at least see the POST)
            // Note: Without PHP, this fallback will just show the API output or 405
            // But we keep it for now.
            alert("Submission failed. Please try again or contact us directly.");
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
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
