import { SessionProvider } from 'next-auth/react';

import ClientHeader from '@/ui/layout/header/ClientHeader';
import TheMenuMob from '@/ui/layout/menu/TheMenuMob';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ClientHeader />

            <main>{children}</main>

            <TheMenuMob />
        </SessionProvider>
    );
}
