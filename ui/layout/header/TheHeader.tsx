'use client';

import s from './TheHeader.module.css';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import ThemeToggle from '@/ui/common/theme/ThemeToggle';
import HeaderMenu from '@/ui/layout/header/HeaderMenu';
import UserPic from '@/ui/common/user/UserPic';
import SignOutButton from '@/ui/common/auth/SignOutButton';

function TheHeader() {
    const { data: session, status } = useSession();
    const isSignedIn = status === 'authenticated';
    const isLoading = status === 'loading';

    return (
        <header className={s.header}>
            <div className={'c-container flex items-center justify-between gap-4'}>
                <HeaderMenu isSignedIn={isSignedIn} />

                <div className={s.userSection}>
                    {isLoading && <div className={s.userPlaceholder} />}
                    {isSignedIn && session.user && (
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
