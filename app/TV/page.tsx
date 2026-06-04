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
        console.error(error);
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
    <main
      className="h-screen relative overflow-hidden text-black"
      style={{
        backgroundImage: "https://res.cloudinary.com/dlex0z0m5/image/upload/v1780562915/web_background_x41da6.png",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />

      {/* Light Effect */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-orange-200/50 rounded-full blur-3xl" />

      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-yellow-200/50 rounded-full blur-3xl" />

      <div className="relative z-10 h-full flex flex-col">

        {/* HEADER */}

        <header className="h-[10vh] px-12 flex items-center">
          <h1 className="text-6xl font-bold text-[#5A341A] drop-shadow">
            Gradient Toast Cafe
          </h1>
        </header>

        {/* MENU */}

        <section className="flex-1 px-10 py-4">
          <div className="grid grid-cols-4 gap-8 h-full">

            {items.map((item: any) => (
              <div
                key={item.item_code}
                className="
                  bg-white/90
                  backdrop-blur
                  rounded-[32px]
                  overflow-hidden
                  shadow-2xl
                  flex
                  flex-col
                "
              >
                <div className="h-[70%] bg-white flex items-center justify-center p-4">
                  <img
                    src={item.tvImage || item.image}
                    alt={item.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <div className="p-5 flex-1">

                  <h2 className="text-2xl font-bold leading-tight">
                    {item.name}
                  </h2>

                  <p className="text-base text-gray-600 mt-1 line-clamp-2">
                    {item.thai}
                  </p>

                  <div className="mt-3">

                    {item.price1 && (
                      <div className="text-4xl font-bold text-orange-600">
                        ฿{item.price1}
                      </div>
                    )}

                  </div>

                </div>
              </div>
            ))}

          </div>
        </section>

        {/* FOOTER */}

        <footer className="h-[12vh] px-12 flex items-center justify-between">

          <div>
            <div className="text-3xl font-bold text-[#5A341A]">
              Scan for Full Menu
            </div>

            <div className="text-lg text-gray-700">
              Order • Explore • Enjoy
            </div>
          </div>

          <img
            src="/qr-menu.png"
            alt="QR Menu"
            className="w-28 h-28 bg-white rounded-2xl p-2 shadow-lg"
          />

        </footer>

      </div>
    </main>
  );
}