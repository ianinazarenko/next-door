import { Toaster } from 'react-hot-toast';
import ReduxProvider from '@/app/(providers)/ReduxProvider';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { NuqsAdapter } from 'nuqs/adapters/next/app'

function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <ReduxProvider>
            <NuqsAdapter>
                <NextThemesProvider
                    attribute={'data-theme'}
                    defaultTheme='system'
                    enableSystem
                    enableColorScheme
                    >
                    <Toaster position='top-center' />
                    {children}
                </NextThemesProvider>
            </NuqsAdapter>
        </ReduxProvider>
    );
}

export default AppProviders;
