import ReduxProvider from '@/app/(providers)/ReduxProvider';
import ThemeProvider from '@/app/(providers)/theme/ThemeProvider';

function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <ReduxProvider>
            <ThemeProvider>{children}</ThemeProvider>
        </ReduxProvider>
    );
}

export default AppProviders;
