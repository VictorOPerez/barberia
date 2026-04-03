"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface FoodItem {
  name: string;
  bg: string;
  card: string;
  title: string;
  desc: string;
}

const ITEMS: FoodItem[] = [
  {
    name: "JUICE",
    bg: "linear-gradient(135deg, #2d5016 0%, #0d1f05 60%, #1a3a0a 100%)",
    card: "linear-gradient(145deg, #4a7c26, #2d5016, #86b049)",
    title: "GREEN DETOX",
    desc: "Fresh blend of kale, spinach, apple and ginger for a revitalizing morning boost.",
  },
  {
    name: "PASTA",
    bg: "linear-gradient(135deg, #4a3728 0%, #1a1008 60%, #2c1f14 100%)",
    card: "linear-gradient(145deg, #d4a76a, #8a6540, #f0d4a8)",
    title: "TRUFFLE RAVIOLI",
    desc: "Handmade ravioli stuffed with ricotta and drizzled with black truffle oil.",
  },
  {
    name: "BREAKFAST",
    bg: "linear-gradient(135deg, #3a3520 0%, #1a1508 60%, #2a2815 100%)",
    card: "linear-gradient(145deg, #7a9a3a, #4a6a1a, #a0c050)",
    title: "AVOCADO EGG TOAST",
    desc: "Sourdough toast topped with smashed avocado, poached egg and chili flakes.",
  },
  {
    name: "SEA FOOD",
    bg: "linear-gradient(135deg, #1a2a3a 0%, #081018 60%, #1a3040 100%)",
    card: "linear-gradient(145deg, #d45a3a, #a03a20, #f08060)",
    title: "SALMON SASHIMI",
    desc: "Premium grade salmon sliced thin, served with wasabi and pickled ginger.",
  },
  {
    name: "DESSERT",
    bg: "linear-gradient(135deg, #3a2030 0%, #150810 60%, #2a1525 100%)",
    card: "linear-gradient(145deg, #e8c890, #b08a50, #f0dab0)",
    title: "CHEESECAKE",
    desc: "New York style cheesecake with graham cracker crust and berry compote.",
  },
  {
    name: "BRUNCH",
    bg: "linear-gradient(135deg, #3a3020 0%, #1a1508 60%, #2a2510 100%)",
    card: "linear-gradient(145deg, #d4a040, #a07020, #f0c860)",
    title: "EGGS BENEDICT",
    desc: "Perfectly poached eggs on English muffin with hollandaise and smoked ham.",
  },
  {
    name: "GRILL",
    bg: "linear-gradient(135deg, #3a1a10 0%, #1a0a05 60%, #2a1510 100%)",
    card: "linear-gradient(145deg, #c44a2a, #8a2a10, #e07050)",
    title: "WAGYU STEAK",
    desc: "A5 grade wagyu beef seared to perfection, served with truffle jus.",
  },
];

const CARD_W = 220;
const CARD_GAP = 16;
const CARD_STEP = CARD_W + CARD_GAP;

