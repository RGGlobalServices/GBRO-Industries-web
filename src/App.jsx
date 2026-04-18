import { useState, useEffect } from 'react';
import { useCardGlow } from './hooks/useCardGlow';
import Preloader     from './components/Preloader';
import Cursor        from './components/Cursor';
import Navbar        from './components/Navbar';
import Hero          from './components/sections/Hero';
import MarqueeStrip  from './components/sections/MarqueeStrip';
import About         from './components/sections/About';
import Services      from './components/sections/Services';
import WhyUs         from './components/sections/WhyUs';
import Portfolio     from './components/sections/Portfolio';
import Testimonials  from './components/sections/Testimonials';
import CTASection    from './components/sections/CTASection';
import Contact       from './components/sections/Contact';
import Footer        from './components/sections/Footer';
import BackToTop     from './components/BackToTop';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Mouse-tracking spotlight on all cards (runs after DOM is ready)
  useCardGlow('.service-card, .why-card, .stat-card, .testimonial-card');

  return (
    <>
      <Preloader visible={loading} />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <MarqueeStrip />
        <About />
        <Services />
        <WhyUs />
        <Portfolio />
        <Testimonials />
        <CTASection />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
