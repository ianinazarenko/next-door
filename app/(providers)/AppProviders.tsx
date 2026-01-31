import { Toaster } from 'react-hot-toast';
import ReduxProvider from '@/app/(providers)/ReduxProvider';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <ReduxProvider>
            <NextThemesProvider
                attribute={'data-theme'}
                defaultTheme='system'
                enableSystem
                enableColorScheme
            >
                <Toaster position='top-center' />
                {children}
            </NextThemesProvider>
        </ReduxProvider>
    );
}

export default AppProviders;
