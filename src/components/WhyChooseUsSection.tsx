"use client";

import Image from "next/image";

export default function WhyChooseUsSection() {
    return (
        <section className="relative overflow-hidden bg-[#050505] py-24 text-white">
            {/* Ambient background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_45%)]" />
                <div className="absolute left-[-10%] top-[-10%] h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />
                <div className="absolute right-[-10%] bottom-[-10%] h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 md:px-10">
                <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
                    {/* Main image */}
                    <div className="relative min-h-[620px] w-full md:min-h-[700px]">
                        <Image
                            src="/barbershop/relax-client.jpg"
                            alt="Cliente relajado mientras el barbero trabaja con precisión"
                            fill
                            className="object-cover"
                            priority
                        />

                        {/* Image overlays */}
                        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.52)_38%,rgba(0,0,0,0.18)_62%,rgba(0,0,0,0.45)_100%)]" />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.08)_35%,rgba(0,0,0,0.82)_100%)]" />

                        {/* Neon floor guide */}
                        <div className="pointer-events-none absolute bottom-[12%] left-[6%] right-[22%] h-24">
                            <div
                                className="absolute bottom-6 left-0 h-[4px] w-[58%] rounded-full"
                                style={{
                                    background:
                                        "linear-gradient(90deg, rgba(255,140,0,0.0) 0%, rgba(255,140,0,0.95) 18%, rgba(255,170,40,1) 55%, rgba(255,140,0,0.0) 100%)",
                                    boxShadow:
                                        "0 0 12px rgba(255,140,0,0.9), 0 0 26px rgba(255,140,0,0.65), 0 0 56px rgba(255,140,0,0.35)",
                                    transform: "perspective(500px) rotateX(70deg) skewX(-22deg)",
                                    transformOrigin: "left center",
                                }}
                            />
                            <div
                                className="absolute bottom-4 left-[35%] h-[3px] w-[34%] rounded-full"
                                style={{
                                    background:
                                        "linear-gradient(90deg, rgba(255,160,30,0.0) 0%, rgba(255,160,30,0.95) 35%, rgba(255,180,60,0.95) 60%, rgba(255,160,30,0.0) 100%)",
                                    boxShadow:
                                        "0 0 10px rgba(255,160,30,0.8), 0 0 30px rgba(255,160,30,0.45)",
                                    transform: "perspective(500px) rotateX(72deg) skewX(-30deg)",
                                    transformOrigin: "left center",
                                }}
                            />
                            <div
                                className="absolute bottom-0 left-[18%] h-16 w-[45%] rounded-full"
                                style={{
                                    background:
                                        "radial-gradient(ellipse at center, rgba(255,140,0,0.22) 0%, rgba(255,140,0,0.08) 40%, transparent 72%)",
                                    filter: "blur(18px)",
                                    transform: "rotate(-6deg)",
                                }}
                            />
                        </div>

                        {/* Floating content */}
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full px-6 md:px-10 lg:px-14">
                                <div className="max-w-xl rounded-[30px] border border-white/10 bg-black/30 p-6 backdrop-blur-md md:p-8">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-orange-300/85">
                                        Why Choose Us
                                    </p>

                                    <h2 className="mt-4 text-4xl font-black uppercase leading-[0.95] tracking-[0.03em] text-white md:text-6xl">
                                        More than
                                        <span className="block text-orange-400 [text-shadow:0_0_18px_rgba(251,146,60,0.35)]">
                                            a haircut
                                        </span>
                                    </h2>

                                    <div className="relative mt-5 h-4 w-44">
                                        <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-[repeating-linear-gradient(90deg,rgba(251,146,60,0.95)_0px,rgba(251,146,60,0.95)_12px,transparent_12px,transparent_20px)]" />
                                        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-400 shadow-[0_0_20px_rgba(251,146,60,0.95),0_0_40px_rgba(251,146,60,0.4)]" />
                                    </div>

                                    <p className="mt-6 text-sm leading-relaxed text-white/68 md:text-base">
                                        We built this place for men who value precision, trust and a
                                        calm atmosphere. Our barbers are not just skilled — they are
                                        focused, attentive and committed to making every visit feel
                                        like a reset.
                                    </p>

                                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4">
                                            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-orange-300/75">
                                                Elite
                                            </p>
                                            <p className="mt-2 text-sm font-bold uppercase tracking-wide text-white">
                                                Master Barbers
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4">
                                            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-orange-300/75">
                                                Atmosphere
                                            </p>
                                            <p className="mt-2 text-sm font-bold uppercase tracking-wide text-white">
                                                Relaxed Experience
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4">
                                            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-orange-300/75">
                                                Lifestyle
                                            </p>
                                            <p className="mt-2 text-sm font-bold uppercase tracking-wide text-white">
                                                Timeless Style
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <button className="inline-flex items-center gap-3 rounded-full border border-orange-400/25 bg-orange-400/10 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.28em] text-orange-300 transition hover:bg-orange-400/15 hover:text-orange-200">
                                            Book Your Experience
                                            <span className="text-base">→</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom vignette */}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/55 to-transparent" />
                    </div>
                </div>
            </div>
        </section>
    );
}