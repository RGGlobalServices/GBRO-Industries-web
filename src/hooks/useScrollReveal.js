import { useEffect, useRef } from 'react';

/**
 * Observes an element and adds 'in-view' class when it enters viewport.
 * @param {string} direction - 'up' | 'left' | 'right' | 'scale'
 * @param {number} delay      - ms delay before revealing
 */
export function useScrollReveal(direction = 'up', delay = 0) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.add('reveal', `reveal--${direction}`);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('in-view'), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [direction, delay]);

  return ref;
}
