'use client';

import type { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
// Components
import MenuPanel from '@/ui/layout/menu/MenuPanel';

export default function TheMenuMob({ session: serverSession }: { session?: Session | null }) {
    // If a session is passed from the server, use it. Otherwise, use the client-side hook.
    const { status: clientStatus } = useSession();

    const status = serverSession ? 'authenticated' : clientStatus;
    const isSignedIn = status === 'authenticated';

    return <MenuPanel isSignedIn={isSignedIn} />;
}
