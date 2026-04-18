import { useState, useEffect, useRef, useCallback } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const INITIAL_TESTIMONIALS = [
  {
    id: 1,
    text: '"GBRO Industries transformed our business with an AI chatbot that handles 80% of customer queries automatically. Our support costs dropped by 60% in just 3 months."',
    name: 'Rahul Kapoor',
    role: 'CEO, TechRetail India',
    initials: 'RK',
    avatarClass: 'author-avatar--1',
    rating: 5,
  },
  {
    id: 2,
    text: '"The web platform they built for us is absolutely stunning. Performance scores hit 98/100 on Lighthouse. Our conversion rate increased by 45% post-launch."',
    name: 'Priya Sharma',
    role: 'Founder, BrandSpace Agency',
    initials: 'PS',
    avatarClass: 'author-avatar--2',
    rating: 5,
  },
  {
    id: 3,
    text: '"Their automation pipeline saved us 400+ hours per month. The ROI was visible within the first week of deployment. Exceptional team, exceptional work."',
    name: 'Arjun Mehta',
    role: 'CTO, LogiFlow Systems',
    initials: 'AM',
    avatarClass: 'author-avatar--3',
    rating: 5,
  },
  {
    id: 4,
    text: '"Working with GBRO felt like having an in-house tech team. They understood our vision instantly and delivered a product that exceeded all expectations."',
    name: 'Sneha Nair',
    role: 'Director, FinEdge Solutions',
    initials: 'SN',
    avatarClass: 'author-avatar--4',
    rating: 5,
  },
  {
    id: 5,
    text: '"Incredible attention to detail and lightning-fast delivery. Our new SaaS dashboard is clean, powerful, and our users absolutely love it. Highly recommend!"',
    name: 'Vikram Singh',
    role: 'Product Manager, Cloudify',
    initials: 'VS',
    avatarClass: 'author-avatar--5',
    rating: 5,
  },
  {
    id: 6,
    text: '"GBRO built our entire e-commerce platform from scratch. Sales jumped 3x within the first two months. A truly reliable and talented technology partner."',
    name: 'Ananya Patel',
    role: 'Founder, ShopEase',
    initials: 'AP',
    avatarClass: 'author-avatar--6',
    rating: 5,
  },
  {
    id: 7,
    text: '"Their AI integration completely revolutionized our lead generation process. We went from 20 leads/week to 200+ with zero extra headcount. Mind-blowing results."',
    name: 'Kiran Reddy',
    role: 'Sales Director, GrowthPulse',
    initials: 'KR',
    avatarClass: 'author-avatar--1',
    rating: 5,
  },
  {
    id: 8,
    text: '"Delivered the project on time, within budget, and with features we didn\'t even ask for. The proactive communication made the whole process smooth and stress-free."',
    name: 'Meera Joshi',
    role: 'COO, NexaWorks',
    initials: 'MJ',
    avatarClass: 'author-avatar--2',
    rating: 5,
  },
  {
    id: 9,
    text: '"The custom automation they built for our HR workflows saved us 50 hours a week. GBRO are true professionals who genuinely care about your business outcomes."',
    name: 'Siddharth Kumar',
    role: 'HR Manager, PeopleFirst Corp',
    initials: 'SK',
    avatarClass: 'author-avatar--3',
    rating: 5,
  },
];

const AVATAR_CLASSES = ['author-avatar--1','author-avatar--2','author-avatar--3','author-avatar--4','author-avatar--5','author-avatar--6'];

