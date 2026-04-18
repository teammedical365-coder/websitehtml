/**
 * Medical365 - Universal Form Handler
 * Centralizes all form submissions to TEAMMEDICAL365@GMAIL.COM using Formspree.
 * This script handles validation, submission animation, and success/error UI states.
 */

document.addEventListener('DOMContentLoaded', function() {
    // --- CONFIGURATION ---
    // User needs to update this with their Formspree ID to connect to TEAMMEDICAL365@GMAIL.COM
    const FORMSPREE_ID = "xovqpwyk"; // Placeholder - User should replace with their production ID
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
            console.log(`Form handler initialized for: ${formId}`);
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
        const wrapper = document.getElementById('form-wrapper');
        const successMsg = document.getElementById('success-msg');

        // 1. Basic Validation
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // 2. UI State: Submitting
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span style="display:flex; align-items:center; justify-content:center; gap:10px;">
                <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="animation: spin 1s linear infinite;">
                    <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
                    <path d="M4 12a8 8 0 018-8"></path>
                </svg>
                Sending...
            </span>
        `;

        // 3. Prepare Data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Add metadata
        data['_subject'] = `New Lead from Medical365: ${formId}`;
        data['_replyto'] = data['email'] || data['Work Email'];
        data['Form ID'] = formId;
        data['Submission URL'] = window.location.href;

        try {
            // 4. Submit to Formspree
            // Using FORMSPREE_ID is the professional way to mask the email and prevent spam
            const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                // 5. SUCCESS: Transition UI
                if (wrapper) wrapper.style.display = 'none';
                if (successMsg) {
                    successMsg.style.display = 'flex';
                    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } else {
                throw new Error('Server responded with an error');
            }

        } catch (error) {
            console.error('Submission Error:', error);
            alert('Sorry, there was an issue sending your request. Please try again or contact us directly at ' + TARGET_EMAIL);
            
            // Revert Button
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
                    // Remove selected from all
                    chips.forEach(c => c.classList.remove('selected'));
                    // Add to clicked
                    this.classList.add('selected');
                    // Update hidden input
                    topicInput.value = this.getAttribute('data-value');
                });
            });
        }
    }

    // Add spinner animation style
    const styleIdx = document.createElement('style');
    styleIdx.innerHTML = `
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
    `;
    document.head.appendChild(styleIdx);
});
