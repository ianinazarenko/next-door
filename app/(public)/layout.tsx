import { SessionProvider } from 'next-auth/react';
import ClientHeader from '@/ui/layout/header/ClientHeader';
import ClientMenuMob from '@/ui/layout/menu/ClientMenuMob';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ClientHeader />

            <main>{children}</main>

            <ClientMenuMob />
        </SessionProvider>
    );
}
