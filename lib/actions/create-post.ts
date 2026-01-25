'use server';

import { TSchema } from '@/types/forms';
import { z } from 'zod';
import { prisma } from '@/lib/data-access/db';
import { createPostServerSchema } from '@/lib/validation/server-schemas';
import { auth } from '@/lib/auth/auth';
import { getFirstZodErrorMessage } from '@/utils/helpers/zod-utils';

class AuthError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AuthError';
    }
}

class UserFacingError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UserFacingError';
    }
}

// Rate Limiting (Light Spam Protection)
// Limit: 3 posts per minute
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3;

export async function createPostAction(data: TSchema) {
    const isDev = process.env.NODE_ENV === 'development';
    try {
        const session = await auth();

        if (!session?.user?.id) {
            throw new AuthError('Not authenticated. Please sign in to create a post.');
        }

        const { category, complex, ...validatedData } = createPostServerSchema.parse(data);

        const post = await prisma.$transaction(async (tx) => {
            // Fail-fast per-user lock to prevent parallel create requests from the same user.
            // Safe: parameterized query (no string concatenation).
            const lockKey = `create-post:${session.user.id}`;
            const lockRows = await tx.$queryRaw<{ locked: boolean }[]>`
                SELECT pg_try_advisory_xact_lock(hashtext(${lockKey})) AS locked
            `;
            const locked = lockRows?.[0]?.locked ?? false;

            if (!locked) {
                throw new UserFacingError('Post creation is already in progress. Please try again.');
            }

            const recentPostsCount = await tx.post.count({
                where: {
                    authorId: session.user.id,
                    createdAt: {
                        gte: new Date(Date.now() - RATE_LIMIT_WINDOW),
                    },
                },
            });

            if (recentPostsCount >= RATE_LIMIT_MAX) {
                throw new UserFacingError('You are posting too frequently. Please wait a minute.');
            }

            // Deduplication (Light Idempotency check)
            // If user double-clicked (or retries), find the post created in the last 30s with the same title.
            const existingPost = await tx.post.findFirst({
                where: {
                    authorId: session.user.id,
                    title: validatedData.title,
                    createdAt: {
                        gte: new Date(Date.now() - 30 * 1000), // 30 seconds
                    },
                },
            });

            if (existingPost) return existingPost;

            return tx.post.create({
                data: {
                    ...validatedData,
                    author: {
                        connect: {
                            id: session.user.id,
                        },
                    },
                    category: {
                        connect: {
                            slug: category,
                        },
                    },
                    complex: {
                        connect: {
                            slug: complex,
                        },
                    },
                },
            });
        });

        return { success: true, post };
    } catch (error) {
        console.error('[create-post/createPostAction]:', error);

        if (isDev) throw error;

        if (error instanceof AuthError || error instanceof UserFacingError) {
            throw error;
        }

        if (error instanceof z.ZodError) {
            const userMessage = getFirstZodErrorMessage(error);
            throw new Error(userMessage || 'Invalid data');
        }

        throw new Error('Failed to create post. Please try again later.');
    }
}
