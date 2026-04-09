"use client";

import Image from "next/image";
import {
    useState,
    useEffect,
    useCallback,
    useRef,
    useLayoutEffect,
} from "react";
import { Bebas_Neue, Permanent_Marker } from "next/font/google";
import Link from "next/link";
interface Haircut {
    id: string;
    name: string;
    label: string;
    description: string;
    duration: string;
    price: number;
    image: string;
}
const bebas = Bebas_Neue({
    subsets: ["latin"],
    weight: "400",
});

const marker = Permanent_Marker({
    subsets: ["latin"],
    weight: "400",
});
const CUTS: Haircut[] = [
    {
        id: "gorilla-classic",
        name: "Gorilla Classic",
        label: "CLASSIC",
        description: "Nuestro corte más popular. Incluye consulta personal y precisión en cualquier estilo.",
        duration: "30 min",
        price: 35,
        image: "/recortes/gorilla-classic.png",
    },
    {
        id: "gorilla-restart",
        name: "Gorilla Restart",
        label: "RESTART",
        description: "Alineación de cabello y limpieza de barba con toalla caliente.",
        duration: "30 min",
        price: 40,
        image: "/recortes/gorilla-restart.png",
    },
    {
        id: "gorilla-master-combo",
        name: "Gorilla Master Combo",
        label: "MASTER",
        description: "Paquete ejecutivo completo: corte de cabello, esculpido total de barba.",
        duration: "45 min",
        price: 55,
        image: "/recortes/gorilla-master-combo.png",
    },
    {
        id: "lite-beast-mode-beard",
        name: "-LITE- Beast Mode Beard",
        label: "LITE BEAST",
        description: "Alineación precisa de barba y personalización de estilo.",
        duration: "20 min",
        price: 25,
        image: "/recortes/lite-beast-mode-beard.png",
    },
    {
        id: "gorilla-buzz",
        name: "Gorilla Buzz",
        label: "BUZZ",
        description: "Estilo perfecto de bajo mantenimiento con ejecución precisa.",
        duration: "30 min",
        price: 28,
        image: "/recortes/gorilla-buzz.png",
    },
];

type AnimPhase = "idle" | "start" | "expanding" | "collapsing";
type AnimDirection = "forward" | "backward";

interface AnimState {
    active: boolean;
    index: number;
    rect: DOMRect | null;
    phase: AnimPhase;
    direction: AnimDirection;
}

