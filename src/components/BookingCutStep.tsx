'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    Scissors,
} from 'lucide-react';
import { Inter, Permanent_Marker } from 'next/font/google';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

const marker = Permanent_Marker({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-marker',
});

type Haircut = {
    id: string;
    name: string;
    description: string;
    duration: string;
    price: number;
    image: string;
};

type BookingCutStepProps = {
    onContinue?: (cut: Haircut) => void;
};

const cuts: Haircut[] = [
    {
        id: 'fade',
        name: 'Fade',
        description: 'Degradado limpio con acabado urbano.',
        duration: '30 min',
        price: 25,
        image:
            'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=80',
    },
    {
        id: 'taper',
        name: 'Taper',
        description: 'Laterales suaves con flow moderno.',
        duration: '35 min',
        price: 30,
        image:
            'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=900&q=80',
    },
    {
        id: 'crop',
        name: 'Crop',
        description: 'Textura frontal con vibra agresiva.',
        duration: '40 min',
        price: 28,
        image:
            'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=900&q=80',
    },
    {
        id: 'pompadour',
        name: 'Pompadour',
        description: 'Volumen clásico llevado al street style.',
        duration: '45 min',
        price: 40,
        image:
            'https://images.unsplash.com/photo-1512690459411-b0fd220c889f?auto=format&fit=crop&w=900&q=80',
    },
];

function getRelativePosition(index: number, currentIndex: number, total: number) {
    let diff = index - currentIndex;

    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    return diff;
}

