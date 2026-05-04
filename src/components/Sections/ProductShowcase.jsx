import { useState } from 'react';
import { products } from '../../utils/data';

export function ProductShowcase() {
  const [activeImages, setActiveImages] = useState({});

  const handleThumbnailClick = (productId, imageIndex) => {
    setActiveImages((prev) => ({ ...prev, [productId]: imageIndex }));
  };

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
