import { baseUrl } from '@/utils/constants/base-url';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import '@/styles/index.css';

import AppProviders from '@/app/(providers)/AppProviders';

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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={`${inter.className} antialiased`}>
                <AppProviders>{children}</AppProviders>
            </body>
        </html>
    );
}
