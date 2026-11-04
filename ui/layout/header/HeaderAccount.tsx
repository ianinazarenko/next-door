'use client';

import type { Session } from 'next-auth';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import clsx from 'clsx';
import { ChevronDown, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { PAGES } from '@/data/pages';
import { signOutAction } from '@/lib/actions/auth';
import UserPic from '@/ui/common/user/UserPic';

import s from './HeaderAccount.module.css';

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
                className={clsx(s.accountControl, s.signIn, isSignInPage && s.signInActive)}
                aria-current={isSignInPage ? 'page' : undefined}
            >
                {PAGES.SIGN_IN.title}
            </Link>
        );
    }

    return (
        <Menu as='div' className={s.accountMenu}>
            <MenuButton className={s.accountControl} aria-label='Account menu'>
                <span aria-hidden='true'>
                    <UserPic
                        image={session.user.image}
                        name={session.user.name}
                        index={session.user.id}
                        className={s.userPic}
                    />
                </span>
                <ChevronDown size={16} aria-hidden='true' />
            </MenuButton>

            <MenuItems className={s.accountMenuItems} modal={false} transition>
                <form action={signOutAction}>
                    <MenuItem as='button' type='submit' className={s.signOutItem}>
                        <LogOut size={20} aria-hidden='true' />
                        Sign out
                    </MenuItem>
                </form>
            </MenuItems>
        </Menu>
    );
}

export default HeaderAccount;
