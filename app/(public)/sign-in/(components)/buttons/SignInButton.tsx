'use client';

import type { IProvider } from '@/types/auth';

import { useTransition } from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';

import { signInAction } from '@/lib/actions/auth';
import CButton from '@/ui/atoms/CButton';
import ButtonIconLoader from '@/ui/common/buttons/ButtonIconLoader';
import { EAuthProviders } from '@/utils/constants/auth';
import { EButtonTheme } from '@/utils/constants/ui';

import s from './SignInButton.module.css';

const ICON_SIZE = 18;

const providers: Record<EAuthProviders, IProvider> = {
    [EAuthProviders.GitHub]: { icon: <FaGithub size={ICON_SIZE} />, name: 'GitHub' },
    [EAuthProviders.Google]: { icon: <FaGoogle size={ICON_SIZE} />, name: 'Google' },
};

export default function SignInButton({
    providerId,
    callbackUrl,
}: {
    providerId: EAuthProviders;
    callbackUrl: string;
}) {
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
