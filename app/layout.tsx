import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import './styles/index.css';

import AppProviders from '@/lib/providers/AppProviders';
import TheHeader from '@/app/components/common/header/TheHeader';
import TheMenuMob from '@/app/components/common/menu/TheMenuMob';

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
    weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
    title: 'NextDoor',
    description: 'Help is Next Door!',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={`${inter.className} antialiased`}>
                <AppProviders>
                    <TheHeader />

                    <main>{children}</main>

                    <TheMenuMob />
                </AppProviders>
            </body>
        </html>
    );
}