export default function Testimonials() {
  const [testimonials, setTestimonials]   = useState(INITIAL_TESTIMONIALS);
  const [showAll, setShowAll]             = useState(false);
  const [current, setCurrent]             = useState(0);
  const [showForm, setShowForm]           = useState(false);
  const [submitted, setSubmitted]         = useState(false);
  const [formData, setFormData]           = useState({ name: '', role: '', text: '', rating: 5 });
  const [hoverRating, setHoverRating]     = useState(0);

  const trackRef   = useRef(null);
  const autoRef    = useRef(null);
  const formRef    = useRef(null);
  const headerRef  = useScrollReveal('up');
  const carouselRef = useScrollReveal('up', 100);

  const visibleTestimonials = showAll ? testimonials : testimonials.slice(0, 5);
  const total = visibleTestimonials.length;
  const hasMore = testimonials.length > 5;

  const getCardWidth = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const card = track.firstElementChild;
    if (!card) return 0;
    return card.offsetWidth + 24;
  }, []);

  const goTo = useCallback((index) => {
    const next = ((index % total) + total) % total;
    setCurrent(next);
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${next * getCardWidth()}px)`;
    }
  }, [total, getCardWidth]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  const startAuto = useCallback(() => { autoRef.current = setInterval(next, 4500); }, [next]);
  const stopAuto  = useCallback(() => clearInterval(autoRef.current), []);

  useEffect(() => { startAuto(); return stopAuto; }, [startAuto, stopAuto]);

  // Reset position when showAll changes
  useEffect(() => {
    setCurrent(0);
    if (trackRef.current) trackRef.current.style.transform = 'translateX(0)';
  }, [showAll]);

  useEffect(() => {
    const onResize = () => goTo(current);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [current, goTo]);

  const touchStartX = useRef(0);
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { stopAuto(); diff > 0 ? next() : prev(); startAuto(); }
  };

  const handlePrev = () => { stopAuto(); prev(); startAuto(); };
  const handleNext = () => { stopAuto(); next(); startAuto(); };
  const handleDot  = (i) => { stopAuto(); goTo(i);  startAuto(); };

  const handleFormChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.text.trim()) return;
    const initials = formData.name.trim().split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    const avatarClass = AVATAR_CLASSES[testimonials.length % AVATAR_CLASSES.length];
    const newReview = {
      id: Date.now(),
      text: `"${formData.text.trim()}"`,
      name: formData.name.trim(),
      role: formData.role.trim() || 'Verified Client',
      initials,
      avatarClass,
      rating: Number(formData.rating),
    };
    setTestimonials(prev => [...prev, newReview]);
    setFormData({ name: '', role: '', text: '', rating: 5 });
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setShowForm(false); }, 3000);
  };

  return (
    <section className="section" id="testimonials">
      <div className="section__bg-glow section__bg-glow--left" />
      <div className="container">

        {/* Header */}
        <div className="section-header" ref={headerRef}>
          <div className="section-tag">Client Love</div>
          <h2 className="section-title">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="section-subtitle">Real results from real partnerships — straight from our clients' experiences.</p>
        </div>

        {/* Carousel */}
        <div className="testimonials__carousel" ref={carouselRef}>
          <div
            className="testimonials__track"
            ref={trackRef}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {visibleTestimonials.map((t) => (
              <div className="testimonial-card" key={t.id}>
                <div className="testimonial-card__quote">
                  <i className="fa-solid fa-quote-left" />
                </div>
                <div className="testimonial-card__stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i key={i} className={`fa-${i < t.rating ? 'solid' : 'regular'} fa-star`} />
                  ))}
                </div>
                <p className="testimonial-card__text">{t.text}</p>
                <div className="testimonial-card__author">
                  <div className={`author-avatar ${t.avatarClass}`}>{t.initials}</div>
                  <div className="author-info">
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="testimonials__controls">
            <button className="carousel-btn" onClick={handlePrev} aria-label="Previous">
              <i className="fa-solid fa-chevron-left" />
            </button>
            <div className="carousel-dots">
              {visibleTestimonials.map((_, i) => (
                <button
                  key={i}
                  className={`dot${current === i ? ' dot--active' : ''}`}
                  onClick={() => handleDot(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button className="carousel-btn" onClick={handleNext} aria-label="Next">
              <i className="fa-solid fa-chevron-right" />
            </button>
          </div>
        </div>

        {/* View All Button — only when more than 5 testimonials */}
        {hasMore && (
          <div className="testimonials__view-all">
            <button
              className={`btn ${showAll ? 'btn--secondary' : 'btn--primary'} btn--md`}
              onClick={() => { stopAuto(); setShowAll(prev => !prev); }}
              id="btn-view-all-testimonials"
            >
              {showAll ? (
                <><i className="fa-solid fa-chevron-up btn__icon btn__icon--left" /> Show Less</>
              ) : (
                <><i className="fa-solid fa-users btn__icon btn__icon--left" /> View All {testimonials.length} Reviews</>
              )}
            </button>
          </div>
        )}

        {/* Add Review CTA */}
        <div className="testimonials__add-review" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', justifyContent: 'center', width: '100%' }}>
          <p>Had a great experience with us? We'd love to hear from you!</p>
          <button
            className="btn btn--primary btn--md mt-6"
            onClick={() => { 
              setShowForm(prev => {
                const isOpening = !prev;
                if (isOpening) {
                  setTimeout(() => {
                    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 150);
                }
                return isOpening;
              }); 
              setSubmitted(false); 
            }}
            id="btn-add-client-review"
            style={{ fontWeight: 'bold', color: '#ffffff', boxShadow: '0 6px 0 rgba(76, 29, 149, 0.8), 0 10px 20px rgba(0, 0, 0, 0.4)', border: 'none' }}
          >
            <i className="fa-solid fa-star btn__icon btn__icon--left" />
            {showForm ? 'Cancel' : 'Share Your Experience'}
          </button>
        </div>

        {/* Review Submission Form */}
        {showForm && (
          <div className="review-form-wrap" ref={formRef}>
            <div className="review-form-header">
              <div className="review-form-header__icon">
                <i className="fa-solid fa-star" />
              </div>
              <h3>Share Your Review</h3>
              <p>Your feedback helps us grow and helps others make better decisions.</p>
            </div>

            {submitted ? (
              <div className="review-form__success">
                <i className="fa-solid fa-circle-check" />
                <div>
                  <strong>Thank you for your review!</strong>
                  <span>Your testimonial has been added to our wall of love.</span>
                </div>
              </div>
            ) : (
              <form className="review-form" onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                {/* Name & Role Row */}
                <div className="review-form__row" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  <div className="review-form__group" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <label htmlFor="review-name">Your Name *</label>
                    <div className="input-wrap">
                      <i className="fa-solid fa-user" />
                      <input
                        id="review-name"
                        name="name"
                        type="text"
                        placeholder="Rahul Kapoor"
                        value={formData.name}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="review-form__group" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <label htmlFor="review-role">Role / Company</label>
                    <div className="input-wrap">
                      <i className="fa-solid fa-briefcase" />
                      <input
                        id="review-role"
                        name="role"
                        type="text"
                        placeholder="CEO, My Company"
                        value={formData.role}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="review-form__divider" />

                {/* Star Rating Selector */}
                <div className="review-form__group" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <label>Your Rating *</label>
                  <div className="star-rating-picker" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        className="star-pick-btn"
                        style={{ 
                          background: 'none', 
                          border: 'none', 
                          fontSize: '1.8rem', 
                          cursor: 'pointer', 
                          color: star <= (hoverRating || formData.rating) ? '#fbbf24' : 'rgba(255, 255, 255, 0.2)',
                          transition: 'color 0.2s, transform 0.2s',
                          transform: star <= hoverRating ? 'scale(1.15)' : 'scale(1)'
                        }}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                        aria-label={`Rate ${star} stars`}
                      >
                        <i className="fa-solid fa-star" />
                      </button>
                    ))}
                    <span className="star-rating-label" style={{ color: '#fbbf24', fontWeight: 'bold', marginLeft: '12px' }}>
                      {hoverRating || formData.rating} / 5
                    </span>
                  </div>
                </div>

                <div className="review-form__divider" />

                {/* Review Text */}
                <div className="review-form__group" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <label htmlFor="review-text">Your Review *</label>
                  <div className="input-wrap input-wrap--textarea">
                    <i className="fa-solid fa-quote-left" />
                    <textarea
                      id="review-text"
                      name="text"
                      placeholder="Share your experience working with GBRO Industries..."
                      value={formData.text}
                      onChange={handleFormChange}
                      required
                      rows={6}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn--primary btn--md btn--submit review-form__submit" id="btn-submit-review">
                  <i className="fa-solid fa-paper-plane btn__icon btn__icon--left" />
                  Submit Review
                </button>
              </form>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
