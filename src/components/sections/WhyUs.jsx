import { useScrollReveal } from '../../hooks/useScrollReveal';

const WHY_ITEMS = [
  {
    icon: 'fa-solid fa-bolt',
    title: 'Lightning Fast Delivery',
    desc: 'Agile sprints with weekly demos. Launch MVPs in weeks, not months.',
  },
  {
    icon: 'fa-solid fa-shield-halved',
    title: 'Enterprise Security',
    desc: 'SOC2-aligned practices, encrypted data handling, penetration-tested systems.',
  },
  {
    icon: 'fa-solid fa-chart-line',
    title: 'Measurable ROI',
    desc: 'Every solution we build is tracked against your business KPIs from day one.',
  },
  {
    icon: 'fa-solid fa-arrows-rotate',
    title: 'Seamless Scalability',
    desc: 'Cloud-native architecture designed to grow from 100 to 10 million users.',
  },
  {
    icon: 'fa-solid fa-handshake',
    title: 'Dedicated Partnership',
    desc: 'Your success is our mission. Dedicated project managers & 24/7 support.',
  },
  {
    icon: 'fa-solid fa-microchip',
    title: 'Cutting-Edge Tech Stack',
    desc: 'We use the latest tools — AI/ML, edge computing, Web3, and beyond.',
  },
];

function WhyCard({ item, delay }) {
  const ref = useScrollReveal('up', delay);
  return (
    <div className="why-card" ref={ref}>
      <div className="why-card__icon">
        <i className={item.icon} />
      </div>
      <h3>{item.title}</h3>
      <p>{item.desc}</p>
    </div>
  );
}

export default function WhyUs() {
  const headerRef = useScrollReveal('up');

  return (
    <section className="section" id="why-us">
      <div className="section__bg-glow section__bg-glow--left" />
      <div className="container">
        <div className="section-header" ref={headerRef}>
          <div className="section-tag">Why GBRO</div>
          <h2 className="section-title">
            Why <span className="gradient-text">Choose Us?</span>
          </h2>
          <p className="section-subtitle">
            We don't just build products — we engineer competitive advantages.
          </p>
        </div>

        <div className="why-us__grid">
          {WHY_ITEMS.map((item, i) => (
            <WhyCard key={item.title} item={item} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
