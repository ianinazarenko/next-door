import 'server-only';

import { z } from 'zod';
import he from 'he';
import sanitizeHtml from 'sanitize-html';
import { createPostSchema } from '@/utils/validation/schemas';

const sanitizeOptions: sanitizeHtml.IOptions = {
    allowedTags: [], // Strip all tags (text only)
    allowedAttributes: {},
};

// Reusable sanitizer schema
const sanitizedString = z.string().transform((val) => {
    const clean = sanitizeHtml(val, sanitizeOptions);
    return he.decode(clean);
});

/**
 * Server-side schema that extends the client schema.
 * It sanitizes inputs FIRST, then applies the original validation rules (length, etc.).
 * This ensures that if sanitization removes content (e.g., '<b>Hi</b>' -> 'Hi'),
 * the length checks (min 3) will correctly fail on the clean data.
 */
export const createPostServerSchema = createPostSchema.extend({
    title: sanitizedString.pipe(createPostSchema.shape.title),
    shortText: sanitizedString.pipe(createPostSchema.shape.shortText),
    fullText: sanitizedString.pipe(createPostSchema.shape.fullText),
});
