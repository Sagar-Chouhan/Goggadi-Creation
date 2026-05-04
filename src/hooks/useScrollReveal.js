import { useEffect, useRef } from 'react';

/**
 * Enhanced scroll reveal hook with multiple animation types,
 * staggered children, parallax, and header scroll behavior.
 * 
 * Supported data-reveal values:
 *   "fade-up" (default), "fade-down", "fade-left", "fade-right",
 *   "zoom-in", "zoom-out", "flip-up", "clip-up"
 * 
 * Additional attributes:
 *   data-reveal-delay="200"  — custom delay in ms
 *   data-reveal-duration="800" — custom duration in ms
 *   data-stagger="80" — stagger children by this many ms
 *   data-parallax — enables parallax scroll on element
 */
export function useScrollReveal() {
  const rafRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.add('reveal-ready');

    // ─── 1. Intersection Observer for reveal animations ───
    const revealTargets = document.querySelectorAll('[data-reveal]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;

            // Apply custom delay if specified
            const delay = el.getAttribute('data-reveal-delay');
            if (delay) {
              el.style.transitionDelay = `${delay}ms`;
            }

            // Apply custom duration if specified
            const duration = el.getAttribute('data-reveal-duration');
            if (duration) {
              el.style.transitionDuration = `${duration}ms`;
            }

            // Stagger children if data-stagger is set
            const stagger = el.getAttribute('data-stagger');
            if (stagger) {
              const children = el.querySelectorAll('[data-stagger-child]');
              children.forEach((child, i) => {
                child.style.transitionDelay = `${i * parseInt(stagger, 10)}ms`;
                child.classList.add('is-visible');
              });
            }

            el.classList.add('is-visible');
            observer.unobserve(el); // only animate once
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    revealTargets.forEach((target) => observer.observe(target));

    // ─── 2. Parallax scroll effect ───
    const parallaxEls = document.querySelectorAll('[data-parallax]');

    function handleParallax() {
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-parallax')) || 0.15;
        const rect = el.getBoundingClientRect();
        const offsetFromCenter = rect.top + rect.height / 2 - window.innerHeight / 2;
        const translateY = offsetFromCenter * speed;
        el.style.transform = `translateY(${translateY}px)`;
      });
      rafRef.current = requestAnimationFrame(handleParallax);
    }

    if (parallaxEls.length > 0) {
      rafRef.current = requestAnimationFrame(handleParallax);
    }

    // ─── 3. Header shrink on scroll ───
    const header = document.querySelector('.site-header');
    const brandBar = document.querySelector('.brand-bar');
    function handleHeaderScroll() {
      const scrollY = window.scrollY;

      if (header) {
        if (scrollY > 60) {
          header.classList.add('header-scrolled');
        } else {
          header.classList.remove('header-scrolled');
        }
      }

      if (brandBar) {
        if (scrollY > 30) {
          brandBar.classList.add('brand-bar-hidden');
        } else {
          brandBar.classList.remove('brand-bar-hidden');
        }
      }
    }

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });

    // ─── 4. Smooth counter animation for elements with data-count ───
    const counterEls = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-count'), 10);
            const duration = 1500;
            const startTime = performance.now();

            function animateCount(now) {
              const progress = Math.min((now - startTime) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
              el.textContent = Math.round(eased * target);
              if (progress < 1) {
                requestAnimationFrame(animateCount);
              }
            }

            requestAnimationFrame(animateCount);
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    counterEls.forEach((el) => counterObserver.observe(el));

    // ─── Cleanup ───
    return () => {
      observer.disconnect();
      counterObserver.disconnect();
      window.removeEventListener('scroll', handleHeaderScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      document.documentElement.classList.remove('reveal-ready');
    };
  }, []);
}
