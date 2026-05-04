import { useCallback, useEffect } from 'react';

export function Lightbox({ currentSlide, galleryImages, activeSlide, setActiveSlide, closeSlider }) {
  const goNext = useCallback(() => {
    setActiveSlide((current) =>
      current === null ? null : (current + 1) % galleryImages.length,
    )
  }, [galleryImages.length, setActiveSlide])

  const goPrev = useCallback(() => {
    setActiveSlide((current) =>
      current === null ? null : (current - 1 + galleryImages.length) % galleryImages.length,
    )
  }, [galleryImages.length, setActiveSlide])

  useEffect(() => {
    if (activeSlide === null) {
      return undefined
    }

    const handleKeydown = (event) => {
      if (event.key === 'Escape') {
        setActiveSlide(null)
      }
      if (event.key === 'ArrowRight') {
        goNext();
      }
      if (event.key === 'ArrowLeft') {
        goPrev();
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [activeSlide, goNext, goPrev, setActiveSlide])

  if (!currentSlide) return null;

  return (
    <div className="lightbox-overlay" role="dialog" aria-modal="true" onClick={closeSlider}>
      <div className="lightbox-window" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="lightbox-close" onClick={closeSlider}>
          Close
        </button>

        <button type="button" className="lightbox-nav lightbox-prev" onClick={goPrev}>
          Prev
        </button>

        <img className="lightbox-image" src={currentSlide.src} alt={currentSlide.title} />

        <button type="button" className="lightbox-nav lightbox-next" onClick={goNext}>
          Next
        </button>

        <div className="lightbox-caption">
          <strong>{currentSlide.title}</strong>
        </div>
      </div>
    </div>
  )
}
