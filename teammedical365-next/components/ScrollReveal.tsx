"use client";

import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal, .fade-in, .fade-in-up, .fade-in-right, .fade-in-left');
    
    // Immediate check for elements already in viewport
    elements.forEach(el => {
      observer.observe(el);
      
      // Fallback: If for some reason observer doesn't trigger for elements on screen
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('active');
      }
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
