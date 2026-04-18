import { useEffect, useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function CTASection() {
  const particlesRef = useRef(null);
  const innerRef     = useScrollReveal('up');

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      p.classList.add('cta-particle');
      const size  = 30 + Math.random() * 80;
      const left  = Math.random() * 100;
      const top   = Math.random() * 100;
      p.style.cssText = `
        width:${size}px; height:${size}px;
        left:${left}%; top:${top}%;
        animation-delay:${Math.random() * 6}s;
        animation-duration:${4 + Math.random() * 4}s;
      `;
      container.appendChild(p);
    }

    return () => { container.innerHTML = ''; };
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="cta-section section" id="cta">
      <div className="cta-section__particles" ref={particlesRef} />
      <div className="container">
        <div className="cta-section__inner" ref={innerRef}>
          <div className="section-tag section-tag--light">Ready to Launch?</div>
          <h2 className="cta-section__title">
            Let's Build Your<br />
            <span className="gradient-text">Digital Future</span>
          </h2>
          <p className="cta-section__desc">
            Join 150+ businesses that trust GBRO Industries to power their digital
            growth. Your transformation starts with a single conversation.
          </p>
          <div className="cta-section__actions">
            <a href="#contact" className="btn btn--primary btn--xl btn--pulse" onClick={handleClick}>
              Start Your Project <i className="fa-solid fa-arrow-right btn__icon" />
            </a>
            <a
              href="https://wa.me/917058682657"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--whatsapp btn--xl"
            >
              <i className="fa-brands fa-whatsapp" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
