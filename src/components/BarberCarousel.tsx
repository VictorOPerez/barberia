"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
// import Image from "next/image"; // Uncomment when using real images

interface Haircut {
  id: string;
  name: string;
  label: string;
  description: string;
  duration: string;
  price: number;
  image: string;
  bg: string;
  overlay: string;
}

const CUTS: Haircut[] = [
  {
    id: "gorilla-classic",
    name: "Gorilla Classic",
    label: "CLASSIC",
    description:
      "Nuestro corte más popular. Incluye consulta personal y precisión en cualquier estilo.",
    duration: "30 min",
    price: 35,
    image: "/recortes/gorilla-classic.png",
    bg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    overlay:
      "linear-gradient(145deg, rgba(15,52,96,0.7), rgba(22,33,62,0.5), rgba(26,26,46,0.6))",
  },
  {
    id: "gorilla-restart",
    name: "Gorilla Restart",
    label: "RESTART",
    description:
      "Alineación de cabello y limpieza de barba con toalla caliente (no incluye corte).",
    duration: "30 min",
    price: 40,
    image: "/recortes/gorilla-restart.png",
    bg: "linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 50%, #3a3a3a 100%)",
    overlay:
      "linear-gradient(145deg, rgba(60,60,60,0.6), rgba(30,30,30,0.5), rgba(50,50,50,0.5))",
  },
  {
    id: "gorilla-master-combo",
    name: "Gorilla Master Combo",
    label: "MASTER",
    description:
      "Paquete ejecutivo completo: corte de cabello, esculpido total de barba y toalla caliente.",
    duration: "45 min",
    price: 55,
    image: "/recortes/gorilla-master-combo.png",
    bg: "linear-gradient(135deg, #1a0a00 0%, #3a1a00 50%, #5a2a00 100%)",
    overlay:
      "linear-gradient(145deg, rgba(90,42,0,0.6), rgba(58,26,0,0.5), rgba(180,100,20,0.3))",
  },
  {
    id: "lite-beast-mode-beard",
    name: "-LITE- Beast Mode Beard",
    label: "LITE BEAST",
    description: "Alineación precisa de barba y personalización de estilo.",
    duration: "20 min",
    price: 25,
    image: "/recortes/lite-beast-mode-beard.png",
    bg: "linear-gradient(135deg, #0a1a0a 0%, #1a2a1a 50%, #0a3a1a 100%)",
    overlay:
      "linear-gradient(145deg, rgba(10,58,26,0.6), rgba(26,42,26,0.5), rgba(20,80,40,0.3))",
  },
  {
    id: "gorilla-buzz",
    name: "Gorilla Buzz",
    label: "BUZZ",
    description:
      "Estilo perfecto de bajo mantenimiento. Mismo nivel de máquina con ejecución precisa.",
    duration: "30 min",
    price: 28,
    image: "/recortes/gorilla-buzz.png",
    bg: "linear-gradient(135deg, #1a1a30 0%, #0a0a20 50%, #2a1a40 100%)",
    overlay:
      "linear-gradient(145deg, rgba(42,26,64,0.6), rgba(10,10,32,0.5), rgba(60,30,90,0.3))",
  },
  {
    id: "queens-neckline",
    name: "Queen's Neckline",
    label: "QUEEN",
    description:
      "Estilizado de precisión para mujeres. Degradado en la nuca y diseño personalizado.",
    duration: "25 min",
    price: 28,
    image: "/recortes/queens-neckline.png",
    bg: "linear-gradient(135deg, #2a0a1a 0%, #3a1020 50%, #1a0510 100%)",
    overlay:
      "linear-gradient(145deg, rgba(58,16,32,0.6), rgba(42,10,26,0.5), rgba(120,30,60,0.3))",
  },
  {
    id: "beast-mode-complete",
    name: "Beast Mode Complete",
    label: "BEAST MODE",
    description:
      "La experiencia definitiva. Corte completo, esculpido de barba y diseño de cejas.",
    duration: "65 min",
    price: 70,
    image: "/recortes/beast-mode-complete.png",
    bg: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 40%, #c4a000 100%)",
    overlay:
      "linear-gradient(145deg, rgba(196,160,0,0.4), rgba(26,26,26,0.6), rgba(140,120,0,0.3))",
  },
  {
    id: "young-warrior",
    name: "Young Warrior",
    label: "WARRIOR",
    description:
      "Estilos enfocados en adolescentes (12-15 años). Diseños personalizados y modernos.",
    duration: "30 min",
    price: 30,
    image: "/recortes/young-warrior.png",
    bg: "linear-gradient(135deg, #001a2a 0%, #002a3a 50%, #00405a 100%)",
    overlay:
      "linear-gradient(145deg, rgba(0,64,90,0.6), rgba(0,42,58,0.5), rgba(0,100,140,0.3))",
  },
  {
    id: "beast-mode-beard",
    name: "Beast Mode Beard",
    label: "BEAST BEARD",
    description:
      "Esculpido completo de barba, recorte de precisión, estilo y tratamiento con toalla caliente.",
    duration: "30 min",
    price: 35,
    image: "/recortes/beast-mode-beard.png",
    bg: "linear-gradient(135deg, #1a0a00 0%, #2a1500 50%, #3a2000 100%)",
    overlay:
      "linear-gradient(145deg, rgba(58,32,0,0.6), rgba(42,21,0,0.5), rgba(100,60,10,0.3))",
  },
  {
    id: "gorilla-og-cut",
    name: "Gorilla OG Cut",
    label: "OG CUT",
    description:
      "Especialidad para adultos mayores (65+). Masaje capilar relajante y estilo clásico.",
    duration: "30 min",
    price: 30,
    image: "/recortes/gorilla-og-cut.png",
    bg: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #0a0a0a 100%)",
    overlay:
      "linear-gradient(145deg, rgba(50,50,50,0.5), rgba(20,20,20,0.6), rgba(70,70,70,0.3))",
  },
  {
    id: "gorilla-smooth-dome",
    name: "Gorilla Smooth Dome",
    label: "SMOOTH",
    description:
      "Afeitado de cabeza con toalla caliente. Preparación premium y precisión con navaja libre.",
    duration: "30 min",
    price: 35,
    image: "/recortes/gorilla-smooth-dome.png",
    bg: "linear-gradient(135deg, #0a1520 0%, #15202a 50%, #1a2a3a 100%)",
    overlay:
      "linear-gradient(145deg, rgba(26,42,58,0.6), rgba(10,21,32,0.5), rgba(40,60,80,0.3))",
  },
  {
    id: "silverback-blend",
    name: "Silverback Blend",
    label: "SILVERBACK",
    description:
      "Tratamiento de difuminado de canas. Color profesional, lavado y acondicionamiento.",
    duration: "30 min",
    price: 45,
    image: "/recortes/silverback-blend.png",
    bg: "linear-gradient(135deg, #20202a 0%, #30303a 50%, #40404a 100%)",
    overlay:
      "linear-gradient(145deg, rgba(64,64,74,0.5), rgba(32,32,42,0.6), rgba(100,100,120,0.3))",
  },
  {
    id: "smooth-gorilla-face",
    name: "Smooth Gorilla Face",
    label: "FACE",
    description:
      "Afeitado completo de rostro con navaja y tratamiento facial de preparación.",
    duration: "30 min",
    price: 35,
    image: "/recortes/smooth-gorilla-face.png",
    bg: "linear-gradient(135deg, #1a100a 0%, #2a1a10 50%, #3a2a1a 100%)",
    overlay:
      "linear-gradient(145deg, rgba(58,42,26,0.6), rgba(26,16,10,0.5), rgba(90,70,40,0.3))",
  },
];

