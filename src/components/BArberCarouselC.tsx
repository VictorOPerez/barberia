"use client";

import Image from "next/image";
import {
    useState,
    useEffect,
    useCallback,
    useRef,
    type CSSProperties,
} from "react";

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
const CARD_H = 170;
const CARD_GAP = 16;
const CARD_STEP = CARD_W + CARD_GAP;

const STRIP_TRAVEL_MS = 520;
const PROMOTION_MS = 900;

// mueve este valor para cambiar la zona donde cae la tarjeta antes de expandirse
const FOCUS_LEFT = 280;

type PromotionClone = {
    targetIdx: number;
    item: Haircut;
    from: {
        left: number;
        top: number;
        width: number;
        height: number;
    };
};

export default function BarberCarousel() {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const promoteTimerRef = useRef<number | null>(null);
    const busy = useRef(false);

    // escena ya consolidada
    const [sceneIdx, setSceneIdx] = useState(0);

    // card que ocupa el slot foco dentro del strip
    const [focusIdx, setFocusIdx] = useState(0);

    // card que se está promoviendo desde el strip al fondo
    const [promotingIdx, setPromotingIdx] = useState<number | null>(null);

    // clon absoluto que nace desde la card real
    const [clone, setClone] = useState<PromotionClone | null>(null);

    const [descKey, setDescKey] = useState(0);

    const scene = CUTS[sceneIdx];

    useEffect(() => {
        return () => {
            if (promoteTimerRef.current) {
                window.clearTimeout(promoteTimerRef.current);
            }
        };
    }, []);

    const finishPromotion = useCallback((targetIdx: number) => {
        setSceneIdx(targetIdx);
        setDescKey((k) => k + 1);
        setClone(null);
        setPromotingIdx(null);
        busy.current = false;
    }, []);

    const go = useCallback(
        (d: number) => {
            if (busy.current || clone) return;

            const targetIdx = focusIdx + d;
            if (targetIdx < 0 || targetIdx >= CUTS.length) return;

            busy.current = true;

            // fase 1: el strip se corre y la nueva card cae en el slot foco
            setFocusIdx(targetIdx);

            if (promoteTimerRef.current) {
                window.clearTimeout(promoteTimerRef.current);
            }

            promoteTimerRef.current = window.setTimeout(() => {
                const root = rootRef.current;
                const targetCard = cardRefs.current[targetIdx];

                if (!root || !targetCard) {
                    finishPromotion(targetIdx);
                    return;
                }

                const rootRect = root.getBoundingClientRect();
                const cardRect = targetCard.getBoundingClientRect();

                // fase 2: ocultamos la card original y lanzamos el clon
                setPromotingIdx(targetIdx);

                setClone({
                    targetIdx,
                    item: CUTS[targetIdx],
                    from: {
                        left: cardRect.left - rootRect.left,
                        top: cardRect.top - rootRect.top,
                        width: cardRect.width,
                        height: cardRect.height,
                    },
                });
            }, STRIP_TRAVEL_MS);
        },
        [clone, finishPromotion, focusIdx]
    );

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
        };

        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [go]);

    return (
        <div
            ref={rootRef}
            className="relative flex w-full select-none flex-col overflow-hidden"
            style={{
                height: "100vh",
                minHeight: 600,
                maxHeight: 780,
                fontFamily: "'Georgia', serif",
                background: "#050505",
            }}
        >
            {/* Background consolidado actual */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0" style={{ background: scene.bg }} />

                <Image
                    src={scene.image}
                    alt={scene.name}
                    fill
                    priority
                    className="object-cover"
                />

                <div
                    className="absolute inset-0"
                    style={{
                        background: scene.overlay,
                    }}
                />

                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.16) 30%, rgba(0,0,0,0.72) 100%)",
                    }}
                />
            </div>

            {/* Clone animado: nace desde la card real y se convierte en fondo */}
            {clone && (
                <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
                    <div
                        key={`promotion-${clone.targetIdx}-${descKey}`}
                        className="absolute overflow-hidden"
                        onAnimationEnd={() => finishPromotion(clone.targetIdx)}
                        style={
                            {
                                "--from-left": `${clone.from.left}px`,
                                "--from-top": `${clone.from.top}px`,
                                "--from-width": `${clone.from.width}px`,
                                "--from-height": `${clone.from.height}px`,
                                animation: `promoteCardToScene ${PROMOTION_MS}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
                            } as CSSProperties
                        }
                    >
                        <div
                            className="absolute inset-0"
                            style={{ background: clone.item.bg }}
                        />

                        <Image
                            src={clone.item.image}
                            alt={clone.item.name}
                            fill
                            priority
                            className="object-cover"
                        />

                        <div
                            className="absolute inset-0"
                            style={{ background: clone.item.overlay }}
                        />

                        <div
                            className="absolute inset-0"
                            style={{
                                background:
                                    "linear-gradient(180deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.14) 35%, rgba(0,0,0,0.70) 100%)",
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Vignette */}
            <div
                className="absolute inset-0 z-[2]"
                style={{
                    background:
                        "radial-gradient(ellipse at 50% 45%, transparent 5%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.92) 100%)",
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
                    background: scene.overlay,
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
                    background: scene.overlay,
                    opacity: 0.1,
                    filter: "blur(50px)",
                }}
            />

            {/* Content */}
            <div className="relative z-[3] flex flex-1 flex-col">
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
                    {/* Dashed line */}
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

                    {/* Carousel */}
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
                                opacity: focusIdx === 0 || busy.current ? 0.15 : 1,
                                cursor:
                                    focusIdx === 0 || busy.current ? "default" : "pointer",
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
                                    "linear-gradient(90deg, transparent, black 10%, black 92%, transparent)",
                                WebkitMaskImage:
                                    "linear-gradient(90deg, transparent, black 10%, black 92%, transparent)",
                            }}
                        >
                            <div
                                className="flex transition-transform"
                                style={{
                                    gap: CARD_GAP,
                                    transform: `translateX(${FOCUS_LEFT - focusIdx * CARD_STEP}px)`,
                                    transitionDuration: `${STRIP_TRAVEL_MS}ms`,
                                    transitionTimingFunction:
                                        "cubic-bezier(0.22, 1, 0.36, 1)",
                                }}
                            >
                                {CUTS.map((item, i) => {
                                    const dist = i - focusIdx;
                                    const absDist = Math.abs(dist);
                                    const isFocus = i === focusIdx;
                                    const isPromoting = i === promotingIdx;

                                    return (
                                        <div
                                            key={item.id}
                                            className="flex flex-col items-center shrink-0"
                                            style={{
                                                width: CARD_W,
                                                cursor:
                                                    !busy.current && absDist === 1
                                                        ? "pointer"
                                                        : "default",
                                            }}
                                            onClick={() => {
                                                if (busy.current) return;
                                                if (dist === 1) go(1);
                                                if (dist === -1) go(-1);
                                            }}
                                        >
                                            {/* Label above card */}
                                            <div className="mb-2 text-center overflow-hidden h-8 flex items-end justify-center">
                                                <span
                                                    className="inline-block uppercase whitespace-nowrap transition-all"
                                                    style={{
                                                        fontSize: isFocus ? 26 : 12,
                                                        fontWeight: isFocus ? 900 : 400,
                                                        color: isFocus
                                                            ? "#fff"
                                                            : `rgba(255,255,255,${Math.max(
                                                                0.06,
                                                                0.3 - absDist * 0.08
                                                            )})`,
                                                        letterSpacing: isFocus ? "0.03em" : "0.12em",
                                                        textShadow: isFocus
                                                            ? "0 3px 25px rgba(0,0,0,0.6)"
                                                            : "none",
                                                        opacity: isPromoting ? 0 : 1,
                                                        transform: isPromoting
                                                            ? "translateY(10px) scale(0.92)"
                                                            : "translateY(0) scale(1)",
                                                        transitionDuration: "260ms",
                                                        transitionTimingFunction:
                                                            "cubic-bezier(0.34, 1.56, 0.64, 1)",
                                                    }}
                                                >
                                                    {item.label}
                                                </span>
                                            </div>

                                            {/* Card */}
                                            <div
                                                ref={(node) => {
                                                    cardRefs.current[i] = node;
                                                }}
                                                className="w-full rounded-2xl relative overflow-hidden transition-all duration-700"
                                                style={{
                                                    height: CARD_H,
                                                    transform: isFocus
                                                        ? "scale(1.06)"
                                                        : `scale(${Math.max(
                                                            0.76,
                                                            0.88 - absDist * 0.05
                                                        )})`,
                                                    opacity: isPromoting
                                                        ? 0
                                                        : absDist > 2
                                                            ? 0.08
                                                            : isFocus
                                                                ? 1
                                                                : Math.max(0.15, 0.45 - absDist * 0.1),
                                                    boxShadow: isFocus
                                                        ? "0 16px 60px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.4)"
                                                        : "0 4px 20px rgba(0,0,0,0.25)",
                                                    border: isFocus
                                                        ? "2px solid rgba(255,255,255,0.08)"
                                                        : "1px solid rgba(255,255,255,0.02)",
                                                    transitionTimingFunction:
                                                        "cubic-bezier(0.34, 1.56, 0.64, 1)",
                                                }}
                                            >
                                                <div
                                                    className="absolute inset-0"
                                                    style={{
                                                        background: `${item.overlay}, #111`,
                                                    }}
                                                />

                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />

                                                <div
                                                    className="absolute inset-0"
                                                    style={{ background: item.overlay }}
                                                />

                                                <div
                                                    className="absolute inset-0"
                                                    style={{
                                                        background:
                                                            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.12) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.06) 0%, transparent 40%)",
                                                    }}
                                                />

                                                {isFocus && !isPromoting && (
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

                                                {isFocus && !isPromoting && (
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

                                                {isFocus && !isPromoting && (
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
                                opacity:
                                    focusIdx === CUTS.length - 1 || busy.current ? 0.15 : 1,
                                cursor:
                                    focusIdx === CUTS.length - 1 || busy.current
                                        ? "default"
                                        : "pointer",
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

                    {/* Description */}
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
                                    {scene.name}
                                </h2>

                                <p
                                    className="text-white/40 text-xs leading-relaxed mt-2.5 font-light"
                                    style={{
                                        fontFamily:
                                            "system-ui, -apple-system, sans-serif",
                                    }}
                                >
                                    {scene.description}
                                </p>

                                <div className="mt-3 flex items-center justify-center gap-4">
                                    <span className="text-white/25 text-[10px] tracking-widest uppercase font-semibold">
                                        {scene.duration}
                                    </span>
                                    <span className="text-white/60 text-sm font-bold tracking-wide">
                                        ${scene.price}
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
                            className="h-1.5 rounded-full transition-all duration-700"
                            style={{
                                width: i === sceneIdx ? 24 : 6,
                                background:
                                    i === sceneIdx
                                        ? "rgba(255,255,255,0.6)"
                                        : "rgba(255,255,255,0.1)",
                            }}
                        />
                    ))}
                </div>
            </div>

            <style>{`
        @keyframes promoteCardToScene {
          0% {
            left: var(--from-left);
            top: var(--from-top);
            width: var(--from-width);
            height: var(--from-height);
            opacity: 1;
            border-radius: 22px;
            transform: translateZ(0);
            filter: saturate(1) brightness(1);
          }

          18% {
            opacity: 1;
            border-radius: 20px;
          }

          100% {
            left: -10%;
            top: -14%;
            width: 124%;
            height: 128%;
            opacity: 1;
            border-radius: 0px;
            transform: translateZ(0);
            filter: saturate(1.03) brightness(0.95);
          }
        }

        @keyframes descPushIn {
          0% {
            transform: translateY(70px);
            opacity: 0;
          }
          30% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes shimmer {
          0%, 100% {
            left: -40%;
          }
          50% {
            left: 110%;
          }
        }
      `}</style>
        </div>
    );
}