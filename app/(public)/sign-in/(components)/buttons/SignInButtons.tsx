import SignInButton from '@/app/(public)/sign-in/(components)/buttons/SignInButton';
import { EAuthProviders } from '@/utils/constants/auth';

import s from './SignInButtons.module.css';

const providers: EAuthProviders[] = [EAuthProviders.GitHub, EAuthProviders.Google];

export default function SignInButtons({ callbackUrl }: { callbackUrl: string }) {
    return (
        <div className={s.wrapper}>
            {providers.map((provider) => (
                <SignInButton
                    key={provider}
                    providerId={provider}
                    callbackUrl={callbackUrl}
                />
            ))}
        </div>
    );
}
