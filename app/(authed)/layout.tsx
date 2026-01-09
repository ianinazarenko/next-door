import { getServerSession } from '@/lib/auth';
import { SessionProvider } from 'next-auth/react';
import TheHeader from '@/ui/layout/header/TheHeader';
import TheMenuMob from '@/ui/layout/menu/TheMenuMob';

export default async function AuthedLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession();

    return (
        <SessionProvider session={session}>
            <TheHeader
                session={session}
                isSignedIn={Boolean(session?.user)}
                isLoading={false}
            />

            <main>{children}</main>

            <TheMenuMob isSignedIn={Boolean(session?.user)} />
        </SessionProvider>
    );
}
