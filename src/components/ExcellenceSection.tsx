"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Bebas_Neue, Permanent_Marker } from "next/font/google";

// ─── FONTS ───
const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const marker = Permanent_Marker({ subsets: ["latin"], weight: "400" });

// ─── CONFIG ───
const SLIDE_DURATION = 8000;
const TRANSITION_MS = 700;

interface Feature {
    id: string;
    label: string;
    title: string;
    accent: string;
    description: string;
    videoSrc: string;  // ← Descomentar cuando tengas los videos
}

const features: Feature[] = [
    {
        id: "precision",
        label: "01",
        title: "PRECISIÓN",
        accent: "Milimétrica",
        description:
            "Dominio absoluto de la técnica. Cortes ejecutados con precisión milimétrica para un acabado impecable que define tu estilo.",
        videoSrc: "/excellenceSection/precision.mp4",
        // videoSrc: "/excellenceSection/precision.mp4",
    },
    {
        id: "premium",
        label: "02",
        title: "PREMIUM",
        accent: "De Elite",
        description:
            "Selección rigurosa de las mejores pomadas, aceites y tónicos. Cuidamos tu piel y barba con la gama más alta del mercado.",
        videoSrc: "/excellenceSection/premium.mp4",
        // videoSrc: "/videos/premium.mp4",
    },
    {
        id: "evolution",
        label: "03",
        title: "EVOLUCIÓN",
        accent: "Constante",
        description:
            "Siempre un paso adelante. Fusionamos las técnicas de la vieja escuela con el flow de las últimas tendencias.",
        // videoSrc: "/videos/evolution.mp4",
        videoSrc: "/excellenceSection/evolution.mp4",
    },
];

// ─── GRADIENTES PLACEHOLDER (reemplazar por video) ───
const placeholderGradients = [
    "radial-gradient(ellipse at 30% 60%, #331500 0%, #0a0200 50%, #050505 100%)",
    "radial-gradient(ellipse at 70% 40%, #2a1800 0%, #0a0400 50%, #050505 100%)",
    "radial-gradient(ellipse at 50% 50%, #1a0f00 0%, #080300 50%, #050505 100%)",
];

