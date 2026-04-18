/**
 * GBRO Industries — Main JavaScript
 * GSAP animations, scroll effects, interactions, UI components
 */

(function () {
  'use strict';

  // ─── Utility: DOM selectors ──────────────────────────────────
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];

  // ─── Preloader ──────────────────────────────────────────────
  function initPreloader() {
    const preloader = $('#preloader');
    if (!preloader) return;

    // Wait for fill animation (~1.8s) then hide
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
      initHeroAnimations();
    }, 2000);
  }

  // Prevent scroll during preload
  document.body.style.overflow = 'hidden';

  // ─── Custom Cursor ───────────────────────────────────────────
  function initCursor() {
    const cursor   = $('#cursor');
    const follower = $('#cursorFollower');
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    });

    // Smooth follower
    function updateFollower() {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      follower.style.left = followerX + 'px';
      follower.style.top  = followerY + 'px';
      requestAnimationFrame(updateFollower);
    }
    updateFollower();

    // Hover effects
    const hoverEls = $$('a, button, .service-card, .portfolio-card, .why-card, .filter-btn');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor--hover');
        follower.classList.add('cursor-follower--hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor--hover');
        follower.classList.remove('cursor-follower--hover');
      });
    });
  }

  // ─── Navbar ─────────────────────────────────────────────────
  function initNavbar() {
    const navbar    = $('#navbar');
    const toggle    = $('#navToggle');
    const navLinks  = $('#navLinks');
    const links     = $$('.nav-link');

    if (!navbar) return;

    // Scroll effect
    let lastScrollY = 0;
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      navbar.classList.toggle('scrolled', scrollY > 50);

      // Hide on scroll down, show on scroll up (only on mobile)
      if (window.innerWidth < 768) {
        if (scrollY > lastScrollY && scrollY > 100) {
          navbar.style.transform = 'translateY(-100%)';
        } else {
          navbar.style.transform = 'translateY(0)';
        }
      }
      lastScrollY = scrollY;
    });

    // Mobile toggle
    if (toggle && navLinks) {
      toggle.addEventListener('click', () => {
        toggle.classList.toggle('open');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
      });
    }

    // Active link on scroll
    const sections = $$('section[id]');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach(s => observer.observe(s));

    // Close mobile nav on link click
    links.forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks) navLinks.classList.remove('open');
        if (toggle) toggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ─── Hero GSAP Animations ───────────────────────────────────
  function initHeroAnimations() {
    if (typeof gsap === 'undefined') {
      // Fallback: just show all items
      $$('.reveal-item').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Stagger hero reveal items
    tl.to('.hero__badge', { opacity: 1, y: 0, duration: 0.8 })
      .to('.hero__headline', { opacity: 1, y: 0, duration: 0.9 }, '-=0.4')
      .to('.hero__subheadline', { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .to('.hero__desc', { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
      .to('.hero__cta', { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
      .to('.hero__stats', { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
      .to('.hero__visual', { opacity: 1, y: 0, duration: 0.8 }, '-=0.5');
  }

  // ─── Scroll Reveal (Intersection Observer) ──────────────────
  function initScrollReveal() {
    const revealEls = $$('[data-reveal]');
    if (!revealEls.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el    = entry.target;
        const delay = parseInt(el.dataset.delay || '0', 10);

        setTimeout(() => {
          el.classList.add('revealed');
        }, delay);

        observer.unobserve(el);
      });
    }, {
      threshold:  0.15,
      rootMargin: '0px 0px -40px 0px',
    });

    revealEls.forEach(el => observer.observe(el));
  }

  // ─── GSAP ScrollTrigger Animations ──────────────────────────
  function initGSAPScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Marquee strip speed boost on scroll
    ScrollTrigger.create({
      trigger: '.marquee-strip',
      start: 'top 80%',
      onEnter: () => {
        gsap.to('.marquee-track', { animationDuration: '14s', duration: 0.5 });
      },
    });

    // Services cards stagger
    gsap.from('.service-card', {
      scrollTrigger: {
        trigger: '.services__grid',
        start: 'top 80%',
      },
      opacity: 0,
      y: 50,
      scale: 0.95,
      stagger: 0.12,
      duration: 0.7,
      ease: 'power3.out',
    });

    // Why cards stagger
    gsap.from('.why-card', {
      scrollTrigger: {
        trigger: '.why-us__grid',
        start: 'top 80%',
      },
      opacity: 0,
      y: 40,
      stagger: 0.1,
      duration: 0.65,
      ease: 'power2.out',
    });

    // Portfolio cards
    gsap.from('.portfolio-card', {
      scrollTrigger: {
        trigger: '.portfolio__grid',
        start: 'top 80%',
      },
      opacity: 0,
      y: 40,
      stagger: 0.08,
      duration: 0.6,
      ease: 'power2.out',
    });

    // CTA section title
    gsap.from('.cta-section__title', {
      scrollTrigger: {
        trigger: '.cta-section',
        start: 'top 75%',
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
    });

    // Parallax hero canvas
    gsap.to('.hero__canvas', {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
      opacity: 0.2,
      scale: 0.95,
    });
  }

  // ─── Counter Animation ──────────────────────────────────────
  function initCounters() {
    const counters = $$('.counter');
    if (!counters.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '+';
        let   current = 0;
        const step    = Math.ceil(target / 60); // ~60 frames
        const ticker  = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current + suffix;
          if (current >= target) clearInterval(ticker);
        }, 25);

        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
  }

  // ─── Testimonials Carousel ──────────────────────────────────
  function initCarousel() {
    const track   = $('#testimonialsTrack');
    const prevBtn = $('#prevBtn');
    const nextBtn = $('#nextBtn');
    const dots    = $$('.dot');

    if (!track) return;

    const cards     = $$('.testimonial-card');
    const total     = cards.length;
    let   current   = 0;
    let   autoplay  = null;
    let   cardWidth = 0;

    function getCardWidth() {
      const card = cards[0];
      if (!card) return 0;
      const style  = getComputedStyle(card);
      const margin = parseFloat(style.marginRight) || 24;
      return card.offsetWidth + margin;
    }

    function goTo(index) {
      current = (index + total) % total;
      cardWidth = getCardWidth();
      track.style.transform = `translateX(-${current * cardWidth}px)`;

      dots.forEach((dot, i) => {
        dot.classList.toggle('dot--active', i === current);
      });
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startAutoplay() {
      autoplay = setInterval(next, 4500);
    }
    function stopAutoplay() {
      clearInterval(autoplay);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoplay(); prev(); startAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoplay(); next(); startAutoplay(); });

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        stopAutoplay();
        goTo(parseInt(dot.dataset.index, 10));
        startAutoplay();
      });
    });

    // Touch / swipe
    let touchStartX = 0;
    track.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        stopAutoplay();
        diff > 0 ? next() : prev();
        startAutoplay();
      }
    }, { passive: true });

    // Init
    goTo(0);
    startAutoplay();

    // Recalculate on resize
    window.addEventListener('resize', () => goTo(current));
  }

  // ─── Portfolio Filter ────────────────────────────────────────
  function initPortfolioFilter() {
    const buttons = $$('.filter-btn');
    const cards   = $$('.portfolio-card');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('filter-btn--active'));
        btn.classList.add('filter-btn--active');

        const filter = btn.dataset.filter;

        cards.forEach((card, i) => {
          const match = filter === 'all' || card.dataset.category === filter;

          if (match) {
            card.classList.remove('hidden');
            card.style.animation = `fadeInUp 0.5s ease ${i * 0.05}s both`;
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // ─── CTA Particles ──────────────────────────────────────────
  function initCTAParticles() {
    const container = $('#ctaParticles');
    if (!container) return;

    const COUNT = 18;
    for (let i = 0; i < COUNT; i++) {
      const p = document.createElement('div');
      p.classList.add('cta-particle');

      const size  = 30 + Math.random() * 80;
      const left  = Math.random() * 100;
      const top   = Math.random() * 100;
      const delay = Math.random() * 6;
      const dur   = 4 + Math.random() * 4;

      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        top: ${top}%;
        animation-delay: ${delay}s;
        animation-duration: ${dur}s;
      `;
      container.appendChild(p);
    }
  }

  // ─── Contact Form ────────────────────────────────────────────
  function initContactForm() {
    const form      = $('#contactForm');
    const submitBtn = $('#submitBtn');
    const success   = $('#formSuccess');

    if (!form) return;

    form.addEventListener('submit', async e => {
      e.preventDefault();

      // Basic validation
      const inputs  = form.querySelectorAll('input[required], textarea[required]');
      let   isValid = true;

      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#ef4444';
          input.addEventListener('input', () => { input.style.borderColor = ''; }, { once: true });
        }
      });

      if (!isValid) {
        // Shake animation
        form.style.animation = 'none';
        form.offsetHeight; // reflow
        form.style.animation = 'shakeForm 0.4s ease';
        return;
      }

      // Show loading
      const btnText    = submitBtn.querySelector('.btn-text');
      const btnLoading = submitBtn.querySelector('.btn-loading');
      const btnIcon    = submitBtn.querySelector('.btn-icon-main');

      submitBtn.disabled = true;
      if (btnText)    btnText.style.display    = 'none';
      if (btnLoading) btnLoading.style.display = 'inline-flex';
      if (btnIcon)    btnIcon.style.display    = 'none';

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1800));

      // Show success
      submitBtn.style.display = 'none';
      if (success) success.style.display = 'flex';
      form.reset();

      // Re-enable after 5 seconds
      setTimeout(() => {
        submitBtn.style.display = '';
        submitBtn.disabled = false;
        if (btnText)    btnText.style.display    = '';
        if (btnLoading) btnLoading.style.display = 'none';
        if (btnIcon)    btnIcon.style.display    = '';
        if (success) success.style.display = 'none';
      }, 5000);
    });

    // Add shake keyframe dynamically
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shakeForm {
        0%, 100% { transform: translateX(0); }
        20%       { transform: translateX(-8px); }
        40%       { transform: translateX(8px); }
        60%       { transform: translateX(-6px); }
        80%       { transform: translateX(6px); }
      }
    `;
    document.head.appendChild(style);
  }

  // ─── Back to Top ─────────────────────────────────────────────
  function initBackToTop() {
    const btn = $('#backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ─── Smooth Scroll ───────────────────────────────────────────
  function initSmoothScroll() {
    $$('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (href === '#') return;

        const target = $(href);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  // ─── Button Ripple Effect ────────────────────────────────────
  function initRippleEffect() {
    $$('.btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        const rect   = this.getBoundingClientRect();
        const x      = e.clientX - rect.left;
        const y      = e.clientY - rect.top;
        const ripple = document.createElement('span');

        ripple.style.cssText = `
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.25);
          width: 10px; height: 10px;
          left: ${x - 5}px; top: ${y - 5}px;
          transform: scale(0);
          animation: rippleAnim 0.5s ease-out forwards;
          pointer-events: none;
        `;

        this.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
      });
    });

    const style = document.createElement('style');
    style.textContent = `
      @keyframes rippleAnim {
        to { transform: scale(30); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  // ─── Tilt Effect on Service Cards ───────────────────────────
  function initTiltEffect() {
    $$('.service-card, .stat-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect   = card.getBoundingClientRect();
        const x      = e.clientX - rect.left;
        const y      = e.clientY - rect.top;
        const cx     = rect.width  / 2;
        const cy     = rect.height / 2;
        const rotX   = ((y - cy) / cy) * -8;
        const rotY   = ((x - cx) / cx) *  8;

        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ─── Typewriter Effect on Hero Headline ─────────────────────
  function initTypewriter() {
    // Runs after hero animations are done
    // We do a subtle character-by-character glow on the gradient text
    const gradientText = $('.gradient-text');
    if (!gradientText) return;

    // No destructive change — just add a subtle shine animation
    gradientText.style.backgroundSize = '200% 200%';
    gradientText.style.animation = 'gradientShine 4s ease infinite';

    const style = document.createElement('style');
    style.textContent = `
      @keyframes gradientShine {
        0%   { background-position: 0%   50%; }
        50%  { background-position: 100% 50%; }
        100% { background-position: 0%   50%; }
      }
    `;
    document.head.appendChild(style);
  }

  // ─── Scroll-based Navbar Transparency ───────────────────────
  function initNavTransparency() {
    const navbar = $('#navbar');
    if (!navbar) return;
    navbar.style.transition = 'padding 0.35s cubic-bezier(0.4,0,0.2,1), background 0.35s, box-shadow 0.35s, transform 0.35s';
  }

  // ─── Active Section Highlight ────────────────────────────────
  function initActiveSectionTracker() {
    const sections = $$('section[id]');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id   = '#' + entry.target.id;
            const link = $(`.nav-link[href="${id}"]`);
            $$('.nav-link').forEach(l => l.classList.remove('active'));
            if (link) link.classList.add('active');
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );
    sections.forEach(s => observer.observe(s));
  }

  // ─── Hover Sound Effect (subtle visual feedback) ─────────────
  function initGlowHover() {
    $$('.why-card__icon, .service-card__icon').forEach(icon => {
      icon.parentElement.addEventListener('mouseenter', () => {
        icon.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.4), 0 0 40px rgba(124, 58, 237, 0.2)';
      });
      icon.parentElement.addEventListener('mouseleave', () => {
        icon.style.boxShadow = '';
      });
    });
  }

  // ─── Init All ────────────────────────────────────────────────
  function init() {
    initPreloader();
    initCursor();
    initNavbar();
    initScrollReveal();
    initGSAPScrollAnimations();
    initCounters();
    initCarousel();
    initPortfolioFilter();
    initCTAParticles();
    initContactForm();
    initBackToTop();
    initSmoothScroll();
    initRippleEffect();
    initTiltEffect();
    initTypewriter();
    initNavTransparency();
    initActiveSectionTracker();
    initGlowHover();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
