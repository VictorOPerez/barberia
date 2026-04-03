"use client";

import Image from "next/image";

export default function AboutBarbershopGallery() {
    return (
        <section className="relative overflow-hidden bg-[#050505] py-24 text-white">
            {/* Ambient background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-[-10%] top-[-10%] h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
                <div className="absolute bottom-[-10%] right-[-10%] h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_55%)]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 md:px-10">
                {/* Header */}
                <div className="mb-14 max-w-2xl">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-orange-400/80">
                        History / Atmosphere
                    </p>

                    <h2 className="text-4xl font-black uppercase tracking-[0.04em] text-white md:text-6xl">
                        About Our
                        <span className="ml-3 inline-block text-orange-400 [text-shadow:0_0_18px_rgba(251,146,60,0.45)]">
                            Barbershop
                        </span>
                    </h2>

                    <div className="relative mt-5 h-4 w-44">
                        <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-[repeating-linear-gradient(90deg,rgba(251,146,60,0.95)_0px,rgba(251,146,60,0.95)_12px,transparent_12px,transparent_20px)]" />
                        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-400 shadow-[0_0_20px_rgba(251,146,60,0.95),0_0_40px_rgba(251,146,60,0.45)]" />
                    </div>

                    <p className="mt-6 text-sm leading-relaxed text-white/55 md:text-base">
                        More than a haircut, this is a ritual. Precision, atmosphere,
                        craftsmanship and character — every corner of the shop is designed
                        to feel timeless, masculine and unforgettable.
                    </p>
                </div>

                {/* Asymmetric gallery */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:grid-rows-[220px_220px_220px]">
                    {/* Small detail 1 */}
                    <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 lg:col-span-3 lg:row-span-1">
                        <Image
                            src="/barbershop/apron.jpg"
                            alt="Leather apron detail"
                            fill
                            className="object-cover transition duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-orange-300/80">
                                Detail
                            </p>
                            <h3 className="mt-1 text-sm font-bold uppercase tracking-wide text-white">
                                Leather Apron
                            </h3>
                        </div>
                    </div>

                    {/* Main image */}
                    <div className="group relative overflow-hidden rounded-[34px] border border-white/10 bg-white/5 lg:col-span-6 lg:row-span-2">
                        <Image
                            src="/barbershop/main-action.jpg"
                            alt="Barbershop in action"
                            fill
                            className="object-cover transition duration-700 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                            <div className="inline-flex items-center rounded-full border border-orange-400/25 bg-black/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-orange-300 backdrop-blur-sm">
                                Since Day One
                            </div>

                            <h3 className="mt-4 max-w-xl text-2xl font-black uppercase leading-tight tracking-[0.04em] md:text-4xl">
                                Crafted cuts,
                                <br />
                                real atmosphere.
                            </h3>

                            <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/65 md:text-base">
                                A place where clean fades meet warm towels, sharp lines and a
                                room full of texture, ritual and presence.
                            </p>
                        </div>
                    </div>

                    {/* Small detail 2 */}
                    <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 lg:col-span-3 lg:row-span-1">
                        <Image
                            src="/barbershop/brush.jpg"
                            alt="Brush detail"
                            fill
                            className="object-cover transition duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-orange-300/80">
                                Tooling
                            </p>
                            <h3 className="mt-1 text-sm font-bold uppercase tracking-wide text-white">
                                Bristle Brush
                            </h3>
                        </div>
                    </div>

                    {/* Neon quote block */}
                    <div className="relative overflow-hidden rounded-[30px] border border-orange-400/20 bg-[#0a0a0a] p-6 lg:col-span-3 lg:row-span-2">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.18),transparent_45%)]" />
                        <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-orange-400/10 blur-3xl" />

                        <div className="relative flex h-full flex-col justify-between">
                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-orange-300/70">
                                    Neon Quote
                                </p>

                                <blockquote className="mt-6 text-2xl font-black uppercase leading-tight tracking-[0.04em] text-orange-300 md:text-3xl [text-shadow:0_0_10px_rgba(251,146,60,0.55),0_0_24px_rgba(251,146,60,0.35)]">
                                    Precision
                                    <br />
                                    is our
                                    <br />
                                    signature.
                                </blockquote>
                            </div>

                            <p className="mt-8 max-w-[18rem] text-sm leading-relaxed text-white/50">
                                Every blade stroke, every fade and every detail is intentional.
                            </p>
                        </div>
                    </div>

                    {/* Small detail 3 */}
                    <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 lg:col-span-3 lg:row-span-1">
                        <Image
                            src="/barbershop/neon-clock-wall.jpg"
                            alt="Brick wall with orange neon clock"
                            fill
                            className="object-cover transition duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-orange-300/80">
                                Atmosphere
                            </p>
                            <h3 className="mt-1 text-sm font-bold uppercase tracking-wide text-white">
                                Brick + Neon
                            </h3>
                        </div>
                    </div>

                    {/* Text support block */}
                    <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm lg:col-span-6 lg:row-span-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent" />

                        <div className="relative grid gap-6 md:grid-cols-2">
                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-orange-300/70">
                                    Our Story
                                </p>
                                <h3 className="mt-3 text-xl font-black uppercase tracking-[0.04em] text-white md:text-2xl">
                                    Built around craft, not trends.
                                </h3>
                            </div>

                            <p className="text-sm leading-relaxed text-white/58 md:text-base">
                                Our shop blends old-school barber discipline with a modern visual
                                identity: leather, metal, brick, warm shadows and orange neon.
                                The goal is simple — make every client feel like they stepped
                                into a place with soul.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}