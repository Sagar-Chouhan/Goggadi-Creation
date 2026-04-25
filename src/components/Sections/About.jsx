import React from 'react';
import { craftsmanshipPoints } from '../../utils/data';

export function About() {
  return (
    <section id="craft" className="content-section split-section about-section" data-reveal="fade-up">
      <div className="about-mark" data-reveal="fade-right" data-reveal-delay="100">
        <p className="eyebrow">THE GOGGADI DIFFERENCE</p>
        <h2>Handbags made to look polished in real life.</h2>
        <p className="hero-text">
          We keep the layout simple, the product presentation clean, and the focus on premium bag imagery.
          Every bag is designed to stand out and crafted to last.
        </p>

        <div className="about-notes">
          <p className="about-note"><strong>Artisan Design:</strong> Unique handcrafted patterns inspired by Indian heritage.</p>
          <p className="about-note"><strong>Natural Materials:</strong> Premium cotton, hemp, and eco-friendly fabrics.</p>
        </div>
      </div>

      <div className="craft-panel" data-reveal="fade-left" data-reveal-delay="200">
        <h3 className="craft-panel-title">Our Craftsmanship</h3>
        {craftsmanshipPoints.map((point, index) => (
          <p key={point} style={{ '--reveal-delay': `${index * 100}ms` }}>{point}</p>
        ))}
        <a
          href="https://wa.me/917982383793?text=Tell me more about your craftsmanship process"
          target="_blank"
          rel="noreferrer"
          className="button button-secondary craft-cta"
        >
          Learn More →
        </a>
      </div>
    </section>
  );
}
