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

  const recommend = menu
    .filter(
      (item: any) =>
        item.available === "TRUE" &&
        item.tvGroup === tvGroup
    )
    .sort(
      (a: any, b: any) =>
        Number(a.tvOrder || 999) -
        Number(b.tvOrder || 999)
    )
    .slice(0, 4);

  const heroImage =
    recommend[0]?.tvImage ||
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4";

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative h-[45vh]">
        <img
          src={heroImage}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex flex-col justify-center px-16">
          <h1 className="text-7xl font-bold">
            Gradient Toast Cafe
          </h1>

          <p className="text-3xl mt-4 opacity-90">
            A Toast Culture Experience
          </p>
        </div>
      </section>

      {/* RECOMMENDED */}
      <section className="h-[35vh] px-12 py-8">
        <h2 className="text-5xl font-bold mb-6">
          ⭐ Recommended
        </h2>

        <div className="grid grid-cols-4 gap-6">
          {recommend.map((item: any, index: number) => (
            <div
              key={item.item_code || index}
              className="bg-white/10 rounded-3xl p-6 backdrop-blur-sm"
            >
              <div className="text-3xl font-bold">
                {item.name}
              </div>

              <div className="text-xl opacity-80 mt-2">
                {item.thai}
              </div>

              {/* DRINK */}
              {(item.hot || item.iced || item.frappe) && (
                <div className="mt-4 space-y-1 text-2xl">
                  {item.hot && (
                    <div>
                      ☕ H ฿{item.hot}
                    </div>
                  )}

                  {item.iced && (
                    <div>
                      🧊 I ฿{item.iced}
                    </div>
                  )}

                  {item.frappe && (
                    <div>
                      ❄️ F ฿{item.frappe}
                    </div>
                  )}
                </div>
              )}

              {/* FOOD */}
              {!item.hot &&
                !item.iced &&
                !item.frappe &&
                item.price1 && (
                  <div className="mt-4 text-3xl text-yellow-400 font-bold">
                    From ฿{item.price1}
                  </div>
                )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <section className="h-[20vh] border-t border-white/20 px-12 flex items-center justify-between">
        <div>
          <div className="text-4xl font-bold">
            Scan for Full Menu
          </div>

          <div className="text-2xl opacity-70 mt-2">
            Order • Explore • Enjoy
          </div>
        </div>

        <img
          src="/qr-menu.png"
          alt="QR Menu"
          className="w-40 h-40 bg-white p-2 rounded-xl"
        />
      </section>
    </main>
  );
}