import { z } from 'zod';
import { getFirstZodErrorMessage } from '../zod-utils';

describe('getFirstZodErrorMessage', () => {
    describe('happy path', () => {
        it('should return formatted error message with field name', () => {
            const schema = z.object({
                title: z.string().min(3, 'Title should be more than 2 chars'),
            });
            const result = schema.safeParse({ title: 'ab' });

            if (!result.success) {
                const message = getFirstZodErrorMessage(result.error);
                expect(message).toBe('title: Title should be more than 2 chars');
            }
        });

        it('should handle nested field paths', () => {
            const schema = z.object({
                user: z.object({
                    name: z.string().nonempty('Name is required'),
                }),
            });
            const result = schema.safeParse({ user: { name: '' } });

            if (!result.success) {
                const message = getFirstZodErrorMessage(result.error);
                expect(message).toBe('user.name: Name is required');
            }
        });
    });

    describe('edge cases', () => {
        it('should return error message without field name when path is empty', () => {
            // Error without field path
            const error = new z.ZodError([
                {
                    code: 'custom',
                    path: [],
                    message: 'Custom validation error',
                },
            ]);

            const message = getFirstZodErrorMessage(error);
            expect(message).toBe('Custom validation error');
        });

        it('should return undefined when there are no issues', () => {
            // Empty issues array
            const error = new z.ZodError([]);

            const message = getFirstZodErrorMessage(error);
            expect(message).toBeUndefined();
        });
    });
});
