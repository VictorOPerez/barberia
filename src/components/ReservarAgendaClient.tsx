'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import BookingScheduleStep from '@/components/BookingScheduleStep';
import { getCutById } from '@/data/booking';

export default function ReservarAgendaClient() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const cutId = searchParams.get('cutId');
    const selectedCut = cutId ? getCutById(cutId) : undefined;

    useEffect(() => {
        if (!selectedCut) {
            router.replace('/reservar/corte');
        }
    }, [selectedCut, router]);

    if (!selectedCut) return null;

    return (
        <BookingScheduleStep
            selectedCut={{
                id: selectedCut.id,
                name: selectedCut.name,
                price: selectedCut.price,
                duration: selectedCut.duration,
            }}
            onBack={() => router.push('/reservar/corte')}
            onConfirm={(payload: { date: string; time: string }) => {
                console.log('Reserva final:', {
                    cut: selectedCut,
                    ...payload,
                });
            }}
        />
    );
}