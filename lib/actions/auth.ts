'use server';

import { signIn, signOut } from '@/lib/auth';

export async function signInAction() {
    try {
        await signIn('github');
    } catch (error) {
        console.warn('[auth/signInAction] sign in failed:', error);
        throw error;
    }
}

export async function signOutAction() {
    try {
        await signOut();
    } catch (error) {
        console.warn('[auth/signOutAction] sign out failed:', error);
        throw error;
    }
}
