'use client';

import { useSession } from 'next-auth/react';

import TheHeader from '@/ui/layout/header/TheHeader';

export default function ClientHeader() {
    const { data, status } = useSession();

    const isSignedIn = status === 'authenticated';
    const isLoading = status === 'loading';

    return (
        <TheHeader
            session={data}
            isSignedIn={isSignedIn}
            isLoading={isLoading}
        />
    );
}
