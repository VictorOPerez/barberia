"use client";

import React, { useEffect, useRef, useState } from "react";
import { Bebas_Neue, Permanent_Marker } from "next/font/google";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const marker = Permanent_Marker({ subsets: ["latin"], weight: "400" });

// ─── REVIEWS DATA ───
interface Review {
    name: string;
    initials: string;
    rating: number;
    text: string;
    timeAgo: string;
}

const reviewsRow1: Review[] = [
    {
        name: "Carlos M.",
        initials: "CM",
        rating: 5,
        text: "Clean edges, clean lines. Killer shop as well. All the barbers there are very talented and that's evident by their work. Every time I go it's on point.",
        timeAgo: "2 weeks ago",
    },
    {
        name: "David R.",
        initials: "DR",
        rating: 5,
        text: "The shop was clean, well-organized, and had a great atmosphere. The barber was an absolute expert at his craft. He listened carefully and gave me an amazing haircut.",
        timeAgo: "1 month ago",
    },
    {
        name: "Jason P.",
        initials: "JP",
        rating: 5,
        text: "Best barbershop I've been to in years. The attention to detail is unmatched. My fade was perfect and the hot towel treatment was next level.",
        timeAgo: "3 weeks ago",
    },
    {
        name: "Miguel A.",
        initials: "MA",
        rating: 5,
        text: "Llegué sin cita y me atendieron rápido. El corte quedó exacto como lo pedí. Ambiente brutal, volveré seguro.",
        timeAgo: "1 week ago",
    },
];

const reviewsRow2: Review[] = [
    {
        name: "Gary Thomas",
        initials: "GT",
        rating: 5,
        text: "Absolutely love the service. I had never had a razor cut on my beard ever. Today I got a clean cut, hot towel shave, and I would highly recommend it to anybody.",
        timeAgo: "2 months ago",
    },
    {
        name: "Andre W.",
        initials: "AW",
        rating: 5,
        text: "This is my go-to spot. The vibe is perfect, music is on point, and the barbers know exactly what they're doing. Never been disappointed.",
        timeAgo: "3 weeks ago",
    },
    {
        name: "Luis F.",
        initials: "LF",
        rating: 5,
        text: "La experiencia completa. Productos premium, el barbero se tomó su tiempo y el resultado fue impecable. Un nivel que no encuentras en cualquier lado.",
        timeAgo: "2 weeks ago",
    },
    {
        name: "Kevin B.",
        initials: "KB",
        rating: 5,
        text: "Walked in looking rough, walked out looking sharp. These guys are artists. The beard lineup alone was worth the trip.",
        timeAgo: "1 month ago",
    },
];

const reviewsRow3: Review[] = [
    {
        name: "Roberto S.",
        initials: "RS",
        rating: 5,
        text: "Third time coming here and it just keeps getting better. They remember how I like my cut. That personal touch makes all the difference.",
        timeAgo: "1 week ago",
    },
    {
        name: "Chris D.",
        initials: "CD",
        rating: 5,
        text: "My son and I both got cuts here. The barber was patient with my kid and gave him a fresh style. We're both customers for life now.",
        timeAgo: "2 months ago",
    },
    {
        name: "Marco T.",
        initials: "MT",
        rating: 5,
        text: "El mejor fade que me han hecho. La navaja impecable y los productos que usan se notan en el resultado. Nivel premium de verdad.",
        timeAgo: "3 weeks ago",
    },
    {
        name: "James H.",
        initials: "JH",
        rating: 5,
        text: "Found this place through Google and the reviews don't lie. Professional, skilled, and the shop has an incredible atmosphere. 10/10.",
        timeAgo: "1 month ago",
    },
];

// ─── STARS COMPONENT ───
function Stars({ count }: { count: number }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: count }).map((_, i) => (
                <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#FBBC04">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            ))}
        </div>
    );
}

// ─── REVIEW CARD ───
function ReviewCard({ review }: { review: Review }) {
    return (
        <div className="flex-shrink-0 w-[280px] bg-[#0c0c0c] border border-white/[0.06] rounded-2xl p-5 mx-2 select-none">
            {/* Header: avatar + name + stars */}
            <div className="flex items-center gap-3 mb-3">
                {/* Avatar */}
                <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold tracking-wider flex-shrink-0"
                    style={{
                        background: "linear-gradient(135deg, #ff5500, #cc4400)",
                        color: "white",
                    }}
                >
                    {review.initials}
                </div>
                <div className="min-w-0">
                    <p className="text-white/80 text-[12px] font-semibold truncate">
                        {review.name}
                    </p>
                    <div className="flex items-center gap-2">
                        <Stars count={review.rating} />
                        <span className="text-white/20 text-[9px]">{review.timeAgo}</span>
                    </div>
                </div>
                {/* Google G icon mini */}
                <svg className="ml-auto flex-shrink-0 opacity-30" width="14" height="14" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
            </div>

            {/* Review text */}
            <p className="text-white/35 text-[11px] leading-[1.6] font-light line-clamp-4">
                &ldquo;{review.text}&rdquo;
            </p>
        </div>
    );
}

