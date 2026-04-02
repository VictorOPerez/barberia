'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import BookingScheduleStep from '@/components/BookingScheduleStep';
import { getCutById } from '@/data/booking';

export default function ReservarAgendaPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const cutId = searchParams.get('cutId');
    const selectedCut = getCutById(cutId);

    return (
        <BookingScheduleStep
            selectedCut={{
                id: selectedCut.id,
                name: selectedCut.name,
                price: selectedCut.price,
                duration: selectedCut.duration,
            }}
            onBack={() => router.push('/reservar/corte')}
            onConfirm={(payload) => {
                console.log('Reserva final:', {
                    cut: selectedCut,
                    ...payload,
                });
            }}
        />
    );
}