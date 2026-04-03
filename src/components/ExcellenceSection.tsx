'use client';

import React from 'react';

export default function ExcellenceSection() {
    return (
        <section className="relative w-full bg-[#0a0a0a] py-24 px-6 overflow-hidden flex flex-col items-center">
            {/* Luz de fondo ambiental (Opcional, para dar atmósfera a la sección) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-[#ff5500]/5 blur-[120px] pointer-events-none" />

            <div className="max-w-5xl w-full z-10 text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                    Excelencia en <span className="text-[#ff5500] drop-shadow-[0_0_15px_rgba(255,85,0,0.5)]">Cada Detalle</span>
                </h2>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                    Nuestro estándar es la perfección. Desde los productos premium que aplicamos hasta el último retoque de la navaja. Nuestros barberos están en constante evolución.
                </p>
            </div>

            {/* Grid de 3 Columnas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl w-full mb-20 relative">
                {features.map((feature, index) => (
                    <div key={index} className="flex flex-col items-center text-center group">
                        {/* Contenedor del Icono con efecto de Humo/Neón */}
                        <div className="relative mb-6 flex justify-center items-center w-24 h-24">
                            {/* Efecto de humo/resplandor animado */}
                            <div className="absolute inset-0 bg-[#ff5500]/20 rounded-full blur-[20px] group-hover:bg-[#ff5500]/40 group-hover:blur-[25px] transition-all duration-700 animate-pulse" />

                            {/* Icono central */}
                            <div className="relative z-10 text-gray-300 group-hover:text-[#ff5500] group-hover:drop-shadow-[0_0_10px_rgba(255,85,0,0.8)] transition-all duration-300">
                                {feature.icon}
                            </div>
                        </div>

                        {/* Texto */}
                        <h3 className="text-2xl font-bold text-white mb-3 font-mono tracking-wide uppercase">
                            {feature.title}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-[250px]">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>

            {/* Badge: Sello de Cera Neón */}
            <div className="relative inline-flex items-center justify-center p-1 rounded-full bg-gradient-to-r from-transparent via-[#ff5500]/30 to-transparent">
                <div className="px-8 py-3 rounded-full bg-[#111] border border-[#ff5500]/50 shadow-[0_0_20px_rgba(255,85,0,0.3)] relative overflow-hidden group hover:shadow-[0_0_30px_rgba(255,85,0,0.6)] transition-shadow duration-300 cursor-default">
                    {/* Brillo interno */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ff5500] to-transparent opacity-50" />

                    <span className="relative text-[#ff5500] font-semibold tracking-widest text-sm uppercase drop-shadow-[0_0_5px_rgba(255,85,0,0.8)]">
                        Calidad sin compromisos
                    </span>
                </div>
            </div>
        </section>
    );
}

// --- DATOS E ICONOS ---

const features = [
    {
        title: "Perfección",
        description: "Dominio absoluto de la técnica. Cortes ejecutados con precisión milimétrica para un acabado impecable.",
        icon: (
            // Icono de Navaja Estilizada
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 14L20 4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2L4 20" />
                <circle cx="6" cy="18" r="2" />
                <path d="M14 8l-4 8" />
            </svg>
        ),
    },
    {
        title: "Premium",
        description: "Selección rigurosa de las mejores pomadas, aceites y tónicos para cuidar tu cabello y barba.",
        icon: (
            // Icono de Frasco de Pomada Vintage
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 8h14v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8z" />
                <path d="M7 6v2" />
                <path d="M17 6v2" />
                <path d="M4 12v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" />
                <rect x="9" y="14" width="6" height="4" rx="1" />
            </svg>
        ),
    },
    {
        title: "Evolución",
        description: "Siempre un paso adelante. Fusionamos las técnicas de la vieja escuela con las últimas tendencias urbanas.",
        icon: (
            // Icono de Reloj de Arena / Evolución
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 3h12" />
                <path d="M6 21h12" />
                <path d="M10 16a2 2 0 0 0 4 0" />
                <path d="M8 3v4.5a4.5 4.5 0 0 0 1.318 3.182L12 13l2.682-2.318A4.5 4.5 0 0 0 16 7.5V3" />
                <path d="M8 21v-4.5a4.5 4.5 0 0 1 1.318-3.182L12 11l2.682 2.318A4.5 4.5 0 0 1 16 16.5V21" />
            </svg>
        ),
    }
];