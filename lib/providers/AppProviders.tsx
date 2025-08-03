import ReduxProvider from '@/lib/providers/ReduxProvider';
import ThemeProvider from '@/lib/theme/ThemeProvider';

function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <ReduxProvider>
            <ThemeProvider>{children}</ThemeProvider>
        </ReduxProvider>
    );
}

export default AppProviders;
