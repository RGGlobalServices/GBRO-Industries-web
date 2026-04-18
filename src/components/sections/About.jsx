import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useCounter } from '../../hooks/useCounter';

function StatCard({ icon, target, suffix = '+', label, isStatic, staticValue }) {
  const { count, ref } = useCounter(target || 0);
  return (
    <div className="stat-card" ref={ref}>
      <div className="stat-card__icon"><i className={icon} /></div>
      <span className="stat-card__num">
        {isStatic ? staticValue : `${count}${suffix}`}
      </span>
      <span className="stat-card__label">{label}</span>
    </div>
  );
}

export default function About() {
  const textRef  = useScrollReveal('left',  0);
  const statsRef = useScrollReveal('right', 100);

  return (
    <section className="about section" id="about">
      <div className="section__bg-glow section__bg-glow--left" />
      <div className="container">
        <div className="about__grid">

          {/* Left: Text */}
          <div className="about__text" ref={textRef}>
            <div className="section-tag">About Us</div>
            <h2 className="section-title">
              We Are <span className="gradient-text">GBRO Industries</span>
            </h2>
            <p className="section-body">
              GBRO Industries is a cutting-edge technology company specialising in
              AI Tools, Website Development, and AI Automation. We build intelligent
              chatbots, LLMs, and smart assistants that transform how businesses operate
              — partnering with you to deliver measurable, lasting digital growth.
            </p>
            <p className="section-body">
              From startups to enterprises, we deliver end-to-end digital transformation
              with a relentless focus on performance, design excellence, and innovation.
            </p>

            <ul className="about__features">
              <li><i className="fa-solid fa-circle-check" /> 100% Client Satisfaction Guarantee</li>
              <li><i className="fa-solid fa-circle-check" /> Agile Development with Rapid Delivery</li>
              <li><i className="fa-solid fa-circle-check" /> Post-Launch Support &amp; Maintenance</li>
              <li><i className="fa-solid fa-circle-check" /> Transparent Communication &amp; Reporting</li>
            </ul>

            <a
              href="#services"
              className="btn btn--primary btn--md"
              style={{ marginTop: '1.5rem', display: 'inline-flex' }}
              onClick={(e) => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              Explore Services <i className="fa-solid fa-arrow-right btn__icon" />
            </a>
          </div>

          {/* Right: Stats */}
          <div className="about__stats" ref={statsRef}>
            <StatCard icon="fa-solid fa-rocket"  target={10} label="Projects Delivered" />
            <StatCard icon="fa-solid fa-users"   target={10} label="Happy Clients" />
            <StatCard icon="fa-solid fa-trophy"  target={2}  label="Years Experience" />
            <StatCard icon="fa-solid fa-headset" isStatic staticValue="24/7" label="Support Available" />
          </div>

        </div>
      </div>
    </section>
  );
}
