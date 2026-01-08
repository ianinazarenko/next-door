import { getSession } from '@/lib/auth';
import TheHeader from '@/ui/layout/header/TheHeader';
import TheMenuMob from '@/ui/layout/menu/TheMenuMob';
import TheFooter from '@/ui/layout/footer/TheFooter';
import NextAuthProvider from '@/app/(providers)/NextAuthProvider';

export default async function AuthedLayout({ children }: { children: React.ReactNode }) {
    const session = await getSession();

    return (
        <NextAuthProvider session={session}>
            <TheHeader session={session} />

            <main>{children}</main>

            <TheMenuMob session={session} />

            <TheFooter />
        </NextAuthProvider>
    );
}
