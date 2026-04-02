'use client';

import { useRouter } from 'next/navigation';
import BookingSuccess from '@/components/BookingSuccess';

export default function BookingSuccessPage() {
    const router = useRouter();

    const handleContinue = () => {
        router.push('/');
    };

    return <BookingSuccess onGoHome={handleContinue} />;
}