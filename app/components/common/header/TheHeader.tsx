import ThemeToggle from '@/app/components/theme/ThemeToggle';

function TheHeader() {
    return (
        <header className="l-0 fixed top-0 z-50 w-full py-3 md:py-4">
            <div className={'c-container'}>
                <ThemeToggle />
            </div>
        </header>
    );
}

export default TheHeader;
