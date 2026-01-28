import s from './SignInButtons.module.css';

import { EAuthProviders } from '@/utils/constants/auth';
import SignInButton from '@/app/(public)/sign-in/(components)/buttons/SignInButton';

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
