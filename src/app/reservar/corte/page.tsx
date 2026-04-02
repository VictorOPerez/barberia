'use client';

import { useRouter } from 'next/navigation';
import BookingCutStep from '@/components/BookingCutStep';
import { Haircut } from '@/data/booking';

export default function ReservarCortePage() {
    const router = useRouter();

    const handleContinue = (cut: Haircut) => {
        router.push(`/reservar/agenda?cutId=${cut.id}`);
    };

    return <BookingCutStep onContinue={handleContinue} />;
}