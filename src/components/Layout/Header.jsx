import { useState, useEffect } from 'react';
import { Icon } from '../UI/Icon';
import { navLinks } from '../../utils/data';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Utility Bar */}
      <div className="utility-bar">
        <div className="utility-left">
          <span className="utility-badge">🇮🇳 Made in India</span>
          <span className="utility-separator">|</span>
          <span>Free Delivery on Orders ₹499+</span>
        </div>
        <div className="utility-right">
          <a href="tel:+917982383793">📞 +91 7982383793</a>
        </div>
      </div>

      {/* Brand Mark */}
      <div className={`brand-bar ${scrolled ? 'brand-bar-hidden' : ''}`}>
        <a className="brand-mark" href="#top" aria-label="Goggadi Creation home">
          Goggadi Creation
        </a>
        <p className="brand-tagline">Premium Handcrafted Bags</p>
      </div>

      {/* Main Navigation */}
      <header className={`site-header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="header-row">
          <a className="header-brand-mini" href="#top">
            Goggadi Creation
          </a>

          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className={`hamburger ${menuOpen ? 'is-open' : ''}`} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>

          <nav id="main-navigation" className={`mini-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Brand navigation">
            {navLinks.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
            <a
              className="mini-nav-support"
              href="https://wa.me/917982383793?text=Hi%2C%20I%20need%20support%20for%20your%20products"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              <Icon type="whatsapp" className="ui-icon ui-icon-sm" />
              <span>Contact Support</span>
            </a>
          </nav>

          <div className="header-actions">
            <a
              className="mini-support"
              href="https://wa.me/917982383793?text=Hi%2C%20I%20need%20support%20for%20your%20products"
              target="_blank"
              rel="noreferrer"
            >
              <Icon type="whatsapp" className="ui-icon ui-icon-sm" />
              <strong>Contact Support</strong>
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
