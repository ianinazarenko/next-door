import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

// To execute Prisma Adapter in Node.js environment (not Edge)
export const runtime = 'nodejs';

export default auth((request) => {
    if (!request.auth) {
        const loginUrl = new URL('/api/auth/signin', request.url);
        loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);

        return NextResponse.redirect(loginUrl);
    }
});

export const config = {
    matcher: ['/posts/new', '/profile'],
};
