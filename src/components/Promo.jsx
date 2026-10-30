import { useState } from "react";

import kopiSusu from "../assets/menu-coffee-susu_gula_aren.jpg";
import cappuccino from "../assets/menu-coffee-cappuccino.jpg";
import croissant from "../assets/menu-food-croissant.jpg";

function Promo() {
  const [showPromo, setShowPromo] = useState(null);

  const promos = [
    {
      id: 1,
      discount: "50%",
      subtitle: "KOPI ANDALAN",
      title: "Buy 1 Get 1 Kopi Susu",
      image: kopiSusu,
      description:
        "Beli 1 gelas Kopi Susu Gula Aren, gratis 1 gelas lagi.",
      terms: [
        "Berlaku untuk Kopi Susu Gula Aren",
        "Tidak dapat digabungkan dengan promo lain",
        "Berlaku setiap hari"
      ]
    },
    {
      id: 2,
      discount: "20%",
      subtitle: "HEMAT MAHASISWA",
      title: "Diskon Pelajar 20%",
      image: cappuccino,
      description:
        "Khusus pelajar dan mahasiswa dengan kartu pelajar aktif.",
      terms: [
        "Tunjukkan kartu pelajar/mahasiswa",
        "Berlaku setiap hari",
        "Maksimal 2 item"
      ]
    },
    {
      id: 3,
      discount: "15%",
      subtitle: "PAKET KOMBO",
      title: "Paket Ngopi + Croissant",
      image: croissant,
      description:
        "Nikmati kopi pilihan dengan Croissant dalam satu paket hemat.",
      terms: [
        "Berlaku untuk menu paket tertentu",
        "Selama persediaan tersedia",
        "Tidak dapat ditukar dengan menu lain"
      ]
    }
  ];

  return (
    <section
      id="promo"
      className="bg-[#f8f3ed] px-8 py-20"
    >
      <div className="mb-12 text-center" data-reveal>
        <h2
          className="text-4xl font-bold text-[#4b2e1f]"
        >
          Promo Hari Ini
        </h2>

        <p className="mt-3 text-gray-600">
          Penawaran spesial dari Moo Coffee
        </p>
      </div>

      <div
        className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3"
      >
        {promos.map((promo) => (
          <div
            key={promo.id}
            data-reveal
            style={{ transitionDelay: `${(promo.id - 1) * 100}ms` }}
            className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="relative overflow-hidden">
              <img
                src={promo.image}
                alt={promo.title}
                className="h-56 w-full object-cover transition-transform duration-500 hover:scale-110"
              />

              <span
                className="absolute top-4 left-4 rounded-full bg-[#d6a85f] px-4 py-2 text-sm font-bold text-white"
              >
                Diskon {promo.discount}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <p
                className="text-sm font-semibold text-[#b88646]"
              >
                {promo.subtitle}
              </p>

              <h3
                className="mt-3 text-2xl font-bold text-[#4b2e1f]"
              >
                {promo.title}
              </h3>

              <p
                className="mt-3 flex-1 text-sm text-gray-600"
              >
                {promo.description}
              </p>

              <button
                onClick={() => setShowPromo(promo)}
                className="mt-6 cursor-pointer rounded-full bg-[#8b5e3c] px-6 py-3 font-semibold text-white transition hover:bg-[#6f4e37]"
              >
                Lihat Promo
              </button>
            </div>
          </div>
        ))}
      </div>

      {showPromo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5"
        >
          <div
            className="relative w-full max-w-xl rounded-3xl bg-[#f8f3ed] p-8"
          >
            <button
              onClick={() => setShowPromo(null)}
              className="absolute top-5 right-6 cursor-pointer text-3xl text-[#6f4e37]"
            >
              ×
            </button>

            <p
              className="font-semibold text-[#b88646]"
            >
              {showPromo.subtitle} · DISKON {showPromo.discount}
            </p>

            <img
              src={showPromo.image}
              alt={showPromo.title}
              className="mt-4 h-56 w-full rounded-2xl object-cover"
            />

            <h2
              className="mt-6 text-3xl font-bold text-[#4b2e1f]"
            >
              {showPromo.title}
            </h2>

            <p
              className="mt-4 text-gray-600"
            >
              {showPromo.description}
            </p>

            <ul
              className="mt-5 list-disc space-y-2 pl-5 text-gray-600"
            >
              {showPromo.terms.map((term, index) => (
                <li key={index}>
                  {term}
                </li>
              ))}
            </ul>

            <a
              href="#kontak"
              className="mt-8 inline-block cursor-pointer rounded-full bg-[#c88b38] px-8 py-3 font-semibold text-[#4b2e1f] transition hover:bg-[#b77a2d]"
            >
              Tanya Promo
            </a>
          </div>
        </div>
      )}
    </section>
  );
}

export default Promo;
