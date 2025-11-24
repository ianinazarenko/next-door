'use server';

import { TSchema } from '@/types/forms';
import { z } from 'zod';
import { prisma } from '@/lib/data-access/db';
import { createPostSchema } from '@/utils/validation/schemas';

export async function createPostAction(data: TSchema) {
    const isDev = process.env.NODE_ENV === 'development';
    try {
        const validatedData = createPostSchema.parse(data);

        const newPost = await prisma.post.create({
            data: {
                ...validatedData,
                authorName: 'Random User', // for MVP only
                category: {
                    connect: {
                        slug: validatedData.category,
                    },
                },
                complex: {
                    connect: {
                        slug: validatedData.complex,
                    },
                },
            },
        });

        return { success: true, post: newPost };
    } catch (error) {
        console.error('[create-post/createPostAction]:', error);

        if (isDev) {
            throw error instanceof Error ? error : new Error(String(error));
        } else {
            throw error instanceof z.ZodError
                ? new Error('Invalid data')
                : new Error('Failed to create post. Please try again later.');
        }
    }
}
