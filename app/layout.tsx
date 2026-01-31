import { baseUrl } from '@/utils/constants/base-url';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import '@/styles/index.css';

import AppProviders from '@/app/(providers)/AppProviders';
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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang='en'
            suppressHydrationWarning
        >
            <body className={`${inter.className} antialiased`}>
                <AppProviders>
                    {children}

                    <TheFooter />
                </AppProviders>
            </body>
        </html>
    );
}
