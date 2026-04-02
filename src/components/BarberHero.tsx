'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  Scissors,
  Sparkles,
  Star,
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

const cuts = [
  { label: 'Fade', price: '$25', active: true },
  { label: 'Taper', price: '$30', active: false },
  { label: 'Crop', price: '$28', active: false },
];

const availabilityDays = [
  { day: 'HOY', date: '12', slots: 3, active: true },
  { day: 'MAÑ', date: '13', slots: 5, active: false },
  { day: 'JUE', date: '14', slots: 2, active: false },
  { day: 'VIE', date: '15', slots: 4, active: false },
];

const barbers = [
  {
    name: 'Alex',
    specialty: 'Fade / Beard',
    free: '3 libres',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
    intensity: [4, 3, 1, 2, 4],
  },
  {
    name: 'David',
    specialty: 'Clásicos / Modernos',
    free: '5 libres',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80',
    intensity: [4, 2, 1, 4, 2],
  },
  {
    name: 'Mike',
    specialty: 'Texture / Crop',
    free: '2 libres',
    image:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80',
    intensity: [1, 3, 2, 1, 4],
  },
];

export default function BarberHero() {
  return (
    <section
      className={`${inter.variable} ${marker.variable} relative isolate overflow-hidden bg-[#121212] text-white`}
    >
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1600&q=80"
          alt="Interior de barbería urbana"
          fill
          priority
          className="object-cover opacity-[0.18]"
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(9,9,9,0.86) 0%, rgba(12,12,12,0.78) 28%, rgba(18,18,18,0.94) 100%), radial-gradient(circle at 18% 22%, rgba(255,87,34,0.22), transparent 24%), radial-gradient(circle at 84% 18%, rgba(255,87,34,0.10), transparent 22%), radial-gradient(circle at 50% 78%, rgba(255,87,34,0.07), transparent 28%)',
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          mixBlendMode: 'screen',
        }}
      />

      <div className="absolute left-[-120px] top-20 h-80 w-80 rounded-full bg-[#FF5722]/20 blur-3xl" />
      <div className="absolute bottom-[-80px] right-[-100px] h-96 w-96 rounded-full bg-[#FF5722]/12 blur-3xl" />
      <div className="absolute left-1/2 top-0 h-56 w-[45rem] -translate-x-1/2 bg-[radial-gradient(circle,rgba(255,87,34,0.18),transparent_62%)] blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.45 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 backdrop-blur-md"
            >
              <span className="h-2 w-2 rounded-full bg-[#FF5722] shadow-[0_0_18px_rgba(255,87,34,1)]" />
              <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/76">
                Underground Grooming Club
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.48 }}
              className="mb-5 flex items-center gap-3"
            >
              <div className="rounded-2xl border border-[#FF5722]/30 bg-[#1A1A1A]/90 p-3 shadow-[0_0_35px_rgba(255,87,34,0.16)] backdrop-blur-md">
                <Scissors className="h-6 w-6 text-[#FF5722]" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.34em] text-white/40">Barbería</p>
                <div className="font-[family-name:var(--font-marker)] text-3xl leading-none text-[#FF5722]">
                  Moderna
                </div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.55 }}
              className="max-w-[12ch] font-[family-name:var(--font-marker)] text-[3.1rem] uppercase leading-[0.9] text-white sm:text-[4.5rem] lg:text-[5.4rem]"
            >
              El corte que
              <span className="mt-2 block text-[#FF5722] drop-shadow-[0_0_24px_rgba(255,87,34,0.28)]">
                prende tu flow
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.55 }}
              className="mt-6 max-w-xl text-[15px] leading-7 text-white/72 sm:text-[17px]"
            >
              Reserva en segundos, descubre a tu barbero ideal y entra en una experiencia urbana premium con estética oscura, energía neón y disponibilidad en tiempo real.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.55 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/reservar/corte"
                className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#FF5722] px-6 text-base font-semibold text-black shadow-[0_18px_45px_rgba(255,87,34,0.34)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(255,87,34,0.42)]"
              >
                Reservar ahora
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/cortes"
                className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] px-6 text-base font-medium text-white/88 backdrop-blur-md transition-all duration-300 hover:border-[#FF5722]/35 hover:bg-white/[0.06]"
              >
                Ver estilos
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.34, duration: 0.58 }}
              className="mt-10 grid gap-3 sm:grid-cols-3"
            >
              {[
                { icon: Clock3, label: 'Reserva en', value: '60 seg' },
                { icon: Star, label: 'Reviews', value: '4.9/5' },
                { icon: MapPin, label: 'Ubicación', value: 'Downtown' },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-[22px] border border-white/10 bg-white/[0.045] px-4 py-4 backdrop-blur-md"
                >
                  <Icon className="mb-3 h-5 w-5 text-[#FF5722]" />
                  <p className="text-[11px] uppercase tracking-[0.24em] text-white/40">{label}</p>
                  <p className="mt-1 text-lg font-semibold text-white">{value}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.16, duration: 0.65 }}
            className="relative mx-auto w-full max-w-[430px] lg:max-w-[470px]"
          >
            <div className="absolute inset-0 rounded-[36px] bg-[#FF5722]/12 blur-3xl" />
            <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(26,26,26,0.96),rgba(16,16,16,0.98))] p-4 shadow-[0_30px_110px_rgba(0,0,0,0.48)] backdrop-blur-xl sm:p-5">
              <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#FF5722]/70 to-transparent" />

              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-white/38">Live booking</p>
                  <h2 className="font-[family-name:var(--font-marker)] text-[2rem] leading-none text-white sm:text-[2.2rem]">
                    Pick your spot
                  </h2>
                </div>
                <div className="rounded-full border border-[#FF5722]/28 bg-[#FF5722]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FF8A65]">
                  Open late
                </div>
              </div>

              <div className="rounded-[28px] border border-white/8 bg-[#141414] p-3 shadow-lg">
                <div className="relative overflow-hidden rounded-[24px] border border-[#FF5722]/40 bg-[#0f0f0f]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(circle_at_bottom,rgba(255,87,34,0.18),transparent_70%)]" />
                  <Image
                    src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1000&q=80"
                    alt="Cliente con corte fade"
                    width={1000}
                    height={1200}
                    className="h-[330px] w-full object-cover sm:h-[380px]"
                    priority
                  />

                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="mb-3 flex items-end justify-between gap-3">
                      <div>
                        <p className="font-[family-name:var(--font-marker)] text-[2.2rem] leading-none text-white sm:text-[2.5rem]">
                          Fade
                        </p>
                        <p className="mt-1 text-sm text-white/70">Degradado limpio con acabado urbano</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/35 px-3 py-2 text-right backdrop-blur-md">
                        <p className="text-xl font-semibold text-white">$25</p>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-white/48">30 min</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {cuts.map((cut) => (
                        <button
                          key={cut.label}
                          type="button"
                          className={`rounded-full border px-3 py-2 text-xs font-medium transition ${cut.active
                            ? 'border-[#FF5722] bg-[#FF5722]/14 text-white shadow-[0_0_18px_rgba(255,87,34,0.22)]'
                            : 'border-white/10 bg-black/25 text-white/68'
                            }`}
                        >
                          {cut.label} <span className="text-white/42">{cut.price}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-4">
                  <div className="rounded-[24px] border border-white/8 bg-[#111111] p-3">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-[#FF5722]" />
                        <p className="text-[11px] uppercase tracking-[0.22em] text-white/44">Disponibilidad</p>
                      </div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FF8A65]">
                        Tiempo real
                      </p>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {availabilityDays.map((item) => (
                        <button
                          key={item.day}
                          type="button"
                          className={`rounded-[20px] border px-2 py-3 text-center transition ${item.active
                            ? 'border-[#FF5722] bg-[#FF5722]/10 shadow-[0_0_18px_rgba(255,87,34,0.18)]'
                            : 'border-white/8 bg-white/[0.02]'
                            }`}
                        >
                          <p
                            className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${item.active ? 'text-[#FF8A65]' : 'text-white/42'
                              }`}
                          >
                            {item.day}
                          </p>
                          <p className="mt-0.5 text-xl font-semibold text-white">{item.date}</p>
                          <p className="mt-1 text-xs text-white/55">{item.slots} libres</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-[#FF5722]/22 bg-[linear-gradient(180deg,rgba(255,87,34,0.10),rgba(255,87,34,0.03))] p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-2xl bg-[#FF5722] p-2 text-black shadow-[0_0_18px_rgba(255,87,34,0.25)]">
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-[family-name:var(--font-marker)] text-xl leading-none text-[#FF8A65]">
                          Más rápido disponible
                        </p>
                        <p className="mt-2 text-sm text-white/82">Hoy a las 10:30 AM con Alex</p>
                        <p className="mt-1 text-sm text-white/55">También: 11:00 AM con David</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-2xl bg-[#FF5722] px-4 text-sm font-semibold text-black transition hover:brightness-105"
                    >
                      Reservar el primero libre
                    </button>
                  </div>

                  <div className="space-y-3">
                    {barbers.map((barber, index) => (
                      <motion.div
                        key={barber.name}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.34 + index * 0.08, duration: 0.4 }}
                        className={`rounded-[24px] border p-3 ${index === 0
                          ? 'border-[#FF5722]/45 bg-[#171717] shadow-[0_0_26px_rgba(255,87,34,0.12)]'
                          : 'border-white/8 bg-[#141414]'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/10 bg-white/5">
                            <Image src={barber.image} alt={barber.name} fill className="object-cover" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <p className="font-[family-name:var(--font-marker)] text-[1.35rem] leading-none text-white">
                                  {barber.name}
                                </p>
                                <p className="mt-1 text-sm text-white/58">{barber.specialty}</p>
                              </div>
                              <div className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-xs font-semibold text-[#FF8A65]">
                                {barber.free}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center gap-2">
                          {['HOY', 'MAÑ', 'JUE', 'VIE', 'SÁB'].map((day, dayIndex) => (
                            <div key={day} className="flex-1 rounded-2xl bg-white/[0.03] px-1 py-2 text-center">
                              <p className="text-[10px] uppercase tracking-[0.16em] text-white/35">{day}</p>
                              <div className="mt-1 flex items-center justify-center gap-1">
                                {Array.from({ length: 4 }).map((_, dotIndex) => (
                                  <span
                                    key={dotIndex}
                                    className={`h-1.5 w-1.5 rounded-full ${dotIndex < barber.intensity[dayIndex] ? 'bg-[#FF5722]' : 'bg-white/12'
                                      }`}
                                  />
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