export default function BarberCarousel() {
    const [bgIndex, setBgIndex] = useState(0);
    const [stripIndex, setStripIndex] = useState(0);
    const [anim, setAnim] = useState<AnimState>({
        active: false,
        index: -1,
        rect: null,
        phase: "idle",
        direction: "forward",
    });
    const touchStartX = useRef<number | null>(null);
    const touchDeltaX = useRef(0);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const rootRef = useRef<HTMLDivElement | null>(null);
    const [contentIndex, setContentIndex] = useState(0);

    const goNext = useCallback(() => {
        if (anim.active || bgIndex >= CUTS.length - 1) return;

        const nextIdx = bgIndex + 1;
        const el = cardsRef.current[nextIdx];

        // el strip se mueve primero como ya lo hacía visualmente
        setStripIndex(nextIdx);

        if (!el) {
            setBgIndex(nextIdx);
            return;
        }

        const root = rootRef.current;
        if (!root) return;

        const cardRect = el.getBoundingClientRect();
        const rootRect = root.getBoundingClientRect();

        const rect = new DOMRect(
            cardRect.left - rootRect.left,
            cardRect.top - rootRect.top,
            cardRect.width,
            cardRect.height
        );

        setAnim({
            active: true,
            index: nextIdx,
            rect,
            phase: "start",
            direction: "forward",
        });
    }, [anim.active, bgIndex]);

    const goPrev = useCallback(() => {
        if (anim.active || bgIndex <= 0) return;

        const currentIdx = bgIndex;
        const prevIdx = bgIndex - 1;
        const root = rootRef.current;
        if (!root) return;

        // 1) ponemos el clon fullscreen de la escena actual
        setAnim({
            active: true,
            index: currentIdx,
            rect: new DOMRect(0, 0, root.clientWidth, root.clientHeight),
            phase: "start",
            direction: "backward",
        });

        // 2) debajo ya dejamos montado el background anterior
        setBgIndex(prevIdx);

        // 3) primero movemos el carrusel hacia la derecha
        setStripIndex(prevIdx);

        // 4) esperamos a que termine de moverse el strip
        const STRIP_SHIFT_MS = 900;

        setTimeout(() => {
            const el = cardsRef.current[currentIdx];
            const rootNow = rootRef.current;

            if (!el || !rootNow) {
                setAnim({
                    active: false,
                    index: -1,
                    rect: null,
                    phase: "idle",
                    direction: "forward",
                });
                return;
            }

            const cardRect = el.getBoundingClientRect();
            const rootRect = rootNow.getBoundingClientRect();

            const rect = new DOMRect(
                cardRect.left - rootRect.left,
                cardRect.top - rootRect.top,
                cardRect.width,
                cardRect.height
            );

            // 5) después de que el carrusel ya llegó,
            //    ahora sí el fondo grande baja a su tarjeta
            setAnim({
                active: true,
                index: currentIdx,
                rect,
                phase: "collapsing",
                direction: "backward",
            });
        }, STRIP_SHIFT_MS);
    }, [anim.active, bgIndex]);
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") goNext();
            if (e.key === "ArrowLeft") goPrev();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [goNext, goPrev]);
    useEffect(() => {
        if (anim.phase === "expanding" || anim.phase === "collapsing") {
            const timer = setTimeout(() => {
                if (anim.direction === "forward") {
                    setBgIndex(anim.index);
                    setContentIndex(anim.index);
                } else {
                    setContentIndex(bgIndex);
                }

                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        setAnim({
                            active: false,
                            index: -1,
                            rect: null,
                            phase: "idle",
                            direction: "forward",
                        });
                    });
                });
            }, 900);

            return () => clearTimeout(timer);
        }
    }, [anim.phase, anim.index, anim.direction, bgIndex]);
    // ANIMACIÓN ORIGINAL PERFECTA: FLIP hacia adelante


    useLayoutEffect(() => {
        if (anim.phase === "start" && anim.rect && anim.direction === "forward") {
            const id = requestAnimationFrame(() => {
                setAnim((prev) => ({ ...prev, phase: "expanding" }));
            });

            return () => cancelAnimationFrame(id);
        }
    }, [anim.phase, anim.rect, anim.direction]);

    const activeData = CUTS[contentIndex];
    const focusIndex = stripIndex + 1;
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        touchStartX.current = e.touches[0].clientX;
        touchDeltaX.current = 0;
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (touchStartX.current == null) return;
        touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    };

    const handleTouchEnd = () => {
        if (touchStartX.current == null) return;

        if (Math.abs(touchDeltaX.current) > 50) {
            if (touchDeltaX.current < 0) {
                goNext();
            } else {
                goPrev();
            }
        }

        touchStartX.current = null;
        touchDeltaX.current = 0;
    };
    return (
        // DISEÑO RESPONSIVE Y VARIABLES CSS
        <section id="services"
            ref={rootRef}
            className="relative flex min-h-[100svh] md:h-svh md:min-h-[700px] w-full flex-col overflow-hidden bg-black font-sans select-none lg:max-w-[1180px] lg:mx-auto lg:rounded-[36px]
            [--card-w:180px] [--card-h:270px] [--card-gap:14px] [--anchor:10vw] 
            md:[--card-w:220px] md:[--card-h:330px] md:[--card-gap:20px] md:[--anchor:52vw]
            [--accent-orange:#FF6A2A]"
            style={{ overflowAnchor: "none" }}
        >

            {/* CAPA 1: FONDO ESTATICO */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={CUTS[bgIndex].image}
                    alt={CUTS[bgIndex].name}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/50 bg-gradient-to-t md:bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
            </div>

            {/* CAPA 2: EL CLON ANIMADO (FLIP PERFECTO) */}
            {anim.active && anim.rect && (
                <div
                    className="absolute z-[10] overflow-hidden pointer-events-none"
                    style={{
                        top:
                            anim.direction === "forward"
                                ? anim.phase === "expanding"
                                    ? "0px"
                                    : `${anim.rect.top}px`
                                : anim.phase === "collapsing"
                                    ? `${anim.rect.top}px`
                                    : "0px",

                        left:
                            anim.direction === "forward"
                                ? anim.phase === "expanding"
                                    ? "0px"
                                    : `${anim.rect.left}px`
                                : anim.phase === "collapsing"
                                    ? `${anim.rect.left}px`
                                    : "0px",

                        width:
                            anim.direction === "forward"
                                ? anim.phase === "expanding"
                                    ? "100%"
                                    : `${anim.rect.width}px`
                                : anim.phase === "collapsing"
                                    ? `${anim.rect.width}px`
                                    : "100%",

                        height:
                            anim.direction === "forward"
                                ? anim.phase === "expanding"
                                    ? "100%"
                                    : `${anim.rect.height}px`
                                : anim.phase === "collapsing"
                                    ? `${anim.rect.height}px`
                                    : "100%",

                        borderRadius:
                            anim.direction === "forward"
                                ? anim.phase === "expanding"
                                    ? "0px"
                                    : "20px"
                                : anim.phase === "collapsing"
                                    ? "20px"
                                    : "0px",

                        transition:
                            "top 0.9s cubic-bezier(0.76, 0, 0.24, 1), left 0.9s cubic-bezier(0.76, 0, 0.24, 1), width 0.9s cubic-bezier(0.76, 0, 0.24, 1), height 0.9s cubic-bezier(0.76, 0, 0.24, 1), border-radius 0.9s cubic-bezier(0.76, 0, 0.24, 1)",
                        willChange: "top, left, width, height, border-radius",
                    }}
                >
                    <Image
                        src={CUTS[anim.index].image}
                        alt="expanding-clone"
                        fill
                        className="object-cover"
                    />
                    <div
                        className="absolute inset-0 bg-black/50 bg-gradient-to-t md:bg-gradient-to-r from-black/90 via-black/40 to-transparent"
                        style={{ opacity: 1 }}
                    />
                </div>
            )}

            {/* CAPA 3: INTERFAZ Y CARRUSEL */}
            <div className="absolute inset-0 z-[20] pointer-events-none flex flex-col md:flex-row">

                {/* TEXTOS PRINCIPALES CON ESTILO URBANO */}
                <div className="w-full md:w-[50vw] flex flex-1 flex-col justify-end md:justify-center px-6 md:px-[8vw] pt-24 pb-6 md:pb-0 pointer-events-auto z-10">
                    <div className="flex flex-col items-start text-white">
                        <div className="animate-fade-up opacity-0 flex items-center gap-3" style={{ animationDelay: "0.1s" }}>
                            <span
                                className={`${bebas.className} uppercase tracking-[0.28em] text-[13px] md:text-[15px]`}
                                style={{ color: "var(--accent-orange)" }}
                            >
                                {activeData.label}
                            </span>
                        </div>

                        <h1
                            className={`${marker.className} animate-fade-up opacity-0 mt-3 md:mt-4 leading-[0.88] text-[3.1rem] md:text-[4.8rem] tracking-tight`}
                            style={{
                                animationDelay: "0.2s",
                                textShadow: "0 8px 30px rgba(0,0,0,0.35)",
                            }}
                        >
                            {renderUrbanTitle(activeData.name)}
                        </h1>

                        <p className="animate-fade-up opacity-0 mt-4 md:mt-6 text-xs md:text-sm max-w-[280px] md:max-w-[320px] leading-relaxed text-white/50" style={{ animationDelay: "0.3s" }}>
                            {activeData.description}
                        </p>

                        {/* BOTÓN NARANJA */}
                        <Link
                            href="/reservar/corte"
                            className="animate-fade-up opacity-0 mt-6 md:mt-10 px-6 md:px-8 py-3 md:py-4 border rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] transition-transform hover:scale-105"
                            style={{
                                backgroundColor: "var(--accent-orange)",
                                color: "#fff",
                                borderColor: "var(--accent-orange)",
                                boxShadow: "0 12px 30px rgba(255,106,42,0.28)",
                                animationDelay: "0.4s",
                            }}
                        >
                            Reservar Turno
                        </Link>
                    </div>
                </div>

                {/* CARRUSEL DE TARJETAS (Posición más baja en móvil) */}
                <div
                    className="relative mt-auto w-full pb-24 pointer-events-auto touch-pan-y md:absolute md:top-[58%] md:mt-0 md:pb-0 md:-translate-y-1/2"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div
                        className="flex transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
                        style={{
                            gap: "var(--card-gap)",
                            transform: `translateX(calc(var(--anchor) - (var(--card-w) + var(--card-gap)) * ${focusIndex}))`,
                            willChange: "transform",
                        }}
                    >
                        {CUTS.map((item, i) => {
                            const isPast = i <= bgIndex;
                            const isExpanding =
                                anim.active && anim.direction === "forward" && anim.index === i;
                            const isReturning =
                                anim.active && anim.direction === "backward" && anim.index === i;

                            const isCloneCard = isExpanding || isReturning;
                            const isHidden = isPast || isCloneCard;

                            return (
                                <div
                                    key={item.id}
                                    className="relative shrink-0"
                                    style={{
                                        width: "var(--card-w)",
                                        height: "var(--card-h)",
                                        opacity: isPast ? 0 : 1,
                                        visibility: isCloneCard ? "hidden" : "visible",
                                        pointerEvents: isHidden ? "none" : "auto",
                                        transform: isHidden ? "scale(0.8)" : "scale(1)",
                                        transition: isCloneCard
                                            ? "transform 0.9s cubic-bezier(0.76, 0, 0.24, 1)"
                                            : "transform 0.9s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.35s ease",
                                        cursor: isHidden ? "default" : "pointer",
                                    }}
                                    onClick={() => {
                                        if (!isHidden && i === focusIndex) {
                                            goNext();
                                        }
                                    }}
                                >
                                    <div
                                        className="absolute -inset-3 rounded-[28px] blur-2xl"
                                        style={{
                                            background: "rgba(249,108,44,0.22)",
                                            opacity: isCloneCard ? 0 : isHidden ? 0 : 0.7,
                                            transition: isCloneCard ? "none" : "opacity 0.35s ease",
                                        }}
                                    />

                                    <div
                                        ref={(el) => {
                                            if (el) cardsRef.current[i] = el;
                                        }}
                                        className="relative h-full w-full overflow-hidden rounded-[16px] md:rounded-[20px] border bg-[#111]/78 backdrop-blur-md"
                                        style={{
                                            borderColor: "rgba(249,108,44,0.45)",
                                            boxShadow:
                                                "0 0 0 1px rgba(249,108,44,0.16), 0 18px 45px rgba(0,0,0,0.35), 0 10px 30px rgba(249,108,44,0.14)",
                                        }}
                                    >
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover opacity-80"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/85" />

                                        <div
                                            className="absolute inset-0"
                                            style={{
                                                background:
                                                    "linear-gradient(180deg, rgba(249,108,44,0.05) 0%, transparent 30%, rgba(0,0,0,0.28) 100%)",
                                            }}
                                        />

                                        <div className="absolute top-5 left-5 right-5 md:top-6 md:left-6 md:right-6 text-center">
                                            <span
                                                className={`${bebas.className} uppercase tracking-[0.25em] text-[12px] md:text-sm`}
                                                style={{ color: "var(--accent-orange)" }}
                                            >
                                                {item.label}
                                            </span>
                                        </div>

                                        <div className="absolute bottom-5 left-5 right-5 md:bottom-6 md:left-6 md:right-6">
                                            <p
                                                className={`${bebas.className} text-[10px] md:text-[11px] uppercase tracking-[0.18em] mb-1`}
                                                style={{ color: "var(--accent-orange)" }}
                                            >
                                                {item.duration} - ${item.price}
                                            </p>
                                            <h3 className={`${bebas.className} text-white text-xl md:text-2xl uppercase leading-none tracking-wide`}>
                                                {item.name.replace("Gorilla ", "").replace(" Mode ", " ")}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* CONTROLES INFERIORES (Debajo del carrusel en móvil) */}
            <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 flex items-center justify-end gap-4 md:gap-6 z-[30]">
                <div className="flex gap-2">
                    <button onClick={goPrev} className={`w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center text-white backdrop-blur-md transition-colors ${bgIndex === 0 || anim.active ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[var(--accent-orange)] hover:border-[var(--accent-orange)]'}`}>
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>
                    <button onClick={goNext} className={`w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center text-white backdrop-blur-md transition-colors ${bgIndex >= CUTS.length - 1 || anim.active ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[var(--accent-orange)] hover:border-[var(--accent-orange)]'}`}>
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                    </button>
                </div>
                <div className="flex items-center gap-3 md:gap-4 border-l border-white/20 pl-4 md:pl-6">
                    <span className="text-white font-black text-xl md:text-2xl tracking-widest">
                        {String((anim.active ? anim.index : bgIndex) + 1).padStart(2, '0')}
                    </span>
                    <span className="text-white/30 text-xs md:text-sm">/ {String(CUTS.length).padStart(2, '0')}</span>
                </div>
            </div>

            <style>{`
        @keyframes fadeUp {
          0% { transform: translateY(40px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        .animate-fade-up {
          animation-name: fadeUp;
          animation-duration: 0.8s;
          animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          animation-fill-mode: forwards;
        }
      `}</style>
        </section>
    );
}




function renderUrbanTitle(title: string) {
    const words = title.toUpperCase().split(" ");
    const splitAt = Math.ceil(words.length / 2);

    return (
        <>
            <span className="block text-white">
                {words.slice(0, splitAt).join(" ")}
            </span>
            <span className="block text-[var(--accent-orange)]">
                {words.slice(splitAt).join(" ")}
            </span>
        </>
    );
}
