import ThemeToggle from '@/app/components/theme/ThemeToggle';

function TheHeader() {
    return (
        <header className="l-0 fixed top-0 z-50 w-full px-(--container-padding-x-mobile) py-3 md:px-(--container-padding-x-tablet) md:py-4 lg:px-(--container-padding-x-desktop)">
            <div className={'c-container'}>
                <ThemeToggle />
            </div>
        </header>
    );
}

export default TheHeader;
