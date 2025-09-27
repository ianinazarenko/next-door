import { z } from 'zod';
import { createPostSchema } from '@/utils/validation/schemas';

export type TSchema = z.infer<typeof createPostSchema>;

export interface INewPostField {
    name: keyof TSchema;
    label: string;
    is: React.ElementType;
    placeholder?: string;
    specs?: string[];
    className?: string;
    rows?: number;
}
