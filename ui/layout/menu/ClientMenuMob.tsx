'use client';
import { useSession } from 'next-auth/react';
import TheMenuMob from '@/ui/layout/menu/TheMenuMob';

export default function ClientMenuMob() {
    const { status } = useSession();

    const isSignedIn = status === 'authenticated';

    return <TheMenuMob isSignedIn={isSignedIn} />;
}
