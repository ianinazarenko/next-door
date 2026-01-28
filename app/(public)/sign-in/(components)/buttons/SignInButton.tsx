'use client';

import { IProvider } from '@/types/auth';
import { EButtonTheme } from '@/utils/constants/ui';
import { EAuthProviders } from '@/utils/constants/auth';
import { signInAction } from '@/lib/actions/auth';
import s from '@/app/(public)/sign-in/(components)/buttons/SignInButton.module.css';

import { useTransition } from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import CButton from '@/ui/atoms/CButton';
import ButtonIconLoader from '@/ui/common/buttons/ButtonIconLoader';

const ICON_SIZE = 18;

const providers: Record<EAuthProviders, IProvider> = {
    [EAuthProviders.GitHub]: { icon: <FaGithub size={ICON_SIZE} />, name: 'GitHub' },
    [EAuthProviders.Google]: { icon: <FaGoogle size={ICON_SIZE} />, name: 'Google' },
};

export default function SignInButton({ providerId, callbackUrl }: { providerId: EAuthProviders; callbackUrl: string }) {
    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        startTransition(async () => {
            await signInAction(providerId, callbackUrl);
        });
    };

    return (
        <CButton
            className={s.button}
            theme={EButtonTheme.Secondary}
            onClick={handleClick}
            disabled={isPending}
        >
            <ButtonIconLoader
                loading={isPending}
                size={ICON_SIZE}
            >
                {providers[providerId].icon}
            </ButtonIconLoader>
            Sign In with {providers[providerId].name}
        </CButton>
    );
}
