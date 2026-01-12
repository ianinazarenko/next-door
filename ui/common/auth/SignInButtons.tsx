import s from './SignInButtons.module.css';

import { EAuthProviders } from '@/utils/constants/auth';
import { EButtonTheme } from '@/utils/constants/ui';
import { ReactNode } from 'react';
import { signInAction } from '@/lib/actions/auth';
import CButton from '@/ui/atoms/CButton';
import { FaGithub, FaGoogle } from 'react-icons/fa';

interface IProvider {
    id: EAuthProviders;
    name: string;
    icon: ReactNode;
}

const ICON_SIZE = 18;
const providers: IProvider[] = [
    { id: EAuthProviders.GitHub, name: 'GitHub', icon: <FaGithub size={ICON_SIZE} /> },
    { id: EAuthProviders.Google, name: 'Google', icon: <FaGoogle size={ICON_SIZE} /> },
];

export default function SignInButtons({ callbackUrl }: { callbackUrl: string }) {
    return (
        <div className={s.wrapper}>
            {providers.map((provider) => (
                <form
                    action={async () => {
                        'use server';
                        await signInAction(provider.id, callbackUrl);
                    }}
                    key={provider.id}
                >
                    <CButton
                        className={s.button}
                        theme={EButtonTheme.Secondary}
                        type='submit'
                    >
                        {provider.icon}
                        Sign In with {provider.name}
                    </CButton>
                </form>
            ))}
        </div>
    );
}
