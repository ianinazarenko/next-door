import { auth } from '@/lib/auth/auth';
import { NextResponse } from 'next/server';

// To execute Prisma Adapter in Node.js environment (not Edge)
export const runtime = 'nodejs';

export default auth((request) => {
    if (!request.auth) {
        const loginUrl = new URL('/api/auth/signin', request.url);
        loginUrl.searchParams.set('callbackUrl', `${request.nextUrl.pathname}${request.nextUrl.search}`);

        return NextResponse.redirect(loginUrl);
    }
});

export const config = {
    matcher: ['/profile'],
};
