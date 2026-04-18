import { useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const INITIAL = { name: '', email: '', phone: '', service: '', message: '' };

export default function Contact() {
  const [form,       setForm]       = useState(INITIAL);
  const [errors,     setErrors]     = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success,    setSuccess]    = useState(false);

  const headerRef = useScrollReveal('up');
  const formRef   = useScrollReveal('left', 100);
  const infoRef   = useScrollReveal('right', 150);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = true;
    if (!form.email.trim())   e.email   = true;
    if (!form.message.trim()) e.message = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(e => ({ ...e, [name]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1800));
    setSubmitting(false);
    setSuccess(true);
    setForm(INITIAL);

    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <section className="section" id="contact">
      <div className="section__bg-glow section__bg-glow--left" />
      <div className="container">
        <div className="section-header" ref={headerRef}>
          <div className="section-tag">Get In Touch</div>
          <h2 className="section-title">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="section-subtitle">
            Tell us about your project — we respond within 24 hours.
          </p>
        </div>

        <div className="contact__grid">
          {/* Form */}
          <div className="contact__form-wrap" ref={formRef}>
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <div className={`input-wrap${errors.name ? ' input-wrap--error' : ''}`}>
                    <i className="fa-solid fa-user" />
                    <input
                      type="text" id="name" name="name"
                      placeholder="John Doe"
                      value={form.name} onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <div className={`input-wrap${errors.email ? ' input-wrap--error' : ''}`}>
                    <i className="fa-solid fa-envelope" />
                    <input
                      type="email" id="email" name="email"
                      placeholder="john@company.com"
                      value={form.email} onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <div className="input-wrap">
                    <i className="fa-solid fa-phone" />
                    <input
                      type="tel" id="phone" name="phone"
                      placeholder="+91 98765 43210"
                      value={form.phone} onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="service">Service Interested In</label>
                  <div className="input-wrap input-wrap--select">
                    <i className="fa-solid fa-layer-group" />
                    <select id="service" name="service" value={form.service} onChange={handleChange}>
                      <option value="">Select a service…</option>
                      <option>AI Tools (Chatbots / LLMs / Smart Assistants)</option>
                      <option>Website Development</option>
                      <option>AI Automation</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-group form-group--full">
                <label htmlFor="message">Project Details</label>
                <div className={`input-wrap input-wrap--textarea${errors.message ? ' input-wrap--error' : ''}`}>
                  <i className="fa-solid fa-message" />
                  <textarea
                    id="message" name="message" rows={5}
                    placeholder="Tell us about your project, goals, and timeline…"
                    value={form.message} onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn--primary btn--lg btn--full btn--submit"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <i className="fa-solid fa-circle-notch fa-spin" /> Sending…
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <i className="fa-solid fa-paper-plane btn__icon" />
                  </>
                )}
              </button>

              {success && (
                <div className="form-success">
                  <i className="fa-solid fa-circle-check" />
                  <p>Message sent! We'll get back to you within 24 hours.</p>
                </div>
              )}
            </form>
          </div>

          {/* Info */}
          <div className="contact__info" ref={infoRef}>
            <div className="contact-info-card">
              <h3>Contact Information</h3>
              <p>Ready to start your project? Reach us through any channel below.</p>

              <div className="contact-info-items">
                {[
                  { icon: 'fa-brands fa-whatsapp',    label: 'WhatsApp',       value: '+91 7058682657',            href: 'https://wa.me/917058682657' },
                  { icon: 'fa-solid fa-envelope',     label: 'Email Us',       value: 'gbro_industries@zohomail.in', href: 'mailto:gbro_industries@zohomail.in' },
                  { icon: 'fa-solid fa-clock',        label: 'Business Hours', value: 'Mon–Sat: 9 AM – 7 PM IST' },
                  { icon: 'fa-solid fa-location-dot', label: 'Head Office',    value: 'Ghoti, Nashik Maharashtra 422402, India' },
                ].map(({ icon, label, value, href }) => (
                  <div className="contact-info-item" key={label}>
                    <div className="contact-info-item__icon"><i className={icon} /></div>
                    <div>
                      <strong>{label}</strong>
                      {href
                        ? <a href={href} target="_blank" rel="noopener noreferrer">{value}</a>
                        : <span>{value}</span>
                      }
                    </div>
                  </div>
                ))}
              </div>

              <div className="contact-social">
                <a
                  href="https://www.linkedin.com/company/gbro-industries/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <i className="fa-brands fa-linkedin" />
                </a>
                <a
                  href="https://www.instagram.com/gbro_industries?utm_source=qr&igsh=MXFvdjdqOXBwMXg4cg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <i className="fa-brands fa-instagram" />
                </a>
                <a
                  href="https://wa.me/917058682657"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp" />
                </a>
              </div>
            </div>

            <a
              href="https://wa.me/917058682657"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-cta"
            >
              <i className="fa-brands fa-whatsapp" />
              <div>
                <strong>Chat Instantly on WhatsApp</strong>
                <span>Fastest response — usually within minutes</span>
              </div>
              <i className="fa-solid fa-arrow-right" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
