'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Clock3, Scissors, CalendarDays, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Inter, Permanent_Marker } from 'next/font/google';
import { useRouter } from 'next/navigation'; // 1. Importas el hook
const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

const marker = Permanent_Marker({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-marker',
});

// --- Types & Data ---
type SelectedCut = { name: string; price: number; duration: string };
type Barber = { id: string; name: string; image: string; availableByDay: Record<string, string[]> };
type DayItem = { id: string; short: string; date: string; full: string };

const defaultCut: SelectedCut = { name: 'Pompadour', price: 40, duration: '45 min' };

const days: DayItem[] = [
    { id: 'today', short: 'HOY', date: '12', full: 'Hoy · Jue 12' },
    { id: 'tomorrow', short: 'MAÑ', date: '13', full: 'Mañana · Vie 13' },
    { id: 'sat14', short: 'SÁB', date: '14', full: 'Sábado 14' },
    { id: 'sun15', short: 'DOM', date: '15', full: 'Domingo 15' },
    { id: 'mon16', short: 'LUN', date: '16', full: 'Lunes 16' },
];

const ALL_TIMES = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
    '05:00 PM', '05:30 PM', '06:00 PM'
];

const barbers: Barber[] = [
    {
        id: 'alex',
        name: 'Alex',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        availableByDay: { tomorrow: ['10:30 AM', '11:00 AM', '02:30 PM', '03:00 PM', '05:30 PM'] },
    },
    {
        id: 'david',
        name: 'David',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
        availableByDay: { tomorrow: ['09:00 AM', '09:30 AM', '12:00 PM', '04:00 PM'] },
    },
    {
        id: 'mike',
        name: 'Mike',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
        availableByDay: { tomorrow: [] },
    },
    {
        id: 'carlos',
        name: 'Carlos',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        availableByDay: { tomorrow: ['11:00 AM', '11:30 AM', '01:00 PM', '01:30 PM', '05:00 PM'] },
    },
    {
        id: 'juan',
        name: 'Juan',
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
        availableByDay: { tomorrow: ['10:00 AM', '10:30 AM', '03:30 PM'] },
    },
    {
        id: 'luis',
        name: 'Luis',
        image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80',
        availableByDay: { tomorrow: ['12:30 PM', '02:00 PM', '04:30 PM'] },
    },
    {
        id: 'pablo',
        name: 'Pablo',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        availableByDay: { tomorrow: ['09:00 AM', '11:00 AM', '05:00 PM'] },
    },
    {
        id: 'dani',
        name: 'Dani',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
        availableByDay: { tomorrow: ['01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM'] },
    },
];

