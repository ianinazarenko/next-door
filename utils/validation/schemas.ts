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
