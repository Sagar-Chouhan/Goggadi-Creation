import { useState, useMemo, useEffect, useRef } from 'react';
import './App.css';
import { useScrollReveal } from './hooks/useScrollReveal';
import { Header } from './components/Layout/Header';
import { Hero } from './components/Hero/Hero';
import { Collection } from './components/Collection/Collection';
import { About } from './components/Sections/About';
import { Testimonials } from './components/Sections/Testimonials';
import { Lookbook } from './components/Sections/Lookbook';
import { Contact } from './components/Sections/Contact';
import { ProductShowcase } from './components/Sections/ProductShowcase';
import { Lightbox } from './components/UI/Lightbox';
import { imageCatalog, featuredBags, testimonials, lookbookImages, heroImage } from './utils/data';

function App() {
  const [activeSlide, setActiveSlide] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [customImages, setCustomImages] = useState([]);
  const progressRef = useRef(null);

  const galleryImages = useMemo(() => {
    const base = [
      heroImage,
      ...featuredBags.map((bag) => bag.image),
      ...testimonials.map((testimonial) => testimonial.image),
      ...lookbookImages,
    ].filter(Boolean);
    return [...customImages, ...base];
  }, [customImages]);

  const openSlider = (imageId) => {
    const startIndex = galleryImages.findIndex((image) => image.id === imageId);
    if (startIndex >= 0) {
      setActiveSlide(startIndex);
    }
  };

  const closeSlider = () => setActiveSlide(null);
  const currentSlide = activeSlide === null ? null : galleryImages[activeSlide];

  useScrollReveal();

  // Initial page loading indicator (shown until full window load)
  useEffect(() => {
    const minimumVisibleTime = 650;
    const startedAt = performance.now();
    let hideTimer;

    const hideLoader = () => {
      const elapsed = performance.now() - startedAt;
      const remainingTime = Math.max(minimumVisibleTime - elapsed, 0);
      hideTimer = window.setTimeout(() => setIsPageLoading(false), remainingTime);
    };

    if (document.readyState === 'complete') {
      hideLoader();
      return () => window.clearTimeout(hideTimer);
    }

    window.addEventListener('load', hideLoader, { once: true });
    return () => {
      window.removeEventListener('load', hideLoader);
      window.clearTimeout(hideTimer);
    };
  }, []);

  // Load custom images from localStorage
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem('customImages');
      if (raw) setCustomImages(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  // Add a custom image (persist to localStorage)
  const addCustomImage = (image) => {
    const item = { id: `custom-${Date.now()}`, ...image };
    const updated = [item, ...customImages];
    setCustomImages(updated);
    try {
      window.localStorage.setItem('customImages', JSON.stringify(updated));
    } catch (e) {
      // ignore
    }
    // open the slider on the newly added image
    setTimeout(() => openSlider(item.id), 50);
  };

  // Scroll progress bar
  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (progressRef.current) {
        progressRef.current.style.width = `${progress}%`;
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="page-shell">
      <div className={`page-load-bar ${isPageLoading ? 'is-visible' : ''}`} aria-hidden="true">
        <span />
      </div>

      {/* Scroll progress bar at top of page */}
      <div className="scroll-progress" ref={progressRef} />

      <Header totalItems={imageCatalog.length} />
      
      <Hero openSlider={openSlider} />

      <ProductShowcase />
      
      {/* Category Cards Strip — staggered zoom-in */}
      <section className="content-section category-strip" data-reveal="zoom-in" data-stagger="120">
        <div className="category-grid">
          {imageCatalog.slice(0, 3).map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className="category-card"
              data-stagger-child
              style={{ '--reveal-delay': `${index * 120}ms` }}
              onClick={() => openSlider(slide.id)}
            >
              <img src={slide.src} alt={slide.title} loading="lazy" />
              <span>{slide.title}</span>
            </button>
          ))}
        </div>
      </section>

      <Collection openSlider={openSlider} />
      
      {/* Brand Trust Strip — fade in from left */}
      <section className="content-section logo-strip" data-reveal="fade-left" data-reveal-duration="1000">
        <div className="logo-row" aria-label="Brand marks">
          <span>Goggadi Creation</span>
          <span>Premium Bags</span>
          <span>Handcrafted Finish</span>
          <span>India Delivery</span>
        </div>
      </section>

      <About />
      <Testimonials openSlider={openSlider} />
      <Lookbook openSlider={openSlider} />
      <Contact />

      <a
        className="whatsapp-float"
        href="https://wa.me/917982383793"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <span className="whatsapp-pulse-ring" />
        <span className="whatsapp-pulse-ring whatsapp-pulse-ring--delay" />
        <svg className="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="whatsapp-label">Chat with us</span>
      </a>

      {/* Floating Add Image button (opens modal) */}
      <button
        type="button"
        className="add-image-float"
        aria-label="Add image"
        onClick={() => setShowAddModal(true)}
      >
        +
      </button>

      {/* Add Image Modal */}
      {showAddModal && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal-card">
            <h3>Add image and details</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                const url = form.elements.url.value.trim();
                const title = form.elements.title.value.trim();
                const price = form.elements.price.value.trim();
                const description = form.elements.description.value.trim();
                if (!url) return;
                addCustomImage({ src: url, title: title || 'New Image', price, description });
                setShowAddModal(false);
                form.reset();
              }}
            >
              <label>
                Image URL
                <input name="url" type="url" placeholder="https://.../image.jpg" required />
              </label>
              <label>
                Title
                <input name="title" type="text" placeholder="Title" />
              </label>
              <label>
                Price
                <input name="price" type="text" placeholder="₹199" />
              </label>
              <label>
                Description
                <textarea name="description" placeholder="Short description" />
              </label>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit">Add image</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Lightbox
        currentSlide={currentSlide}
        galleryImages={galleryImages}
        activeSlide={activeSlide}
        setActiveSlide={setActiveSlide}
        closeSlider={closeSlider}
      />
    </main>
  );
}

export default App;
