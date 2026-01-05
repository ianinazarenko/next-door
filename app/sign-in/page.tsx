import Link from 'next/link';
import { auth } from '@/lib/auth';
import { PAGES } from '@/data/pages';
import CButton from '@/ui/atoms/CButton';
import { SignInButtons } from '@/ui/common/auth/SignInButtons';
import SignOutButton from '@/ui/common/auth/SignOutButton';

const TITLE = 'Sign In';
const TEXT = 'Access your account to continue';
const AUTH_TITLE = "You're already signed in";
const AUTH_TEXT = 'Go back to the main page to continue';
const AUTH_BTN = 'Go to Home';

export default async function SignInPage({ searchParams }: { searchParams?: { callbackUrl: string } }) {
    const session = await auth();
    const isSignedIn = Boolean(session?.user);
    const callbackUrl = searchParams?.callbackUrl ?? PAGES.HOME.link;

    return (
        <div className={'page c-container flex flex-col items-center justify-center'}>
            <div className={'flex h-full max-w-10/12 flex-col items-center justify-center text-center'}>
                <h1 className={'h1'}>{isSignedIn ? AUTH_TITLE : TITLE}</h1>
                <p className={'card-description mt-4 text-center'}>{isSignedIn ? AUTH_TEXT : TEXT}</p>

                <div className={'pt-4'}>
                    {isSignedIn ? (
                        <div className={'flex flex-col items-center gap-4 md:flex-row md:gap-3'}>
                            <Link href={PAGES.HOME.link}>
                                <CButton>{AUTH_BTN}</CButton>
                            </Link>

                            <SignOutButton />
                        </div>
                    ) : (
                        <SignInButtons callbackUrl={callbackUrl} />
                    )}
                </div>
            </div>
        </div>
    );
}