export default function BookingScheduleStep({
    selectedCut = defaultCut,
    onBack,
    onConfirm,
}: any) {
    const [selectedDay, setSelectedDay] = useState<string>(days[1].id); // Por defecto "Mañana" como en tu foto
    const [selectedBarber, setSelectedBarber] = useState<string>(barbers[0].id);
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [showCalendar, setShowCalendar] = useState(false);
    const router = useRouter();
    const selectedBarberData = useMemo(
        () => barbers.find((b) => b.id === selectedBarber) ?? barbers[0],
        [selectedBarber]
    );

    const activeDayLabel = useMemo(
        () => days.find((d) => d.id === selectedDay)?.full ?? 'Fecha seleccionada',
        [selectedDay]
    );

    const availableTimes = useMemo(() => {
        return selectedBarberData.availableByDay[selectedDay] || [];
    }, [selectedBarberData, selectedDay]);

    const hasAvailableHours = availableTimes.length > 0;

    useEffect(() => {
        if (!availableTimes.includes(selectedTime)) {
            setSelectedTime('');
        }
    }, [availableTimes, selectedTime]);

    const handleConfirm = () => {
        if (!selectedTime) return;
        onConfirm?.({
            barberId: selectedBarber,
            dayId: selectedDay,
            time: selectedTime,
        });// 3B. ¡Llevas al usuario a la página de éxito!
        router.push('/reservar/success');
    };

    // Generar días falsos para el calendario visual
    const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);

    return (
        <section className={`${inter.variable} ${marker.variable} relative min-h-[100dvh] bg-[#121212] text-white overflow-x-hidden`}>
            {/* Efectos de fondo */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,87,34,0.12),transparent_40%),linear-gradient(180deg,#0f0f0f_0%,#121212_100%)] pointer-events-none" />

            {/* Contenedor Principal: Ajustado el pb-[130px] para un leve scroll exacto */}
            <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-[430px] flex-col px-4 pt-2 ">

                {/* Navbar (Con mt-4 para bajar un poco la flecha y el logo) */}
                <div className="flex items-center justify-between mt-4 mb-6">
                    <button
                        onClick={onBack}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.04] text-white/80 transition hover:bg-white/10"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div className="mx-auto flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 backdrop-blur-md">
                        <Scissors className="h-3.5 w-3.5 text-[#FF5722]" />
                        <span className="text-xs font-semibold text-white/90">{selectedCut.name}</span>
                        <span className="text-white/30">•</span>
                        <span className="text-xs text-white/60">{selectedCut.duration}</span>
                        <span className="text-white/30">•</span>
                        <span className="text-xs font-semibold text-[#FF8A65]">${selectedCut.price}</span>
                    </div>
                    <div className="h-10 w-10" />
                </div>

                {/* Píldora del Servicio Elegido */}


                {/* 1. Selector de Día */}
                <div className="mb-8">
                    <div className="mb-3 flex items-center justify-between">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
                            1. Elige el día
                        </p>
                        <button
                            onClick={() => setShowCalendar(true)}
                            className="flex items-center gap-1.5 rounded-md border border-[#FF5722]/30 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-[#FF5722] transition-colors hover:bg-[#FF5722]/10"
                        >
                            <CalendarDays className="h-3 w-3" />
                            Ver calendario
                        </button>
                    </div>

                    <div className="-mx-1 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        <div className="flex min-w-max gap-2.5 px-1">
                            {days.map((day) => {
                                const active = selectedDay === day.id;
                                return (
                                    <button
                                        key={day.id}
                                        onClick={() => setSelectedDay(day.id)}
                                        className={`flex flex-col items-center justify-center min-w-[75px] rounded-2xl border py-3 transition-all ${active
                                            ? 'border-[#FF5722] bg-[#FF5722]/10 shadow-[0_0_15px_rgba(255,87,34,0.15)]'
                                            : 'border-white/5 bg-white/[0.02]'
                                            }`}
                                    >
                                        <span className={`text-[10px] uppercase tracking-wider ${active ? 'text-[#FF8A65]' : 'text-white/40'}`}>
                                            {day.short}
                                        </span>
                                        <span className={`mt-0.5 text-2xl font-bold ${active ? 'text-white' : 'text-white/60'}`}>
                                            {day.date}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* 2. Selector de Barberos (Grid de Avatares) */}
                <div className="mb-8">
                    <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
                        2. Elige tu barbero
                    </p>
                    <div className="grid grid-cols-4 gap-y-6 gap-x-2">
                        {barbers.map((barber) => {
                            const isSelected = selectedBarber === barber.id;
                            const hasSlots = (barber.availableByDay[selectedDay] || []).length > 0;

                            return (
                                <button
                                    key={barber.id}
                                    onClick={() => setSelectedBarber(barber.id)}
                                    className="flex flex-col items-center gap-2"
                                >
                                    <div className={`relative h-[4.5rem] w-[4.5rem] rounded-full p-1 transition-all duration-300 ${isSelected
                                        ? 'border-2 border-[#FF5722] scale-105 shadow-[0_0_20px_rgba(255,87,34,0.2)]'
                                        : 'border-2 border-transparent hover:border-white/10'
                                        }`}>
                                        <img
                                            src={barber.image}
                                            alt={barber.name}
                                            className={`h-full w-full rounded-full object-cover transition-all ${isSelected ? 'opacity-100' : 'opacity-60 grayscale-[50%]'
                                                }`}
                                        />
                                        {!hasSlots && !isSelected && (
                                            <div className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-[3px] border-[#121212] bg-[#333]" />
                                        )}
                                    </div>
                                    <span className={`text-xs ${isSelected ? 'font-bold text-white' : 'text-white/50'}`}>
                                        {barber.name}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 3. Panel de Horas Horizontal */}
                <div>
                    <div className="mb-4 flex items-center justify-between uppercase tracking-[0.1em]">
                        <p className={`text-[11px] font-bold ${hasAvailableHours ? 'text-white/40' : 'text-white/40'}`}>
                            {hasAvailableHours ? 'Horarios disponibles' : 'No queda más horario disponible'}
                        </p>
                        <p className="text-[11px] font-semibold text-[#FF8A65]">
                            con {selectedBarberData.name}
                        </p>
                    </div>

                    {/* Contenedor de scroll fino naranja */}
                    <div className="overflow-x-auto pb-5 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#FF5722]">
                        <div className="grid grid-rows-2 grid-flow-col auto-cols-[110px] gap-2.5">
                            {/* PASO 1: Filtramos para dejar SOLO las horas disponibles */}
                            {ALL_TIMES.filter(time => availableTimes.includes(time)).map((time) => {
                                const isSelected = selectedTime === time;

                                return (
                                    <button
                                        key={time}
                                        onClick={() => setSelectedTime(time)}
                                        className={`flex h-12 items-center justify-center rounded-[14px] border text-[12px] font-semibold transition-all duration-200 ${isSelected
                                            ? 'border-[#FF5722] bg-[#FF5722] text-black shadow-[0_0_15px_rgba(255,87,34,0.3)]'
                                            : 'border-white/15 bg-white/[0.04] text-white/80 hover:border-[#FF5722]/50 hover:bg-[#FF5722]/10'
                                            }`}
                                    >
                                        {time}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Sticky Footer Confirmación */}
                <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 bg-gradient-to-t from-[#121212] via-[#121212]/95 to-transparent px-4 pb-1">
                    <div className="pointer-events-auto mx-auto w-full max-w-[430px] rounded-[24px] border border-white/10 bg-[#171717]/95 p-3 shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl">
                        <div className="mb-3 flex items-center justify-between px-2 pt-1">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Resumen</p>
                                <p className="mt-1 text-[15px] font-bold text-white">
                                    {selectedBarberData.name} · {activeDayLabel}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-bold text-white">${selectedCut.price}</p>
                                <p className="flex items-center justify-end gap-1.5 text-[11px] font-medium text-[#FF8A65]">
                                    <Clock3 className="h-3.5 w-3.5" />
                                    {selectedTime || 'Sin horario'}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={handleConfirm}
                            disabled={!selectedTime}
                            className="w-full rounded-[18px] bg-[#FF5722] py-4 text-[15px] font-bold text-[#121212] transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:bg-white/5 disabled:text-white/30"
                        >
                            Confirmar Reserva
                        </button>
                    </div>
                </div>

            </div>

            {/* Modal Calendario */}
            <AnimatePresence>
                {showCalendar && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowCalendar(false)}
                            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-[430px] rounded-t-[32px] border-t border-white/10 bg-[#151515] p-6 shadow-2xl"
                        >
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-lg font-bold text-white">Selecciona fecha</h3>
                                <button
                                    onClick={() => setShowCalendar(false)}
                                    className="rounded-full bg-white/5 p-2 text-white/60 hover:bg-white/10 hover:text-white"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="mb-4 flex items-center justify-between px-2">
                                <button className="text-white/50 hover:text-white">
                                    <ChevronLeft className="h-5 w-5" />
                                </button>
                                <p className="font-semibold text-white">Noviembre 2024</p>
                                <button className="text-white/50 hover:text-white">
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-7 gap-y-3 mb-4">
                                {['LU', 'MA', 'MI', 'JU', 'VI', 'SA', 'DO'].map(d => (
                                    <div key={d} className="text-center text-[10px] font-bold text-white/30">
                                        {d}
                                    </div>
                                ))}
                                {/* Espacios vacíos para iniciar el mes */}
                                <div /> <div /> <div />
                                {calendarDays.map((num) => {
                                    const isToday = num === 12;
                                    const isSelected = num === 13;
                                    return (
                                        <button
                                            key={num}
                                            onClick={() => setShowCalendar(false)}
                                            className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-all ${isSelected
                                                ? 'bg-[#FF5722] text-black shadow-lg'
                                                : isToday
                                                    ? 'border border-[#FF5722] text-[#FF5722]'
                                                    : 'text-white/80 hover:bg-white/10'
                                                }`}
                                        >
                                            {num}
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}