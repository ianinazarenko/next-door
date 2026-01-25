'use server';

import { TSchema } from '@/types/forms';
import { z } from 'zod';
import { prisma } from '@/lib/data-access/db';
import { createPostServerSchema } from '@/lib/validation/server-schemas';
import { auth } from '@/lib/auth/auth';
import { getFirstZodErrorMessage } from '@/utils/helpers/zod-utils';

export async function createPostAction(data: TSchema) {
    const isDev = process.env.NODE_ENV === 'development';
    try {
        const session = await auth();

        if (!session?.user?.id) {
            throw new Error('Not authenticated. Please sign in to create a post.');
        }

        // Rate Limiting (Light Spam Protection)
        // Limit: 3 posts per minute
        const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
        const RATE_LIMIT_MAX = 3;

        const recentPostsCount = await prisma.post.count({
            where: {
                authorId: session.user.id,
                createdAt: {
                    gte: new Date(Date.now() - RATE_LIMIT_WINDOW),
                },
            },
        });

        if (recentPostsCount >= RATE_LIMIT_MAX) {
            throw new Error('You are posting too frequently. Please wait a minute.');
        }

        const { category, complex, ...validatedData } = createPostServerSchema.parse(data);

        // Deduplication (Light Idempotency check)
        // If user double-clicked, find the post created in the last 30s with the same title
        const existingPost = await prisma.post.findFirst({
            where: {
                authorId: session.user.id,
                title: validatedData.title,
                createdAt: {
                    gte: new Date(Date.now() - 30 * 1000), // 30 seconds
                },
            },
        });

        if (existingPost) {
            return { success: true, post: existingPost };
        }

        const newPost = await prisma.post.create({
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

        return { success: true, post: newPost };
    } catch (error) {
        console.error('[create-post/createPostAction]:', error);

        if (isDev) throw error;

        if (error instanceof z.ZodError) {
            const userMessage = getFirstZodErrorMessage(error);
            throw new Error(userMessage || 'Invalid data');
        }

        throw new Error('Failed to create post. Please try again later.');
    }
}
