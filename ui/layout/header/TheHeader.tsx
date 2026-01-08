'use client';

import type { Session } from 'next-auth';
import s from './TheHeader.module.css';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import ThemeToggle from '@/ui/common/theme/ThemeToggle';
import HeaderMenu from '@/ui/layout/header/HeaderMenu';
import UserPic from '@/ui/common/user/UserPic';
import SignOutButton from '@/ui/common/auth/SignOutButton';

function TheHeader({ session: serverSession }: { session?: Session | null }) {
    // If a session is passed from the server, use it. Otherwise, use the client-side hook.
    const { data: clientSession, status: clientStatus } = useSession();

    const session = serverSession ?? clientSession;
    const status = serverSession ? 'authenticated' : clientStatus; // If serverSession exists, we are authenticated

    const isSignedIn = status === 'authenticated';
    // If serverSession is provided, we are never "loading" from the client's perspective
    const isLoading = status === 'loading' && !serverSession;
    // UserPic should animate only if authentication happened on the client
    const shouldAnimateUserPic = !serverSession && isSignedIn;

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
                                className={clsx(s.userPic, shouldAnimateUserPic && 'fade-in')}
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
