async function getMenu() {
  const SHEET_ID =
    "1xAFB9aRbpOb0akjqVqCVxkQu2mGkasUoaY09WqVTbys";

  try {
    const res = await fetch(
      `https://opensheet.elk.sh/${SHEET_ID}/menu`,
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function GradientToastMenu() {
  const menu = await getMenu();

  // GROUP CATEGORY
  const groupedMenu = (menu || []).reduce(
    (acc: any, item: any) => {
      if (
        String(item.available).toLowerCase() !==
        "true"
      ) {
        return acc;
      }

      const cate = item.cate || "Other";
      const cate1 = item.cate1 || "Menu";

      if (!acc[cate]) {
        acc[cate] = {};
      }

      if (!acc[cate][cate1]) {
        acc[cate][cate1] = [];
      }

      acc[cate][cate1].push(item);

      return acc;
    },
    {}
  );

  return (
    <div
      id="top"
      className="min-h-screen bg-[#f8f4ec] text-[#5f5243]"
    >
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#d8c2a3]">
        {/* BG */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dlex0z0m5/image/upload/v1779441177/background_n8qsyn.png')",
          }}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/40" />

        {/* CONTENT */}
        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-36">
          <div className="space-y-7 max-w-3xl">
            {/* BADGE */}
            <div className="inline-flex items-center rounded-full border border-[#e8d5b5] bg-white/15 px-5 py-2 text-sm tracking-[0.3em] uppercase text-[#fff8ef] backdrop-blur-sm">
              Gradient Toast Café
            </div>

            {/* TITLE */}
            <h1
              className="text-5xl lg:text-7xl leading-tight tracking-[0.04em] text-[#fff8ef]"
              style={{
                fontFamily:
                  '"Hiragino Mincho ProN", serif',
              }}
            >
              A Toast Culture
              <br />
              Experience
            </h1>

            {/* SUBTEXT */}
            <p
              className="text-[#f6ead9] text-lg lg:text-xl leading-relaxed tracking-wide"
              style={{
                fontFamily:
                  '"Hiragino Sans", sans-serif',
              }}
            >
              Toast • Coffee • Waffle • Yogurt •
              Smoothie • Gelato
            </p>

            {/* CATEGORY BUTTON */}
            <div className="flex flex-wrap gap-3 pt-6">
              {Object.keys(groupedMenu).map(
                (cate: any) => (
                  <a
                    key={cate}
                    href={`#${cate}`}
                    className="rounded-full border border-[#f2dfc2] bg-white/15 px-5 py-2 text-sm tracking-[0.12em] text-[#fff8ef] backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-[#6d573d]"
                  >
                    {cate}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section className="max-w-7xl mx-auto px-6 py-16 space-y-24">
        {Object.entries(groupedMenu).map(
          ([cate, cateGroups]: any) => (
            <div
              key={cate}
              id={cate}
              className="space-y-14 scroll-mt-24"
            >
              {/* CATEGORY TITLE */}
              <div className="flex items-center gap-5">
                <div className="h-px flex-1 bg-[#d8c2a3]" />

                <h2
                  className="text-3xl lg:text-5xl font-light tracking-[0.18em] uppercase text-[#b38b59]"
                  style={{
                    fontFamily:
                      '"Hiragino Mincho ProN", serif',
                  }}
                >
                  {cate}
                </h2>

                <div className="h-px flex-1 bg-[#d8c2a3]" />
              </div>

              {/* BACK TO TOP */}
              <div className="flex justify-end">
                <a
                  href="#top"
                  className="rounded-full border border-[#d8c2a3] bg-white px-4 py-2 text-xs tracking-[0.18em] uppercase text-[#8d6f49] transition-all duration-300 hover:bg-[#b38b59] hover:text-white"
                >
                  Back to Top ↑
                </a>
              </div>

              {/* SUB CATEGORY */}
              {Object.entries(cateGroups).map(
                ([cate1, items]: any) => (
                  <div key={cate1} className="space-y-8">
                    {/* SUB TITLE */}
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-px bg-[#d8c2a3]" />

                      <h3
                        className="text-2xl font-light tracking-[0.12em] uppercase text-[#8d6f49]"
                        style={{
                          fontFamily:
                            '"Hiragino Sans", sans-serif',
                        }}
                      >
                        {cate1}
                      </h3>
                    </div>

                    {/* NORMAL MENU */}
                    {String(cate).toLowerCase() !==
                    "add on" ? (
                      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {items.map((item: any) => (
                          <div
                            key={item.item_code}
                            className="group rounded-[30px] border border-[#eadcc8] bg-[#fffaf4] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                          >
                            {/* IMAGE */}
                            <div className="relative">
                              <img
                                src={
                                  item.image &&
                                  item.image.startsWith(
                                    "http"
                                  )
                                    ? item.image
                                    : "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1200&auto=format&fit=crop"
                                }
                                alt={item.name || "menu"}
                                className="w-full h-[260px] object-cover transition-all duration-700 group-hover:scale-105"
                              />

                              {/* OVERLAY */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                              {/* BADGES */}
                              <div className="absolute top-4 right-4 flex gap-2 flex-wrap justify-end max-w-[70%]">
                                {/* RECOMMEND */}
                                {String(
                                  item.recommend
                                ).toLowerCase() ===
                                  "true" && (
                                  <div className="rounded-full bg-gradient-to-r from-[#c49a6c] to-[#e2c08d] px-3 py-1 text-[10px] font-semibold tracking-[0.12em] text-white shadow-lg">
                                    RECOMMEND
                                  </div>
                                )}

                                {/* NEW */}
                                {String(
                                  item.newmenu
                                ).toLowerCase() ===
                                  "true" && (
                                  <div className="rounded-full bg-[#8d6f49] px-3 py-1 text-[10px] font-semibold tracking-[0.12em] text-white shadow-lg">
                                    NEW
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* CONTENT */}
                            <div className="p-6 space-y-5">
                              {/* ITEM CODE */}
                              <div className="text-xs tracking-[0.2em] text-[#b19c88] uppercase">
                                {item.item_code}
                              </div>

                              {/* TITLE */}
                              <div className="space-y-3">
                                <h3
                                  className="text-2xl font-medium text-[#4b4033] leading-snug"
                                  style={{
                                    fontFamily:
                                      '"Hiragino Mincho ProN", serif',
                                  }}
                                >
                                  {item.name}
                                </h3>

                                <p className="text-[#6d573d] text-[18px] font-semibold tracking-[0.03em]">
                                  {item.thai}
                                </p>
                              </div>

                              {/* PRICING */}
                              <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1 text-sm">
                                {item.price1 && (
                                  <div className="flex items-center gap-1">
                                    <span className="text-[#8d6f49]">
                                      1P
                                    </span>

                                    <span className="font-semibold text-[#c49a6c]">
                                      ฿{item.price1}
                                    </span>
                                  </div>
                                )}

                                {item.price2 && (
                                  <div className="flex items-center gap-1">
                                    <span className="text-[#8d6f49]">
                                      2P
                                    </span>

                                    <span className="font-semibold text-[#c49a6c]">
                                      ฿{item.price2}
                                    </span>
                                  </div>
                                )}

                                {item.price3 && (
                                  <div className="flex items-center gap-1">
                                    <span className="text-[#8d6f49]">
                                      3P
                                    </span>

                                    <span className="font-semibold text-[#c49a6c]">
                                      ฿{item.price3}
                                    </span>
                                  </div>
                                )}

                                {item.price4 && (
                                  <div className="flex items-center gap-1">
                                    <span className="text-[#8d6f49]">
                                      4P
                                    </span>

                                    <span className="font-semibold text-[#c49a6c]">
                                      ฿{item.price4}
                                    </span>
                                  </div>
                                )}

                                {item.price5 && (
                                  <div className="flex items-center gap-1">
                                    <span className="text-[#8d6f49]">
                                      5P
                                    </span>

                                    <span className="font-semibold text-[#c49a6c]">
                                      ฿{item.price5}
                                    </span>
                                  </div>
                                )}

                                {item.hot && (
                                  <div className="flex items-center gap-1">
                                    <span className="text-[#8d6f49]">
                                      ☕ H
                                    </span>

                                    <span className="font-semibold text-[#c49a6c]">
                                      ฿{item.hot}
                                    </span>
                                  </div>
                                )}

                                {item.iced && (
                                  <div className="flex items-center gap-1">
                                    <span className="text-[#8d6f49]">
                                      🧊 I
                                    </span>

                                    <span className="font-semibold text-[#c49a6c]">
                                      ฿{item.iced}
                                    </span>
                                  </div>
                                )}

                                {item.frappe && (
                                  <div className="flex items-center gap-1">
                                    <span className="text-[#8d6f49]">
                                      ❄️ F
                                    </span>

                                    <span className="font-semibold text-[#c49a6c]">
                                      ฿{item.frappe}
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* DESCRIPTION */}
                              <div className="space-y-2">
                                <p className="text-[#8e7a67] text-sm leading-relaxed">
                                  {item.desc}
                                </p>

                                <p className="text-[#b19c88] text-xs italic leading-relaxed">
                                  {item.desc_e}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      /* ADD ON STYLE */
                      <div className="rounded-[30px] border border-[#eadcc8] bg-[#fffaf4] p-8">
                        <div className="space-y-4">
                          {items.map((item: any) => (
                            <div
                              key={item.item_code}
                              className="flex items-center justify-between border-b border-[#efe3d3] pb-4 last:border-none"
                            >
                              {/* LEFT */}
                              <div className="space-y-1">
                                <div className="text-[#4b4033] text-lg font-medium">
                                  {item.name}
                                </div>

                                <div className="text-[#8d6f49] text-sm">
                                  {item.thai}
                                </div>

                                {item.desc && (
                                  <div className="text-[#b19c88] text-xs">
                                    {item.desc}
                                  </div>
                                )}
                              </div>

                              {/* PRICE */}
                              <div className="text-[#c49a6c] font-semibold text-lg whitespace-nowrap">
                                +฿{item.price1}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          )
        )}
      </section>
    </div>
  );
}