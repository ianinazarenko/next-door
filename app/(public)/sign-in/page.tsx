import type { IAuthSearchParams } from '@/types/auth';

import clsx from 'clsx';
import { House } from 'lucide-react';
import Link from 'next/link';

import SignInButtons from '@/app/(public)/sign-in/(components)/buttons/SignInButtons';
import SignOutButton from '@/app/(public)/sign-in/(components)/buttons/SignOutButton';
import SignInErrorHandler from '@/app/(public)/sign-in/(components)/SignInErrorHandler';
import { PAGES } from '@/data/pages';
import { auth } from '@/lib/auth/auth';
import CButton from '@/ui/atoms/CButton';
import { getSearchParamValue } from '@/utils/helpers/url-utils';

import s from './page.module.css';

const TITLE = 'Welcome to your neighborhood';
const PUBLIC_NOTE = 'Public posts and complex information remain available without an account.';
const TEXT = (
    <>
        Sign in to publish announcements
        <br />
        and manage your activity.
    </>
);

const AUTH_TITLE = "You're already signed in";
const AUTH_TEXT = 'Go back to the main page to continue';
const AUTH_BTN = 'Go to Home';

interface IProps {
    searchParams: Promise<IAuthSearchParams>;
}

export default async function SignInPage({ searchParams }: IProps) {
    const { callbackUrl } = await searchParams;
    const resolvedCallbackUrl = getSearchParamValue(callbackUrl) ?? PAGES.HOME.link;

    const session = await auth();
    const isSignedIn: boolean = Boolean(session?.user);

    return (
        <div className={clsx('page c-container', s.page)}>
            <section className={s.card} aria-labelledby='sign-in-title'>
                <div className={s.iconWrap} aria-hidden='true'>
                    <House className={s.icon} />
                </div>

                <h1 id='sign-in-title' className={s.title}>
                    {isSignedIn ? AUTH_TITLE : TITLE}
                </h1>
                <p className={clsx('card-description', s.description)}>
                    {isSignedIn ? AUTH_TEXT : TEXT}
                </p>

                <div className={s.actions}>
                    {isSignedIn ? (
                        <div
                            className={
                                'flex flex-col flex-row items-center justify-center gap-4 md:gap-3'
                            }
                        >
                            <Link href={PAGES.HOME.link}>
                                <CButton>{AUTH_BTN}</CButton>
                            </Link>

                            <SignOutButton />
                        </div>
                    ) : (
                        <SignInButtons callbackUrl={resolvedCallbackUrl} />
                    )}
                </div>

                {!isSignedIn && <p className={clsx('card-meta', s.note)}>{PUBLIC_NOTE}</p>}

                <SignInErrorHandler />
            </section>
        </div>
    );
}
