import TheHeader from '@/ui/layout/header/TheHeader';
import TheMenuMob from '@/ui/layout/menu/TheMenuMob';
import TheFooter from '@/ui/layout/footer/TheFooter';
import NextAuthProvider from '@/app/(providers)/NextAuthProvider';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <NextAuthProvider>
            <TheHeader />

            <main>{children}</main>

            <TheMenuMob />

            <TheFooter />
        </NextAuthProvider>
    );
}
