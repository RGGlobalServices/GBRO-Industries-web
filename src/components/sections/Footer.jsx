const SERVICES_LINKS = ['AI Tools', 'Website Development', 'AI Automation'];
const COMPANY_LINKS  = [
  { label: 'About Us',      href: '#about' },
  { label: 'Portfolio',     href: '#portfolio' },
  { label: 'Testimonials',  href: '#testimonials' },
  { label: 'Contact',       href: '#contact' },
];

export default function Footer() {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container footer__grid">

          <div className="footer__brand">
            <a
              href="#home"
              className="navbar__logo"
              onClick={(e) => handleNavClick(e, '#home')}
              style={{ display: 'inline-flex', marginBottom: '0' }}
            >
              <span className="logo-g">G</span>
              <span className="logo-bro">BRO</span>
              <span className="logo-tag">Industries</span>
            </a>
            <p>
              Building future-ready digital solutions with AI, Web Development &amp; Automation.
            </p>
            <div className="footer__social">
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

          <div className="footer__col">
            <h4>Services</h4>
            <ul>
              {SERVICES_LINKS.map(s => (
                <li key={s}>
                  <a href="#services" onClick={(e) => handleNavClick(e, '#services')}>{s}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4>Company</h4>
            <ul>
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} onClick={(e) => handleNavClick(e, href)}>{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4>Contact</h4>
            <ul>
              <li><a href="https://wa.me/917058682657" target="_blank" rel="noopener noreferrer">+91 7058682657</a></li>
              <li><a href="mailto:gbro_industries@zohomail.in">gbro_industries@zohomail.in</a></li>
              <li><span>Ghoti, Nashik Maharashtra 422402, India</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>&copy; {new Date().getFullYear()} GBRO Industries. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