const CARD_W = 230;
const CARD_GAP = 16;
const CARD_STEP = CARD_W + CARD_GAP;

export default function BarberCarousel() {
  const [idx, setIdx] = useState(3);
  const [descKey, setDescKey] = useState(0);
  const [bgKey, setBgKey] = useState(0);
  const [prevBg, setPrevBg] = useState(CUTS[3].bg);
  const busy = useRef(false);

  const go = useCallback(
    (d: number) => {
      if (busy.current) return;
      const next = idx + d;
      if (next < 0 || next >= CUTS.length) return;
      busy.current = true;
      setPrevBg(CUTS[idx].bg);
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

  const cut = CUTS[idx];

  return (
    <section
      className="relative w-full overflow-hidden select-none flex flex-col"
      style={{
        height: "100vh",
        minHeight: 600,
        maxHeight: 780,
        fontFamily: "'Georgia', serif",
        background: "#050505",
      }}
    >
      {/* Backgrounds */}
      <div className="absolute inset-0 z-0" style={{ background: prevBg }} />
      <div
        key={`bg-${bgKey}`}
        className="absolute z-[1]"
        style={{
          inset: "-20%",
          background: cut.bg,
          transformOrigin: "center center",
          animation: "bgGrow 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        }}
      />
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, transparent 5%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.92) 100%)",
        }}
      />

      {/* Ambient blobs */}
      <div
        className="absolute rounded-full z-[2] transition-all duration-700"
        style={{
          top: "5%",
          left: "15%",
          width: 220,
          height: 220,
          background: cut.overlay,
          opacity: 0.15,
          filter: "blur(70px)",
        }}
      />
      <div
        className="absolute rounded-full z-[2] transition-all duration-700"
        style={{
          bottom: "10%",
          right: "10%",
          width: 170,
          height: 170,
          background: cut.overlay,
          opacity: 0.1,
          filter: "blur(50px)",
        }}
      />

      {/* Content */}
      <div className="relative z-[3] flex flex-col flex-1">
        {/* Header */}
        <div className="flex justify-between items-center px-8 pt-6 pb-2 shrink-0">
          <div className="cursor-pointer flex flex-col gap-1.5">
            <span className="block w-7 h-0.5 bg-white/60 rounded-sm" />
            <span className="block w-5 h-0.5 bg-white/30 rounded-sm" />
          </div>
          <div className="flex items-center gap-4">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <div
              className="w-9 h-9 rounded-full border-2 border-white/20"
              style={{
                background: "linear-gradient(135deg, #c4a000, #8a7000)",
              }}
            />
          </div>
        </div>

        {/* Carousel zone */}
        <div className="flex-1 flex flex-col justify-center min-h-0">
          {/* Dashed line + fixed center dot (ABOVE cards) */}
          <div className="relative mx-10 h-4 mb-5">
            <div
              className="absolute left-0 right-0"
              style={{
                top: 7,
                height: 1,
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 8px, transparent 8px, transparent 16px)",
              }}
            />
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{ top: 2 }}
            >
              <div
                className="w-3 h-3 rounded-full bg-white"
                style={{
                  boxShadow:
                    "0 0 20px rgba(255,255,255,0.5), 0 0 6px rgba(255,255,255,0.9)",
                }}
              />
            </div>
          </div>

          {/* Carousel (labels + cards) */}
          <div className="relative flex items-center">
            {/* Left arrow */}
            <button
              onClick={() => go(-1)}
              className="absolute left-4 z-10 w-11 h-11 rounded-full flex items-center justify-center border border-white/10 transition-all duration-300"
              style={{
                background: "rgba(0,0,0,0.35)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                color: "rgba(255,255,255,0.5)",
                opacity: idx === 0 ? 0.15 : 1,
                cursor: idx === 0 ? "default" : "pointer",
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

            {/* Strip */}
            <div
              className="flex-1 overflow-hidden"
              style={{
                maskImage:
                  "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
              }}
            >
              <div
                className="flex transition-all duration-700"
                style={{
                  gap: CARD_GAP,
                  transform: `translateX(calc(50% - ${CARD_W / 2}px + ${-idx * CARD_STEP}px))`,
                  transitionTimingFunction:
                    "cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                {CUTS.map((item, i) => {
                  const dist = i - idx;
                  const absDist = Math.abs(dist);
                  const isCenter = dist === 0;

                  return (
                    <div
                      key={item.id}
                      className="flex flex-col items-center shrink-0"
                      style={{
                        width: CARD_W,
                        cursor: absDist === 1 ? "pointer" : "default",
                      }}
                      onClick={() => {
                        if (dist === 1) go(1);
                        if (dist === -1) go(-1);
                      }}
                    >
                      {/* Label above card */}
                      <div className="mb-2 text-center overflow-hidden">
                        <span
                          className="inline-block uppercase whitespace-nowrap transition-all duration-700"
                          style={{
                            fontSize: isCenter ? 26 : 12,
                            fontWeight: isCenter ? 900 : 400,
                            color: isCenter
                              ? "#fff"
                              : `rgba(255,255,255,${Math.max(
                                0.06,
                                0.3 - absDist * 0.08
                              )})`,
                            letterSpacing: isCenter ? "0.03em" : "0.12em",
                            textShadow: isCenter
                              ? "0 3px 25px rgba(0,0,0,0.6)"
                              : "none",
                            transitionTimingFunction:
                              "cubic-bezier(0.34, 1.56, 0.64, 1)",
                          }}
                        >
                          {item.label}
                        </span>
                      </div>

                      {/* Card */}
                      <div
                        className="w-full rounded-2xl relative overflow-hidden transition-all duration-700"
                        style={{
                          height: 170,
                          transform: isCenter
                            ? "scale(1.06)"
                            : `scale(${Math.max(
                              0.76,
                              0.88 - absDist * 0.05
                            )})`,
                          opacity:
                            absDist > 2
                              ? 0.08
                              : isCenter
                                ? 1
                                : Math.max(0.15, 0.45 - absDist * 0.1),
                          boxShadow: isCenter
                            ? "0 16px 60px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.4)"
                            : "0 4px 20px rgba(0,0,0,0.25)",
                          border: isCenter
                            ? "2px solid rgba(255,255,255,0.08)"
                            : "1px solid rgba(255,255,255,0.02)",
                          transitionTimingFunction:
                            "cubic-bezier(0.34, 1.56, 0.64, 1)",
                        }}
                      >
                        {/* Placeholder bg */}
                        <div
                          className="absolute inset-0"
                          style={{
                            background: `${item.overlay}, #111`,
                          }}
                        />

                        {/* Real image — uncomment when ready: */}
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />


                        {/* Gradient overlay */}
                        <div
                          className="absolute inset-0"
                          style={{ background: item.overlay }}
                        />

                        {/* Texture */}
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.12) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.06) 0%, transparent 40%)",
                          }}
                        />

                        {/* Price */}
                        {isCenter && (
                          <div
                            className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold tracking-wider"
                            style={{
                              background: "rgba(0,0,0,0.5)",
                              backdropFilter: "blur(8px)",
                              color: "rgba(255,255,255,0.8)",
                            }}
                          >
                            ${item.price}
                          </div>
                        )}

                        {/* Duration */}
                        {isCenter && (
                          <div
                            className="absolute bottom-3 left-3 px-2 py-0.5 rounded text-[10px] tracking-widest uppercase font-semibold"
                            style={{
                              background: "rgba(255,255,255,0.08)",
                              color: "rgba(255,255,255,0.5)",
                            }}
                          >
                            {item.duration}
                          </div>
                        )}

                        {/* Shimmer */}
                        {isCenter && (
                          <div
                            className="absolute top-0 h-full"
                            style={{
                              width: "30%",
                              left: "-40%",
                              background:
                                "linear-gradient(105deg, transparent, rgba(255,255,255,0.06), transparent)",
                              transform: "skewX(-15deg)",
                              animation:
                                "shimmer 4s ease-in-out infinite",
                            }}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right arrow */}
            <button
              onClick={() => go(1)}
              className="absolute right-4 z-10 w-11 h-11 rounded-full flex items-center justify-center border border-white/10 transition-all duration-300"
              style={{
                background: "rgba(0,0,0,0.35)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                color: "rgba(255,255,255,0.5)",
                opacity: idx === CUTS.length - 1 ? 0.15 : 1,
                cursor:
                  idx === CUTS.length - 1 ? "default" : "pointer",
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

          {/* Description (push-up, centered) */}
          <div className="flex justify-center px-8 pt-6">
            <div
              className="overflow-hidden relative text-center"
              style={{ width: CARD_W + 50, height: 150 }}
            >
              <div
                key={`desc-${descKey}`}
                style={{
                  animation:
                    descKey > 0
                      ? "descPushIn 1s cubic-bezier(0.22, 1, 0.36, 1) forwards"
                      : "none",
                }}
              >
                <h2
                  className="text-white text-lg font-bold uppercase tracking-wider m-0"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {cut.name}
                </h2>
                <p
                  className="text-white/40 text-xs leading-relaxed mt-2.5 font-light"
                  style={{
                    fontFamily:
                      "system-ui, -apple-system, sans-serif",
                  }}
                >
                  {cut.description}
                </p>
                <div className="mt-3 flex items-center justify-center gap-4">
                  <span className="text-white/25 text-[10px] tracking-widest uppercase font-semibold">
                    {cut.duration}
                  </span>
                  <span className="text-white/60 text-sm font-bold tracking-wide">
                    ${cut.price}
                  </span>
                </div>
                <div className="mt-3">
                  <button
                    className="inline-flex items-center gap-2 uppercase text-[11px] font-bold tracking-widest border-none bg-transparent cursor-pointer"
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontFamily: "system-ui, sans-serif",
                    }}
                  >
                    RESERVAR
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
        <div className="flex gap-1.5 justify-center pb-6 pt-2 shrink-0">
          {CUTS.map((_, i) => (
            <div
              key={i}
              onClick={() => {
                const d = i - idx;
                if (d !== 0) go(d > 0 ? 1 : -1);
              }}
              className="h-1.5 rounded-full cursor-pointer transition-all duration-700"
              style={{
                width: i === idx ? 24 : 6,
                background:
                  i === idx
                    ? "rgba(255,255,255,0.6)"
                    : "rgba(255,255,255,0.1)",
                transitionTimingFunction:
                  "cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes bgGrow {
          0% { transform: scale(0.2); opacity: 0; border-radius: 50%; }
          45% { opacity: 0.6; border-radius: 25%; }
          100% { transform: scale(1); opacity: 1; border-radius: 0%; }
        }
        @keyframes descPushIn {
          0% { transform: translateY(70px); opacity: 0; }
          30% { opacity: 0.2; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes shimmer {
          0%, 100% { left: -40%; }
          50% { left: 110%; }
        }
      `}</style>
    </section>
  );
}
