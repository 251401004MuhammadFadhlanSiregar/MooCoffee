import { useEffect, useRef, useState } from "react";

/* Warna diambil dari App.css */
const C = {
  bar: "#e8e2d9",
  paper: "#f3f0e8",
  dark: "#4d3324",
  text: "#34291f",
  muted: "#77675b",
  line: "#cfc5b8",
  caramel: "#a8764a",
};

const SERIF = { fontFamily: 'Georgia, "Times New Roman", serif' };

const links = [
  { label: "Beranda", href: "#home", id: "home" },
  { label: "Tentang", href: "#tentang", id: "tentang" },
  { label: "Menu", href: "#menu", id: "menu" },
  { label: "Promo", href: "#promo", id: "promo" },
  { label: "Kontak", href: "#kontak", id: "kontak" },
];
const cta = { label: "Temukan kami", href: "#footer" };
const SECTION_IDS = ["home", "tentang", "menu", "promo", "kontak", "footer"];

function isOpenNow() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    weekday: "short",
    hour: "numeric",
    hour12: false,
  }).formatToParts(new Date());
  const weekday = parts.find((part) => part.type === "weekday")?.value;
  const hour = Number(parts.find((part) => part.type === "hour")?.value) % 24;
  const closesLate = ["Fri", "Sat", "Sun"].includes(weekday);
  const closesAt = closesLate ? 2 : 1;
  return hour >= 11 || hour < closesAt;
}

function Bean({ className = "" }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
      <ellipse
        cx="8"
        cy="8"
        rx="4.2"
        ry="6.6"
        transform="rotate(35 8 8)"
        fill={C.caramel}
      />
      <path
        d="M5.2 3.6c2.4 1.6.2 3.8 2.6 5.2s.4 3.2 2.8 4.4"
        transform="rotate(0 8 8)"
        fill="none"
        stroke={C.bar}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CupLogo() {
  return (
    <span
      aria-hidden="true"
      className="relative flex size-11 shrink-0 items-center justify-center rounded-full shadow-[0_4px_10px_-2px_rgba(77,51,36,0.45)] transition-transform duration-500 group-hover:scale-105 group-hover:rotate-[-8deg]"
      style={{ backgroundColor: C.dark }}
    >
      {/* cincin dekoratif */}
      <span
        className="absolute inset-[3px] rounded-full border"
        style={{ borderColor: "rgba(243,240,232,0.28)" }}
      />
      <svg
        viewBox="0 0 32 32"
        className="relative size-7"
        fill="none"
        stroke={C.paper}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* uap bergerak */}
        <g stroke="#e0b383" strokeWidth="1.5">
          <path d="M11 9c-1.6-1.6 1.6-3 0-5">
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur="2.6s"
              repeatCount="indefinite"
            />
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 2;0 -2"
              dur="2.6s"
              repeatCount="indefinite"
            />
          </path>
          <path d="M16 9c-1.6-1.6 1.6-3 0-5">
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur="2.6s"
              begin="0.5s"
              repeatCount="indefinite"
            />
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 2;0 -2"
              dur="2.6s"
              begin="0.5s"
              repeatCount="indefinite"
            />
          </path>
          <path d="M21 9c-1.6-1.6 1.6-3 0-5">
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur="2.6s"
              begin="1s"
              repeatCount="indefinite"
            />
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 2;0 -2"
              dur="2.6s"
              begin="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
        {/* cangkir */}
        <path d="M7 14h16v5a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6v-5Z" />
        <path d="M23 15.5h1.2a3 3 0 0 1 0 6H22.5" />
        <path d="M5 28h20" />
      </svg>
    </span>
  );
}

function Brand({ onClick }) {
  return (
    <a
      href="#home"
      onClick={onClick}
      aria-label="Moo Coffee, beranda"
      className="group flex items-center gap-3"
    >
      <CupLogo />
      <span className="leading-none">
        <strong
          className="block text-[17px] font-bold tracking-tight sm:text-[20px]"
          style={{ ...SERIF, color: C.dark }}
        >
          Moo{" "}
          <em className="font-normal" style={{ color: C.caramel }}>
            Coffee
          </em>
        </strong>
        <small
          className="mt-1.5 block text-[8.5px] font-medium tracking-[0.22em] uppercase sm:text-[9.5px]"
          style={{ color: C.muted }}
        >
          Tempat pulang sejenak
        </small>
      </span>
    </a>
  );
}

