"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Bebas_Neue, Permanent_Marker } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const marker = Permanent_Marker({ subsets: ["latin"], weight: "400" });

// ─── MENU DATA ───
const navLinks = [
    { label: "Inicio", href: "/" },
    { label: "Servicios", href: "#services", hasSubmenu: true },
    { label: "Membresías", href: "#memberships" },
    { label: "Gift Cards", href: "#giftcards" },
    { label: "Únete al Team", href: "#join" },
];

const contactInfo = {
    phone: "(352) 435-0824",
    phoneHref: "tel:+13524350824",
    bookingHref: "https://YOUR_BOOKING_LINK",
};

const socials = [
    { name: "IG", href: "https://instagram.com/YOUR_HANDLE" },
    { name: "TK", href: "https://tiktok.com/@YOUR_HANDLE" },
    { name: "FB", href: "https://facebook.com/YOUR_PAGE" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [linksVisible, setLinksVisible] = useState(false);
    const pathname = usePathname();

    // ─── Detectar si estamos en páginas de reservar ───
    const isReservarPage = pathname.startsWith("/reservar");

    // ─── Solo "Inicio" habilitado en /reservar/* ───
    const isLinkDisabled = (href: string) => {
        if (!isReservarPage) return false;
        return href !== "/";
    };

    // ─── Scroll detection ───
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // ─── Lock body scroll ───
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            const t = setTimeout(() => setLinksVisible(true), 200);
            return () => clearTimeout(t);
        } else {
            document.body.style.overflow = "";
        }
    }, [isOpen]);

    const toggleMenu = useCallback(() => {
        if (isOpen) {
            setLinksVisible(false);
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    }, [isOpen]);

    const closeMenu = useCallback(() => {
        setLinksVisible(false);
        setIsOpen(false);
    }, []);

    return (
        <>
            {/* ═══════════════════════════════════════════
                BARRA FIJA SUPERIOR
            ═══════════════════════════════════════════ */}
            <nav
                className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
                style={{
                    background: scrolled
                        ? "rgba(5,5,5,0.85)"
                        : "transparent",
                    backdropFilter: scrolled ? "blur(12px)" : "none",
                    WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
                    borderBottom: scrolled
                        ? "1px solid rgba(255,255,255,0.04)"
                        : "1px solid transparent",
                }}
            >
                <div className="flex items-center justify-between px-5 py-4 max-w-7xl mx-auto">
                    {/* ─── LOGO ─── */}
                    <Link
                        href="/"
                        className="relative z-[110] flex flex-col leading-none"
                        onClick={closeMenu}
                    >
                        <span
                            className={`${marker.className} text-[20px] leading-none transition-colors duration-500`}
                            style={{
                                color: isOpen ? "white" : "#ff5500",
                                textShadow: isOpen
                                    ? "none"
                                    : "0 0 10px rgba(255,85,0,0.3)",
                            }}
                        >
                            Gorilla
                        </span>
                        <span
                            className={`${bebas.className} text-[8px] tracking-[0.3em] uppercase transition-colors duration-500`}
                            style={{
                                color: isOpen
                                    ? "rgba(255,255,255,0.4)"
                                    : "rgba(255,255,255,0.45)",
                            }}
                        >
                            Grooming Co.
                        </span>
                    </Link>

                    {/* ═══════════════════════════════════════════
                        DESKTOP NAV (hidden en móvil, visible lg+)
                    ═══════════════════════════════════════════ */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const disabled = isLinkDisabled(link.href);

                            if (disabled) {
                                return (
                                    <span
                                        key={link.label}
                                        className={`${bebas.className} relative px-4 py-2 text-[14px] tracking-[0.15em] uppercase cursor-not-allowed select-none`}
                                        style={{ color: "rgba(255,255,255,0.12)" }}
                                    >
                                        {link.label}
                                        {/* Línea tachada naranja */}
                                        <span
                                            className="absolute left-3 right-3 top-1/2 h-px -translate-y-1/2"
                                            style={{ background: "rgba(255,85,0,0.2)" }}
                                        />
                                    </span>
                                );
                            }

                            return (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={`${bebas.className} group relative px-4 py-2 text-[14px] tracking-[0.15em] uppercase text-white/50 hover:text-white transition-colors duration-300 block`}
                                >
                                    {link.label}
                                    {/* Underline hover animado */}
                                    <span className="absolute bottom-0.5 left-4 right-4 h-px bg-[#ff5500] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                    {link.hasSubmenu && (
                                        <svg
                                            width="8"
                                            height="8"
                                            viewBox="0 0 10 10"
                                            className="inline-block ml-1 opacity-30 group-hover:opacity-60 transition-opacity"
                                        >
                                            <path d="M3 2l4 3-4 3" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                                        </svg>
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* ─── DESKTOP: TELÉFONO + BOTÓN RESERVAR (hidden en móvil) ─── */}
                    <div className="hidden lg:flex items-center gap-4">
                        <a
                            href={contactInfo.phoneHref}
                            className="flex items-center gap-2 text-white/25 hover:text-white/50 transition-colors duration-300"
                        >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#ff5500]/30">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            <span className={`${bebas.className} text-[12px] tracking-[0.1em]`}>
                                {contactInfo.phone}
                            </span>
                        </a>

                        <div className="w-px h-5 bg-white/[0.06]" />

                        <Link
                            href="/reservar/corte"
                            className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full overflow-hidden transition-all duration-500"
                            style={{
                                background: "linear-gradient(135deg, #ff5500, #cc4400)",
                                boxShadow: "0 0 20px rgba(255,85,0,0.15), 0 4px 12px rgba(0,0,0,0.3)",
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            <span className={`${bebas.className} relative text-white text-[13px] tracking-[0.2em] uppercase`}>
                                Reservar
                            </span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative group-hover:translate-x-0.5 transition-transform duration-300">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>

                    {/* ─── HAMBURGER BUTTON (solo móvil, oculto en lg+) ─── */}
                    <button
                        onClick={toggleMenu}
                        className="relative z-[110] w-11 h-11 flex lg:hidden items-center justify-center rounded-full border transition-all duration-500"
                        style={{
                            borderColor: isOpen
                                ? "rgba(255,85,0,0.3)"
                                : "rgba(255,255,255,0.08)",
                            background: isOpen
                                ? "rgba(255,85,0,0.08)"
                                : "rgba(255,255,255,0.03)",
                            boxShadow: isOpen
                                ? "0 0 20px rgba(255,85,0,0.1)"
                                : "none",
                        }}
                        aria-label="Toggle menu"
                        aria-expanded={isOpen}
                    >
                        <div className="relative w-5 h-3.5 flex flex-col justify-between">
                            <span
                                className="block h-[1.5px] rounded-full transition-all duration-500 origin-center"
                                style={{
                                    width: isOpen ? "100%" : "100%",
                                    background: isOpen ? "#ff5500" : "rgba(255,255,255,0.6)",
                                    transform: isOpen ? "translateY(5px) rotate(45deg)" : "translateY(0) rotate(0)",
                                }}
                            />
                            <span
                                className="block h-[1.5px] rounded-full transition-all duration-300"
                                style={{
                                    width: "60%",
                                    marginLeft: "auto",
                                    background: isOpen ? "#ff5500" : "rgba(255,255,255,0.35)",
                                    opacity: isOpen ? 0 : 1,
                                    transform: isOpen ? "scaleX(0)" : "scaleX(1)",
                                }}
                            />
                            <span
                                className="block h-[1.5px] rounded-full transition-all duration-500 origin-center"
                                style={{
                                    width: isOpen ? "100%" : "75%",
                                    background: isOpen ? "#ff5500" : "rgba(255,255,255,0.6)",
                                    transform: isOpen ? "translateY(-7px) rotate(-45deg)" : "translateY(0) rotate(0)",
                                }}
                            />
                        </div>
                    </button>
                </div>
            </nav>

            {/* ═══════════════════════════════════════════
                OVERLAY FULLSCREEN (solo móvil)
            ═══════════════════════════════════════════ */}
            <div
                className="fixed inset-0 z-[99] flex flex-col transition-all duration-700 lg:hidden"
                style={{
                    pointerEvents: isOpen ? "auto" : "none",
                    visibility: isOpen ? "visible" : "hidden",
                }}
            >
                <div
                    className="absolute inset-0 bg-[#050505] transition-all duration-700"
                    style={{
                        clipPath: isOpen
                            ? "circle(150% at calc(100% - 46px) 36px)"
                            : "circle(0% at calc(100% - 46px) 36px)",
                        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                />

                <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
                    style={{
                        backgroundImage: "radial-gradient(rgba(255,85,0,0.06) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                        opacity: isOpen ? 0.6 : 0,
                        transitionDelay: "300ms",
                    }}
                />

                <div
                    className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none rounded-full transition-opacity duration-1000"
                    style={{
                        background: "radial-gradient(circle, rgba(255,85,0,0.08) 0%, transparent 70%)",
                        filter: "blur(80px)",
                        opacity: isOpen ? 1 : 0,
                        transitionDelay: "200ms",
                    }}
                />

                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div
                        className="absolute top-[25%] left-0 right-0 h-px transition-all duration-1000"
                        style={{
                            background: "linear-gradient(90deg, transparent, rgba(255,85,0,0.06), transparent)",
                            opacity: isOpen ? 1 : 0,
                            transitionDelay: "400ms",
                        }}
                    />
                    <div
                        className="absolute top-[55%] left-0 right-0 h-px transition-all duration-1000"
                        style={{
                            background: "linear-gradient(90deg, transparent, rgba(255,85,0,0.04), transparent)",
                            opacity: isOpen ? 1 : 0,
                            transitionDelay: "500ms",
                        }}
                    />
                </div>

                {/* ═══ CONTENIDO DEL MENÚ MÓVIL ═══ */}
                <div className="relative z-10 flex flex-col justify-between h-full pt-24 pb-8 px-8">
                    <div className="flex-1 flex flex-col justify-center -mt-8">
                        {navLinks.map((link, i) => {
                            const disabled = isLinkDisabled(link.href);

                            if (disabled) {
                                return (
                                    <div
                                        key={link.label}
                                        className="relative block py-3 overflow-hidden"
                                        style={{
                                            opacity: linksVisible ? 1 : 0,
                                            transform: linksVisible ? "translateX(0)" : "translateX(-40px)",
                                            transition: isOpen && linksVisible
                                                ? `all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${i * 70}ms`
                                                : "none",
                                        }}
                                    >
                                        <span className={`${bebas.className} text-[#ff5500]/8 text-[11px] tracking-[0.3em] block mb-0.5`}>
                                            0{i + 1}
                                        </span>
                                        <span
                                            className={`${bebas.className} text-[40px] leading-none tracking-[0.02em] block relative`}
                                            style={{ color: "rgba(255,255,255,0.1)" }}
                                        >
                                            {link.label.toUpperCase()}
                                            {/* Línea tachada */}
                                            <span
                                                className="absolute left-0 top-1/2 h-px -translate-y-1/2 w-full"
                                                style={{ background: "rgba(255,85,0,0.15)" }}
                                            />
                                        </span>
                                    </div>
                                );
                            }

                            return (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    onClick={closeMenu}
                                    className="group relative block py-3 overflow-hidden"
                                    style={{
                                        opacity: linksVisible ? 1 : 0,
                                        transform: linksVisible ? "translateX(0)" : "translateX(-40px)",
                                        transition: isOpen && linksVisible
                                            ? `all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${i * 70}ms`
                                            : "none",
                                    }}
                                >
                                    <span className={`${bebas.className} text-[#ff5500]/15 text-[11px] tracking-[0.3em] block mb-0.5`}>
                                        0{i + 1}
                                    </span>
                                    <span className={`${bebas.className} text-white text-[40px] leading-none tracking-[0.02em] block group-hover:text-[#ff5500] transition-colors duration-300`}>
                                        {link.label.toUpperCase()}
                                    </span>
                                    <span
                                        className="absolute bottom-2 left-0 h-[1px] bg-[#ff5500]/30 transition-all duration-500 group-hover:w-full"
                                        style={{ width: 0 }}
                                    />
                                    {link.hasSubmenu && (
                                        <svg width="10" height="10" viewBox="0 0 10 10" className="absolute right-0 top-1/2 -translate-y-1/2 text-white/15 group-hover:text-[#ff5500]/50 transition-colors duration-300">
                                            <path d="M3 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                                        </svg>
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* ── Sección inferior ── */}
                    <div
                        style={{
                            opacity: linksVisible ? 1 : 0,
                            transform: linksVisible ? "translateY(0)" : "translateY(20px)",
                            transition: isOpen && linksVisible
                                ? "all 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.5s"
                                : "none",
                        }}
                    >
                        <Link
                            href="/reservar/corte"
                            rel="noopener noreferrer"
                            onClick={closeMenu}
                            className="group relative flex items-center justify-center gap-3 w-full py-4 rounded-2xl overflow-hidden mb-6 transition-all duration-500"
                            style={{
                                background: "linear-gradient(135deg, #ff5500, #cc4400)",
                                boxShadow: "0 0 30px rgba(255,85,0,0.2), 0 6px 20px rgba(0,0,0,0.3)",
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            <span className={`${bebas.className} relative text-white text-[15px] tracking-[0.25em] uppercase`}>
                                Reservar Ahora
                            </span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative group-hover:translate-x-1 transition-transform duration-300">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>

                        <div className="flex items-center justify-between">
                            <a href={contactInfo.phoneHref} className="flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors duration-300">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#ff5500]/30">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                <span className="text-[11px] font-light">{contactInfo.phone}</span>
                            </a>
                            <div className="flex gap-2">
                                {socials.map((s) => (
                                    <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className={`${bebas.className} w-9 h-9 rounded-full border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-white/25 text-[10px] tracking-[0.1em] hover:text-[#ff5500] hover:border-[#ff5500]/25 transition-all duration-300`}>
                                        {s.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
