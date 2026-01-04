import CButton from '@/ui/atoms/CButton';
import { signOutAction } from '@/lib/actions/auth';

export default function SignOutButton() {
    return (
        <form action={signOutAction}>
            <CButton type={'submit'}>Sign out</CButton>
        </form>
    );
}
