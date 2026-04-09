"use client";

import React from "react";
import { Bebas_Neue, Permanent_Marker } from "next/font/google";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const marker = Permanent_Marker({ subsets: ["latin"], weight: "400" });

// ─── DATOS ───
const quickLinks = [
    { label: "Inicio", href: "#hero" },
    { label: "Servicios", href: "#services" },
    { label: "Sobre Nosotros", href: "#about" },
    { label: "Reseñas", href: "#reviews" },
    { label: "Reservar", href: "https://YOUR_BOOKING_LINK" },
];

const hours = [
    { day: "Lunes – Viernes", time: "9:00 AM – 7:00 PM" },
    { day: "Sábado", time: "8:00 AM – 5:00 PM" },
    { day: "Domingo", time: "Cerrado" },
];

const socials = [
    {
        name: "Instagram",
        href: "https://instagram.com/YOUR_HANDLE",
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.05a8.16 8.16 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.48z" />
            </svg>
        ),
    },
    {
        name: "Facebook",
        href: "https://facebook.com/YOUR_PAGE",
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
        ),
    },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-[#030303] overflow-hidden lg:px-6">
            {/* ═══ LÍNEA NEÓN SUPERIOR ═══ */}
            <div className="relative h-px w-full">
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(90deg, transparent, #ff5500, transparent)",
                        opacity: 0.3,
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(90deg, transparent, #ff5500, transparent)",
                        filter: "blur(4px)",
                        opacity: 0.2,
                    }}
                />
            </div>

            {/* ═══ CONTENIDO PRINCIPAL ═══ */}
            <div className="px-6 pt-14 pb-8 max-w-md mx-auto lg:max-w-[1240px] lg:px-8 lg:pt-20 lg:pb-10">
                {/* ─── LOGO ─── */}
                <div className="text-center mb-10 lg:text-left lg:mb-14">
                    {/* Reemplaza con tu logo real */}
                    {/* <Image src="/logo.png" alt="Gorilla Grooming Co." width={120} height={60} /> */}
                    <div className="inline-block">
                        <span
                            className={`${marker.className} text-[#ff5500] text-[28px] block leading-none`}
                            style={{ textShadow: "0 0 12px rgba(255,85,0,0.3)" }}
                        >
                            Gorilla
                        </span>
                        <span className={`${bebas.className} text-white/60 text-[11px] tracking-[0.35em] uppercase block mt-1`}>
                            Grooming Co.
                        </span>
                    </div>
                </div>

                {/* ─── GRID: HORARIO + LINKS ─── */}
                <div className="grid grid-cols-2 gap-8 mb-10 lg:grid-cols-3 lg:gap-14 lg:mb-14">
                    {/* Horario */}
                    <div>
                        <h4 className={`${bebas.className} text-white/40 text-[11px] tracking-[0.25em] uppercase mb-4`}>
                            Horario
                        </h4>
                        <div className="space-y-2.5">
                            {hours.map((h) => (
                                <div key={h.day}>
                                    <p className="text-white/25 text-[10px] font-medium tracking-wide">
                                        {h.day}
                                    </p>
                                    <p
                                        className="text-[11px] font-light"
                                        style={{
                                            color:
                                                h.time === "Cerrado"
                                                    ? "rgba(255,85,0,0.4)"
                                                    : "rgba(255,255,255,0.50)",
                                        }}
                                    >
                                        {h.time}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className={`${bebas.className} text-white/40 text-[11px] tracking-[0.25em] uppercase mb-4`}>
                            Navegación
                        </h4>
                        <nav className="space-y-2.5">
                            {quickLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="block text-white/35 text-[12px] font-light hover:text-[#ff5500] transition-colors duration-300"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* ─── UBICACIÓN ─── */}
                <div className="mb-10 lg:max-w-[420px]">
                    <h4 className={`${bebas.className} text-white/40 text-[11px] tracking-[0.25em] uppercase mb-3`}>
                        Ubicación
                    </h4>
                    <a
                        href="https://maps.google.com/?q=YOUR_ADDRESS"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-3 text-white/35 hover:text-white/55 transition-colors duration-300"
                    >
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mt-0.5 flex-shrink-0 text-[#ff5500]/40"
                        >
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span className="text-[12px] font-light leading-relaxed">
                            123 Your Street Address
                            <br />
                            City, State ZIP
                        </span>
                    </a>

                    {/* Teléfono */}
                    <a
                        href="tel:+1234567890"
                        className="group flex items-center gap-3 mt-3 text-white/35 hover:text-white/55 transition-colors duration-300"
                    >
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="flex-shrink-0 text-[#ff5500]/40"
                        >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        <span className="text-[12px] font-light">
                            (123) 456-7890
                        </span>
                    </a>
                </div>

                {/* ─── SOCIALS ─── */}
                <div className="flex justify-center gap-3 mb-10 lg:justify-start">
                    {socials.map((s) => (
                        <a
                            key={s.name}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={s.name}
                            className="w-10 h-10 rounded-full border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-white/25 hover:text-[#ff5500] hover:border-[#ff5500]/25 transition-all duration-400"
                        >
                            {s.icon}
                        </a>
                    ))}
                </div>

                {/* ─── SEPARADOR FINAL ─── */}
                <div className="relative h-px w-full mb-6">
                    <div
                        className="absolute inset-0"
                        style={{
                            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
                        }}
                    />
                </div>

                {/* ─── BOTTOM BAR ─── */}
                <div className="flex flex-col items-center gap-3 lg:flex-row lg:justify-between">
                    <p className="text-white/15 text-[10px] font-light tracking-wide text-center">
                        © {currentYear} Gorilla Grooming Co. Todos los derechos reservados.
                    </p>

                    <div className="flex items-center gap-2">
                        <span className="text-white/10 text-[9px] tracking-wider">
                            Developed by
                        </span>
                        <a
                            href="https://navapex.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1.5"
                        >
                            {/* 
                                Reemplaza con tu logo de Navapex si quieres:
                                <Image src="/navapex-logo.svg" alt="Navapex" width={14} height={14} />
                            */}
                            <span
                                className={`${bebas.className} text-[10px] tracking-[0.15em] text-white/20 group-hover:text-[#ff5500]/50 transition-colors duration-300`}
                            >
                                NAVAPEX
                            </span>
                        </a>
                    </div>
                </div>
            </div>

            {/* ═══ GLOW DECORATIVO INFERIOR ═══ */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[80px] pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse, rgba(255,85,0,0.04) 0%, transparent 70%)",
                    filter: "blur(30px)",
                }}
            />
        </footer>
    );
}
