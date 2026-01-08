import { Toaster } from 'react-hot-toast';
import ReduxProvider from '@/app/(providers)/ReduxProvider';
import ThemeProvider from '@/app/(providers)/theme/ThemeProvider';
import NextAuthProvider from '@/app/(providers)/NextAuthProvider';

function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <NextAuthProvider>
            <ReduxProvider>
                <ThemeProvider>
                    <Toaster position='top-center' />
                    {children}
                </ThemeProvider>
            </ReduxProvider>
        </NextAuthProvider>
    );
}

export default AppProviders;
