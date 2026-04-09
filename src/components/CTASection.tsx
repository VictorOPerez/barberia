"use client";

import React, { useEffect, useRef, useState } from "react";
import { Bebas_Neue, Permanent_Marker } from "next/font/google";
import Link from "next/link";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const marker = Permanent_Marker({ subsets: ["latin"], weight: "400" });

// ─── REDES SOCIALES ───
const socials = [
    {
        name: "Instagram",
        href: "https://instagram.com/YOUR_HANDLE",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
        ),
    },
    {
        name: "TikTok",
        href: "https://tiktok.com/@YOUR_HANDLE",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.05a8.16 8.16 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.48z" />
            </svg>
        ),
    },
    {
        name: "Facebook",
        href: "https://facebook.com/YOUR_PAGE",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
        ),
    },
];

export default function CTASection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setVisible(true);
                    obs.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-[#050505] py-24 px-5"
        >
            {/* ═══ AMBIENT ═══ */}
            {/* Glow superior */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(255,85,0,0.08) 0%, transparent 70%)",
                    filter: "blur(80px)",
                }}
            />
            {/* Glow inferior */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(255,85,0,0.05) 0%, transparent 70%)",
                    filter: "blur(60px)",
                }}
            />

            {/* Líneas decorativas de fondo */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute h-px w-full"
                        style={{
                            top: `${20 + i * 15}%`,
                            background: "linear-gradient(90deg, transparent, rgba(255,85,0,0.04), transparent)",
                            transform: `rotate(${-2 + i * 0.5}deg)`,
                        }}
                    />
                ))}
            </div>

            {/* ═══ CONTENIDO ═══ */}
            <div className="relative z-10 max-w-md mx-auto text-center">
                {/* Tag */}
                <div
                    className="transition-all duration-1000"
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(20px)",
                        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                >
                    <div className="inline-flex items-center gap-2 mb-6">
                        <span
                            className="w-1.5 h-1.5 rounded-full bg-[#ff5500] animate-pulse"
                            style={{ boxShadow: "0 0 8px rgba(255,85,0,0.5)" }}
                        />
                        <span className="text-[#ff5500]/60 font-bold tracking-[0.3em] text-[9px] uppercase">
                            Reservas Abiertas
                        </span>
                    </div>
                </div>

                {/* Headline principal */}
                <div
                    className="mb-6 transition-all duration-1000"
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(24px)",
                        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                        transitionDelay: "100ms",
                    }}
                >
                    <h2 className="leading-[0.95]">
                        <span className={`${bebas.className} text-white text-[42px] tracking-[0.03em] block`}>
                            TU PRÓXIMO
                        </span>
                        <span className={`${bebas.className} text-white text-[42px] tracking-[0.03em] block`}>
                            CORTE TE
                        </span>
                        <span
                            className={`${marker.className} text-[#ff5500] text-[46px] block mt-1`}
                            style={{ textShadow: "0 0 20px rgba(255,85,0,0.4), 0 0 40px rgba(255,85,0,0.15)" }}
                        >
                            Espera
                        </span>
                    </h2>
                </div>

                {/* Subtítulo */}
                <p
                    className="text-white/30 text-[13px] leading-relaxed font-light max-w-[280px] mx-auto mb-10 transition-all duration-1000"
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(16px)",
                        transitionDelay: "200ms",
                    }}
                >
                    Reserva en segundos y vive la experiencia Gorilla. Precisión, flow y actitud en cada visita.
                </p>

                {/* ─── BOTÓN PRINCIPAL ─── */}
                <div
                    className="mb-10 transition-all duration-1000"
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(16px)",
                        transitionDelay: "300ms",
                    }}
                >
                    <Link
                        href="/reservar/corte"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full overflow-hidden transition-all duration-500"
                        style={{
                            background: "linear-gradient(135deg, #ff5500, #cc4400)",
                            boxShadow: "0 0 30px rgba(255,85,0,0.25), 0 8px 24px rgba(0,0,0,0.4)",
                        }}
                    >
                        {/* Brillo animado */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                        <span className={`${bebas.className} relative text-white text-[16px] tracking-[0.2em] uppercase`}>
                            Reservar Ahora
                        </span>
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="relative transition-transform duration-300 group-hover:translate-x-1"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                {/* ─── SEPARADOR ─── */}
                <div
                    className="flex items-center justify-center gap-4 mb-10 transition-all duration-1000"
                    style={{
                        opacity: visible ? 1 : 0,
                        transitionDelay: "400ms",
                    }}
                >
                    <div
                        className="h-px flex-1 max-w-[80px]"
                        style={{
                            background: "linear-gradient(90deg, transparent, rgba(255,85,0,0.2))",
                            width: visible ? "100%" : "0%",
                            transition: "width 1s ease 0.5s",
                        }}
                    />
                    <span className="text-white/15 text-[9px] tracking-[0.3em] uppercase">
                        Síguenos
                    </span>
                    <div
                        className="h-px flex-1 max-w-[80px]"
                        style={{
                            background: "linear-gradient(90deg, rgba(255,85,0,0.2), transparent)",
                            width: visible ? "100%" : "0%",
                            transition: "width 1s ease 0.5s",
                        }}
                    />
                </div>

                {/* ─── REDES SOCIALES ─── */}
                <div className="flex justify-center gap-4">
                    {socials.map((social, i) => (
                        <a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.name}
                            className="group relative w-12 h-12 rounded-full border border-white/[0.06] bg-[#0a0a0a] flex items-center justify-center text-white/30 hover:text-[#ff5500] hover:border-[#ff5500]/30 hover:shadow-[0_0_16px_rgba(255,85,0,0.12)] transition-all duration-500"
                            style={{
                                opacity: visible ? 1 : 0,
                                transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.8)",
                                transition: "opacity 0.6s ease, transform 0.6s ease, color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease",
                                transitionDelay: `${450 + i * 80}ms`,
                            }}
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>

                {/* Label de redes */}
                <div
                    className="mt-5 flex justify-center gap-6 transition-all duration-1000"
                    style={{
                        opacity: visible ? 1 : 0,
                        transitionDelay: "700ms",
                    }}
                >
                    {socials.map((s) => (
                        <span
                            key={s.name}
                            className={`${bebas.className} text-white/12 text-[9px] tracking-[0.2em] uppercase`}
                        >
                            {s.name}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
