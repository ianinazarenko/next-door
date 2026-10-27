'use server';

import type { EAuthProviders } from '@/utils/constants/auth';

import { isRedirectError } from 'next/dist/client/components/redirect-error';

import { PAGES } from '@/data/pages';
import { signIn, signOut } from '@/lib/auth/auth';
import { getSafeCallbackUrl } from '@/utils/helpers/url-utils';

export async function signInAction(provider?: EAuthProviders, callbackUrl: string = '') {
    try {
        await signIn(provider, {
            redirectTo: getSafeCallbackUrl(callbackUrl, PAGES.HOME.link),
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
