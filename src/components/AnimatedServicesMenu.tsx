'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIframeMode } from '@/hooks/useIframeMode';

// --- TIPOS Y DATOS ---
type Haircut = {
    id: string;
    name: string;
    description: string;
    duration: string;
    price: number;
    image: string;
};

type Category = {
    id: string;
    name: string;
    items: Haircut[];
};

// Categorizando tus cortes según la estructura clásica de barbería
const categories: Category[] = [
    {
        id: 'classic',
        name: 'CLÁSICOS',
        items: [
            { id: 'gorilla-classic', name: 'Gorilla Classic', description: 'Nuestro corte más popular. Incluye consulta personal y precisión en cualquier estilo.', duration: '30 min', price: 35, image: '/recortes/gorilla-classic.png' },
            { id: 'gorilla-buzz', name: 'Gorilla Buzz', description: 'Estilo perfecto de bajo mantenimiento. Mismo nivel de máquina con ejecución precisa.', duration: '30 min', price: 28, image: '/recortes/gorilla-buzz.png' },
            { id: 'gorilla-og-cut', name: 'Gorilla OG Cut', description: 'Especialidad para adultos mayores (65+). Masaje capilar relajante y estilo clásico.', duration: '30 min', price: 30, image: '/recortes/gorilla-og-cut.png' },
            { id: 'young-warrior', name: 'Young Warrior', description: 'Estilos enfocados en adolescentes (12-15 años). Diseños personalizados y modernos.', duration: '30 min', price: 30, image: '/recortes/young-warrior.png' },
            { id: 'queens-neckline', name: "Queen's Neckline", description: 'Estilizado de precisión para mujeres. Degradado en la nuca y diseño personalizado.', duration: '25 min', price: 28, image: '/recortes/queens-neckline.png' },
        ]
    },
    {
        id: 'premium',
        name: 'PREMIUM',
        items: [
            { id: 'gorilla-master-combo', name: 'Gorilla Master Combo', description: 'Paquete ejecutivo completo: corte de cabello, esculpido total de barba y toalla caliente.', duration: '45 min', price: 55, image: '/recortes/gorilla-master-combo.png' },
            { id: 'beast-mode-complete', name: 'Beast Mode Complete', description: 'La experiencia definitiva. Corte completo, esculpido de barba y diseño de cejas.', duration: '65 min', price: 70, image: '/recortes/beast-mode-complete.png' },
            { id: 'gorilla-smooth-dome', name: 'Gorilla Smooth Dome', description: 'Afeitado de cabeza con toalla caliente. Preparación premium y precisión con navaja libre.', duration: '30 min', price: 35, image: '/recortes/gorilla-smooth-dome.png' },
            { id: 'silverback-blend', name: 'Silverback Blend', description: 'Tratamiento de difuminado de canas. Color profesional, lavado y acondicionamiento.', duration: '30 min', price: 45, image: '/recortes/silverback-blend.png' },
        ]
    },
    {
        id: 'beard',
        name: 'BARBA Y ROSTRO',
        items: [
            { id: 'beast-mode-beard', name: 'Beast Mode Beard', description: 'Esculpido completo de barba, recorte de precisión, estilo y tratamiento con toalla caliente.', duration: '30 min', price: 35, image: '/recortes/beast-mode-beard.png' },
            { id: 'lite-beast-mode-beard', name: '-LITE- Beast Mode Beard', description: 'Alineación precisa de barba y personalización de estilo.', duration: '20 min', price: 25, image: '/recortes/lite-beast-mode-beard.png' },
            { id: 'gorilla-restart', name: 'Gorilla Restart', description: 'Alineación de cabello y limpieza de barba con toalla caliente (no incluye corte).', duration: '30 min', price: 40, image: '/recortes/gorilla-restart.png' },
            { id: 'smooth-gorilla-face', name: 'Smooth Gorilla Face', description: 'Afeitado completo de rostro con navaja y tratamiento facial de preparación.', duration: '30 min', price: 35, image: '/recortes/smooth-gorilla-face.png' },
        ]
    }
];

// Corrección de TypeScript: Añadido "as const" para asegurar los tipos de Framer Motion
const springTransition = {
    type: 'spring' as const,
    stiffness: 80,
    damping: 12,
    mass: 1,
};

