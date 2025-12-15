import { z } from 'zod';

export const e164PhoneNumber = (message = 'Invalid E.164 number') =>
    z
        .string()
        .optional()
        .refine((val) => {
            if (!val) return true; // empty value is allowed
            return /^\+[1-9]\d{1,14}$/.test(val); // E.164 check
        }, message);

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
    title: z.string().trim().min(3, 'Title is required').max(40, 'Title is too long'),
    shortText: z.string().trim().min(3, 'Short text is required').max(80, 'Short text is too long'),
    fullText: z.string().trim().min(3, 'Text is required').max(500, 'Text is too long'),
    complex: z.string(),
    category: z.string(),
    phone: e164PhoneNumber(),
    whatsapp: e164PhoneNumber(),
    // img: z.string().optional(),
});
