import s from './TheHeader.module.css';
import { Session } from 'next-auth';
import ThemeToggle from '@/ui/common/theme/ThemeToggle';
import HeaderMenu from '@/ui/layout/header/HeaderMenu';
import UserPic from '@/ui/common/user/UserPic';
import SignOutButton from '@/ui/common/auth/SignOutButton';

async function TheHeader({ session }: { session: Session | null }) {
    return (
        <header className={s.header}>
            <div className={'c-container flex items-center justify-between gap-4'}>
                <HeaderMenu isSignedIn={Boolean(session)} />

                <ThemeToggle />

                {session?.user && (
                    <>
                        <SignOutButton />
                        <UserPic
                            image={session.user.image}
                            name={session.user.name}
                            index={session.user.id}
                            className={s.userPic}
                        />
                    </>
                )}
            </div>
        </header>
    );
}

export default TheHeader;
