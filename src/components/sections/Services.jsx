import { useScrollReveal } from '../../hooks/useScrollReveal';

const SERVICES = [
  {
    icon: 'fa-solid fa-brain',
    title: 'AI Tools',
    desc: 'Custom-built AI-powered tools that transform how your business operates — from intelligent chatbots to advanced language models and smart assistants.',
    items: ['AI Chatbots & Conversational AI', 'Large Language Models (LLMs)', 'Smart Assistants & Voice AI'],
  },
  {
    icon: 'fa-solid fa-globe',
    title: 'Website Development',
    desc: 'High-performance, visually stunning websites and web applications engineered for speed, SEO, and conversion — built to grow your business.',
    items: ['React / Next.js / Vue Apps', 'Landing Pages & Business Sites', 'E-commerce & Web Portals'],
  },
  {
    icon: 'fa-solid fa-robot',
    title: 'AI Automation',
    desc: 'Eliminate repetitive tasks with intelligent AI automation pipelines. Let machines handle the routine so your team can focus on what matters.',
    items: ['AI Workflow Automation', 'Business Process Intelligence', 'CRM & Lead Automation'],
  },
];

function ServiceCard({ service, delay }) {
  const ref = useScrollReveal('up', delay);
  return (
    <div
      ref={ref}
      className="service-card"
    >
      <div className="service-card__glow" />
      <div className="service-card__icon">
        <i className={service.icon} />
      </div>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__desc">{service.desc}</p>
      <ul className="service-card__list">
        {service.items.map((item) => (
          <li key={item}>
            <i className="fa-solid fa-chevron-right" />
            {item}
          </li>
        ))}
      </ul>
      <a
        href="#contact"
        className="service-card__link"
        onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
      >
        Get Started <i className="fa-solid fa-arrow-right" />
      </a>
    </div>
  );
}

export default function Services() {
  const headerRef = useScrollReveal('up');

  return (
    <section className="services section" id="services">
      <div className="section__bg-glow section__bg-glow--right" />
      <div className="container">
        <div className="section-header" ref={headerRef}>
          <div className="section-tag">What We Do</div>
          <h2 className="section-title">
            Our <span className="gradient-text">Core Services</span>
          </h2>
          <p className="section-subtitle">
            Comprehensive digital solutions engineered for performance, scalability, and impact.
          </p>
        </div>

        <div className="services__grid">
          {SERVICES.map((svc, i) => (
            <ServiceCard key={svc.title} service={svc} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
