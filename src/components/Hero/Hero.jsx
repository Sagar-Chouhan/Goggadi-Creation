import { useState, useEffect, useMemo } from 'react';
import { brandDetails, imageCatalog } from '../../utils/data';

export function Hero({ openSlider }) {
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const heroSlides = useMemo(() => imageCatalog.slice(0, 4), []);

  useEffect(() => {
    if (heroSlides.length <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setHeroSlideIndex((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <section className="hero-section" id="top">
      <div className="hero-grid">
        <div className="hero-display">
          <div className="hero-carousel">
            <div className="hero-screen-frame">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  className={`hero-slide ${index === heroSlideIndex ? 'is-active' : ''}`}
                  onClick={() => openSlider(slide.id)}
                  aria-label={`Open ${slide.title}`}
                >
                  <img src={slide.src} alt={slide.title} loading="eager" fetchPriority="high" />
                </button>
              ))}

              <div className="hero-screen-controls" aria-hidden="true">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    className={index === heroSlideIndex ? 'is-active' : ''}
                    onClick={() => setHeroSlideIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                className="carousel-arrow carousel-prev"
                onClick={() => setHeroSlideIndex((current) => (current - 1 + heroSlides.length) % heroSlides.length)}
                aria-label="Previous slide"
              >
                ←
              </button>
              <button
                type="button"
                className="carousel-arrow carousel-next"
                onClick={() => setHeroSlideIndex((current) => (current + 1) % heroSlides.length)}
                aria-label="Next slide"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Text overlay on right side of hero */}
        <div className="hero-copy">
          <p className="section-kicker">GOGGADI CREATION</p>
          <h1>Handcrafted Bags With a Premium Everyday Feel</h1>
          <p className="hero-text">
            Discover polished sling and cross-body bags designed for daily comfort, clean styling,
            and long-lasting use.
          </p>

          <div className="storefront-price-row">
            <span>New season collection</span>
            <strong>Starting at Rs. 199</strong>
          </div>

          <div className="hero-actions">
            <a href="#products" className="button button-primary">Shop Collection</a>
            <a
              href="https://wa.me/917982383793?text=Hi%2C%20I%20want%20to%20know%20more%20about%20your%20handbag%20collection"
              target="_blank"
              rel="noreferrer"
              className="button button-secondary"
            >
              WhatsApp Enquiry
            </a>
          </div>

          <div className="detail-strip" aria-label="Brand details">
            {brandDetails.map((detail, index) => (
              <div key={detail} className="detail-chip" style={{ '--reveal-delay': `${index * 120}ms` }}>
                <span className="detail-dot" aria-hidden="true" />
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