// ─── MARQUEE ROW ───
function MarqueeRow({
    reviews,
    direction = "left",
    speed = 35,
}: {
    reviews: Review[];
    direction?: "left" | "right";
    speed?: number;
}) {
    // Duplicar para loop infinito
    const doubled = [...reviews, ...reviews];
    const animName = direction === "left" ? "marqueeLeft" : "marqueeRight";

    return (
        <div className="overflow-hidden py-2">
            <div
                className="flex w-max"
                style={{
                    animation: `${animName} ${speed}s linear infinite`,
                }}
            >
                {doubled.map((r, i) => (
                    <ReviewCard key={`${r.name}-${i}`} review={r} />
                ))}
            </div>
        </div>
    );
}

// ─── MAIN SECTION ───
export default function GoogleReviewsSection() {
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
            { threshold: 0.1 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-[#050505] py-20"
        >
            {/* ═══ AMBIENT ═══ */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(255,85,0,0.04) 0%, transparent 70%)",
                        filter: "blur(80px)",
                    }}
                />
            </div>

            {/* ═══ HEADER ═══ */}
            <div
                className="relative z-10 text-center px-6 mb-12 transition-all duration-1000"
                style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(24px)",
                    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                }}
            >
                {/* Google logo + rating */}
                <div className="inline-flex flex-col items-center gap-4 mb-6">
                    {/* Google G */}
                    <div className="flex items-center gap-2.5">
                        <svg width="28" height="28" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <span className="text-white/50 text-[13px] font-medium">
                            Google Reviews
                        </span>
                    </div>

                    {/* Rating number + stars */}
                    <div className="flex items-center gap-3">
                        <span className={`${bebas.className} text-white text-[48px] leading-none tracking-tight`}>
                            5.0
                        </span>
                        <div className="flex flex-col gap-1">
                            <div className="flex gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#FBBC04">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-white/25 text-[10px] tracking-wide">
                                Based on 120+ reviews
                            </span>
                        </div>
                    </div>
                </div>

                {/* Title */}
                <h2 className="leading-[1] mb-3">
                    <span className={`${bebas.className} text-white text-[30px] tracking-[0.03em] block`}>
                        LO QUE DICEN
                    </span>
                    <span
                        className={`${marker.className} text-[#ff5500] text-[32px] block mt-1`}
                        style={{ textShadow: "0 0 15px rgba(255,85,0,0.35)" }}
                    >
                        Nuestros Clientes
                    </span>
                </h2>

                <div className="flex justify-center mt-4 mb-2">
                    <div className="relative h-3 w-28">
                        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#ff5500]/30 to-transparent" />
                        <div
                            className="absolute left-1/2 top-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#ff5500]/60"
                            style={{ boxShadow: "0 0 8px rgba(255,85,0,0.4)" }}
                        />
                    </div>
                </div>
            </div>

            {/* ═══ MARQUEE DIAGONAL ═══ */}
            <div
                className="relative z-10 transition-all duration-1000"
                style={{
                    opacity: visible ? 1 : 0,
                    transitionDelay: "300ms",
                    /* Rotación sutil para efecto diagonal */
                    transform: visible
                        ? "rotate(-3deg)"
                        : "rotate(-3deg) translateY(20px)",
                }}
            >
                {/* Gradientes de fade en los bordes */}
                <div className="absolute left-0 top-0 bottom-0 w-16 z-20 pointer-events-none bg-gradient-to-r from-[#050505] to-transparent" />
                <div className="absolute right-0 top-0 bottom-0 w-16 z-20 pointer-events-none bg-gradient-to-l from-[#050505] to-transparent" />

                {/* Row 1 → derecha */}
                <MarqueeRow reviews={reviewsRow1} direction="right" speed={40} />

                {/* Row 2 → izquierda */}
                <MarqueeRow reviews={reviewsRow2} direction="left" speed={45} />

                {/* Row 3 → derecha */}
                <MarqueeRow reviews={reviewsRow3} direction="right" speed={38} />
            </div>

            {/* ═══ BOTTOM CTA ═══ */}
            <div
                className="relative z-10 text-center mt-12 px-6 transition-all duration-1000"
                style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(16px)",
                    transitionDelay: "600ms",
                }}
            >
                <a
                    href="https://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-[#ff5500]/25 bg-[#0a0a0a] text-white/70 hover:text-white hover:border-[#ff5500]/50 hover:shadow-[0_0_20px_rgba(255,85,0,0.1)] transition-all duration-500 group"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-60 group-hover:opacity-100 transition-opacity">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span className={`${bebas.className} text-[12px] tracking-[0.2em] uppercase`}>
                        Dejar una Reseña
                    </span>
                </a>
            </div>

            {/* ═══ KEYFRAMES ═══ */}
            <style>{`
                @keyframes marqueeLeft {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes marqueeRight {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
            `}</style>
        </section>
    );
}