export default function AnimatedServicesMenu() {
    const isIframe = useIframeMode();
    const [activeIndex, setActiveIndex] = useState(0); // Empezamos en 'CLÁSICOS'
    const [activeItemIndex, setActiveItemIndex] = useState(0); // Controla qué ítem se muestra en el detalle inferior

    const activeCategory = categories[activeIndex];
    const activeItemDetail = activeCategory.items[activeItemIndex];

    // Resetear el ítem activo cuando se cambia de categoría
    const handleCategoryChange = (index: number) => {
        setActiveIndex(index);
        setActiveItemIndex(0);
    };

    return (
        <section className={`relative w-full ${isIframe ? 'h-[812px]' : 'h-screen'} bg-[#111] overflow-hidden text-white font-sans flex flex-col py-10`}>

            {/* Fondo decorativo opcional */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] z-0" />

            <div className="relative z-10 flex flex-col h-full">

                {/* ENCABEZADO DE LA SECCIÓN */}
                <div className="text-center mb-8 px-4">
                    <p className="text-[#ff5500] font-bold tracking-widest text-sm uppercase mb-2">
                        Elige tu Estilo
                    </p>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white">
                        SERVICIOS <span className="font-light italic text-gray-400">GORILLA</span>
                    </h2>
                </div>

                {/* MENÚ DE CATEGORÍAS ANIMADO */}
                <div className="w-full overflow-hidden flex justify-center items-center h-16 mb-8 mask-image-linear-edges">
                    <motion.div
                        className="flex items-center gap-8 px-10"
                        animate={{ x: 0 }}
                    >
                        {categories.map((category, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <motion.div
                                    key={category.id}
                                    onClick={() => handleCategoryChange(index)}
                                    layout
                                    className="cursor-pointer relative py-2"
                                    animate={{
                                        opacity: isActive ? 1 : 0.4,
                                        scale: isActive ? 1.2 : 1,
                                    }}
                                    transition={springTransition}
                                >
                                    <h3 className="text-lg md:text-xl font-bold tracking-widest whitespace-nowrap uppercase">
                                        {category.name}
                                    </h3>
                                    {isActive && (
                                        <motion.div
                                            layoutId="underline-category"
                                            className="absolute bottom-0 left-0 right-0 h-1 bg-[#ff5500]"
                                            transition={springTransition}
                                        />
                                    )}
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* CONTENEDOR PRINCIPAL DEL CONTENIDO */}
                <div className="flex-1 flex flex-col items-center px-4 md:px-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={springTransition}
                            className="w-full max-w-5xl flex flex-col items-center"
                        >

                            {/* CARRUSEL HORIZONTAL DE CORTES */}
                            <div className="flex gap-4 md:gap-6 mb-10 w-full overflow-x-auto pb-4 snap-x hide-scrollbar">
                                {activeCategory.items.map((item, idx) => {
                                    const isSelected = activeItemIndex === idx;
                                    return (
                                        <div
                                            key={item.id}
                                            onClick={() => setActiveItemIndex(idx)}
                                            className={`flex-shrink-0 w-48 h-64 md:w-64 md:h-80 rounded-xl overflow-hidden cursor-pointer snap-center relative border-2 transition-all duration-300
                                                ${isSelected ? 'border-[#ff5500] scale-100 opacity-100' : 'border-transparent scale-95 opacity-60 hover:opacity-100'}`}
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                            {/* Gradiente inferior para legibilidad del texto si lo hubiera encima */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                                            {isSelected && (
                                                <div className="absolute bottom-3 right-3 bg-[#ff5500] text-black font-bold px-3 py-1 rounded-md text-sm">
                                                    ${item.price}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* PANEL DE DETALLE INFERIOR (Actualiza al hacer click en una imagen) */}
                            {activeItemDetail && (
                                <motion.div
                                    key={activeItemDetail.id} // Forza re-render para la animación
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-[#1a1a1a] border border-[#333] p-6 rounded-2xl w-full max-w-2xl text-center md:text-left flex flex-col md:flex-row items-center md:items-start gap-6"
                                >
                                    <div className="flex-1">
                                        <h4 className="text-2xl font-black text-[#ff5500] mb-2 uppercase">
                                            {activeItemDetail.name}
                                        </h4>
                                        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4">
                                            {activeItemDetail.description}
                                        </p>
                                        <div className="flex justify-center md:justify-start gap-4 text-xs font-mono text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                {activeItemDetail.duration}
                                            </span>
                                        </div>
                                    </div>

                                    <button className="bg-[#ff5500] hover:bg-[#ff7733] text-black font-bold py-3 px-8 rounded-full transition-colors whitespace-nowrap">
                                        RESERVAR AHORA
                                    </button>
                                </motion.div>
                            )}

                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>

            {/* Opcional: Estilo para esconder la barra de scroll (añadir en tu global.css)
               .hide-scrollbar::-webkit-scrollbar { display: none; }
               .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            */}
        </section>
    );
}