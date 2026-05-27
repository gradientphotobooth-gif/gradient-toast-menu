async function getMenu() {
  const SHEET_ID =
    "1xAFB9aRbpOb0akjqVqCVxkQu2mGkasUoaY09WqVTbys";

  try {
    const onlineRes = await fetch(
      `https://opensheet.elk.sh/${SHEET_ID}/menu`,
      {
        cache: "no-store",
      }
    );

    if (onlineRes.ok) {
      return await onlineRes.json();
    }

    throw new Error("Online failed");
  } catch (error) {
    console.log("Using fallback");

    return [];
  }
}

export default async function GradientToastMenu() {
  const menu = await getMenu();

  // GROUP MENU
  const groupedMenu = (menu || []).reduce(
    (acc: any, item: any) => {
      if (
        String(item.available)
          .trim()
          .toLowerCase() !== "true"
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
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dlex0z0m5/image/upload/v1779441177/background_n8qsyn.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* OVERLAY */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "rgba(0,0,0,0.35)",
          }}
        />

        {/* CONTENT */}
        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32">
          <div className="space-y-6 max-w-3xl">
            {/* BADGE */}
            <div
              style={{
                display: "inline-block",
                padding: "10px 18px",
                borderRadius: "999px",
                border:
                  "1px solid rgba(255,255,255,0.3)",
                background:
                  "rgba(255,255,255,0.12)",
                color: "#fff8ef",
                fontSize: "12px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              Gradient Toast Café
            </div>

            {/* TITLE */}
            <h1
              style={{
                fontSize: "56px",
                lineHeight: "1.2",
                color: "#fff8ef",
                letterSpacing: "0.04em",
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
              style={{
                color: "#f6ead9",
                fontSize: "18px",
                lineHeight: "1.8",
                letterSpacing: "0.05em",
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
                    style={{
                      display: "inline-block",
                      padding: "10px 18px",
                      borderRadius: "999px",
                      border:
                        "1px solid #f2dfc2",
                      background:
                        "rgba(255,255,255,0.15)",
                      color: "#fff8ef",
                      textDecoration: "none",
                      fontSize: "14px",
                      letterSpacing: "0.08em",
                    }}
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
              className="space-y-14"
            >
              {/* TITLE */}
              <div className="flex items-center gap-5">
                <div className="h-px flex-1 bg-[#d8c2a3]" />

                <h2
                  style={{
                    fontSize: "42px",
                    color: "#b38b59",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontFamily:
                      '"Hiragino Mincho ProN", serif',
                    fontWeight: 300,
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
                  style={{
                    display: "inline-block",
                    padding: "10px 16px",
                    borderRadius: "999px",
                    border:
                      "1px solid #d8c2a3",
                    background: "#fff",
                    color: "#8d6f49",
                    textDecoration: "none",
                    fontSize: "12px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  Back to Top ↑
                </a>
              </div>

              {/* SUB CATEGORY */}
              {Object.entries(cateGroups).map(
                ([cate1, items]: any) => (
                  <div
                    key={cate1}
                    className="space-y-8"
                  >
                    {/* SUB TITLE */}
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-px bg-[#d8c2a3]" />

                      <h3
                        style={{
                          fontSize: "28px",
                          color: "#8d6f49",
                          letterSpacing: "0.12em",
                          textTransform:
                            "uppercase",
                          fontWeight: 300,
                        }}
                      >
                        {cate1}
                      </h3>
                    </div>

                    {/* NORMAL MENU */}
                    {String(cate)
                      .trim()
                      .toLowerCase() !==
                    "add on" ? (
                      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {items.map((item: any) => (
                          <div
                            key={item.item_code}
                            style={{
                              border:
                                "1px solid #eadcc8",
                              borderRadius:
                                "28px",
                              overflow:
                                "hidden",
                              background:
                                "#fffaf4",
                              boxShadow:
                                "0 4px 18px rgba(0,0,0,0.06)",
                            }}
                          >
                            {/* IMAGE */}
                            <div
                              style={{
                                position:
                                  "relative",
                              }}
                            >
                              <img
                                src={
                                  item.image &&
                                  item.image.startsWith(
                                    "http"
                                  )
                                    ? item.image
                                    : "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1200&auto=format&fit=crop"
                                }
                                alt={
                                  item.name ||
                                  "menu"
                                }
                                className="w-full h-[260px]"
                                style={{
                                  objectFit:
                                    "cover",
                                  display:
                                    "block",
                                }}
                              />

                              {/* BADGE */}
                              <div
                                style={{
                                  position:
                                    "absolute",
                                  top: "14px",
                                  right:
                                    "14px",
                                  display:
                                    "flex",
                                  gap: "8px",
                                  flexWrap:
                                    "wrap",
                                  justifyContent:
                                    "flex-end",
                                }}
                              >
                                {/* RECOMMEND */}
                                {String(
                                  item.recommend
                                )
                                  .trim()
                                  .toLowerCase() ===
                                  "true" && (
                                  <div
                                    style={{
                                      background:
                                        "#c49a6c",
                                      color:
                                        "white",
                                      padding:
                                        "6px 12px",
                                      borderRadius:
                                        "999px",
                                      fontSize:
                                        "10px",
                                      letterSpacing:
                                        "0.1em",
                                      fontWeight:
                                        600,
                                    }}
                                  >
                                    RECOMMEND
                                  </div>
                                )}

                                {/* NEW */}
                                {String(
                                  item.newmenu
                                )
                                  .trim()
                                  .toLowerCase() ===
                                  "true" && (
                                  <div
                                    style={{
                                      background:
                                        "#8d6f49",
                                      color:
                                        "white",
                                      padding:
                                        "6px 12px",
                                      borderRadius:
                                        "999px",
                                      fontSize:
                                        "10px",
                                      letterSpacing:
                                        "0.1em",
                                      fontWeight:
                                        600,
                                    }}
                                  >
                                    NEW
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* CONTENT */}
                            <div className="p-6 space-y-4">
                              {/* ITEM CODE */}
                              <div
                                style={{
                                  fontSize:
                                    "11px",
                                  letterSpacing:
                                    "0.2em",
                                  color:
                                    "#b19c88",
                                  textTransform:
                                    "uppercase",
                                }}
                              >
                                {
                                  item.item_code
                                }
                              </div>

                              {/* NAME */}
                              <div className="space-y-2">
                                <h3
                                  style={{
                                    fontSize:
                                      "30px",
                                    color:
                                      "#4b4033",
                                    lineHeight:
                                      "1.3",
                                    fontFamily:
                                      '"Hiragino Mincho ProN", serif',
                                  }}
                                >
                                  {item.name}
                                </h3>

                                <div
                                  style={{
                                    fontSize:
                                      "20px",
                                    color:
                                      "#6d573d",
                                    fontWeight:
                                      600,
                                  }}
                                >
                                  {item.thai}
                                </div>
                              </div>

                              {/* PRICE */}
                              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                                {item.price1 && (
                                  <div>
                                    1P ฿
                                    {
                                      item.price1
                                    }
                                  </div>
                                )}

                                {item.price2 && (
                                  <div>
                                    2P ฿
                                    {
                                      item.price2
                                    }
                                  </div>
                                )}

                                {item.price3 && (
                                  <div>
                                    3P ฿
                                    {
                                      item.price3
                                    }
                                  </div>
                                )}

                                {item.price4 && (
                                  <div>
                                    4P ฿
                                    {
                                      item.price4
                                    }
                                  </div>
                                )}

                                {item.price5 && (
                                  <div>
                                    5P ฿
                                    {
                                      item.price5
                                    }
                                  </div>
                                )}

                                {item.hot && (
                                  <div>
                                    ☕ H ฿
                                    {item.hot}
                                  </div>
                                )}

                                {item.iced && (
                                  <div>
                                    🧊 I ฿
                                    {item.iced}
                                  </div>
                                )}

                                {item.frappe && (
                                  <div>
                                    ❄️ F ฿
                                    {
                                      item.frappe
                                    }
                                  </div>
                                )}
                              </div>

                              {/* DESC */}
                              <div className="space-y-2">
                                <p
                                  style={{
                                    color:
                                      "#8e7a67",
                                    fontSize:
                                      "14px",
                                    lineHeight:
                                      "1.8",
                                  }}
                                >
                                  {item.desc}
                                </p>

                                <p
                                  style={{
                                    color:
                                      "#b19c88",
                                    fontSize:
                                      "12px",
                                    fontStyle:
                                      "italic",
                                    lineHeight:
                                      "1.8",
                                  }}
                                >
                                  {
                                    item.desc_e
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      /* ADD ON */
                      <div
                        style={{
                          border:
                            "1px solid #eadcc8",
                          borderRadius:
                            "28px",
                          background:
                            "#fffaf4",
                          padding: "32px",
                        }}
                      >
                        <div className="space-y-4">
                          {items.map(
                            (item: any) => (
                              <div
                                key={
                                  item.item_code
                                }
                                style={{
                                  display:
                                    "flex",
                                  justifyContent:
                                    "space-between",
                                  alignItems:
                                    "center",
                                  paddingBottom:
                                    "16px",
                                  borderBottom:
                                    "1px solid #efe3d3",
                                }}
                              >
                                {/* LEFT */}
                                <div>
                                  <div
                                    style={{
                                      fontSize:
                                        "18px",
                                      color:
                                        "#4b4033",
                                      fontWeight:
                                        500,
                                    }}
                                  >
                                    {
                                      item.name
                                    }
                                  </div>

                                  <div
                                    style={{
                                      fontSize:
                                        "14px",
                                      color:
                                        "#8d6f49",
                                    }}
                                  >
                                    {
                                      item.thai
                                    }
                                  </div>
                                </div>

                                {/* PRICE */}
                                <div
                                  style={{
                                    color:
                                      "#c49a6c",
                                    fontSize:
                                      "20px",
                                    fontWeight:
                                      600,
                                  }}
                                >
                                  +฿
                                  {
                                    item.price1
                                  }
                                </div>
                              </div>
                            )
                          )}
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