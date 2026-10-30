import about1 from "../assets/section-about-1.jpg";
import about2 from "../assets/section-about-2.jpg";
function About() {
  return (
    <section className="about-section" id="tentang">
      <div className="about-content">
        <div className="about-copy" data-reveal="left">
          <h2>Tentang Kami</h2>
          <p>
            <strong>Moo Coffee</strong> adalah kedai kopi di Jl. Perdana No.24,
            Kesawan, Kota Medan. Tempatnya nyaman untuk menikmati kopi dan
            menghabiskan waktu bersama teman.
          </p>
          <p>
            Dari Kopi Susu Gula Aren andalan sampai camilan hangat seperti Roti
            Bakar dan Croissant, semua disajikan segar setiap hari. Tersedia
            area indoor dan corner Wi-Fi untuk kamu yang ingin work-from-cafe.
          </p>
          <ul className="about-highlights">
            <li>
              <span aria-hidden="true">✓</span> Pilihan kopi dan camilan
            </li>
            <li>
              <span aria-hidden="true">✓</span> Area nyaman di pusat Medan
            </li>
            <li>
              <span aria-hidden="true">✓</span> Buka mulai pukul 11.00 WIB
            </li>
          </ul>
        </div>

        <div className="about-gallery" aria-label="Suasana Moo Coffee">
          <img
            className="about-photo about-photo-first"
            data-reveal="right"
            style={{ transitionDelay: "100ms" }}
            src={about1}
            alt="Bar kopi dengan suasana hangat"
            loading="lazy"
          />
          <img
            className="about-photo about-photo-second"
            data-reveal="right"
            style={{ transitionDelay: "220ms" }}
            src={about2}
            alt="Area duduk nyaman di kedai kopi"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
export default About;
