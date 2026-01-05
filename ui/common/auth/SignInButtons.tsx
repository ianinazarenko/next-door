import s from './SignInButtons.module.css';

import { EAuthProviders } from '@/utils/constants/auth';
import { signInAction } from '@/lib/actions/auth';
import CButton from '@/ui/atoms/CButton';

const providers = [{ id: EAuthProviders.GitHub, name: 'GitHub' }];

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
                    <CButton type='submit'>Sign In with {provider.name}</CButton>
                </form>
            ))}
        </div>
    );
}