export default function FoodCategoryCarousel() {
  const [idx, setIdx] = useState(2);
  const [dir, setDir] = useState(1);
  const [descKey, setDescKey] = useState(0);
  const [bgKey, setBgKey] = useState(0);
  const [prevBg, setPrevBg] = useState(ITEMS[2].bg);
  const busy = useRef(false);

  const go = useCallback(
    (d: number) => {
      if (busy.current) return;
      const next = idx + d;
      if (next < 0 || next >= ITEMS.length) return;
      busy.current = true;
      setDir(d);
      setPrevBg(ITEMS[idx].bg);
      setIdx(next);
      setDescKey((k) => k + 1);
      setBgKey((k) => k + 1);
      setTimeout(() => {
        busy.current = false;
      }, 900);
    },
    [idx]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const spring = "all 0.75s cubic-bezier(0.22, 1, 0.36, 1)";
  const springBounce = "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: 580,
        maxHeight: 750,
        overflow: "hidden",
        background: "#0a0a0a",
        fontFamily: "'Georgia', serif",
        userSelect: "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, background: prevBg, zIndex: 0 }} />
      <div
        key={`bg-${bgKey}`}
        style={{
          position: "absolute",
          inset: "-20%",
          background: ITEMS[idx].bg,
          zIndex: 1,
          transformOrigin: "center center",
          animation: "bgGrow 1.1s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 45%, transparent 5%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.88) 100%)",
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "6%",
          left: "18%",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: ITEMS[idx].card,
          opacity: 0.1,
          filter: "blur(60px)",
          transition: spring,
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          right: "12%",
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: ITEMS[idx].card,
          opacity: 0.07,
          filter: "blur(45px)",
          transition: spring,
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "24px 32px",
            flexShrink: 0,
          }}
        >
          <div style={{ cursor: "pointer" }}>
            <span
              style={{
                display: "block",
                width: 28,
                height: 2,
                background: "rgba(255,255,255,0.6)",
                borderRadius: 1,
                marginBottom: 6,
              }}
            />
            <span
              style={{
                display: "block",
                width: 20,
                height: 2,
                background: "rgba(255,255,255,0.35)",
                borderRadius: 1,
              }}
            />
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #e8733a, #c4502a)",
                border: "2px solid rgba(255,255,255,0.2)",
              }}
            />
          </div>
        </div>

        {/* Carousel zone */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: 0,
          }}
        >
          {/* Carousel strip (titles + cards together) */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => go(-1)}
              style={{
                position: "absolute",
                left: 16,
                zIndex: 10,
                background: "rgba(0,0,0,0.3)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "50%",
                width: 42,
                height: 42,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: idx === 0 ? "default" : "pointer",
                color: "rgba(255,255,255,0.5)",
                opacity: idx === 0 ? 0.2 : 1,
                transition: "all 0.3s ease",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <div
              style={{
                flex: 1,
                overflow: "hidden",
                maskImage:
                  "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: CARD_GAP,
                  transition: spring,
                  transform: `translateX(calc(50% - ${CARD_W / 2}px + ${-idx * CARD_STEP}px))`,
                }}
              >
                {ITEMS.map((item, i) => {
                  const dist = i - idx;
                  const absDist = Math.abs(dist);
                  const isCenter = dist === 0;
                  return (
                    <div
                      key={`slide-${i}`}
                      style={{
                        width: CARD_W,
                        flexShrink: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        cursor: absDist === 1 ? "pointer" : "default",
                      }}
                      onClick={() => {
                        if (dist === 1) go(1);
                        if (dist === -1) go(-1);
                      }}
                    >
                      {/* Title above card */}
                      <div
                        style={{
                          transition: springBounce,
                          marginBottom: 10,
                          textAlign: "center",
                          overflow: "hidden",
                        }}
                      >
                        <span
                          style={{
                            fontSize: isCenter ? 28 : 13,
                            fontWeight: isCenter ? 900 : 400,
                            color: isCenter
                              ? "#fff"
                              : `rgba(255,255,255,${Math.max(
                                  0.08,
                                  0.35 - absDist * 0.1
                                )})`,
                            letterSpacing: isCenter ? "0.02em" : "0.1em",
                            textTransform: "uppercase" as const,
                            whiteSpace: "nowrap" as const,
                            transition: springBounce,
                            display: "inline-block",
                            textShadow: isCenter
                              ? "0 3px 25px rgba(0,0,0,0.5)"
                              : "none",
                          }}
                        >
                          {item.name}
                        </span>
                      </div>

                      {/* Card */}
                      <div
                        style={{
                          width: "100%",
                          height: 155,
                          borderRadius: 14,
                          background: item.card,
                          transition: springBounce,
                          transform: isCenter
                            ? "scale(1.06)"
                            : `scale(${Math.max(0.78, 0.9 - absDist * 0.05)})`,
                          opacity:
                            absDist > 2
                              ? 0.1
                              : isCenter
                              ? 1
                              : Math.max(0.18, 0.5 - absDist * 0.1),
                          boxShadow: isCenter
                            ? "0 14px 50px rgba(0,0,0,0.5), 0 4px 14px rgba(0,0,0,0.3)"
                            : "0 4px 20px rgba(0,0,0,0.2)",
                          border: isCenter
                            ? "2px solid rgba(255,255,255,0.1)"
                            : "1px solid rgba(255,255,255,0.03)",
                          position: "relative" as const,
                          overflow: "hidden" as const,
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background:
                              "radial-gradient(circle at 32% 32%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 68% 68%, rgba(255,255,255,0.08) 0%, transparent 40%)",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: "10%",
                            left: "10%",
                            width: "80%",
                            height: "80%",
                            borderRadius: "50%",
                            border: "1px solid rgba(255,255,255,0.05)",
                            background:
                              "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%)",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => go(1)}
              style={{
                position: "absolute",
                right: 16,
                zIndex: 10,
                background: "rgba(0,0,0,0.3)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "50%",
                width: 42,
                height: 42,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: idx === ITEMS.length - 1 ? "default" : "pointer",
                color: "rgba(255,255,255,0.5)",
                opacity: idx === ITEMS.length - 1 ? 0.2 : 1,
                transition: "all 0.3s ease",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Dashed line + fixed center dot */}
          <div style={{ position: "relative", margin: "20px 40px 0", height: 16 }}>
            <div
              style={{
                position: "absolute",
                top: 7,
                left: 0,
                right: 0,
                height: 1,
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(255,255,255,0.12) 0, rgba(255,255,255,0.12) 8px, transparent 8px, transparent 16px)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 2,
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <div
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  background: "#fff",
                  boxShadow:
                    "0 0 18px rgba(255,255,255,0.5), 0 0 5px rgba(255,255,255,0.9)",
                }}
              />
            </div>
          </div>

          {/* Description (push animation, centered) */}
          <div style={{ display: "flex", justifyContent: "center", padding: "22px 32px 0" }}>
            <div
              style={{
                width: CARD_W + 40,
                overflow: "hidden",
                height: 130,
                position: "relative",
                textAlign: "center",
              }}
            >
              <div
                key={`in-${descKey}`}
                style={{
                  animation:
                    descKey > 0
                      ? "descPushIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards"
                      : "none",
                }}
              >
                <h2
                  style={{
                    color: "#fff",
                    fontSize: 19,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    margin: 0,
                    textTransform: "uppercase" as const,
                    fontFamily: "'Georgia', serif",
                  }}
                >
                  {ITEMS[idx].title}
                </h2>
                <p
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontSize: 12.5,
                    lineHeight: 1.65,
                    margin: "10px 0 0",
                    fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
                    fontWeight: 300,
                  }}
                >
                  {ITEMS[idx].desc}
                </p>
                <div style={{ marginTop: 12 }}>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "rgba(255,255,255,0.55)",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase" as const,
                      padding: 0,
                      fontFamily: "system-ui, sans-serif",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    SEE RECIPE
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom dots */}
        <div
          style={{
            display: "flex",
            gap: 6,
            justifyContent: "center",
            padding: "8px 0 24px",
            flexShrink: 0,
          }}
        >
          {ITEMS.map((_, i) => (
            <div
              key={i}
              onClick={() => {
                const d = i - idx;
                if (d !== 0) go(d > 0 ? 1 : -1);
              }}
              style={{
                width: i === idx ? 24 : 6,
                height: 6,
                borderRadius: 3,
                background:
                  i === idx
                    ? "rgba(255,255,255,0.65)"
                    : "rgba(255,255,255,0.13)",
                transition: spring,
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes bgGrow {
          0% { transform: scale(0.3); opacity: 0; border-radius: 50%; }
          40% { opacity: 0.7; border-radius: 30%; }
          100% { transform: scale(1); opacity: 1; border-radius: 0%; }
        }
        @keyframes descPushIn {
          0% { transform: translateY(60px); opacity: 0; }
          35% { opacity: 0.3; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes shimmer {
          0%, 100% { left: -40%; }
          50% { left: 110%; }
        }
      `}</style>
    </div>
  );
}
