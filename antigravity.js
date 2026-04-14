/**
 * ═══════════════════════════════════════════════════════════════
 * ANTIGRAVITY ENGINE v1.2
 * Smooth, weightless UI micro-interactions for Medical365
 * ═══════════════════════════════════════════════════════════════
 */

document.addEventListener('DOMContentLoaded', () => {
    // Target main UI elements for the interactive parallax-tilt effect
    const floatElements = document.querySelectorAll('.overlapping-card, .btn-primary, .stat-card, .step-card, .badge, .pain-visual img, .hero-visual-3d img');

    floatElements.forEach(el => {
        // Ensure transition is smooth
        el.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease';

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Subtle rotation based on mouse position (max 8 degrees)
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            // Apply interactive float + tilt
            el.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
            el.style.zIndex = '100';
            
            // Stop the CSS animation while interacting
            el.style.animationPlayState = 'paused';
        });

        el.addEventListener('mouseleave', () => {
            // Restore original state and resume bobbing
            el.style.transform = '';
            el.style.zIndex = '';
            el.style.animationPlayState = 'running';
        });
    });

    console.log('Antigravity Engine engaged: Floating elements synchronized.');
});
