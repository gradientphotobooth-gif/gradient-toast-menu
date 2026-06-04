"use client";

import { useEffect, useState } from "react";

export default function TVPage() {
  const [menu, setMenu] = useState<any[]>([]);
  const [groupIndex, setGroupIndex] = useState(0);

  const groups = ["A", "B", "C"];

  useEffect(() => {
    async function loadMenu() {
      const res = await fetch(
        "https://opensheet.elk.sh/1xAFB9aRbpOb0akjqVqCVxkQu2mGkasUoaY09WqVTbys/menu"
      );

      const data = await res.json();

      setMenu(data);
    }

    loadMenu();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGroupIndex((prev) => (prev + 1) % groups.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const currentGroup = groups[groupIndex];

  const items = menu
    .filter(
      (item) =>
        item.available === "TRUE" &&
        item.tvGroup === currentGroup
    )
    .sort(
      (a, b) =>
        Number(a.tvOrder || 999) -
        Number(b.tvOrder || 999)
    );

  const hero = items[0];

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* HERO */}
      <section className="relative h-[45vh] overflow-hidden">

        {hero?.tvImage && (
          <img
            src={hero.tvImage}
            alt={hero.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute inset-0 flex flex-col justify-center px-16">

          <h1 className="text-7xl font-bold">
            Gradient Toast Cafe
          </h1>

          <p className="text-3xl mt-4 opacity-90">
            A Toast Culture Experience
          </p>

          <div className="mt-6 inline-flex w-fit rounded-full bg-white/20 px-5 py-2 text-xl">
            Featured Menu • Group {currentGroup}
          </div>

        </div>
      </section>

      {/* MENU GRID */}
      <section className="px-10 py-6">

        <div className="grid grid-cols-4 gap-6">

          {items.slice(0, 4).map((item) => (

            <div
              key={item.item_code}
              className="bg-white/10 rounded-3xl overflow-hidden backdrop-blur-sm"
            >

              <img
                src={item.tvImage || item.image}
                alt={item.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-5">

                <h3 className="text-2xl font-bold leading-tight">
                  {item.name}
                </h3>

                <p className="text-lg opacity-80 mt-2 line-clamp-2">
                  {item.thai}
                </p>

                <div className="mt-4">

                  {item.price1 && (
                    <div className="text-3xl font-bold text-yellow-400">
                      ฿{item.price1}
                    </div>
                  )}

                  {item.hot && (
                    <div className="text-lg mt-2">
                      ☕ Hot ฿{item.hot}
                    </div>
                  )}

                  {item.iced && (
                    <div className="text-lg">
                      🧊 Iced ฿{item.iced}
                    </div>
                  )}

                  {item.frappe && (
                    <div className="text-lg">
                      ❄️ Frappe ฿{item.frappe}
                    </div>
                  )}

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* FOOTER */}
      <section className="px-10 py-4 flex items-center justify-between border-t border-white/20">

        <div>

          <div className="text-4xl font-bold">
            Scan for Full Menu
          </div>

          <div className="text-xl opacity-70 mt-2">
            Order • Explore • Enjoy
          </div>

        </div>

        <img
          src="/qr-menu.png"
          alt="QR Menu"
          className="w-40 h-40 rounded-xl bg-white p-2"
        />

      </section>

    </main>
  );
}