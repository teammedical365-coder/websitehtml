/**
 * Medical365 - AJAX Form Handler for Web3Forms
 * Migrated from legacy PHP to serverless Web3Forms API.
 */

document.addEventListener('DOMContentLoaded', function() {
    // --- CONFIGURATION ---
    const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
    const THANK_YOU_PAGE = "thank-you.html";

    // --- FORM SELECTORS ---
    const forms = {
        'demo-form': document.getElementById('demo-form'),
        'contact-form': document.getElementById('contact-form')
    };

    // --- INITIALIZATION ---
    // Handle Topic Chips in Contact Form (Keep original functionality)
    initTopicChips();

    // Attach AJAX handlers to both forms
    Object.keys(forms).forEach(formId => {
        const form = forms[formId];
        if (form) {
            form.addEventListener('submit', function(e) {
                handleFormSubmit(e);
            });
        }
    });

    /**
     * AJAX Submission Handler
     */
    async function handleFormSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;

        // Basic validation check
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // 1. UI State: Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span style="display:flex; align-items:center; justify-content:center; gap:10px;">
                <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <circle cx="12" cy="12" r="10" stroke-opacity="0.25" stroke="currentColor"></circle>
                    <path d="M4 12a8 8 0 018-8" stroke="currentColor"></path>
                </svg>
                Sending...
            </span>
        `;

        // 2. Prepare Data
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        try {
            // 3. Submit to Web3Forms
            const response = await fetch(WEB3FORMS_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: json,
            });

            const result = await response.json();

            if (response.status === 200) {
                // 4. Success: Redirect to thank you page
                window.location.href = THANK_YOU_PAGE;
            } else {
                // Handle API error response
                console.error("Web3Forms Error:", result);
                alert(result.message || "Something went wrong. Please try again.");
                resetButton();
            }
        } catch (error) {
            // 5. Network / Fetch error
            console.error("Connection Error:", error);
            alert("Could not connect to the form server. Please check your internet or try again later.");
            resetButton();
        }

        function resetButton() {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    }

    /**
     * Logic for interactive topic selection chips
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

    /**
     * Inject necessary CSS for the loading spinner
     */
    if (!document.getElementById('medical365-form-handler-styles')) {
        const style = document.createElement('style');
        style.id = 'medical365-form-handler-styles';
        style.innerHTML = `
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            .animate-spin { animation: spin 1s linear infinite; }
        `;
        document.head.appendChild(style);
    }
});
