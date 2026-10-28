import clsx from 'clsx';
import { LogOut } from 'lucide-react';

import { signOutAction } from '@/lib/actions/auth';
import CButton from '@/ui/atoms/CButton';
import { EButtonTheme } from '@/utils/constants/ui';

import s from './SignOutButton.module.css';

const LABEL = 'Sign out';

export default function SignOutButton() {
    return (
        <form action={signOutAction}>
            <CButton
                theme={EButtonTheme.Tertiary}
                type={'submit'}
                equal
                round
                ariaLabel={LABEL}
                className={clsx(s.signOutButton, 'fade-in')}
            >
                <LogOut size={20} aria-hidden='true' />
            </CButton>
        </form>
    );
}
