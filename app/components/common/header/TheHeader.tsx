import s from './TheHeader.module.css';
import ThemeToggle from '@/app/components/theme/ThemeToggle';
import HeaderMenu from '@/app/components/common/header/HeaderMenu';

function TheHeader() {
    return (
        <header className={s.header}>
            <div className={'c-container flex items-center justify-between'}>
                <HeaderMenu />

                <ThemeToggle />
            </div>
        </header>
    );
}

export default TheHeader;
