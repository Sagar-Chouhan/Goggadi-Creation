function ContactGlyph({ type, className = 'contact-glyph' }) {
  if (type === 'phone') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path d="M6.5 3.5h3l1.6 4-2 1.7c1.2 2.4 3.2 4.4 5.6 5.6l1.7-2 4 1.6v3c0 .9-.7 1.6-1.6 1.6C10.8 19 5 13.2 5 6.6c0-.9.7-1.6 1.5-1.6Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === 'mail') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <rect x="4" y="5" width="16" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="m5.5 7.5 6.5 5 6.5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === 'shield') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path d="M12 3 18 5.2V10c0 4-2.3 6.8-6 10-3.7-3.2-6-6-6-10V5.2L12 3Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="m9.5 11 1.8 1.8 3.2-3.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === 'truck') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path d="M3 7h11v8H3zM14 9h3l2 2v4h-5V9Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <circle cx="7" cy="17" r="1.8" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17" cy="17" r="1.8" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  if (type === 'return') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path d="M8 7H4v4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 11a8 8 0 1 1 2.3 5.7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === 'heart') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path d="M12 20s-7-4.3-7-9.4A4.1 4.1 0 0 1 12 8a4.1 4.1 0 0 1 7 2.6C19 15.7 12 20 12 20Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    );
  }

  return null;
}

export function Contact() {
  return (
    <>
      {/* Brand Story Section */}
      <section className="brand-story" data-reveal="blur-in" data-reveal-duration="1000">
        <p className="brand-story-kicker">SINCE 2020</p>
        <h2 className="brand-story-name">Goggadi</h2>
        <p className="brand-story-text">
          Crafting premium handmade bags that combine traditional Indian artisanship with modern design.
          Each bag is a statement of style, strength, and reliability — made to accompany you everywhere.
        </p>
        <div className="brand-story-stats">
          <div className="stat-item">
            <span className="stat-number">5000+</span>
            <span className="stat-label">Happy Customers</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Unique Designs</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Handcrafted</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer" data-reveal="fade-up" data-stagger="120">
        <div className="footer-columns">
          {/* Column 1: Keep In Touch */}
          <div className="footer-col" data-stagger-child>
            <h3>Keep In Touch</h3>
            <p>Goggadi Creation</p>
            <p>New Delhi, India</p>
            <a href="tel:+917982383793" className="footer-contact-link">
              <ContactGlyph type="phone" />
              <span>+91 7982383793</span>
            </a>
            <a href="mailto:be481806@gmail.com" className="footer-contact-link">
              <ContactGlyph type="mail" />
              <span>be481806@gmail.com</span>
            </a>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col" data-stagger-child>
            <h3>Quick Links</h3>
            <a href="#products">Products</a>
            <a href="#collection">Full Collection</a>
            <a href="#craft">Our Craft</a>
            <a href="#stories">Reviews</a>
            <a href="#lookbook">Lookbook</a>
          </div>

          {/* Column 3: Newsletter */}
          <div className="footer-col" data-stagger-child>
            <h3>Stay Updated</h3>
            <p>Get notified about new arrivals and exclusive offers.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="Your email address"
                aria-label="Email address for newsletter"
              />
              <button type="submit" className="newsletter-submit">
                Subscribe →
              </button>
            </form>

            <div className="footer-trust">
              <div className="trust-item"><ContactGlyph type="shield" /> <span>Secure Payments</span></div>
              <div className="trust-item"><ContactGlyph type="truck" /> <span>Pan India Delivery</span></div>
              <div className="trust-item"><ContactGlyph type="return" /> <span>Easy Returns</span></div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © 2026 Goggadi Creation. Handcrafted in India.
          </p>
        </div>
      </footer>
    </>
  );
}
