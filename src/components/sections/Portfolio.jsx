import { useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const PROJECTS = [
  {
    id: 1, category: 'ai', mediaClass: 'portfolio-card__media--1',
    title: 'AI Chatbot Platform',
    tags: ['AI', 'NLP', 'Python'],
    desc: 'Intelligent customer support automation with 95% resolution rate.',
  },
  {
    id: 2, category: 'web', mediaClass: 'portfolio-card__media--2',
    title: 'SaaS Analytics Dashboard',
    tags: ['React', 'Next.js', 'TypeScript'],
    desc: 'Real-time data visualization platform for 10,000+ daily active users.',
  },
  {
    id: 3, category: 'automation', mediaClass: 'portfolio-card__media--3',
    title: 'Supply Chain Automation',
    tags: ['RPA', 'Python', 'ML'],
    desc: 'Reduced manual processing by 87% for a Fortune 500 logistics firm.',
  },
  {
    id: 4, category: 'web', mediaClass: 'portfolio-card__media--4',
    title: 'E-Commerce Platform',
    tags: ['Vue.js', 'Node.js', 'MongoDB'],
    desc: 'Full-featured marketplace with AI-powered product recommendations.',
  },
  {
    id: 5, category: 'ai', mediaClass: 'portfolio-card__media--5',
    title: 'Predictive Analytics Engine',
    tags: ['ML', 'TensorFlow', 'FastAPI'],
    desc: 'Sales forecasting model achieving 94% accuracy for retail chain.',
  },
  {
    id: 6, category: 'automation', mediaClass: 'portfolio-card__media--6',
    title: 'HR Workflow Platform',
    tags: ['Automation', 'React', 'AWS'],
    desc: 'Automated onboarding & payroll management for 500-person org.',
  },
];

const FILTERS = [
  { label: 'All',        value: 'all' },
  { label: 'Web',        value: 'web' },
  { label: 'AI',         value: 'ai' },
  { label: 'Automation', value: 'automation' },
];

function PortfolioCard({ project, index }) {
  const ref = useScrollReveal('up', (index % 3) * 80);
  return (
    <div className="portfolio-card" ref={ref} style={{ animationDelay: `${index * 0.05}s` }}>
      <div className={`portfolio-card__media ${project.mediaClass}`}>
        <div className="portfolio-card__overlay">
          <h3>{project.title}</h3>
          <div className="portfolio-card__tags">
            {project.tags.map(t => <span key={t}>{t}</span>)}
          </div>
          <a
            href="#contact"
            className="btn btn--sm btn--primary"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            View Project
          </a>
        </div>
      </div>
      <div className="portfolio-card__info">
        <h3>{project.title}</h3>
        <p>{project.desc}</p>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const headerRef  = useScrollReveal('up');
  const filterRef  = useScrollReveal('up', 100);

  const visible = PROJECTS.filter(
    p => activeFilter === 'all' || p.category === activeFilter
  );

  return (
    <section className="portfolio section" id="portfolio">
      <div className="section__bg-glow section__bg-glow--right" />
      <div className="container">
        <div className="section-header" ref={headerRef}>
          <div className="section-tag">Our Work</div>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            A glimpse at some of the impactful solutions we've shipped.
          </p>
        </div>

        <div className="portfolio__filters" ref={filterRef}>
          {FILTERS.map(f => (
            <button
              key={f.value}
              className={`filter-btn${activeFilter === f.value ? ' filter-btn--active' : ''}`}
              onClick={() => setActiveFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="portfolio__grid">
          {visible.map((project, i) => (
            <PortfolioCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
