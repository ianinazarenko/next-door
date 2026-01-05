'use server';

import { EAuthProviders } from '@/utils/constants/auth';
import { signIn, signOut } from '@/lib/auth';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

export async function signInAction(provider?: EAuthProviders, callbackUrl: string = '') {
    try {
        await signIn(provider, {
            redirectTo: callbackUrl,
        });
    } catch (error) {
        if (isRedirectError(error)) throw error;
        console.warn('[auth/signInAction] sign in failed:', error);
        throw error;
    }
}

export async function signOutAction() {
    try {
        await signOut();
    } catch (error) {
        if (isRedirectError(error)) throw error;
        console.warn('[auth/signOutAction] sign out failed:', error);
        throw error;
    }
}
