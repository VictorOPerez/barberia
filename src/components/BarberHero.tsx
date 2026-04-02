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
    <section className={`${inter.variable} ${marker.variable} relative h-screen w-full overflow-hidden bg-[#121212] text-white flex flex-col`}>

      {/* 1. SECCIÓN VIDEO: Cambiamos shrink-0 por una altura definida */}
      <div className="relative w-full h-[43vh] sm:h-[75vh] overflow-hidden leading-[0] shrink-0 z-0">
        <video
          src="/hero/logo.mp4"
          autoPlay loop muted playsInline
          // Cambiamos max-h por h-full para que obligatoriamente llene su contenedor
          className="w-full h-full object-cover block"
        />
        {/* Degradado para fusionar */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#121212] via-[#121212]/50 to-transparent" />
      </div>

      {/* 2. SECCIÓN CONTENIDO PRINCIPAL Y CAPA DE EFECTOS */}
      <div className="relative flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">

        {/* ============================================================================================= */}
        {/* CAPA DE EFECTOS COMPUESTA (Imagen de fondo + Gradiente + Blurs Naranjas por encima) */}
        {/* ============================================================================================= */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">

          {/* A. La Imagen de Recorte: Ahora es la base de esta capa */}
          {/* fill asegura que ocupe todo el espacio. Controlamos opacidad aquí con opacity-20 */}
          <div className="absolute inset-0 z-0 opacity-20">
            <Image
              src="/hero/hero-recorte.png"
              alt="Textura de fondo barbería"
              fill
              priority
              className="object-cover object-center"
            />
          </div>

          {/* B. Gradiente de superposición: Para oscurecer la imagen y fusionar */}
          <div
            className="absolute inset-0 z-10 opacity-60"
            style={{
              backgroundImage: 'linear-gradient(180deg, rgba(18,18,18,0) 0%, rgba(18,18,18,1) 100%)',
            }}
          />

          {/* C. Los Blurs Naranjas: Con z-20 para estar por encima de la imagen y el gradiente */}
          <div className="absolute left-[-120px] top-10 h-80 w-80 rounded-full bg-[#FF5722]/25 blur-3xl z-20" />
          <div className="absolute bottom-[-50px] right-[-100px] h-96 w-96 rounded-full bg-[#FF5722]/15 blur-3xl z-20" />

          {/* Opcional: Un destello sutil radial en el centro para dar más profundidad sobre la imagen */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,87,34,0.08),transparent_70%)] z-15" />
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
            <div className="rounded-xl border border-[#FF5722]/30 bg-[#1A1A1A] p-2">
              <Scissors className="h-5 w-5 text-[#FF5722]" />
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