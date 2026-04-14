/**
 * MEDICAL365 ANTIGRAVITY ENGINE v1.0
 * Smooth, weightless floating effects for premium UI elements.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Select prime candidates for the antigravity effect
    const floatTargets = [
        '.feature-card',
        '.value-card',
        '.solution-card',
        '.stat-item',
        '.hero-card',
        '.info-block',
        '.contact-card',
        '.pricing-card',
        '.badge'
    ];

    floatTargets.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            // Apply the activation class
            el.classList.add('antigravity-float');
            
            // Apply a staggered delay so they don't all move in perfect sync (looks more natural)
            const delay = (index % 5) * 0.4;
            el.style.animationDelay = `${delay}s`;
            
            // Optional: Randomize the duration slightly for organic feel
            const duration = 4 + Math.random() * 2;
            el.style.animationDuration = `${duration}s`;
        });
    });

    console.log('Antigravity Engine Initialized: Weightless mode active.');
});
