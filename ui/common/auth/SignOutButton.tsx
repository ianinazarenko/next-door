import { EButtonTheme } from '@/constants/ui';
import { signOutAction } from '@/lib/actions/auth';
import CButton from '@/ui/atoms/CButton';

const LABEL = 'Sign out';

export default function SignOutButton() {
    return (
        <form action={signOutAction}>
            <CButton
                theme={EButtonTheme.Tertiary}
                type={'submit'}
            >
                {LABEL}
            </CButton>
        </form>
    );
}
