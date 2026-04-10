'use client';

import { motion } from 'framer-motion';
import { CalendarPlus, Check, Home, MapPin } from 'lucide-react';
import { Inter, Permanent_Marker } from 'next/font/google';
import { useIframeMode } from '@/hooks/useIframeMode';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

const marker = Permanent_Marker({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-marker',
});

// Props simulados (en tu app real, estos datos vienen del estado final de la reserva)
type BookingSuccessProps = {
    onGoHome?: () => void;
    bookingData?: {
        barberName: string;
        cutName: string;
        date: string;
        time: string;
        price: number;
    };
};

const defaultBooking = {
    barberName: 'Alex',
    cutName: 'Pompadour',
    date: 'Mañana · Vie 13',
    time: '10:30 AM',
    price: 40,
};

export default function BookingSuccess({
    onGoHome,
    bookingData = defaultBooking,
}: BookingSuccessProps) {
    const isIframe = useIframeMode();
    return (
        <section className={`${inter.variable} ${marker.variable} relative flex ${isIframe ? 'min-h-[812px]' : 'min-h-[100svh]'} flex-col items-center justify-center overflow-hidden bg-[#121212] text-white px-4`}>

            {/* Efectos de fondo */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,87,34,0.15),transparent_50%),linear-gradient(180deg,#0f0f0f_0%,#121212_100%)] pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:46px_46px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-[400px] text-center">

                {/* Animación del Check de Éxito */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 20,
                        delay: 0.1,
                    }}
                    className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#FF5722] to-[#D84315] shadow-[0_0_50px_rgba(255,87,34,0.4)]"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                    >
                        <Check className="h-14 w-14 text-white stroke-[3]" />
                    </motion.div>
                </motion.div>

                {/* Textos de Confirmación */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                >
                    <h1 className="font-[family-name:var(--font-marker)] text-[2.5rem] uppercase leading-none text-white drop-shadow-md">
                        ¡Estás <span className="text-[#FF5722]">listo!</span>
                    </h1>
                    <p className="mt-3 text-[15px] text-white/60">
                        Tu reserva ha sido confirmada y guardada exitosamente.
                    </p>
                </motion.div>

                {/* Tarjeta de Resumen (Ideal para Screenshot) */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    className="mt-8 overflow-hidden rounded-[24px] border border-white/10 bg-[#171717]/80 backdrop-blur-md text-left shadow-2xl"
                >
                    <div className="border-b border-white/5 bg-white/[0.02] px-5 py-4 flex justify-between items-center">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF5722]">
                            Ticket de Reserva
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-white/40">
                            #{Math.floor(Math.random() * 90000) + 10000}
                        </span>
                    </div>

                    <div className="p-5 space-y-4">
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Corte & Barbero</p>
                                <p className="text-lg font-bold text-white">{bookingData.cutName}</p>
                                <p className="text-sm text-[#FF8A65]">con {bookingData.barberName}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-bold text-white">${bookingData.price}</p>
                            </div>
                        </div>

                        <div className="h-[1px] w-full bg-white/5 rounded-full" />

                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Fecha & Hora</p>
                                <p className="text-[15px] font-semibold text-white">{bookingData.date}</p>
                                <p className="text-[15px] text-white/80">{bookingData.time}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Botones de Acción */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    className="mt-10 space-y-3"
                >
                    <button
                        type="button"
                        className="flex w-full items-center justify-center gap-2 rounded-[20px] border border-[#FF5722]/30 bg-[#FF5722]/10 px-6 py-4 text-[15px] font-bold text-[#FF8A65] transition-all hover:bg-[#FF5722]/20 active:scale-[0.98]"
                    >
                        <CalendarPlus className="h-5 w-5" />
                        Añadir al Calendario
                    </button>

                    <button
                        type="button"
                        onClick={onGoHome}
                        className="flex w-full items-center justify-center gap-2 rounded-[20px] bg-white/[0.05] px-6 py-4 text-[15px] font-bold text-white transition-all hover:bg-white/10 active:scale-[0.98]"
                    >
                        <Home className="h-5 w-5 opacity-70" />
                        Volver al inicio
                    </button>
                </motion.div>

            </div>
        </section>
    );
}