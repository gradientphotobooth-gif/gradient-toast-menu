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

```
  const data = await res.json();
  setMenu(data);
}

loadMenu();
```

}, []);

useEffect(() => {
const timer = setInterval(() => {
setGroupIndex((prev) => (prev + 1) % groups.length);
}, 10000);

```
return () => clearInterval(timer);
```

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
)
.slice(0, 4);

return ( <main className="h-screen bg-black text-white flex flex-col">

```
  {/* HEADER */}
  <section className="h-[15vh] px-10 flex items-center justify-between border-b border-white/20">

    <div>
      <h1 className="text-5xl font-bold">
        Gradient Toast Cafe
      </h1>

      <p className="text-xl opacity-70 mt-1">
        Featured Menu • Group {currentGroup}
      </p>
    </div>

  </section>

  {/* MENU */}
  <section className="flex-1 px-8 py-4">

    <div className="grid grid-cols-4 gap-5 h-full">

      {items.map((item) => (
        <div
          key={item.item_code}
          className="bg-white rounded-3xl overflow-hidden text-black flex flex-col"
        >

          <div className="h-[65%] flex items-center justify-center bg-white">

            <img
              src={item.tvImage || item.image}
              alt={item.name}
              className="max-h-full max-w-full object-contain"
            />

          </div>

          <div className="p-4 flex-1">

            <h2 className="text-2xl font-bold leading-tight">
              {item.name}
            </h2>

            <p className="text-lg text-gray-600 mt-1 line-clamp-2">
              {item.thai}
            </p>

            <div className="mt-3">

              {item.price1 && (
                <div className="text-4xl font-bold text-red-500">
                  ฿{item.price1}
                </div>
              )}

              {item.hot && (
                <div className="text-lg">
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
  <section className="h-[15vh] px-10 border-t border-white/20 flex items-center justify-between">

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
      className="h-24 w-24 rounded-lg bg-white p-2"
    />

  </section>

</main>
```

);
}
