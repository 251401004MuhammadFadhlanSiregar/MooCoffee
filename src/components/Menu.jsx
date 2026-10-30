import { useState } from "react";

import kopiSusu from "../assets/menu-coffee-susu_gula_aren.jpg";
import americano from "../assets/menu-coffee-americano.jpg";
import cappuccino from "../assets/menu-coffee-cappuccino.jpg";
import caramel from "../assets/menu-coffee-caramel_macchiato.jpg";
import espresso from "../assets/menu-coffee-espresso.jpg";
import latte from "../assets/menu-coffee-latte.jpg";
import moka from "../assets/menu-coffee-mocha.jpg";

import matcha from "../assets/menu-coffee-matcha_latte.jpg";
import thaiTea from "../assets/menu-drink-thai_tea.jpg";
import redVelvet from "../assets/menu-coffee-red_velvet_latte.jpg";
import taro from "../assets/menu-coffee-taro_latte.jpg";
import lemonTea from "../assets/menu-drink-iced_lemon_tea.jpg";
import cokelat from "../assets/menu-drink-cokelat_klasik.jpg";

import croissant from "../assets/menu-food-croissant.jpg";
import brownies from "../assets/menu-food-brownies.jpg";
import kentang from "../assets/menu-food-kentang_goreng.jpg";
import roti from "../assets/menu-food-roti_bakar.jpg";
import donat from "../assets/menu-food-donat.jpg";
import pisang from "../assets/menu-food-pisang_goreng.jpg";
import cookies from "../assets/menu-food-cookies.jpg";

function Menu() {
  const [category, setCategory] = useState("All");

  const menus = [
    {
      id: 1,
      name: "Kopi Susu Gula Aren",
      category: "Coffee",
      price: "Rp18.000",
      image: kopiSusu,
      description: "Espresso, susu segar, dan gula aren khas Nusantara.",
    },

    {
      id: 2,
      name: "Americano",
      category: "Coffee",
      price: "Rp15.000",
      image: americano,
      description: "Kopi hitam dengan rasa espresso yang kuat.",
    },

    {
      id: 3,
      name: "Cappuccino",
      category: "Coffee",
      price: "Rp20.000",
      image: cappuccino,
      description: "Espresso dengan susu steamed dan foam lembut.",
    },

    {
      id: 4,
      name: "Caramel Macchiato",
      category: "Coffee",
      price: "Rp22.000",
      image: caramel,
      description: "Espresso creamy dengan caramel manis.",
    },

    {
      id: 5,
      name: "Espresso",
      category: "Coffee",
      price: "Rp12.000",
      image: espresso,
      description: "Kopi espresso murni dengan rasa intens.",
    },

    {
      id: 6,
      name: "Cafe Latte",
      category: "Coffee",
      price: "Rp20.000",
      image: latte,
      description: "Espresso dengan susu creamy.",
    },

    {
      id: 7,
      name: "Moka",
      category: "Coffee",
      price: "Rp23.000",
      image: moka,
      description: "Perpaduan espresso dan cokelat.",
    },

    {
      id: 8,
      name: "Matcha Latte",
      category: "Non-Coffee",
      price: "Rp22.000",
      image: matcha,
      description: "Matcha premium dengan susu creamy.",
    },

    {
      id: 9,
      name: "Thai Tea",
      category: "Non-Coffee",
      price: "Rp20.000",
      image: thaiTea,
      description: "Thai tea segar khas Thailand.",
    },

    {
      id: 10,
      name: "Red Velvet Latte",
      category: "Non-Coffee",
      price: "Rp22.000",
      image: redVelvet,
      description: "Minuman red velvet lembut.",
    },

    {
      id: 11,
      name: "Taro Latte",
      category: "Non-Coffee",
      price: "Rp21.000",
      image: taro,
      description: "Taro creamy dengan rasa manis.",
    },

    {
      id: 12,
      name: "Es Lemon Tea",
      category: "Non-Coffee",
      price: "Rp15.000",
      image: lemonTea,
      description: "Teh lemon segar.",
    },

    {
      id: 13,
      name: "Cokelat Klasik",
      category: "Non-Coffee",
      price: "Rp20.000",
      image: cokelat,
      description: "Minuman cokelat creamy.",
    },

    {
      id: 14,
      name: "Croissant",
      category: "Snack",
      price: "Rp15.000",
      image: croissant,
      description: "Croissant butter renyah.",
    },

    {
      id: 15,
      name: "Brownies Cokelat",
      category: "Snack",
      price: "Rp18.000",
      image: brownies,
      description: "Brownies cokelat lembut.",
    },

    {
      id: 16,
      name: "Kentang Goreng",
      category: "Snack",
      price: "Rp17.000",
      image: kentang,
      description: "Kentang crispy.",
    },

    {
      id: 17,
      name: "Roti Bakar",
      category: "Snack",
      price: "Rp16.000",
      image: roti,
      description: "Roti bakar hangat.",
    },

    {
      id: 18,
      name: "Donat",
      category: "Snack",
      price: "Rp12.000",
      image: donat,
      description: "Donat lembut.",
    },

    {
      id: 19,
      name: "Pisang Goreng",
      category: "Snack",
      price: "Rp15.000",
      image: pisang,
      description: "Pisang goreng renyah.",
    },

    {
      id: 20,
      name: "Cookies",
      category: "Snack",
      price: "Rp14.000",
      image: cookies,
      description: "Cookies teman kopi.",
    },
  ];

  const filteredMenus =
    category === "All"
      ? menus
      : menus.filter((item) => item.category === category);

  return (
    <section
      id="menu"
      className="bg-[#f8f3ed] px-8 py-20"
    >
      <div className="mb-12 text-center" data-reveal>
        <h2
          className="text-4xl font-bold text-[#4b2e1f]"
        >
          Menu Coffee Shop
        </h2>

        <p className="mt-3 text-gray-600">
          Nikmati pilihan kopi, non-coffee, dan snack terbaik kami.
        </p>
      </div>

      <div
        className="mb-12 flex flex-wrap justify-center gap-4"
        data-reveal
      >
        {["All", "Coffee", "Non-Coffee", "Snack"].map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className="cursor-pointer rounded-full border border-[#6f4e37] bg-white px-6 py-2 text-[#6f4e37] transition hover:bg-[#6f4e37] hover:text-white"
          >
            {item}
          </button>
        ))}
      </div>

      <div
        className="menu-grid grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
      >
        {filteredMenus.map((item, index) => (
          <div
            key={item.id}
            data-reveal
            style={{ transitionDelay: `${(index % 4) * 80}ms` }}
            className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="h-52 w-full object-cover transition duration-500 hover:scale-110"
              />
            </div>

            <div className="p-5">
              <p className="text-sm text-[#8b5e3c]">{item.category}</p>

              <h3 className="mt-2 text-xl font-bold">{item.name}</h3>

              <p className="mt-2 text-sm text-gray-600">{item.description}</p>

              <p
                className="mt-4 font-bold text-[#6f4e37]"
              >
                {item.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Menu;
