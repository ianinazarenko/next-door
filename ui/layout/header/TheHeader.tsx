import { auth } from '@/lib/auth';
import s from './TheHeader.module.css';
import ThemeToggle from '@/ui/common/theme/ThemeToggle';
import HeaderMenu from '@/ui/layout/header/HeaderMenu';
import SignInButton from '@/ui/common/auth/SignInButton';
import SignOutButton from '@/ui/common/auth/SignOutButton';

async function TheHeader() {
    const session = await auth();

    return (
        <header className={s.header}>
            <div className={'c-container flex items-center justify-between'}>
                <HeaderMenu />

                {session?.user ? <SignOutButton /> : <SignInButton />}

                <ThemeToggle />
            </div>
        </header>
    );
}

export default TheHeader;
