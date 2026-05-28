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

export default async function TVMenuPage() {
  const menu = await getMenu();

  // RECOMMEND ONLY
  const recommendMenu = menu.filter(
    (item: any) =>
      String(item.available)
        .trim()
        .toLowerCase() === "true" &&
      String(item.recommend)
        .trim()
        .toLowerCase() === "true"
  );

  // NEW MENU
  const newMenu = menu.filter(
    (item: any) =>
      String(item.available)
        .trim()
        .toLowerCase() === "true" &&
      String(item.newmenu)
        .trim()
        .toLowerCase() === "true"
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "#fff",
        overflow: "hidden",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* HERO */}
      <section
        style={{
          position: "relative",
          height: "62vh",
          overflow: "hidden",
        }}
      >
        {/* VIDEO */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source
            src="https://res.cloudinary.com/dlex0z0m5/video/upload/v1779500000/toast-video.mp4"
            type="video/mp4"
          />
        </video>

        {/* OVERLAY */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.25))",
          }}
        />

        {/* CONTENT */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "60px",
          }}
        >
          {/* BRAND */}
          <div
            style={{
              display: "inline-block",
              width: "fit-content",
              padding: "12px 22px",
              borderRadius: "999px",
              background:
                "rgba(255,255,255,0.12)",
              border:
                "1px solid rgba(255,255,255,0.25)",
              marginBottom: "24px",
              fontSize: "16px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            Gradient Toast Café
          </div>

          {/* TITLE */}
          <h1
            style={{
              fontSize: "88px",
              lineHeight: "1.1",
              margin: 0,
              fontWeight: 300,
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
              marginTop: "22px",
              fontSize: "28px",
              color: "#f0e2cf",
              letterSpacing: "0.08em",
            }}
          >
            Toast • Coffee • Yogurt •
            Smoothie • Gelato
          </p>
        </div>
      </section>

      {/* RECOMMEND SECTION */}
      <section
        style={{
          padding: "50px 60px",
        }}
      >
        {/* TITLE */}
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            marginBottom: "34px",
          }}
        >
          <h2
            style={{
              fontSize: "42px",
              color: "#e7c9a0",
              margin: 0,
              letterSpacing: "0.12em",
              fontWeight: 300,
            }}
          >
            RECOMMEND MENU
          </h2>

          <div
            style={{
              fontSize: "22px",
              color: "#e7c9a0",
            }}
          >
            Scan Full Menu →
          </div>
        </div>

        {/* CARDS */}
        <div
          style={{
            display: "flex",
            gap: "28px",
            overflow: "hidden",
          }}
        >
          {recommendMenu
            .slice(0, 4)
            .map((item: any) => (
              <div
                key={item.item_code}
                style={{
                  flex: 1,
                  background:
                    "rgba(255,255,255,0.06)",
                  border:
                    "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "28px",
                  overflow: "hidden",
                }}
              >
                {/* IMAGE */}
                <div
                  style={{
                    position: "relative",
                    height: "260px",
                  }}
                >
                  <img
                    src={
                      item.image &&
                      item.image.startsWith(
                        "http"
                      )
                        ? item.image.replace(
                            "/upload/",
                            "/upload/f_jpg/"
                          )
                        : "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1200&auto=format&fit=crop"
                    }
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "100%",
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
                      top: "18px",
                      right: "18px",
                      background:
                        "#d6a86c",
                      color: "#fff",
                      padding:
                        "8px 16px",
                      borderRadius:
                        "999px",
                      fontSize: "14px",
                      fontWeight: 700,
                      letterSpacing:
                        "0.08em",
                    }}
                  >
                    RECOMMEND
                  </div>
                </div>

                {/* CONTENT */}
                <div
                  style={{
                    padding: "24px",
                  }}
                >
                  {/* NAME */}
                  <div
                    style={{
                      fontSize: "34px",
                      lineHeight: "1.2",
                      marginBottom:
                        "10px",
                      fontFamily:
                        '"Hiragino Mincho ProN", serif',
                    }}
                  >
                    {item.name}
                  </div>

                  {/* THAI */}
                  <div
                    style={{
                      fontSize: "24px",
                      color: "#e8d7c0",
                      marginBottom:
                        "20px",
                    }}
                  >
                    {item.thai}
                  </div>

                  {/* PRICE */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap:
                        "wrap",
                      gap: "14px",
                      fontSize: "20px",
                      color: "#d8b890",
                    }}
                  >
                    {item.price1 && (
                      <div>
                        1P ฿
                        {item.price1}
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
                        {item.frappe}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* FOOTER */}
      <section
        style={{
          padding:
            "0 60px 50px 60px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            background:
              "rgba(255,255,255,0.06)",
            border:
              "1px solid rgba(255,255,255,0.08)",
            borderRadius: "28px",
            padding: "28px 36px",
          }}
        >
          {/* LEFT */}
          <div>
            <div
              style={{
                fontSize: "18px",
                color: "#e8d7c0",
                marginBottom:
                  "10px",
                letterSpacing:
                  "0.12em",
              }}
            >
              NEW MENU
            </div>

            <div
              style={{
                fontSize: "34px",
                fontFamily:
                  '"Hiragino Mincho ProN", serif',
              }}
            >
              {newMenu[0]?.name ||
                "Seasonal Special"}
            </div>
          </div>

          {/* QR */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://gradient-toast-menu.vercel.app"
              alt="QR"
              style={{
                width: "180px",
                height: "180px",
                background: "#fff",
                padding: "10px",
                borderRadius: "18px",
              }}
            />

            <div>
              <div
                style={{
                  fontSize: "34px",
                  marginBottom:
                    "12px",
                }}
              >
                Scan Full Menu
              </div>

              <div
                style={{
                  color: "#d8b890",
                  fontSize: "20px",
                }}
              >
                Mobile Ordering Available
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}