import type { Session } from 'next-auth';

import clsx from 'clsx';

import ThemeToggle from '@/ui/common/theme/ThemeToggle';
import HeaderAccount from '@/ui/layout/header/HeaderAccount';
import HeaderButtonLInk from '@/ui/layout/header/HeaderButtonLInk';
import HeaderLogo from '@/ui/layout/header/HeaderLogo';
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
            <div className={clsx('c-container', s.inner, isSignedIn && s.innerSigned)}>
                <div className={s.left}>
                    <HeaderLogo />
                    <HeaderMenu />
                </div>

                <div className={s.actions}>
                    <HeaderButtonLInk />
                    <ThemeToggle />

                    <div className={clsx(s.accountSlot, isSignedIn && s.accountSlotSigned)}>
                        <span
                            className={clsx(
                                s.accountSkeleton,
                                !isLoading && s.accountSkeletonHidden
                            )}
                            aria-hidden='true'
                        />

                        <HeaderAccount
                            session={session}
                            isLoading={isLoading}
                            isSignedIn={isSignedIn}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default TheHeader;
