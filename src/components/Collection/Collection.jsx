import { useState, useMemo } from 'react';
import { imageCatalog } from '../../utils/data';

export function Collection({ openSlider }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const catalogProducts = useMemo(() => {
    const products = imageCatalog.map((image, index) => ({
      ...image,
      sku: `GC-${String(index + 1).padStart(3, '0')}`,
      priceValue: 299,
      originalPriceValue: 599,
      rating: (4.2 + ((index % 4) * 0.2)).toFixed(1),
      reviews: 32 + index * 11,
      badgeLabel: index % 3 === 0 ? 'New' : index % 3 === 1 ? 'Sale' : 'Top Pick',
      badgeType: index % 3 === 0 ? 'new' : index % 3 === 1 ? 'reduced' : 'default',
    }));

    const query = searchQuery.trim().toLowerCase();
    const filtered = query
      ? products.filter(
          (product) =>
            product.title.toLowerCase().includes(query) ||
            product.sku.toLowerCase().includes(query),
        )
      : products;

    if (sortBy === 'price-low') {
      return [...filtered].sort((a, b) => a.priceValue - b.priceValue);
    }
    if (sortBy === 'price-high') {
      return [...filtered].sort((a, b) => b.priceValue - a.priceValue);
    }
    if (sortBy === 'name') {
      return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }
    return filtered;
  }, [searchQuery, sortBy]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(parseFloat(rating));
    const hasHalf = parseFloat(rating) % 1 >= 0.3;
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} style={{ color: '#f5a623' }}>★</span>);
      } else if (i === fullStars && hasHalf) {
        stars.push(<span key={i} style={{ color: '#f5a623' }}>★</span>);
      } else {
        stars.push(<span key={i} style={{ color: '#d5d0c8' }}>★</span>);
      }
    }
    return stars;
  };

  return (
    <section id="collection" className="content-section picks-section">
      {/* Section heading */}
      <div className="section-heading">
        <div>
          <p className="section-kicker">WE PICK YOU SHOP</p>
          <h2>Browse All Handbags</h2>
        </div>
        <div className="cta-contact">
          <a href="https://wa.me/917982383793" target="_blank" rel="noreferrer" className="cta-link">
            Order on WhatsApp →
          </a>
        </div>
      </div>

      {/* Toolbar with slide-in from right */}
      <div className="catalog-toolbar">
        <p className="catalog-count">{catalogProducts.length} products available</p>
        <div className="catalog-controls">
          <input
            type="search"
            className="catalog-input"
            placeholder="Search by name or SKU..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            aria-label="Search products"
          />
          <select
            className="catalog-select"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            aria-label="Sort products"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
          {searchQuery.trim() && (
            <button
              type="button"
              className="catalog-clear"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {catalogProducts.length > 0 ? (
        <div className="product-grid" data-stagger="70">
          {catalogProducts.map((product, index) => (
            <article
              key={product.id}
              className="product-card"
              data-stagger-child
              style={{ '--reveal-delay': `${Math.min(index * 70, 600)}ms` }}
            >
              <div className="product-visual">
                <button
                  type="button"
                  className="image-button"
                  onClick={() => openSlider(product.id)}
                >
                  <img className="product-photo" src={product.src} alt={product.title} loading="lazy" />
                </button>
                <span className={`product-badge product-badge--${product.badgeType}`}>
                  {product.badgeLabel}
                </span>
              </div>
              <div className="product-body">
                <div className="product-meta" aria-label="Product rating">
                  {renderStars(product.rating)}
                </div>
                <h3>{product.title}</h3>
                <div className="product-price-stack">
                  <strong>₹{product.priceValue}</strong>
                  <span className="product-old-price">₹{product.originalPriceValue}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="catalog-empty" role="status" aria-live="polite">
          <h3>No products found</h3>
          <p>Try another keyword or reset search to view full collection.</p>
          <button type="button" className="button button-secondary" onClick={() => setSearchQuery('')}>
            Reset search
          </button>
        </div>
      )}
    </section>
  );
}
