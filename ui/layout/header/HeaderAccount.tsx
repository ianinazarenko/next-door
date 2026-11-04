'use client';

import type { Session } from 'next-auth';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import SignOutButton from '@/app/(public)/sign-in/(components)/buttons/SignOutButton';
import { PAGES } from '@/data/pages';
import UserPic from '@/ui/common/user/UserPic';

import s from './TheHeader.module.css';

interface IProps {
    session: Session | null;
    isLoading: boolean;
    isSignedIn: boolean;
}

function HeaderAccount({ session, isLoading, isSignedIn }: IProps) {
    const pathname = usePathname();

    if (isLoading) return null;

    const isSignInPage = pathname === PAGES.SIGN_IN.link;

    if (!isSignedIn || !session?.user) {
        return (
            <Link
                href={PAGES.SIGN_IN.link}
                className={clsx(s.signIn, isSignInPage && s.signInActive)}
                aria-current={isSignInPage ? 'page' : undefined}
            >
                {PAGES.SIGN_IN.title}
            </Link>
        );
    }

    return (
        <div className={s.userSection}>
            {/* TODO: move to menu */}
            <SignOutButton />

            <UserPic
                image={session.user.image}
                name={session.user.name}
                index={session.user.id}
                className={clsx(s.userPic, 'fade-in')}
            />
        </div>
    );
}

export default HeaderAccount;
