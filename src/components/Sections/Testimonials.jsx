import { testimonials } from '../../utils/data';

export function Testimonials({ openSlider }) {
  return (
    <section id="stories" className="content-section testimonials-section" data-reveal="fade-up">
      <div className="section-heading" data-reveal="fade-up" data-reveal-delay="50">
        <div>
          <p className="section-kicker">CUSTOMER STORIES</p>
          <h2>What Our Customers Say</h2>
        </div>
      </div>

      <div className="testimonial-grid" data-reveal="fade-up" data-stagger="150">
        {testimonials.map((testimonial, index) => (
          <blockquote
            key={testimonial.author}
            className="testimonial-card"
            data-stagger-child
            style={{ '--reveal-delay': `${index * 150}ms` }}
          >
            <div className="testimonial-header">
              <button
                type="button"
                className="image-button testimonial-img-btn"
                onClick={() => openSlider(testimonial.image.id)}
              >
                <img
                  className="testimonial-image"
                  src={testimonial.image.src}
                  alt={testimonial.image.title}
                  loading="lazy"
                />
              </button>
              <div className="testimonial-meta">
                <span className="testimonial-name">{testimonial.author}</span>
                <div className="testimonial-stars" aria-label="5 star rating">
                  {'★★★★★'.split('').map((s, i) => (
                    <span key={i} className="star-filled">{s}</span>
                  ))}
                </div>
              </div>
            </div>

            <svg className="quote-icon" viewBox="0 0 24 24" width="32" height="32" aria-hidden="true">
              <path d="M11 7H7a4 4 0 0 0-4 4v1h4a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-5a6 6 0 0 1 6-6h2v2Zm10 0h-4a4 4 0 0 0-4 4v1h4a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3h-1a3 3 0 0 1-3-3v-5a6 6 0 0 1 6-6h2v2Z" fill="currentColor" opacity="0.08" />
            </svg>

            <p className="testimonial-quote">&ldquo;{testimonial.quote}&rdquo;</p>
            <footer className="testimonial-footer">
              <span className="verified-badge">✓ Verified Purchase</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
