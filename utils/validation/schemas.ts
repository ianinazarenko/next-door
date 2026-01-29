import { HTML_TAGS_ERROR } from '@/utils/constants/errors';
import { z } from 'zod';
import { hasHtmlTags } from '@/utils/helpers/text-utils';

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
    search: z.string().max(100).optional(),
});

export const createPostSchema = z.object({
    title: z
        .string()
        .refine((val) => !hasHtmlTags(val), HTML_TAGS_ERROR)
        .trim()
        .nonempty('Title is required')
        .min(3, 'Title should be more than 2 chars')
        .max(40, 'Title is too long'),

    shortText: z
        .string()
        .refine((val) => !hasHtmlTags(val), HTML_TAGS_ERROR)
        .trim()
        .nonempty('Short text is required')
        .min(3, 'Short text should be more than 2 chars')
        .max(80, 'Short text is too long'),

    fullText: z
        .string()
        .refine((val) => !hasHtmlTags(val), HTML_TAGS_ERROR)
        .trim()
        .nonempty('Text is required')
        .min(3, 'Text should be more than 2 chars')
        .max(500, 'Text is too long'),

    complex: z.string().nonempty('Complex is required'),
    category: z.string().nonempty('Category is required'),
    // img: z.string().optional(),
});
