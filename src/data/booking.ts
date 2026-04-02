export type Haircut = {
    id: string;
    name: string;
    description: string;
    duration: string;
    price: number;
    image: string;
};

export const cuts: Haircut[] = [
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

export function getCutById(id?: string | null) {
    return cuts.find((cut) => cut.id === id) ?? cuts[0];
}