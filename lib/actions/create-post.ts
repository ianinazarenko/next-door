'use server';

import { TSchema } from '@/types/forms';
import { z } from 'zod';
import { prisma } from '@/lib/data-access/db';
import { createPostSchema } from '@/utils/validation/schemas';
import { auth } from '@/lib/auth';
import { getFirstZodErrorMessage } from '@/utils/helpers/zod-utils';

export async function createPostAction(data: TSchema) {
    const isDev = process.env.NODE_ENV === 'development';
    try {
        const session = await auth();

        if (!session?.user?.id) {
            throw new Error('Not authenticated. Please sign in to create a post.');
        }

        const { category, complex, ...validatedData } = createPostSchema.parse(data);

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
