import type { Session } from 'next-auth';

import clsx from 'clsx';

import SignOutButton from '@/app/(public)/sign-in/(components)/buttons/SignOutButton';
import ThemeToggle from '@/ui/common/theme/ThemeToggle';
import UserPic from '@/ui/common/user/UserPic';
import HeaderMenu from '@/ui/layout/header/HeaderMenu';

import s from './TheHeader.module.css';

function TheHeader({
    session,
    isLoading,
    isSignedIn,
}: {
    session: Session | null;
    isSignedIn: boolean;
    isLoading: boolean;
}) {
    return (
        <header className={s.header}>
            <div className={'c-container flex items-center justify-between gap-4'}>
                <HeaderMenu isSignedIn={isSignedIn} />

                <div className={s.userSection}>
                    {isLoading && <div className={s.userPlaceholder} />}
                    {isSignedIn && session?.user && (
                        <>
                            <SignOutButton />
                            <UserPic
                                image={session.user.image}
                                name={session.user.name}
                                index={session.user.id}
                                className={clsx(s.userPic, 'fade-in')}
                            />
                        </>
                    )}
                </div>

                <ThemeToggle />
            </div>
        </header>
    );
}

export default TheHeader;
