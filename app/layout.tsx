import type { Metadata } from 'next';

import './globals.css';
import '@/styles/index.css';

import { Plus_Jakarta_Sans } from 'next/font/google';

import AppProviders from '@/app/(providers)/AppProviders';
import TheFooter from '@/ui/layout/footer/TheFooter';
import { baseUrl } from '@/utils/constants/base-url';

const plusJakartaSans = Plus_Jakarta_Sans({
    variable: '--font-plus-jakarta-sans',
    subsets: ['latin'],
    weight: 'variable',
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
            data-scroll-behavior='smooth'
            suppressHydrationWarning
            className={plusJakartaSans.variable}
        >
            <body>
                <AppProviders>
                    {children}

                    <TheFooter />
                </AppProviders>
            </body>
        </html>
    );
}