function OpenBadge({ open, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-medium ${className}`}
      style={{ borderColor: C.line, color: C.text }}
    >
      <span className="relative flex size-2">
        {open && (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#62c68a] opacity-70" />
        )}
        <span
          className="relative inline-flex size-2 rounded-full"
          style={{ backgroundColor: open ? "#62c68a" : "#b5503c" }}
        />
      </span>
      {open ? "Buka sekarang · s.d. 01.00/02.00" : "Tutup · buka 11.00"}
    </span>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [openNow, setOpenNow] = useState(isOpenNow);
  const barRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);

      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${
          max > 0 ? Math.min(y / max, 1) : 0
        })`;
      }

      let current = "home";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    const frame = requestAnimationFrame(onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setOpenNow(isOpenNow()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 ml-[calc(50%-50vw)] w-screen transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled || open
          ? "bg-[#e8e2d9]/90 shadow-[0_10px_30px_-14px_rgba(77,51,36,0.45)] backdrop-blur-md"
          : "bg-[#e8e2d9]"
      }`}
    >
      <div className="mx-auto flex h-[82px] w-full max-w-310 items-center justify-between gap-4 px-[18px] min-[431px]:px-6 md:h-19 md:px-12">
        <Brand onClick={close} />

        {/* ===== Desktop ===== */}
        <nav
          aria-label="Navigasi utama"
          className="hidden items-center gap-2 md:flex"
        >
          {links.map((link) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className="group relative flex items-center rounded-full px-4 py-2 text-[13px] font-medium transition-colors"
                style={{ color: isActive ? C.dark : C.text }}
              >
                {/* biji kopi muncul di menu aktif */}
                <Bean
                  className={`transition-all duration-300 ${
                    isActive
                      ? "mr-2 size-3.5 rotate-0 opacity-100"
                      : "mr-0 h-3.5 w-0 -rotate-90 opacity-0"
                  }`}
                />
                {link.label}
                {/* garis bawah tergambar saat hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                  style={{ backgroundColor: C.caramel }}
                />
              </a>
            );
          })}

          <OpenBadge open={openNow} className="ml-2 hidden lg:inline-flex" />

          <a
            href={cta.href}
            className="group ml-2 inline-flex items-center gap-3 rounded-full py-1.5 pr-1.5 pl-5 text-[13px] font-medium text-[#f8f7f2] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_-6px_rgba(77,51,36,0.6)]"
            style={{ backgroundColor: C.dark }}
          >
            {cta.label}
            <span
              aria-hidden="true"
              className="flex size-7 items-center justify-center rounded-full text-sm transition-transform duration-300 group-hover:rotate-45"
              style={{ backgroundColor: C.caramel }}
            >
              →
            </span>
          </a>
        </nav>

        {/* ===== Tombol hamburger ===== */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          className="flex size-11 items-center justify-center rounded-full border transition-colors hover:bg-[#f3f0e8] md:hidden"
          style={{ borderColor: C.line, color: C.dark }}
        >
          <span className="relative block h-3.5 w-5" aria-hidden="true">
            <span
              className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                open ? "top-[6px] rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute top-[6px] right-0 h-0.5 rounded bg-current transition-all duration-300 ${
                open ? "w-0 opacity-0" : "w-3.5 opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                open ? "top-[6px] -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {/* ===== Panel mobile ===== */}
      <div
        id="menu-mobile"
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-500 ease-out md:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <nav
            aria-label="Navigasi utama (mobile)"
            className="px-[18px] pt-2 pb-6 min-[431px]:px-6"
            style={{ backgroundColor: C.paper }}
          >
            {links.map((link, i) => {
              const isActive = active === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={close}
                  aria-current={isActive ? "page" : undefined}
                  className="group flex items-center justify-between border-b py-4"
                  style={{ borderColor: C.line }}
                >
                  <span className="flex items-baseline gap-4">
                    <span
                      className="text-xs tracking-[0.2em]"
                      style={{ color: C.caramel }}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className="text-[30px] leading-none"
                      style={{
                        ...SERIF,
                        color: isActive ? C.caramel : C.dark,
                        fontStyle: isActive ? "italic" : "normal",
                      }}
                    >
                      {link.label}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-xl transition-transform duration-300 group-hover:translate-x-1"
                    style={{ color: C.muted }}
                  >
                    →
                  </span>
                </a>
              );
            })}

            <a
              href={cta.href}
              onClick={close}
              className="mt-5 flex items-center justify-between rounded-full py-2 pr-2 pl-6 text-[15px] font-medium text-[#f8f7f2]"
              style={{ backgroundColor: C.dark }}
            >
              {cta.label}
              <span
                aria-hidden="true"
                className="flex size-9 items-center justify-center rounded-full"
                style={{ backgroundColor: C.caramel }}
              >
                →
              </span>
            </a>

            <div className="mt-5 flex items-center justify-between gap-3">
              <OpenBadge open={openNow} />
              <span className="text-[11px]" style={{ color: C.muted }}>
                Kota Medan
              </span>
            </div>
          </nav>
        </div>
      </div>

      {/* garis progres scroll */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-transparent">
        <div
          ref={barRef}
          className="h-full origin-left scale-x-0"
          style={{
            background: `linear-gradient(90deg, ${C.caramel}, ${C.dark})`,
          }}
        />
      </div>
    </header>
  );
}