export default function BookingCutStep({ onContinue }: BookingCutStepProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const selectedCut = useMemo(() => cuts[currentIndex], [currentIndex]);

    const goPrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? cuts.length - 1 : prev - 1));
    };

    const goNext = () => {
        setCurrentIndex((prev) => (prev === cuts.length - 1 ? 0 : prev + 1));
    };

    const handleContinue = () => {
        onContinue?.(selectedCut);
    };

    return (
        <section
            className={`${inter.variable} ${marker.variable} relative h-[100svh] overflow-hidden bg-[#121212] text-white`}
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,87,34,0.16),transparent_34%),linear-gradient(180deg,#0f0f0f_0%,#121212_50%,#0d0d0d_100%)]" />
            <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:46px_46px]" />
            <div className="absolute left-[-70px] top-24 h-48 w-48 rounded-full bg-[#FF5722]/15 blur-3xl" />
            <div className="absolute right-[-90px] top-44 h-56 w-56 rounded-full bg-[#FF5722]/10 blur-3xl" />

            <div className="relative mx-auto flex h-[100svh] w-full max-w-[430px] flex-col overflow-hidden  pb-4 pt-3">
                <div className="mb-3 flex items-center justify-between px-4">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.28em] text-white/38">Barbería</p>
                        <p className="font-[family-name:var(--font-marker)] text-[1.65rem] leading-none text-[#FF5722]">
                            Moderna
                        </p>
                    </div>
                </div>

                <div className="mb-3 text-center">
                    <div className="mx-auto mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 backdrop-blur-md">
                        <Scissors className="h-3.5 w-3.5 text-[#FF5722]" />
                        <span className="text-[10px] uppercase tracking-[0.22em] text-white/62">
                            Elige tu corte
                        </span>
                    </div>

                    <h1 className="font-[family-name:var(--font-marker)] text-[2.2rem] uppercase leading-[0.92] text-white sm:text-[2.45rem]">
                        Tu próximo
                        <span className="mt-1 block text-[#FF5722]">look</span>
                    </h1>

                    <p className="mx-auto mt-2 max-w-[19rem] text-[13px] leading-5 text-white/65">
                        Desliza para ver los estilos.
                    </p>
                </div>

                <div className="relative min-h-0 flex-1 overflow-hidden">
                    <motion.div
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        // ✅ CÓDIGO CORREGIDO (Sigue el movimiento del dedo)
                        onDragEnd={(_, info) => {
                            if (info.offset.x < -40) goPrev(); // Deslizar izquierda trae el de la derecha
                            if (info.offset.x > 40) goNext();  // Deslizar derecha trae el de la izquierda
                        }}
                        className="relative h-full w-full"
                    >
                        <div className="relative mx-auto h-full w-full" style={{ perspective: 1800 }}>
                            {cuts.map((cut, index) => {
                                const offset = getRelativePosition(index, currentIndex, cuts.length);
                                const active = offset === 0;
                                const side = Math.abs(offset) === 1;
                                const hidden = Math.abs(offset) > 1;

                                return (
                                    <motion.button
                                        key={cut.id}
                                        type="button"
                                        onClick={() => setCurrentIndex(index)}
                                        animate={{
                                            x: `${offset * -86}%`,
                                            scale: active ? 1 : side ? 0.89 : 0.72,
                                            y: active ? 0 : side ? 8 : 18,
                                            rotateY: active ? 0 : offset < 0 ? 42 : -42,
                                            rotateZ: active ? 0 : offset < 0 ? -2.5 : 2.5,
                                            opacity: hidden ? 0 : active ? 1 : 0.65,
                                        }}
                                        transition={{ type: 'spring', stiffness: 230, damping: 26 }}
                                        className="absolute left-1/2 top-1/2 h-[90%] w-[74%] -translate-x-1/2 -translate-y-1/2"
                                        style={{
                                            zIndex: active ? 30 : side ? 20 : 0,
                                            transformStyle: 'preserve-3d',
                                            pointerEvents: hidden ? 'none' : 'auto',
                                        }}
                                    >
                                        <article
                                            className={`relative h-full w-full overflow-hidden rounded-[28px] border bg-[#181818] shadow-lg ${active
                                                ? 'border-[#FF5722] shadow-[0_0_35px_rgba(255,87,34,0.22)]'
                                                : 'border-white/10'
                                                }`}
                                        >
                                            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/82 via-black/18 to-transparent" />
                                            {!active && (
                                                <div className="absolute inset-0 z-10 bg-black/18" />
                                            )}

                                            <img
                                                src={cut.image}
                                                alt={cut.name}
                                                className="h-full w-full object-cover"
                                            />

                                            <div className="absolute inset-x-0 bottom-0 z-20 p-4 text-left">
                                                <div className="flex items-end justify-between gap-3">
                                                    <div className="min-w-0">
                                                        <h2 className="font-[family-name:var(--font-marker)] text-[2rem] leading-none text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.5)]">
                                                            {cut.name}
                                                        </h2>
                                                        <p className="mt-1 max-w-[9.5rem] text-[12px] leading-4 text-white/74">
                                                            {cut.description}
                                                        </p>
                                                    </div>

                                                    <div className="rounded-2xl border border-white/10 bg-black/45 px-3 py-2 text-right backdrop-blur-md">
                                                        <p className="text-[1.9rem] font-semibold leading-none text-white">${cut.price}</p>
                                                        <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/45">
                                                            {cut.duration}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>

                    <button
                        type="button"
                        onClick={goPrev}
                        className="absolute left-0 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/48 text-white/80 backdrop-blur-md transition hover:border-[#FF5722]/40 hover:text-white"
                        aria-label="Corte anterior"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>

                    <button
                        type="button"
                        onClick={goNext}
                        className="absolute right-0 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/48 text-white/80 backdrop-blur-md transition hover:border-[#FF5722]/40 hover:text-white"
                        aria-label="Siguiente corte"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>

                <div className="mt-3 flex items-center justify-center gap-2">
                    {cuts.map((cut, index) => (
                        <button
                            key={cut.id}
                            type="button"
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Ir al corte ${cut.name}`}
                            className={`h-2.5 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-7 bg-[#FF5722]' : 'w-2.5 bg-white/18'
                                }`}
                        />
                    ))}
                </div>
                <div className=' px-4' >
                    <motion.div
                        key={selectedCut.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.22 }}
                        className="mt-3 rounded-[24px] border border-white/10 bg-white/[0.045] p-4 backdrop-blur-md "
                    >
                        <p className="font-[family-name:var(--font-marker)] text-[1.55rem] leading-none text-[#FF8A65]">
                            Detalle
                        </p>
                        <p className="mt-3 text-sm text-white/72">
                            <span className="text-white">{selectedCut.name}</span>
                            <span className="mx-2 text-[#FF5722]">•</span>
                            Duración: <span className="text-white">{selectedCut.duration}</span>
                            <span className="mx-2 text-[#FF5722]">•</span>
                            <span className="text-white">${selectedCut.price}</span>
                        </p>
                    </motion.div>

                    <div className="mt-4">
                        <button
                            type="button"
                            onClick={handleContinue}
                            className="group flex w-full items-center justify-center gap-2 rounded-[22px] bg-[#FF5722] px-6 py-4 text-[1rem] font-semibold text-black shadow-[0_18px_40px_rgba(255,87,34,0.35)] transition-all duration-300 hover:brightness-105 active:scale-[0.99]"
                        >
                            Elegir este corte
                            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </div></div>
            </div>
        </section>
    );
}
