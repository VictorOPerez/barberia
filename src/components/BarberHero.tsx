'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Scissors } from 'lucide-react';
import { Inter, Permanent_Marker } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const marker = Permanent_Marker({ weight: '400', subsets: ['latin'], variable: '--font-marker' });

export default function BarberHero() {
  return (
    <section className={`${inter.variable} ${marker.variable} relative min-h-[100dvh] w-full overflow-hidden bg-[#121212] text-white lg:px-6 lg:pt-24 lg:pb-10`}>
      <div className="lg:hidden">
        <div className="relative h-[35dvh] w-full overflow-hidden leading-[0] sm:h-[75vh]">
          <video
            src="/hero/logo.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="block h-full w-full object-cover"
          />
        </div>

        <div className="relative mx-auto flex w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute inset-0 z-0 opacity-[0.35]">
              <Image
                src="/hero/hero-recorte.png"
                alt="Textura de fondo barbería"
                fill
                priority
                className="object-cover object-center scale-[1.02]"
              />
            </div>

            <div
              className="absolute inset-0 z-10"
              style={{
                background:
                  'linear-gradient(180deg, rgba(18,18,18,0.00) 0%, rgba(18,18,18,0.38) 18%, rgba(18,18,18,0.82) 58%, rgba(18,18,18,0.96) 100%)',
              }}
            />

            <div
              className="absolute inset-0 z-[11]"
              style={{
                background:
                  'linear-gradient(90deg, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0.46) 28%, rgba(10,10,10,0.14) 52%, rgba(10,10,10,0.0) 78%)',
              }}
            />

            <div
              className="absolute top-0 left-0 right-0 h-24 z-[12]"
              style={{
                background:
                  'linear-gradient(180deg, rgba(18,18,18,0.55) 0%, rgba(18,18,18,0.12) 55%, rgba(18,18,18,0) 100%)',
              }}
            />

            <div
              className="absolute bottom-0 left-0 right-0 h-28 z-[12]"
              style={{
                background:
                  'linear-gradient(180deg, rgba(18,18,18,0) 0%, rgba(18,18,18,0.82) 100%)',
              }}
            />

            <div
              className="absolute left-0 top-[22%] z-[13] h-[42%] w-[180px]"
              style={{
                background:
                  'linear-gradient(90deg, rgba(255,106,42,0.14) 0%, rgba(255,106,42,0.06) 35%, rgba(255,106,42,0.00) 100%)',
                filter: 'blur(22px)',
              }}
            />

            <div
              className="absolute inset-0 z-[14]"
              style={{
                boxShadow: 'inset 0 0 120px rgba(0,0,0,0.28)',
              }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="relative z-10 w-full py-10"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#FF5722] shadow-[0_0_10px_rgba(255,87,34,1)]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/70">
                Underground Grooming Club
              </span>
            </div>

            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2 backdrop-blur-md">
                <Scissors className="h-5 w-5 text-[#FF6A2A]" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Barbería</p>
                <div className="font-[family-name:var(--font-marker)] text-2xl text-[#FF5722]">Moderna</div>
              </div>
            </div>

            <h1 className="font-[family-name:var(--font-marker)] text-[2.8rem] leading-[1] uppercase text-white sm:text-[4rem]">
              El corte que <br />
              <span className="text-[#FF5722] drop-shadow-[0_0_15px_rgba(255,87,34,0.3)]">
                prende tu flow
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-sm text-white/60 sm:text-base">
              Reserva en segundos y entra en una experiencia urbana premium con energía neón y disponibilidad real.
            </p>

            <div className="mt-8">
              <Link
                href="/reservar/corte"
                className="group inline-flex items-center gap-3 rounded-2xl bg-[#FF5722] px-8 py-4 text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,87,34,0.4)]"
              >
                RESERVAR AHORA
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="hidden lg:mx-auto lg:block lg:w-full lg:max-w-[1180px]">
        <div className="grid min-h-[760px] grid-cols-[360px_minmax(0,1fr)] gap-10 rounded-[38px] border border-white/[0.06] bg-[#0b0b0b] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.34)]">
          <div className="flex flex-col justify-start gap-5">
            <div className="relative h-[430px] overflow-hidden rounded-[30px] border border-white/[0.06] bg-black">
              <video
                src="/hero/logo.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full bg-black object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/20" />
              <div className="absolute inset-0 border border-white/[0.04]" />
            </div>

            <div className="rounded-[28px] border border-white/[0.06] bg-[#111111] p-6">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-[#FF5722] shadow-[0_0_10px_rgba(255,87,34,1)]" />
                <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/68">
                  Underground Grooming Club
                </span>
              </div>

              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-md">
                  <Scissors className="h-5 w-5 text-[#FF6A2A]" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/38">Barbería</p>
                  <div className="font-[family-name:var(--font-marker)] text-[2.1rem] leading-none text-[#FF5722]">Moderna</div>
                </div>
              </div>

              <p className={`${inter.className} text-sm leading-6 text-white/56`}>
                Cortes precisos, ambiente oscuro y una experiencia pensada para que el cliente entre normal y salga con presencia.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[32px] border border-white/[0.05] px-10 py-12">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute inset-0 opacity-[0.35]">
                <Image
                  src="/hero/hero-recorte.png"
                  alt="Textura de fondo barbería"
                  fill
                  priority
                  className="object-cover object-[center_22%]"
                />
              </div>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(10,10,10,0.94) 0%, rgba(10,10,10,0.78) 38%, rgba(10,10,10,0.56) 100%)',
                }}
              />
              <div
                className="absolute left-0 top-[18%] h-[48%] w-[240px]"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(255,106,42,0.16) 0%, rgba(255,106,42,0.06) 45%, rgba(255,106,42,0.00) 100%)',
                  filter: 'blur(26px)',
                }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="relative z-10 flex min-h-[620px] flex-col justify-between"
            >
              <div>
                <h1 className="font-[family-name:var(--font-marker)] text-[5.2rem] leading-[0.94] uppercase text-white xl:text-[5.8rem]">
                  El corte que <br />
                  <span className="text-[#FF5722] drop-shadow-[0_0_15px_rgba(255,87,34,0.3)]">
                    prende tu flow
                  </span>
                </h1>

                <p className="mt-7 max-w-[560px] text-[1.02rem] leading-7 text-white/60">
                  Reserva en segundos y entra en una experiencia urbana premium con energía neón y disponibilidad real.
                </p>

                <div className="mt-9">
                  <Link
                    href="/reservar/corte"
                    className="group inline-flex items-center gap-3 rounded-2xl bg-[#FF5722] px-10 py-4 text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,87,34,0.4)]"
                  >
                    RESERVAR AHORA
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              <div className="grid max-w-[420px] grid-cols-2 gap-4">
                <div className="rounded-[24px] border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-md">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/30">Walk-ins</p>
                  <p className="mt-2 font-[family-name:var(--font-marker)] text-[2rem] leading-none text-[#FF5722]">Fresh</p>
                </div>
                <div className="rounded-[24px] border border-[#FF5722]/15 bg-[#120c09] p-5">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/30">Booking</p>
                  <p className="mt-2 font-[family-name:var(--font-marker)] text-[2rem] leading-none text-white">Fast</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
