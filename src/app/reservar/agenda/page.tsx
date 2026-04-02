import ReservarAgendaClient from '@/components/ReservarAgendaClient';
import { Suspense } from 'react';

export default function ReservarAgendaPage() {
    return (
        <Suspense fallback={null}>
            <ReservarAgendaClient />
        </Suspense>
    );
}