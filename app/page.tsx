export const dynamic = "force-dynamic";

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
      style={{
        minHeight: "100vh",
        background: "#f8f4ec",
        color: "#5f5243",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* HERO */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid #d8c2a3",
        }}
      >
        {/* BG */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('https://res.cloudinary.com/dlex0z0m5/image/upload/f_jpg/v1779441177/background_n8qsyn.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* OVERLAY */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "rgba(0,0,0,0.35)",
          }}
        />

        {/* CONTENT */}
        <div
          style={{
            position: "relative",
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "80px 24px",
          }}
        >
          {/* BADGE */}
          <div
            style={{
              display: "inline-block",
              padding: "10px 18px",
              borderRadius: "999px",
              border:
                "1px solid rgba(255,255,255,0.35)",
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
              fontSize: "54px",
              lineHeight: "1.2",
              color: "#fff8ef",
              marginTop: "24px",
              marginBottom: "20px",
              fontWeight: 400,
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
              maxWidth: "700px",
            }}
          >
            Toast • Coffee • Waffle • Yogurt •
            Smoothie • Gelato
          </p>

          {/* CATEGORY BUTTON */}
          <div
            style={{
              marginTop: "28px",
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
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
                  }}
                >
                  {cate}
                </a>
              )
            )}
          </div>
        </div>
      </section>

      {/* MENU */}
      <section
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "60px 24px",
        }}
      >
        {Object.entries(groupedMenu).map(
          ([cate, cateGroups]: any) => (
            <div
              key={cate}
              id={cate}
              style={{
                marginBottom: "100px",
              }}
            >
              {/* CATEGORY TITLE */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  marginBottom: "40px",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background:
                      "#d8c2a3",
                  }}
                />

                <h2
                  style={{
                    fontSize: "40px",
                    color: "#b38b59",
                    letterSpacing: "0.15em",
                    textTransform:
                      "uppercase",
                    fontWeight: 300,
                    fontFamily:
                      '"Hiragino Mincho ProN", serif',
                  }}
                >
                  {cate}
                </h2>

                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background:
                      "#d8c2a3",
                  }}
                />
              </div>

              {/* BACK TO TOP */}
              <div
                style={{
                  textAlign: "right",
                  marginBottom: "30px",
                }}
              >
                <a
                  href="#top"
                  style={{
                    display:
                      "inline-block",
                    padding:
                      "10px 16px",
                    borderRadius:
                      "999px",
                    border:
                      "1px solid #d8c2a3",
                    background:
                      "#ffffff",
                    color: "#8d6f49",
                    textDecoration:
                      "none",
                    fontSize: "12px",
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
                    style={{
                      marginBottom:
                        "60px",
                    }}
                  >
                    {/* SUB TITLE */}
                    <div
                      style={{
                        display: "flex",
                        alignItems:
                          "center",
                        gap: "12px",
                        marginBottom:
                          "28px",
                      }}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "1px",
                          background:
                            "#d8c2a3",
                        }}
                      />

                      <h3
                        style={{
                          fontSize:
                            "26px",
                          color:
                            "#8d6f49",
                          letterSpacing:
                            "0.08em",
                          textTransform:
                            "uppercase",
                          fontWeight: 400,
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
                      <div
                        style={{
                          display:
                            "flex",
                          flexWrap:
                            "wrap",
                          gap: "24px",
                        }}
                      >
                        {items.map(
                          (item: any) => (
                            <div
                              key={
                                item.item_code
                              }
                              style={{
                                width:
                                  "100%",
                                maxWidth:
                                  "380px",
                                flex:
                                  "1 1 320px",
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
                                  width="100%"
                                  height="260"
                                  style={{
                                    objectFit:
                                      "cover",
                                    display:
                                      "block",
                                  }}
                                />

                                {/* BADGES */}
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
                                          "#fff",
                                        padding:
                                          "6px 12px",
                                        borderRadius:
                                          "999px",
                                        fontSize:
                                          "10px",
                                        fontWeight:
                                          700,
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
                                          "#fff",
                                        padding:
                                          "6px 12px",
                                        borderRadius:
                                          "999px",
                                        fontSize:
                                          "10px",
                                        fontWeight:
                                          700,
                                      }}
                                    >
                                      NEW
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* CONTENT */}
                              <div
                                style={{
                                  padding:
                                    "24px",
                                }}
                              >
                                {/* ITEM CODE */}
                                <div
                                  style={{
                                    fontSize:
                                      "11px",
                                    letterSpacing:
                                      "0.18em",
                                    color:
                                      "#b19c88",
                                    marginBottom:
                                      "16px",
                                  }}
                                >
                                  {
                                    item.item_code
                                  }
                                </div>

                                {/* TITLE */}
                                <h3
                                  style={{
                                    fontSize:
                                      "30px",
                                    lineHeight:
                                      "1.3",
                                    color:
                                      "#4b4033",
                                    marginBottom:
                                      "10px",
                                    fontFamily:
                                      '"Hiragino Mincho ProN", serif',
                                  }}
                                >
                                  {item.name}
                                </h3>

                                {/* THAI */}
                                <div
                                  style={{
                                    fontSize:
                                      "20px",
                                    color:
                                      "#6d573d",
                                    fontWeight:
                                      600,
                                    marginBottom:
                                      "18px",
                                  }}
                                >
                                  {item.thai}
                                </div>

<div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "18px",
  }}
>
  {item.price1 && (
    <div
      style={{
        background: "#f4ede4",
        border: "1px solid #e1d2bd",
        borderRadius: "12px",
        padding: "8px 12px",
        minWidth: "75px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "11px",
          color: "#8d6f49",
        }}
      >
        1 Piece
      </div>

      <div
        style={{
          fontSize: "18px",
          fontWeight: 700,
          color: "#b38b59",
        }}
      >
        ฿{item.price1}
      </div>
    </div>
  )}

  {item.price3 && (
    <div
      style={{
        background: "#f4ede4",
        border: "1px solid #e1d2bd",
        borderRadius: "12px",
        padding: "8px 12px",
        minWidth: "75px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "11px",
          color: "#8d6f49",
        }}
      >
        3 Pieces
      </div>

      <div
        style={{
          fontSize: "18px",
          fontWeight: 700,
          color: "#b38b59",
        }}
      >
        ฿{item.price3}
      </div>
    </div>
  )}

  {item.price5 && (
    <div
      style={{
        background: "#f4ede4",
        border: "1px solid #e1d2bd",
        borderRadius: "12px",
        padding: "8px 12px",
        minWidth: "75px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "11px",
          color: "#8d6f49",
        }}
      >
        5 Pieces
      </div>

      <div
        style={{
          fontSize: "18px",
          fontWeight: 700,
          color: "#b38b59",
        }}
      >
        ฿{item.price5}
      </div>
    </div>
  )}

  {item.hot && (
    <div
      style={{
        background: "#fff6ee",
        border: "1px solid #f1d3b2",
        borderRadius: "12px",
        padding: "8px 12px",
      }}
    >
      ☕ Hot ฿{item.hot}
    </div>
  )}

  {item.iced && (
    <div
      style={{
        background: "#eef7ff",
        border: "1px solid #cfe4f6",
        borderRadius: "12px",
        padding: "8px 12px",
      }}
    >
      🧊 Iced ฿{item.iced}
    </div>
  )}

  {item.frappe && (
    <div
      style={{
        background: "#f2f7ff",
        border: "1px solid #d6e3f7",
        borderRadius: "12px",
        padding: "8px 12px",
      }}
    >
      ❄️ Frappe ฿{item.frappe}
    </div>
  )}
</div>

                                {/* DESC */}
                                <div>
                                  <p
                                    style={{
                                      color:
                                        "#8e7a67",
                                      fontSize:
                                        "14px",
                                      lineHeight:
                                        "1.8",
                                      marginBottom:
                                        "8px",
                                    }}
                                  >
                                    {
                                      item.desc
                                    }
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
                          )
                        )}
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
                                marginBottom:
                                  "16px",
                                borderBottom:
                                  "1px solid #efe3d3",
                              }}
                            >
                              <div>
                                <div
                                  style={{
                                    fontSize:
                                      "18px",
                                    color:
                                      "#4b4033",
                                    fontWeight:
                                      600,
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

                              <div
                                style={{
                                  color:
                                    "#c49a6c",
                                  fontSize:
                                    "20px",
                                  fontWeight:
                                    700,
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