import React, { useState } from 'react';
import { products } from '../../utils/data';

export function ProductShowcase() {
  const [activeImages, setActiveImages] = useState({});

  const handleThumbnailClick = (productId, imageIndex) => {
    setActiveImages((prev) => ({ ...prev, [productId]: imageIndex }));
  };

  const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );

  return (
    <section id="products" className="content-section product-showcase">
      <div className="section-heading">
        <div>
          <p className="section-kicker">OUR PRODUCTS</p>
          <h2>Shop By Category</h2>
        </div>
        <div className="cta-contact">
          <a href="https://wa.me/917982383793" target="_blank" rel="noreferrer" className="cta-link">
            Order on WhatsApp →
          </a>
        </div>
      </div>

      <div className="showcase-grid" data-stagger="120">
        {products.map((product, idx) => {
          const activeIndex = activeImages[product.id] ?? 0;
          const activeImg = product.images[activeIndex];
          return (
            <article
              key={product.id}
              className="showcase-card"
              data-stagger-child
              style={{ '--reveal-delay': `${idx * 120}ms` }}
            >
              {/* Main Image */}
              <div className="showcase-media">
                <div className="showcase-main-image">
                  {activeImg && (
                    <img
                      key={activeImg.id}
                      src={activeImg.src}
                      alt={`${product.name} - ${activeImg.title}`}
                      loading="lazy"
                      className="showcase-active-img"
                    />
                  )}
                </div>

                {/* Thumbnail strip */}
                <div className="showcase-thumbs">
                  {product.images.map((img, thumbIdx) => (
                    <button
                      key={img.id}
                      type="button"
                      className={`showcase-thumb ${thumbIdx === activeIndex ? 'is-active' : ''}`}
                      onClick={() => handleThumbnailClick(product.id, thumbIdx)}
                      aria-label={`View ${product.name} image ${thumbIdx + 1}`}
                    >
                      <img src={img.src} alt={img.title} loading="lazy" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="showcase-info">
                <h3 className="showcase-name">{product.name}</h3>

                <div className="showcase-rating">
                  <div className="showcase-stars" aria-label={`Rating: ${product.rating} out of 5`}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={star <= Math.floor(parseFloat(product.rating)) ? 'star-filled' : 'star-empty'}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="showcase-review-count">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                <p className="showcase-description">{product.description}</p>

                <div className="showcase-price-row">
                  <span className="showcase-price">₹{product.price}</span>
                  <span className="showcase-original-price">₹{product.originalPrice}</span>
                  <span className="showcase-save">Save ₹{product.originalPrice - product.price}</span>
                </div>

                <div className="showcase-actions">
                  <a
                    href={`https://wa.me/917982383793?text=Hi! I'm interested in the ${encodeURIComponent(product.name)} (₹${product.price}). Please share more details.`}
                    target="_blank"
                    rel="noreferrer"
                    className="button showcase-buy-btn"
                  >
                    <span>Order on WhatsApp</span>
                  </a>
                  <a
                    href={`https://wa.me/917982383793?text=I have a question about ${encodeURIComponent(product.name)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="button button-secondary showcase-enquiry-btn"
                  >
                    Enquire Now
                  </a>
                </div>

                <div className="showcase-features">
                  <div className="showcase-feature-item">
                    <span>Free Shipping</span>
                  </div>
                  <div className="showcase-feature-item">
                    <span>Cash on Delivery</span>
                  </div>
                  <div className="showcase-feature-item">
                    <span>Handcrafted Finish</span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
