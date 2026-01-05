import s from './TheHeader.module.css';
import { auth } from '@/lib/auth';
import ThemeToggle from '@/ui/common/theme/ThemeToggle';
import HeaderMenu from '@/ui/layout/header/HeaderMenu';
import UserPic from '@/ui/common/user/UserPic';

async function TheHeader() {
    const session = await auth();

    return (
        <header className={s.header}>
            <div className={'c-container flex items-center justify-between gap-8'}>
                {session?.user && (
                    <UserPic
                        image={session.user.image}
                        name={session.user.name}
                        index={session.user.id}
                        className={s.userPic}
                    />
                )}

                <HeaderMenu />

                <ThemeToggle />
            </div>
        </header>
    );
}

export default TheHeader;
