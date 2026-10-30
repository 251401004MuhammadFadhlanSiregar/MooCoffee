function Footer() {
  return (
    <footer className="site-footer mt-16 border-t border-[#EBE3D5] bg-[#FAF7F2] px-6 py-12 sm:px-12" id="footer">
      <div className="mx-auto mb-8 grid max-w-6xl grid-cols-1 gap-8 text-sm md:grid-cols-3">
        <div data-reveal>
          <a className="brand footer-brand mb-3 inline-flex" href="#home">
            <span className="brand-mark" aria-hidden="true">M</span>
            <span>
              <strong>Moo Coffee</strong>
              <small>Kedai kopi di Medan</small>
            </span>
          </a>
          <p className="mt-2 text-xs leading-relaxed text-[#746658]">
            Tempat singgah untuk menikmati kopi di Kesawan, Kota Medan.
          </p>
        </div>

        <div data-reveal style={{ transitionDelay: "100ms" }}>
          <h4 className="mb-3 font-serif text-base font-bold text-[#513722]">Alamat</h4>
          <p className="text-xs leading-relaxed text-[#746658]">
            Jl. Perdana No.24, Kesawan, Kec. Medan Bar.,<br />
            Kota Medan, Sumatera Utara 20111
          </p>
          <a
            href="https://maps.app.goo.gl/HL5GvNvqnvssWr1v7"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-xs font-semibold text-[#513722] hover:underline"
          >
            Buka di Google Maps →
          </a>
        </div>

        <div data-reveal style={{ transitionDelay: "200ms" }}>
          <h4 className="mb-3 font-serif text-base font-bold text-[#513722]">Jam Buka</h4>
          <p className="text-xs leading-relaxed text-[#746658]">
            <strong>Senin–Kamis:</strong> 11.00–01.00 WIB<br />
            <strong>Jumat–Minggu:</strong> 11.00–02.00 WIB
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-[#EBE3D5] pt-6 text-xs text-[#8b897f] sm:flex-row" data-reveal>
        <span className="copyright">© {new Date().getFullYear()} Moo Coffee. Hak cipta dilindungi.</span>
        <a className="back-to-top font-medium text-[#513722] hover:underline" href="#home">
          Kembali ke atas <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
