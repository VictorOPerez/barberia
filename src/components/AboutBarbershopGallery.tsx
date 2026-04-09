"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Bebas_Neue, Permanent_Marker } from "next/font/google";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const marker = Permanent_Marker({ subsets: ["latin"], weight: "400" });

// ─── Hook: observar visibilidad de cada bloque ───
function useReveal(threshold = 0.2) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setVisible(true);
                    obs.disconnect();
                }
            },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);

    return { ref, visible };
}

// ─── SVG: Tijeras decorativas ───
function ScissorsSVG({ visible }: { visible: boolean }) {
    return (
        <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            className="transition-all duration-1000"
            style={{
                opacity: visible ? 0.6 : 0,
                transform: visible ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0.5)",
            }}
        >
            <circle cx="12" cy="38" r="5" stroke="#ff5500" strokeWidth="1.5" fill="none" />
            <circle cx="12" cy="10" r="5" stroke="#ff5500" strokeWidth="1.5" fill="none" />
            <line x1="15" y1="13" x2="42" y2="28" stroke="#ff5500" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="15" y1="35" x2="42" y2="20" stroke="#ff5500" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

// ─── SVG: Navaja decorativa ───
function RazorSVG({ visible }: { visible: boolean }) {
    return (
        <svg
            width="56"
            height="28"
            viewBox="0 0 56 28"
            fill="none"
            className="transition-all duration-[1200ms]"
            style={{
                opacity: visible ? 0.5 : 0,
                transform: visible ? "translateX(0)" : "translateX(-20px)",
            }}
        >
            <rect x="0" y="10" width="28" height="8" rx="2" stroke="#ff5500" strokeWidth="1.2" fill="none" />
            <path d="M28 10 L54 4 L54 24 L28 18 Z" stroke="#ff5500" strokeWidth="1.2" fill="none" />
            <line x1="54" y1="4" x2="54" y2="24" stroke="#ff5500" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

// ─── SVG: Peine decorativo ───
function CombSVG({ visible }: { visible: boolean }) {
    return (
        <svg
            width="14"
            height="56"
            viewBox="0 0 14 56"
            fill="none"
            className="transition-all duration-[1200ms]"
            style={{
                opacity: visible ? 0.4 : 0,
                transform: visible ? "translateY(0)" : "translateY(15px)",
            }}
        >
            <rect x="1" y="0" width="12" height="56" rx="3" stroke="#ff5500" strokeWidth="1" fill="none" />
            {[8, 14, 20, 26, 32, 38, 44].map((y) => (
                <line key={y} x1="1" y1={y} x2="6" y2={y} stroke="#ff5500" strokeWidth="0.8" />
            ))}
        </svg>
    );
}

// ─── Datos de la galería ───
const galleryItems = [
    {
        src: "/barbershop/1.jpg",
        alt: "Barbería en acción",
        label: "El Ritual",
        caption: "Cada corte es una experiencia completa. Navaja caliente, toalla, precisión.",
    },
    {
        src: "/barbershop/2.jpg",
        alt: "Delantal de cuero",
        label: "Los Detalles",
        caption: "Cuero, acero, madera. Materiales que transmiten carácter.",
    },
    {
        src: "/barbershop/3.jpg",
        alt: "Cepillo de cerdas",
        label: "Las Herramientas",
        caption: "Cada herramienta seleccionada por su calidad y propósito.",
    },
    {
        src: "/barbershop/4.jpg",
        alt: "Pared de ladrillo con neón",
        label: "La Atmósfera",
        caption: "Ladrillo, neón y sombras cálidas. Un espacio con alma.",
    },
];

export default function AboutBarbershopGallery() {
    const header = useReveal(0.15);
    const quote = useReveal(0.2);
    const story = useReveal(0.15);
    const galleryReveal = useReveal(0.1);

    return (
        <section className="relative overflow-hidden bg-[#050505] text-white">
            {/* ═══════════════════════════════════════════
                LÍNEA NEÓN VERTICAL (hilo conductor)
            ═══════════════════════════════════════════ */}
            <div className="absolute left-6 top-0 bottom-0 w-px z-0 md:left-10">
                {/* Línea base tenue */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ff5500]/15 to-transparent" />
                {/* Punto luminoso que pulsa */}
                <div
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#ff5500] animate-pulse"
                    style={{ boxShadow: "0 0 12px #ff5500, 0 0 24px rgba(255,85,0,0.3)" }}
                />
                <div
                    className="absolute top-2/3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#ff5500]/60 animate-pulse"
                    style={{ animationDelay: "1s", boxShadow: "0 0 8px rgba(255,85,0,0.4)" }}
                />
            </div>

            {/* ═══════════════════════════════════════════
                HEADER
            ═══════════════════════════════════════════ */}
            <div
                ref={header.ref}
                className="relative z-10 pt-20 pb-10 pl-14 pr-6 md:pl-20 md:pr-10"
            >
                {/* SVG decorativo flotante */}
                <div className="absolute top-16 right-6 md:right-14">
                    <ScissorsSVG visible={header.visible} />
                </div>

                {/* Dot en la línea */}
                <div
                    className="absolute left-[21px] top-24 w-3 h-3 rounded-full border-2 border-[#ff5500] bg-[#050505] transition-all duration-700 md:left-[37px]"
                    style={{
                        opacity: header.visible ? 1 : 0,
                        boxShadow: header.visible ? "0 0 10px rgba(255,85,0,0.5)" : "none",
                    }}
                />

                <div
                    className="transition-all duration-1000"
                    style={{
                        opacity: header.visible ? 1 : 0,
                        transform: header.visible ? "translateY(0)" : "translateY(24px)",
                        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                >
                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ff5500]/60 mb-4">
                        Historia / Atmósfera
                    </p>

                    <h2 className="leading-[0.95] mb-5">
                        <span className={`${bebas.className} text-white text-[38px] tracking-[0.03em] block`}>
                            SOBRE NUESTRA
                        </span>
                        <span
                            className={`${marker.className} text-[#ff5500] text-[40px] block mt-1`}
                            style={{ textShadow: "0 0 18px rgba(255,85,0,0.4)" }}
                        >
                            Barbería
                        </span>
                    </h2>

                    {/* Línea decorativa con diamante */}
                    <div className="relative h-3 w-36 mb-5">
                        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-[#ff5500]/60 via-[#ff5500]/20 to-transparent" />
                        <div
                            className="absolute left-12 top-1/2 w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#ff5500]/80"
                            style={{ boxShadow: "0 0 8px rgba(255,85,0,0.6)" }}
                        />
                    </div>

                    <p className="text-white/40 text-[13px] leading-relaxed max-w-[300px] font-light">
                        Más que un corte, es un ritual. Precisión, atmósfera y carácter en cada rincón.
                    </p>
                </div>
            </div>

            {/* ═══════════════════════════════════════════
                GALERÍA — SCROLL HORIZONTAL (móvil)
            ═══════════════════════════════════════════ */}
            <div
                ref={galleryReveal.ref}
                className="relative z-10 pl-14 md:pl-20 pb-8"
            >
                {/* Dot en la línea */}
                <div
                    className="absolute left-[22px] top-8 w-2 h-2 rounded-full bg-[#ff5500]/50 transition-all duration-500 md:left-[38px]"
                    style={{
                        opacity: galleryReveal.visible ? 1 : 0,
                        boxShadow: "0 0 6px rgba(255,85,0,0.3)",
                    }}
                />

                {/* Tira scrolleable */}
                <div
                    className="flex gap-4 overflow-x-auto pb-6 pr-6 snap-x snap-mandatory scrollbar-hide transition-all duration-1000"
                    style={{
                        opacity: galleryReveal.visible ? 1 : 0,
                        transform: galleryReveal.visible ? "translateX(0)" : "translateX(30px)",
                        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                        msOverflowStyle: "none",
                        scrollbarWidth: "none",
                    }}
                >
                    {galleryItems.map((item, i) => (
                        <div
                            key={i}
                            className="group relative flex-shrink-0 w-[72vw] max-w-[320px] snap-start"
                            style={{
                                transitionDelay: `${i * 100}ms`,
                            }}
                        >
                            {/* Imagen */}
                            <div
                                className="relative overflow-hidden rounded-2xl border border-white/[0.06] mb-3"
                                style={{ aspectRatio: "3 / 4" }}
                            >
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105 group-active:scale-105"
                                />

                                {/* Overlay degradado */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                                {/* Label sobre la imagen */}
                                <div className="absolute top-4 left-4">
                                    <span
                                        className={`${bebas.className} text-[10px] tracking-[0.3em] uppercase px-2.5 py-1 rounded-full border border-[#ff5500]/25 bg-black/40 text-[#ff5500]/80 backdrop-blur-sm`}
                                    >
                                        {item.label}
                                    </span>
                                </div>

                                {/* Número grande decorativo */}
                                <div className="absolute bottom-4 right-4">
                                    <span
                                        className={`${bebas.className} text-[64px] leading-none text-white/[0.06]`}
                                    >
                                        0{i + 1}
                                    </span>
                                </div>
                            </div>

                            {/* Caption debajo */}
                            <p className="text-white/35 text-[12px] leading-relaxed font-light px-1">
                                {item.caption}
                            </p>
                        </div>
                    ))}

                    {/* Última tarjeta: decorativa/CTA */}
                    <div className="relative flex-shrink-0 w-[72vw] max-w-[320px] snap-start flex items-center justify-center">
                        <div
                            className="w-full rounded-2xl border border-[#ff5500]/15 bg-[#0a0a0a] flex flex-col items-center justify-center gap-4 p-8"
                            style={{ aspectRatio: "3 / 4" }}
                        >
                            <RazorSVG visible={galleryReveal.visible} />
                            <p className={`${bebas.className} text-white/50 text-sm tracking-[0.2em] uppercase text-center`}>
                                Ven a vivir
                                <br />
                                la experiencia
                            </p>
                            <div
                                className="w-8 h-px bg-[#ff5500]/40"
                                style={{ boxShadow: "0 0 6px rgba(255,85,0,0.3)" }}
                            />
                        </div>
                    </div>
                </div>

                {/* Indicador de scroll */}
                <div className="flex items-center gap-2 mt-1">
                    <div className="flex gap-1">
                        {galleryItems.map((_, i) => (
                            <span key={i} className="w-1 h-1 rounded-full bg-[#ff5500]/25" />
                        ))}
                    </div>
                    <span className="text-white/15 text-[9px] tracking-widest uppercase ml-1">
                        swipe
                    </span>
                    <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="opacity-20">
                        <path d="M0 4h12M10 1l3 3-3 3" stroke="white" strokeWidth="1" />
                    </svg>
                </div>
            </div>

            {/* ═══════════════════════════════════════════
                QUOTE BLOCK
            ═══════════════════════════════════════════ */}
            <div
                ref={quote.ref}
                className="relative z-10 pl-14 pr-6 py-12 md:pl-20 md:pr-10"
            >
                {/* Dot en la línea */}
                <div
                    className="absolute left-[20px] top-16 w-4 h-4 rounded-full border-2 border-[#ff5500] bg-[#050505] transition-all duration-700 md:left-[36px]"
                    style={{
                        opacity: quote.visible ? 1 : 0,
                        boxShadow: quote.visible ? "0 0 14px rgba(255,85,0,0.5)" : "none",
                        transitionDelay: "200ms",
                    }}
                />

                <div
                    className="relative overflow-hidden rounded-2xl border border-[#ff5500]/15 bg-[#0a0a0a] p-7 transition-all duration-1000"
                    style={{
                        opacity: quote.visible ? 1 : 0,
                        transform: quote.visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
                        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                >
                    {/* Glow de fondo */}
                    <div className="absolute -top-20 -left-20 w-48 h-48 rounded-full bg-[#ff5500]/[0.07] blur-[60px] pointer-events-none" />

                    {/* SVG decorativo */}
                    <div className="absolute top-5 right-5">
                        <CombSVG visible={quote.visible} />
                    </div>

                    {/* Comilla gigante */}
                    <span
                        className={`${bebas.className} text-[80px] leading-none text-[#ff5500]/10 block -mb-10`}
                    >
                        &ldquo;
                    </span>

                    <blockquote
                        className={`${bebas.className} text-[28px] leading-[1.1] tracking-[0.03em] text-white/90 mb-4`}
                    >
                        LA PRECISIÓN
                        <br />
                        <span
                            className={`${marker.className} text-[#ff5500] text-[30px]`}
                            style={{ textShadow: "0 0 12px rgba(255,85,0,0.4), 0 0 24px rgba(255,85,0,0.2)" }}
                        >
                            Es Nuestra Firma
                        </span>
                    </blockquote>

                    <p className="text-white/30 text-[12px] leading-relaxed font-light max-w-[280px]">
                        Cada trazo de navaja, cada fade y cada detalle es intencional.
                        No cortamos pelo — esculpimos identidad.
                    </p>

                    {/* Línea decorativa inferior */}
                    <div
                        className="mt-6 h-px rounded-full"
                        style={{
                            width: quote.visible ? "60%" : "0%",
                            background: "linear-gradient(90deg, #ff5500, transparent)",
                            transition: "width 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.4s",
                        }}
                    />
                </div>
            </div>

            {/* ═══════════════════════════════════════════
                STORY BLOCK — "NUESTRA ESENCIA"
            ═══════════════════════════════════════════ */}
            <div
                ref={story.ref}
                className="relative z-10 pl-14 pr-6 pt-4 pb-20 md:pl-20 md:pr-10"
            >
                {/* Dot en la línea */}
                <div
                    className="absolute left-[22px] top-8 w-2 h-2 rounded-full bg-[#ff5500]/40 transition-all duration-500 md:left-[38px]"
                    style={{
                        opacity: story.visible ? 1 : 0,
                        boxShadow: "0 0 6px rgba(255,85,0,0.3)",
                    }}
                />

                <div
                    className="transition-all duration-1000"
                    style={{
                        opacity: story.visible ? 1 : 0,
                        transform: story.visible ? "translateY(0)" : "translateY(20px)",
                        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                >
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff5500]/50 mb-3">
                        Nuestra Esencia
                    </p>

                    <h3 className={`${bebas.className} text-[24px] tracking-[0.03em] text-white/80 mb-4`}>
                        CONSTRUIDA SOBRE OFICIO,
                        <br />
                        <span className="text-white/40">NO SOBRE TENDENCIAS.</span>
                    </h3>

                    <p className="text-white/30 text-[13px] leading-[1.7] font-light max-w-[340px] mb-6">
                        Nuestra barbería fusiona la disciplina old-school con una identidad visual moderna:
                        cuero, metal, ladrillo, sombras cálidas y neón naranja.
                        El objetivo es simple — que cada cliente sienta que entró a un lugar con alma.
                    </p>

                    {/* Materiales/valores en mini chips */}
                    <div className="flex flex-wrap gap-2">
                        {["Cuero", "Acero", "Neón", "Madera", "Ritual"].map((mat, i) => (
                            <span
                                key={mat}
                                className={`${bebas.className} text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border transition-all duration-700`}
                                style={{
                                    borderColor: story.visible ? "rgba(255,85,0,0.2)" : "transparent",
                                    color: story.visible ? "rgba(255,85,0,0.5)" : "transparent",
                                    transitionDelay: `${300 + i * 80}ms`,
                                }}
                            >
                                {mat}
                            </span>
                        ))}
                    </div>
                </div>

                {/* SVG decorativo al fondo */}
                <div className="absolute bottom-10 right-6">
                    <RazorSVG visible={story.visible} />
                </div>
            </div>

            {/* ═══════════════════════════════════════════
                ESTILOS
            ═══════════════════════════════════════════ */}
            <style>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </section>
    );
}
