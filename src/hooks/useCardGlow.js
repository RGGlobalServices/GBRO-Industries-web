import { useEffect } from 'react';

/**
 * Tracks mouse position over cards and updates CSS custom properties
 * --mouse-x and --mouse-y so the glow div follows the cursor.
 * Works on any element with class matching `selector`.
 */
export function useCardGlow(selector = '.service-card, .why-card, .stat-card, .testimonial-card') {
  useEffect(() => {
    const onMouseMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width)  * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    };

    const cards = document.querySelectorAll(selector);
    cards.forEach(card => {
      card.addEventListener('mousemove', onMouseMove);
    });

    return () => {
      cards.forEach(card => {
        card.removeEventListener('mousemove', onMouseMove);
      });
    };
  }, [selector]);
}
