import { auth } from '@/lib/auth';
import s from './TheHeader.module.css';
import ThemeToggle from '@/ui/common/theme/ThemeToggle';
import HeaderMenu from '@/ui/layout/header/HeaderMenu';

async function TheHeader() {
    const session = await auth();

    return (
        <header className={s.header}>
            <div className={'c-container flex items-center justify-between gap-8'}>
                <HeaderMenu />

                {/*TODO: add user icon (with name for desktop only)*/}
                {session?.user ? session.user.name : null}

                <ThemeToggle />
            </div>
        </header>
    );
}

export default TheHeader;
