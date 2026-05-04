import { lookbookImages } from '../../utils/data';

export function Lookbook({ openSlider }) {
  return (
    <section id="lookbook" className="content-section lookbook-section" data-reveal="fade-up">
      <div className="section-heading" data-reveal="fade-up">
        <div>
          <p className="section-kicker">LOOKBOOK</p>
          <h2>Style Inspiration</h2>
        </div>
        <div className="cta-contact">
          <a href="https://wa.me/917982383793" target="_blank" rel="noreferrer" className="cta-link">
            View Full Gallery →
          </a>
        </div>
      </div>

      <div className="lookbook-masonry" data-reveal="zoom-in" data-stagger="80">
        {lookbookImages.map((image, index) => (
          <figure
            key={image.id}
            className={`lookbook-card ${index % 3 === 0 ? 'lookbook-card--tall' : ''}`}
            data-stagger-child
            style={{ '--reveal-delay': `${index * 80}ms` }}
          >
            <button
              type="button"
              className="image-button"
              onClick={() => openSlider(image.id)}
            >
              <img src={image.src} alt={image.title} loading="lazy" />
              <div className="lookbook-overlay">
                <span className="lookbook-view-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                    <path d="M11 8v6M8 11h6" />
                  </svg>
                </span>
              </div>
            </button>
            <figcaption>
              <span className="lookbook-num">{String(index + 1).padStart(2, '0')}</span>
              <span className="lookbook-title">{image.title}</span>
              <span className="lookbook-price">₹299</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