export default function ExcellenceSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [phase, setPhase] = useState<"enter" | "exit">("enter");
    const [sectionVisible, setSectionVisible] = useState(false);
    const [cycleStarted, setCycleStarted] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const [progressKey, setProgressKey] = useState(0);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const desktopVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const [videoDuration, setVideoDuration] = useState(SLIDE_DURATION);
    const [isDesktop, setIsDesktop] = useState(false);
    // ─── Intersection Observer (una sola vez, no toggle) ───
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setSectionVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.35 }
        );

        const node = sectionRef.current;
        if (node) observer.observe(node);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const media = window.matchMedia("(min-width: 1024px)");
        const sync = () => setIsDesktop(media.matches);
        sync();
        media.addEventListener("change", sync);
        return () => media.removeEventListener("change", sync);
    }, []);

    // ─── Arrancar ciclo tras ser visible ───
    useEffect(() => {
        if (sectionVisible && !cycleStarted) {
            const t = setTimeout(() => setCycleStarted(true), 500);
            return () => clearTimeout(t);
        }
    }, [sectionVisible, cycleStarted]);

    // ─── Transición al siguiente slide ───
    const nextSlide = useCallback(() => {
        setPhase("exit");
        setTimeout(() => {
            setActiveIndex((prev) => (prev + 1) % features.length);
            setProgressKey((prev) => prev + 1);
            setPhase("enter");
        }, TRANSITION_MS);
    }, []);

    // ─── Sincronizar video con slides ───
    useEffect(() => {
        const refs = isDesktop ? desktopVideoRefs.current : videoRefs.current;
        const activeVideo = refs[activeIndex];
        if (!activeVideo) return;

        // Pausar y resetear todos los que NO son el activo
        refs.forEach((video, i) => {
            if (!video || i === activeIndex) return;
            video.pause();
            video.currentTime = 0;
        });

        // Si la sección no es visible, pausar
        if (!sectionVisible) {
            activeVideo.pause();
            return;
        }

        // Si el ciclo no ha empezado, no reproducir aún
        if (!cycleStarted) return;

        // Cuando el video termina → siguiente slide (sin loop, sin interval)
        const handleEnded = () => nextSlide();
        activeVideo.addEventListener("ended", handleEnded);

        // Capturar duración real del video para la barra de progreso
        if (activeVideo.duration && isFinite(activeVideo.duration)) {
            setVideoDuration(activeVideo.duration * 1000);
        } else {
            const handleMeta = () => {
                if (activeVideo.duration && isFinite(activeVideo.duration)) {
                    setVideoDuration(activeVideo.duration * 1000);
                }
            };
            activeVideo.addEventListener("loadedmetadata", handleMeta, { once: true });
        }

        // Reproducir desde el inicio
        activeVideo.currentTime = 0;
        const tryPlay = () => {
            const p = activeVideo.play();
            if (p) p.catch(() => { });
        };

        if (activeVideo.readyState >= 2) {
            tryPlay();
        } else {
            activeVideo.addEventListener("canplay", tryPlay, { once: true });
        }

        return () => {
            activeVideo.removeEventListener("ended", handleEnded);
        };
    }, [activeIndex, sectionVisible, cycleStarted, nextSlide, isDesktop]);
    // ─── Navegación manual ───
    const goTo = (i: number) => {
        if (i === activeIndex) return;
        // Pausar video actual para que no dispare "ended" durante la transición
        const refs = isDesktop ? desktopVideoRefs.current : videoRefs.current;
        const currentVideo = refs[activeIndex];
        if (currentVideo) currentVideo.pause();
        setPhase("exit");
        setTimeout(() => {
            setActiveIndex(i);
            setProgressKey((prev) => prev + 1);
            setPhase("enter");
        }, TRANSITION_MS);
    };

    const current = features[activeIndex];
    const isIn = phase === "enter";
    const letters = current.title.split("");

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-[#050505] overflow-hidden flex flex-col items-center lg:px-6 lg:py-4"
        >
            {/* ═══════════════════════════════════════════
                FONDO AMBIENTAL
            ═══════════════════════════════════════════ */}

            {/* Grid de puntos */}
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-[2000ms]"
                style={{
                    backgroundImage:
                        "radial-gradient(rgba(255,85,0,0.12) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                    opacity: sectionVisible ? 0.5 : 0,
                }}
            />

            {/* Resplandor ambiental central */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none transition-opacity duration-[2000ms]"
                style={{
                    background:
                        "radial-gradient(circle, rgba(255,85,0,0.06) 0%, transparent 70%)",
                    filter: "blur(60px)",
                    opacity: sectionVisible ? 1 : 0,
                }}
            />

            {/* ═══════════════════════════════════════════
                HEADER
            ═══════════════════════════════════════════ */}
            <div
                className="relative z-10 text-center pt-16 pb-8 px-5 transition-all duration-1000 lg:max-w-4xl lg:pt-24 lg:pb-12"
                style={{
                    opacity: sectionVisible ? 1 : 0,
                    transform: sectionVisible ? "translateY(0)" : "translateY(30px)",
                    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                }}
            >
                {/* Tag */}
                <div className="inline-flex items-center gap-2.5 mb-5">
                    <span
                        className="h-[2px] bg-[#ff5500] rounded-full transition-all duration-700"
                        style={{
                            width: sectionVisible ? 24 : 0,
                            boxShadow: "0 0 10px #ff5500",
                            transitionDelay: "300ms",
                        }}
                    />
                    <span className="text-[#ff5500] font-bold tracking-[0.25em] text-[10px] uppercase drop-shadow-[0_0_8px_rgba(255,85,0,0.7)]">
                        Gorilla Standard
                    </span>
                    <span
                        className="h-[2px] bg-[#ff5500] rounded-full transition-all duration-700"
                        style={{
                            width: sectionVisible ? 24 : 0,
                            boxShadow: "0 0 10px #ff5500",
                            transitionDelay: "300ms",
                        }}
                    />
                </div>

                {/* Título principal */}
                <h2 className="leading-[1.1] mb-3">
                    <span
                        className={`${bebas.className} text-white text-[32px] tracking-[0.04em] block lg:text-[4.5rem]`}
                    >
                        EXCELENCIA EN
                    </span>
                    <span
                        className={`${marker.className} text-[#ff5500] text-[34px] block mt-1 drop-shadow-[0_0_15px_rgba(255,85,0,0.45)] lg:text-[4.1rem]`}
                    >
                        Cada Detalle
                    </span>
                </h2>

                <p className="text-gray-600 text-[13px] max-w-[280px] mx-auto leading-relaxed font-light lg:max-w-[460px] lg:text-[1rem]">
                    El verdadero flow está en los detalles.
                </p>
            </div>

            {/* ═══════════════════════════════════════════
                SHOWCASE — TARJETA PRINCIPAL
            ═══════════════════════════════════════════ */}
            <div
                className="relative z-10 w-full px-3 pb-6 transition-all duration-1000 lg:hidden"
                style={{
                    opacity: cycleStarted ? 1 : 0,
                    transform: cycleStarted
                        ? "translateY(0)"
                        : "translateY(20px)",
                    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                    transitionDelay: "200ms",
                }}
            >
                <div
                    className="relative aspect-[9/14] overflow-hidden rounded-[1.5rem] border border-white/[0.05] lg:aspect-[16/8.8] lg:rounded-[2rem]"
                    style={{
                        /* Aspect ratio más vertical para móvil — se siente mejor en pantalla completa */
                        boxShadow:
                            "0 0 50px rgba(255,85,0,0.05), 0 20px 40px rgba(0,0,0,0.5)",
                    }}
                >
                    {/* ── Capas de fondo (crossfade) ── */}
                    {features.map((f, i) => (
                        <div
                            key={f.id}
                            className="absolute inset-0 transition-opacity"
                            style={{
                                background: placeholderGradients[i],
                                opacity: i === activeIndex ? 1 : 0,
                                transitionDuration: `${TRANSITION_MS}ms`,
                                zIndex: 1,
                            }}
                        >
                            {/* ╔═══════════════════════════════════════════════╗
                                ║  VIDEO BACKGROUND — DESCOMENTAR CUANDO       ║
                                ║  TENGAS LOS VIDEOS LISTOS                    ║
                                ║                                              ║
                                ║  Coloca tus videos en /public/videos/ con    ║
                                ║  los nombres: precision.mp4, premium.mp4,    ║
                                ║  evolution.mp4                               ║
                                ║                                              ║
                                ║  Tips para los videos:                       ║
                                ║  - Resolución: 1080x1920 (vertical/móvil)   ║
                                ║  - Duración: 6-10 segundos en loop           ║
                                ║  - Formato: MP4 con H.264                    ║
                                ║  - Comprimir a <3MB por video                ║
                                ║  - Oscuros/moody para que el texto se lea    ║
                                ╚═══════════════════════════════════════════════╝ */}

                            <video
                                ref={(el) => { videoRefs.current[i] = el; }}
                                src={f.videoSrc}
                                muted
                                playsInline
                                preload="auto"
                                className="absolute inset-0 w-full h-full object-cover lg:object-[center_32%]"
                                style={{ opacity: 1 }}
                            />

                        </div>
                    ))}

                    {/* Overlay oscuro para legibilidad */}
                    <div
                        className="absolute inset-0 z-[2]"
                        style={{
                            background:
                                "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.7) 100%)",
                        }}
                    />

                    {/* Viñeta */}
                    <div
                        className="absolute inset-0 z-[2]"
                        style={{
                            background:
                                "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.45) 100%)",
                        }}
                    />

                    {/* Scan lines sutiles */}
                    <div
                        className="absolute inset-0 z-[2] pointer-events-none"
                        style={{
                            backgroundImage:
                                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,85,0,0.012) 2px, rgba(255,85,0,0.012) 4px)",
                        }}
                    />

                    {/* ── INDICADOR SUPERIOR (móvil) ── */}
                    <div className="absolute top-5 left-0 right-0 z-[4] flex justify-center gap-4 px-6">
                        {features.map((f, i) => (
                            <button
                                key={f.id}
                                onClick={() => goTo(i)}
                                className="flex flex-col items-center gap-1.5 bg-transparent border-none p-0"
                                aria-label={`Ir a ${f.title}`}
                            >
                                <span
                                    className={`${bebas.className} text-[9px] tracking-[0.2em] uppercase transition-colors duration-500`}
                                    style={{
                                        color:
                                            i === activeIndex
                                                ? "#ff5500"
                                                : "rgba(255,255,255,0.18)",
                                    }}
                                >
                                    {f.title}
                                </span>
                                <span
                                    className="h-[2px] rounded-full transition-all duration-600"
                                    style={{
                                        width: i === activeIndex ? 32 : 12,
                                        background:
                                            i === activeIndex
                                                ? "#ff5500"
                                                : "rgba(255,255,255,0.08)",
                                        boxShadow:
                                            i === activeIndex
                                                ? "0 0 8px rgba(255,85,0,0.4)"
                                                : "none",
                                    }}
                                />
                            </button>
                        ))}
                    </div>

                    {/* ── CONTENIDO PRINCIPAL ── */}
                    <div className="absolute inset-0 z-[3] flex flex-col justify-end p-6 pb-8">
                        {/* Número de feature */}
                        <div
                            className="mb-2 transition-all duration-500"
                            style={{
                                opacity: isIn ? 1 : 0,
                                transform: isIn ? "translateX(0)" : "translateX(-16px)",
                                transitionTimingFunction:
                                    "cubic-bezier(0.22, 1, 0.36, 1)",
                                transitionDelay: "80ms",
                            }}
                        >
                            <span
                                className={`${bebas.className} text-[#ff5500]/30 text-[11px] tracking-[0.4em] font-bold`}
                            >
                                {current.label} / 03
                            </span>
                        </div>

                        {/* Título — letras con stagger */}
                        <div className="overflow-hidden mb-1">
                            <h3 className={`${bebas.className} leading-none`}>
                                {letters.map((letter, i) => (
                                    <span
                                        key={`${current.id}-letter-${i}`}
                                        className="inline-block text-white transition-all"
                                        style={{
                                            fontSize: "clamp(52px, 14vw, 72px)",
                                            letterSpacing: "0.03em",
                                            opacity: isIn ? 1 : 0,
                                            transform: isIn
                                                ? "translateY(0)"
                                                : "translateY(110%)",
                                            transitionDuration: "450ms",
                                            transitionTimingFunction:
                                                "cubic-bezier(0.22, 1, 0.36, 1)",
                                            transitionDelay: `${100 + i * 35}ms`,
                                        }}
                                    >
                                        {letter === " " ? "\u00A0" : letter}
                                    </span>
                                ))}
                            </h3>
                        </div>

                        {/* Palabra accent */}
                        <div className="overflow-hidden mb-5">
                            <span
                                className={`${marker.className} text-[#ff5500] inline-block transition-all`}
                                style={{
                                    fontSize: "clamp(28px, 8vw, 42px)",
                                    textShadow: "0 0 18px rgba(255,85,0,0.35)",
                                    opacity: isIn ? 1 : 0,
                                    transform: isIn
                                        ? "translateY(0) scale(1)"
                                        : "translateY(28px) scale(0.92)",
                                    transitionDuration: "600ms",
                                    transitionTimingFunction:
                                        "cubic-bezier(0.22, 1, 0.36, 1)",
                                    transitionDelay: "400ms",
                                }}
                            >
                                {current.accent}
                            </span>
                        </div>

                        {/* Línea neón */}
                        <div
                            className="mb-4 h-[2px] rounded-full"
                            style={{
                                width: isIn ? 80 : 0,
                                background:
                                    "linear-gradient(90deg, #ff5500, rgba(255,85,0,0.15))",
                                boxShadow: "0 0 10px rgba(255,85,0,0.4)",
                                transition:
                                    "width 650ms cubic-bezier(0.22, 1, 0.36, 1) 300ms",
                            }}
                        />

                        {/* Descripción */}
                        <p
                            className="text-white/50 text-[13px] leading-relaxed font-light max-w-[320px] transition-all"
                            style={{
                                opacity: isIn ? 1 : 0,
                                transform: isIn ? "translateY(0)" : "translateY(14px)",
                                transitionDuration: "550ms",
                                transitionTimingFunction:
                                    "cubic-bezier(0.22, 1, 0.36, 1)",
                                transitionDelay: "500ms",
                            }}
                        >
                            {current.description}
                        </p>
                    </div>

                    {/* ── Partículas decorativas ── */}
                    <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={`particle-${i}`}
                                className="absolute rounded-full bg-[#ff5500]"
                                style={{
                                    width: i % 2 === 0 ? 2 : 1.5,
                                    height: i % 2 === 0 ? 2 : 1.5,
                                    opacity: 0.15 + (i % 3) * 0.08,
                                    left: `${8 + i * 15}%`,
                                    top: `${20 + (i % 4) * 18}%`,
                                    animation: `excellenceFloat ${2.5 + i * 0.6}s ease-in-out infinite`,
                                    animationDelay: `${i * 0.4}s`,
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* ── Barra de progreso ── */}
                <div className="flex gap-1.5 justify-center mt-5">
                    {features.map((f, i) => (
                        <button
                            key={`prog-${f.id}`}
                            onClick={() => goTo(i)}
                            className="relative h-[3px] rounded-full overflow-hidden border-none p-0 transition-all duration-500"
                            style={{
                                width: i === activeIndex ? 64 : 24,
                                background: "rgba(255,255,255,0.06)",
                            }}
                            aria-label={`Ir a ${f.title}`}
                        >
                            {i === activeIndex && (
                                <div
                                    key={progressKey}
                                    className="absolute inset-y-0 left-0 rounded-full bg-[#ff5500]"
                                    style={{
                                        boxShadow: "0 0 6px rgba(255,85,0,0.4)",
                                        animation: `excellenceProgress ${videoDuration}ms linear forwards`,
                                    }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div
                className="relative z-10 hidden w-full max-w-[1180px] grid-cols-[360px_minmax(0,1fr)] gap-10 pb-16 transition-all duration-1000 lg:grid"
                style={{
                    opacity: cycleStarted ? 1 : 0,
                    transform: cycleStarted ? "translateY(0)" : "translateY(20px)",
                    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                    transitionDelay: "200ms",
                }}
            >
                <div className="relative overflow-hidden rounded-[32px] border border-white/[0.05] bg-black shadow-[0_20px_48px_rgba(0,0,0,0.45)]">
                    {features.map((f, i) => (
                        <div
                            key={`desktop-${f.id}`}
                            className="absolute inset-0 transition-opacity"
                            style={{
                                background: placeholderGradients[i],
                                opacity: i === activeIndex ? 1 : 0,
                                transitionDuration: `${TRANSITION_MS}ms`,
                            }}
                        >
                            <video
                                ref={(el) => { desktopVideoRefs.current[i] = el; }}
                                src={f.videoSrc}
                                muted
                                playsInline
                                preload="auto"
                                className="absolute inset-0 h-full w-full bg-black object-contain"
                            />
                        </div>
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/20" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]" />
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#ff5500]/35 to-transparent" />
                    <div className="absolute top-6 left-6 rounded-full border border-white/[0.08] bg-black/40 px-3 py-2 backdrop-blur-md">
                        <span className={`${bebas.className} text-[10px] tracking-[0.24em] text-[#ff5500]`}>{current.label} / 03</span>
                    </div>
                </div>

                <div className="relative overflow-hidden rounded-[32px] border border-white/[0.05] bg-[#0b0b0b] px-10 py-10">
                    <div className="absolute inset-0 pointer-events-none">
                        <div
                            className="absolute left-0 top-[16%] h-[46%] w-[220px]"
                            style={{
                                background: "linear-gradient(90deg, rgba(255,85,0,0.12) 0%, rgba(255,85,0,0.04) 42%, rgba(255,85,0,0) 100%)",
                                filter: "blur(24px)",
                            }}
                        />
                    </div>

                    <div className="relative z-10 flex min-h-[520px] flex-col justify-between">
                        <div>
                            <div className="mb-8 flex items-center gap-4">
                                {features.map((f, i) => (
                                    <button
                                        key={`desktop-nav-${f.id}`}
                                        onClick={() => goTo(i)}
                                        className="flex flex-col items-start gap-2 bg-transparent border-none p-0"
                                        aria-label={`Ir a ${f.title}`}
                                    >
                                        <span
                                            className={`${bebas.className} text-[11px] tracking-[0.22em] uppercase transition-colors duration-500`}
                                            style={{
                                                color: i === activeIndex ? "#ff5500" : "rgba(255,255,255,0.22)",
                                            }}
                                        >
                                            {f.title}
                                        </span>
                                        <span
                                            className="h-[2px] rounded-full transition-all duration-500"
                                            style={{
                                                width: i === activeIndex ? 42 : 18,
                                                background: i === activeIndex ? "#ff5500" : "rgba(255,255,255,0.08)",
                                                boxShadow: i === activeIndex ? "0 0 8px rgba(255,85,0,0.35)" : "none",
                                            }}
                                        />
                                    </button>
                                ))}
                            </div>

                            <div className="mb-3">
                                <span className={`${bebas.className} text-[11px] tracking-[0.4em] text-[#ff5500]/35`}>
                                    {current.label} / 03
                                </span>
                            </div>

                            <h3 className={`${bebas.className} text-[5rem] leading-[0.9] tracking-[0.03em] text-white xl:text-[5.5rem]`}>
                                {current.title}
                            </h3>

                            <div className="mt-3">
                                <span
                                    className={`${marker.className} text-[3.7rem] leading-none text-[#ff5500]`}
                                    style={{ textShadow: "0 0 18px rgba(255,85,0,0.35)" }}
                                >
                                    {current.accent}
                                </span>
                            </div>

                            <div
                                className="mt-6 h-[2px] w-24 rounded-full"
                                style={{
                                    background: "linear-gradient(90deg, #ff5500, rgba(255,85,0,0.12))",
                                    boxShadow: "0 0 10px rgba(255,85,0,0.35)",
                                }}
                            />

                            <p className="mt-6 max-w-[520px] text-[1rem] leading-7 text-white/52">
                                {current.description}
                            </p>
                        </div>

                        <div>
                            <div className="flex gap-2">
                                {features.map((f, i) => (
                                    <button
                                        key={`desktop-prog-${f.id}`}
                                        onClick={() => goTo(i)}
                                        className="relative h-[4px] overflow-hidden rounded-full border-none p-0 transition-all duration-500"
                                        style={{
                                            width: i === activeIndex ? 86 : 30,
                                            background: "rgba(255,255,255,0.06)",
                                        }}
                                        aria-label={`Ir a ${f.title}`}
                                    >
                                        {i === activeIndex && (
                                            <div
                                                key={`desktop-progress-${progressKey}`}
                                                className="absolute inset-y-0 left-0 rounded-full bg-[#ff5500]"
                                                style={{
                                                    boxShadow: "0 0 6px rgba(255,85,0,0.4)",
                                                    animation: `excellenceProgress ${videoDuration}ms linear forwards`,
                                                }}
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-[#ff5500]/20 bg-[#0a0a0a] px-6 py-3">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#ff5500] animate-pulse" />
                                <span className={`${bebas.className} text-[10px] tracking-[0.2em] uppercase text-white/72`}>
                                    Calidad sin compromisos
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════
                BADGE FINAL
            ═══════════════════════════════════════════ */}
            <div
                className="relative z-10 pb-16 transition-all duration-1000"
                style={{
                    opacity: cycleStarted ? 1 : 0,
                    transform: cycleStarted ? "translateY(0)" : "translateY(14px)",
                    transitionDelay: "600ms",
                }}
            >
                <div className="relative px-6 py-2.5 rounded-full bg-[#0a0a0a] border border-[#ff5500]/20 flex items-center gap-2.5 overflow-hidden group">
                    {/* Brillo hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ff5500]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500] animate-pulse" />
                    <span
                        className={`${bebas.className} relative text-white/70 tracking-[0.2em] text-[10px] uppercase`}
                    >
                        Calidad sin compromisos
                    </span>
                </div>
            </div>

            {/* ═══════════════════════════════════════════
                KEYFRAMES
            ═══════════════════════════════════════════ */}
            <style>{`
                @keyframes excellenceFloat {
                    0%, 100% { transform: translate(0, 0); opacity: 0.15; }
                    25% { transform: translate(6px, -10px); opacity: 0.4; }
                    50% { transform: translate(-3px, -20px); opacity: 0.1; }
                    75% { transform: translate(10px, -8px); opacity: 0.35; }
                }
                @keyframes excellenceProgress {
                    from { width: 0%; }
                    to { width: 100%; }
                }
            `}</style>
        </section>
    );
}
