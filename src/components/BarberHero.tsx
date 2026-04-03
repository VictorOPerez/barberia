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
    // Contenedor principal con h-screen y overflow-hidden
    <section className={`${inter.variable} ${marker.variable} relative  min-h-[100dvh] w-full overflow-hidden bg-[#121212] text-white flex flex-col`}>

      {/* 1. SECCIÓN VIDEO: Cambiamos shrink-0 por una altura definida */}
      <div className="relative w-full h-[35dvh] sm:h-[75vh] overflow-hidden leading-[0] shrink-0 z-0">
        <video
          src="/hero/logo.mp4"
          autoPlay loop muted playsInline
          // Cambiamos max-h por h-full para que obligatoriamente llene su contenedor
          className="w-full h-full object-cover block"
        />
        {/* Degradado para fusionar */}

      </div>
      {/* 2. SECCIÓN CONTENIDO PRINCIPAL Y CAPA DE EFECTOS */}
      <div className="relative flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        {/* ============================================================================================= */}
        {/* CAPA DE EFECTOS COMPUESTA (Imagen de fondo + Gradiente + Blurs Naranjas por encima) */}
        {/* ============================================================================================= */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Foto base más controlada */}
          <div className="absolute inset-0 z-0 opacity-[0.35]">
            <Image
              src="/hero/hero-recorte.png"
              alt="Textura de fondo barbería"
              fill
              priority
              className="object-cover object-center scale-[1.02]"
            />
          </div>

          {/* Oscurecimiento principal: más editorial, menos sucio */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(180deg, rgba(18,18,18,0.00) 0%, rgba(18,18,18,0.38) 18%, rgba(18,18,18,0.82) 58%, rgba(18,18,18,0.96) 100%)",
            }}
          />

          {/* Capa lateral para dar legibilidad al texto sin embarrar toda la imagen */}
          <div
            className="absolute inset-0 z-[11]"
            style={{
              background:
                "linear-gradient(90deg, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0.46) 28%, rgba(10,10,10,0.14) 52%, rgba(10,10,10,0.0) 78%)",
            }}
          />

          {/* Fusión superior con el video/logo */}
          <div
            className="absolute top-0 left-0 right-0 h-24 z-[12]"
            style={{
              background:
                "linear-gradient(180deg, rgba(18,18,18,0.55) 0%, rgba(18,18,18,0.12) 55%, rgba(18,18,18,0) 100%)",
            }}
          />

          {/* Fusión inferior elegante */}
          <div
            className="absolute bottom-0 left-0 right-0 h-28 z-[12]"
            style={{
              background:
                "linear-gradient(180deg, rgba(18,18,18,0) 0%, rgba(18,18,18,0.82) 100%)",
            }}
          />

          {/* Acento naranja fino, no nube naranja */}
          <div
            className="absolute left-0 top-[22%] h-[42%] w-[180px] z-[13]"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,106,42,0.14) 0%, rgba(255,106,42,0.06) 35%, rgba(255,106,42,0.00) 100%)",
              filter: "blur(22px)",
            }}
          />

          {/* Vignette suave para lujo */}
          <div
            className="absolute inset-0 z-[14]"
            style={{
              boxShadow: "inset 0 0 120px rgba(0,0,0,0.28)",
            }}
          />
        </div>
        {/* ============================================================================================= */}


        {/* 3. CONTENIDO TEXTUAL: Con z-10 para estar por encima de toda la capa de efectos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }} // Pequeño delay para que cargue la imagen de fondo
          className="relative z-10 w-full"
        >
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#FF5722] shadow-[0_0_10px_rgba(255,87,34,1)]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/70">
              Underground Grooming Club
            </span>
          </div>

          {/* Logo / Título */}
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2 backdrop-blur-md">
              <Scissors className="h-5 w-5 text-[#FF6A2A]" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Barbería</p>
              <div className="font-[family-name:var(--font-marker)] text-2xl text-[#FF5722]">Moderna</div>
            </div>
          </div>

          <h1 className="font-[family-name:var(--font-marker)] text-[2.8rem] leading-[1] uppercase text-white sm:text-[4rem] lg:text-[5rem]">
            El corte que <br />
            <span className="text-[#FF5722] drop-shadow-[0_0_15px_rgba(255,87,34,0.3)]">
              prende tu flow
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-white/60 text-sm sm:text-base">
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
    </section>
  );
}