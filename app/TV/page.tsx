"use client";

import { useEffect, useState } from "react";

export default function TVPage() {
  const [menu, setMenu] = useState<any[]>([]);
  const [groupIndex, setGroupIndex] = useState(0);

  const groups = ["A", "B", "C"];

  useEffect(() => {
    async function loadMenu() {
      try {
        const res = await fetch(
          "https://opensheet.elk.sh/1xAFB9aRbpOb0akjqVqCVxkQu2mGkasUoaY09WqVTbys/menu"
        );

        const data = await res.json();
        setMenu(data);
      } catch (error) {
        console.error("Load menu error:", error);
      }
    }

    loadMenu();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setGroupIndex((prev) => (prev + 1) % groups.length);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const currentGroup = groups[groupIndex];

  const items = menu
    .filter(
      (item: any) =>
        item.available === "TRUE" &&
        item.tvGroup === currentGroup
    )
    .sort(
      (a: any, b: any) =>
        Number(a.tvOrder || 999) -
        Number(b.tvOrder || 999)
    )
    .slice(0, 4);

  return (
    <main className="h-screen bg-black text-white flex flex-col overflow-hidden">

      <header className="h-[12vh] px-10 flex items-center justify-between border-b border-white/20">
        <div>
          <h1 className="text-5xl font-bold">
            Gradient Toast Cafe
          </h1>

          <p className="text-xl opacity-70">
            Featured Menu • Group {currentGroup}
          </p>
        </div>
      </header>

      <section className="flex-1 px-8 py-4">
        <div className="grid grid-cols-4 gap-5 h-full">

          {items.map((item: any) => (
            <div
              key={item.item_code}
              className="bg-white rounded-3xl overflow-hidden text-black flex flex-col shadow-xl"
            >
              <div className="h-[65%] flex items-center justify-center bg-white p-3">
                <img
                  src={item.tvImage || item.image}
                  alt={item.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              <div className="p-4 flex-1">
                <h2 className="text-xl font-bold leading-tight">
                  {item.name}
                </h2>

                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {item.thai}
                </p>

                <div className="mt-3">
                  {item.price1 && (
                    <div className="text-3xl font-bold text-red-500">
                      ฿{item.price1}
                    </div>
                  )}

                  {item.hot && (
                    <div className="text-sm mt-2">
                      ☕ Hot ฿{item.hot}
                    </div>
                  )}

                  {item.iced && (
                    <div className="text-sm">
                      🧊 Iced ฿{item.iced}
                    </div>
                  )}

                  {item.frappe && (
                    <div className="text-sm">
                      ❄️ Frappe ฿{item.frappe}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>

      <footer className="h-[12vh] px-10 border-t border-white/20 flex items-center justify-between">
        <div>
          <div className="text-3xl font-bold">
            Scan for Full Menu
          </div>

          <div className="text-lg opacity-70">
            Order • Explore • Enjoy
          </div>
        </div>

        <img
          src="/qr-menu.png"
          alt="QR Menu"
          className="h-24 w-24 rounded-xl bg-white p-2"
        />
      </footer>

    </main>
  );
}