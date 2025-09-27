import { z } from 'zod';

export const postsQuerySchema = z.object({
    limit: z.number().min(1).max(100),
    offset: z.number().min(0),
    params: z.object({
        category: z.string().optional(),
        complex: z.string().optional(),
    }),
});

export const complexesQuerySchema = z.object({
    limit: z.number().min(1).max(100),
    offset: z.number().min(0),
    search: z.string().optional(),
});

export const createPostSchema = z.object({
    title: z.string().min(3, 'Title is required').max(10, 'Title is too long'),
    shortText: z.string().min(3, 'Short text is required').max(50, 'Short text is too long'),
    fullText: z.string().min(3, 'Text is required').max(500, 'Text is too long'),
    complex: z.string(),
    category: z.string(),
    phone: z.e164().optional(),
    whatsApp: z.e164().optional(),
    // img: z.string().optional(),
});
