'use server';

import { signIn, signOut } from '@/lib/auth';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

export async function signInAction() {
    try {
        await signIn('github');
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
