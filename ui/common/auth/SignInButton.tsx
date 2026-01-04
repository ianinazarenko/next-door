import CButton from '@/ui/atoms/CButton';
import { signInAction } from '@/lib/actions/auth';

export default function SignInButton() {
    return (
        <form action={signInAction}>
            <CButton type={'submit'}>Sign In</CButton>
        </form>
    );
}
