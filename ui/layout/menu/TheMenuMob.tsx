'use client';

import { useSession } from 'next-auth/react';
// Components
import MenuPanel from '@/ui/layout/menu/MenuPanel';

export default function TheMenuMob() {
    const { status } = useSession();
    const isSignedIn = status === 'authenticated';

    return <MenuPanel isSignedIn={isSignedIn} />;
}
