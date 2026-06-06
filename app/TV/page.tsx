"use client";

import { useEffect, useState } from "react";

export default function TVPage() {
const [menu, setMenu] = useState<any[]>([]);
const [groupIndex, setGroupIndex] = useState(0);

const groups = ["A", "B", "C"];

useEffect(() => {
fetch(
"https://opensheet.elk.sh/1xAFB9aRbpOb0akjqVqCVxkQu2mGkasUoaY09WqVTbys/menu"
)
.then((res) => res.json())
.then((data) => {
setMenu(data);
})
.catch((err) => {
console.error(err);
});
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
className="h-screen relative overflow-hidden"
style={{
backgroundImage:
"url('https://res.cloudinary.com/dlex0z0m5/image/upload/v1780578631/web_background_2_ukczwb.png')",
backgroundSize: "cover",
backgroundPosition: "center",
backgroundRepeat: "no-repeat",
}}
> <div className="absolute inset-0 bg-white/10"></div>

```
  <div className="absolute top-8 left-12 z-20">
    <h1 className="text-6xl font-bold text-[#4A2B17]">
      Gradient Toast Cafe
    </h1>

    <p className="text-2xl text-[#6D4C41] mt-2">
      A Toast Culture Experience
    </p>
  </div>

  <div className="absolute top-8 right-12 z-20 bg-white rounded-3xl p-4 shadow-xl">
    <img
      src="/qr-menu.png"
      alt="QR Menu"
      className="w-28 h-28"
    />
  </div>

  <div className="absolute top-[180px] left-10 right-10 bottom-10">
    <div className="grid grid-cols-4 gap-6 h-full">
      {items.map((item: any) => (
        <div
          key={item.item_code}
          className="bg-white rounded-[32px] overflow-hidden shadow-xl flex flex-col"
        >
          <div className="h-[72%]">
            <img
              src={item.tvImage || item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="h-[28%] p-4">
            <h2 className="text-xl font-bold text-gray-900 line-clamp-2">
              {item.name}
            </h2>

            <div className="mt-3">
              {item.hot && (
                <div className="flex justify-between text-sm">
                  <span>Hot</span>
                  <span>฿{item.hot}</span>
                </div>
              )}

              {item.iced && (
                <div className="flex justify-between text-sm">
                  <span>Iced</span>
                  <span>฿{item.iced}</span>
                </div>
              )}

              {item.frappe && (
                <div className="flex justify-between text-sm">
                  <span>Frappe</span>
                  <span>฿{item.frappe}</span>
                </div>
              )}

              {!item.hot && !item.iced && !item.frappe && (
                <div className="text-3xl font-bold text-orange-600">
                  ฿{item.price1}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</main>


);
}
