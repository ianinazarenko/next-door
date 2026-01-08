import 'server-only';

import { PAGES } from '@/data/pages';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/data-access/db';
import GitHub from 'next-auth/providers/github';

if (!process.env.AUTH_GITHUB_ID || !process.env.AUTH_GITHUB_SECRET) {
    throw new Error('Missing AUTH_GITHUB_ID or AUTH_GITHUB_SECRET');
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
    ],
    session: {
        strategy: 'database',
    },
    pages: {
        signIn: PAGES.SIGN_IN.link,
    },
    callbacks: {
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
