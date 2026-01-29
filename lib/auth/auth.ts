import 'server-only';
import { cache } from 'react';

import { PAGES } from '@/data/pages';
import { prisma } from '@/lib/data-access/db';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GitHub from 'next-auth/providers/github';
import Google from '@auth/core/providers/google';
import { verifyGitHubEmail } from '@/lib/auth/auth-utils';

if (!process.env.AUTH_GITHUB_ID || !process.env.AUTH_GITHUB_SECRET) {
    throw new Error('Missing AUTH_GITHUB_ID or AUTH_GITHUB_SECRET');
}

if (!process.env.AUTH_GOOGLE_ID || !process.env.AUTH_GOOGLE_SECRET) {
    throw new Error('Missing AUTH_GOOGLE_ID or AUTH_GOOGLE_SECRET');
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
            allowDangerousEmailAccountLinking: false,
        }),
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
    ],

    session: {
        strategy: 'database',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },

    pages: {
        signIn: PAGES.SIGN_IN.link,
    },

    callbacks: {
        async signIn({ account, profile }) {
            if (account?.provider === 'google') {
                return Boolean(profile?.email_verified);
            }

            if (account?.provider === 'github') {
                if (!account.access_token) return false;

                return verifyGitHubEmail(account.access_token);
            }

            // Default Deny: Reject any provider not explicitly handled above
            return false;
        },

        session({ session, user }) {
            if (!session.user) {
                return session;
            }
            return {
                ...session,
                user: {
                    ...session.user,
                    id: user.id,
                    role: user.role,
                },
            };
        },
    },
});

/**
 * Memoized session getter for Server Components
 * Uses React.cache() to memoize within a single render cycle (per-request)
 * This prevents redundant auth() calls across multiple components in the same request
 */
export const getServerSession = cache(async () => {
    return auth();
});
