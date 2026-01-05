import { baseUrl } from '@/utils/constants/base-url';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import '@/styles/index.css';

import { auth } from '@/lib/auth';

import AppProviders from '@/app/(providers)/AppProviders';
import TheHeader from '@/ui/layout/header/TheHeader';
import TheMenuMob from '@/ui/layout/menu/TheMenuMob';
import TheFooter from '@/ui/layout/footer/TheFooter';

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
    weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: 'NextDoor',
    description: 'Help is Next Door!',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    const isSignedIn = Boolean(session?.user);

    return (
        <html lang='en'>
            <body className={`${inter.className} antialiased`}>
                <AppProviders>
                    <TheHeader session={session} />

                    <main>{children}</main>

                    <TheMenuMob isSignedIn={isSignedIn} />

                    <TheFooter />
                </AppProviders>
            </body>
        </html>
    );
}
