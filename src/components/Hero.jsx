function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow" data-reveal style={{ transitionDelay: "80ms" }}>Coffee &amp; Good Vibes</p>
        <h1 data-reveal style={{ transitionDelay: "180ms" }}>Tempat singgah,<br />cerita <em>bermula.</em></h1>
        <p className="hero-description" data-reveal style={{ transitionDelay: "280ms" }}>
          Secangkir kopi, ruang yang nyaman, dan waktu untuk menikmati
          hal-hal sederhana. Selamat datang di ruang kita.
        </p>
        <a className="primary-cta inline-flex items-center gap-5" href="#menu" data-reveal style={{ transitionDelay: "380ms" }}>
          Lihat Menu <span aria-hidden="true">→</span>
        </a>
        <p className="hero-note" data-reveal style={{ transitionDelay: "460ms" }}>Dibuat dengan hati, disajikan hangat.</p>
      </div>

      <div className="hero-image" data-reveal="right" style={{ transitionDelay: "180ms" }}>
        <img
          src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1400&q=85"
          alt="Suasana hangat di dalam kedai kopi"
          fetchPriority="high"
        />
      </div>
    </section>
  );
}

export default Hero;
