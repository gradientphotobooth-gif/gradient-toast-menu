export const dynamic = "force-dynamic";

async function getMenu() {
  const res = await fetch(
    "https://opensheet.elk.sh/1xAFB9aRbpOb0akjqVqCVxkQu2mGkasUoaY09WqVTbys/menu",
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function TVPage() {
  const menu = await getMenu();

  const tvGroup = "A";

  const items = menu
    .filter(
      (item: any) =>
        item.available === "TRUE" &&
        item.tvGroup === tvGroup
    )
    .sort(
      (a: any, b: any) =>
        Number(a.tvOrder || 999) -
        Number(b.tvOrder || 999)
    );

  const hero = items[0];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative h-[45vh] overflow-hidden">
        <img
          src={hero?.tvImage}
          alt={hero?.name}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex flex-col justify-center px-16">
          <h1 className="text-7xl font-bold">
            Gradient Toast Cafe
          </h1>

          <p className="text-3xl mt-4">
            A Toast Culture Experience
          </p>
        </div>
      </section>

      {/* MENU GRID */}
      <section className="px-10 py-6">
        <div className="grid grid-cols-4 gap-6">
          {items.slice(0, 4).map((item: any) => (
            <div
              key={item.item_code}
              className="bg-white/10 rounded-3xl overflow-hidden"
            >
              <img
                src={item.tvImage || item.image}
                alt={item.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-5">
                <h3 className="text-2xl font-bold">
                  {item.name}
                </h3>

                <p className="text-lg opacity-80 mt-1">
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
          className="w-36 h-36 bg-white rounded-xl p-2"
        />
      </section>
    </main>
  );
}