'use client';

import { useRouter } from 'next/navigation';
import { Haircut } from '@/data/booking';
import BookingSuccess from '@/components/BookingSuccess';

export default function BookingSuccessPage() {
    const router = useRouter();

    const handleContinue = (cut: Haircut) => {
        router.push(`/`);
    };

    return <BookingSuccess onGoHome={handleContinue} />;
}