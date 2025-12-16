import { e164PhoneNumber, postsQuerySchema, complexesQuerySchema } from '../schemas';

describe('e164PhoneNumber', () => {
    describe('happy path', () => {
        const phoneSchema = e164PhoneNumber();

        it('validates a correct full number', () => {
            const result = phoneSchema.safeParse('+79991234567');
            expect(result.success).toBe(true);
        });

        it('validates a number with the minimal allowed length', () => {
            const minimalNumber = '+12';
            const result = phoneSchema.safeParse(minimalNumber);
            expect(result.success).toBe(true);
        });

        it('validates a number with the maximal allowed length', () => {
            const maxLengthNumber = '+123456789012345';
            const result = phoneSchema.safeParse(maxLengthNumber);
            expect(result.success).toBe(true);
        });

        it('allows empty-ish values (undefined and empty string)', () => {
            expect(phoneSchema.safeParse(undefined).success).toBe(true);
            expect(phoneSchema.safeParse('').success).toBe(true);
        });
    });

    describe('edge cases', () => {
        const phoneSchema = e164PhoneNumber();

        it('rejects numbers that are too short', () => {
            const result = phoneSchema.safeParse('+1');
            expect(result.success).toBe(false);
            expect(result.error?.issues[0].message).toBe('Invalid E.164 number');
        });

        it('rejects numbers that exceed the maximum length', () => {
            const result = phoneSchema.safeParse('+1234567890123456'); // 16 digits
            expect(result.success).toBe(false);
            expect(result.error?.issues[0].message).toBe('Invalid E.164 number');
        });
    });

    describe('failure cases', () => {
        const phoneSchema = e164PhoneNumber();

        it('rejects null values as invalid types', () => {
            const result = phoneSchema.safeParse(null);
            expect(result.success).toBe(false);
            expect(result.error?.issues[0].message).toContain('expected string'); // результат zod
        });

        it('rejects number inputs as invalid types', () => {
            const result = phoneSchema.safeParse(79991234567);
            expect(result.success).toBe(false);
            expect(result.error?.issues[0].message).toContain('expected string');
        });

        it('rejects numbers without a leading plus and surfaces schema message', () => {
            const result = phoneSchema.safeParse('79991234567');
            expect(result.success).toBe(false);
            expect(result.error?.issues[0].message).toBe('Invalid E.164 number');
        });
    });
});

describe('postsQuerySchema', () => {
    describe('happy path', () => {
        it('accepts all params including category and complex', () => {
            const result = postsQuerySchema.safeParse({
                limit: 10,
                offset: 10,
                params: {
                    category: 'category',
                    complex: 'complex',
                },
            });

            expect(result.success).toBe(true);
            expect(result.data).toEqual({
                limit: 10,
                offset: 10,
                params: {
                    category: 'category',
                    complex: 'complex',
                },
            });
        });

        it('accepts a valid query without category', () => {
            const result = postsQuerySchema.safeParse({
                limit: 10,
                offset: 10,
                params: {
                    complex: 'complex',
                },
            });

            expect(result.success).toBe(true);
            expect(result.data).toEqual({
                limit: 10,
                offset: 10,
                params: {
                    complex: 'complex',
                },
            });
        });

        it('accepts a valid query without complex', () => {
            const result = postsQuerySchema.safeParse({
                limit: 10,
                offset: 10,
                params: {
                    category: 'category',
                },
            });

            expect(result.success).toBe(true);
            expect(result.data).toEqual({
                limit: 10,
                offset: 10,
                params: {
                    category: 'category',
                },
            });
        });
    });

    describe('edge cases', () => {
        it('allows minimal limit with other params valid', () => {
            const result = postsQuerySchema.safeParse({
                limit: 1,
                offset: 10,
                params: {},
            });

            expect(result.success).toBe(true);
            expect(result.data).toEqual({
                limit: 1,
                offset: 10,
                params: {},
            });
        });

        it('allows maximal limit with other params valid', () => {
            const result = postsQuerySchema.safeParse({
                limit: 100,
                offset: 10,
                params: {},
            });

            expect(result.success).toBe(true);
            expect(result.data).toEqual({
                limit: 100,
                offset: 10,
                params: {},
            });
        });

        it('allows minimal offset while limit is valid', () => {
            const result = postsQuerySchema.safeParse({
                limit: 10,
                offset: 0,
                params: {},
            });

            expect(result.success).toBe(true);
            expect(result.data).toEqual({
                limit: 10,
                offset: 0,
                params: {},
            });
        });
    });

    describe('sad path', () => {
        it('rejects limit below minimum bound', () => {
            expect(() =>
                postsQuerySchema.parse({
                    limit: 0,
                    offset: 10,
                    params: {},
                })
            ).toThrow();
        });

        it('rejects limit above maximum bound', () => {
            expect(() =>
                postsQuerySchema.parse({
                    limit: 101,
                    offset: 10,
                    params: {},
                })
            ).toThrow();
        });

        it('rejects negative offset', () => {
            expect(() =>
                postsQuerySchema.parse({
                    limit: 10,
                    offset: -1,
                    params: {},
                })
            ).toThrow();
        });
    });
});

describe('complexesQuerySchema', () => {
    describe('happy path', () => {
        it('validates when all query params are present', () => {
            const result = complexesQuerySchema.safeParse({
                limit: 10,
                offset: 10,
                search: 'hello',
            });

            expect(result.success).toBe(true);
            expect(result.data).toEqual({
                limit: 10,
                offset: 10,
                search: 'hello',
            });
        });

        it('validates when optional search is omitted', () => {
            const result = complexesQuerySchema.safeParse({
                limit: 10,
                offset: 10,
            });

            expect(result.success).toBe(true);
            expect(result.data).toEqual({
                limit: 10,
                offset: 10,
            });
        });
    });

    describe('edge cases', () => {
        it('allows minimal limit with other params valid', () => {
            const result = complexesQuerySchema.safeParse({
                limit: 1,
                offset: 10,
            });

            expect(result.success).toBe(true);
            expect(result.data).toEqual({ limit: 1, offset: 10 });
        });

        it('allows maximal limit with other params valid', () => {
            const result = complexesQuerySchema.safeParse({
                limit: 100,
                offset: 10,
            });

            expect(result.success).toBe(true);
            expect(result.data).toEqual({ limit: 100, offset: 10 });
        });

        it('allows minimal offset while limit is valid', () => {
            const result = complexesQuerySchema.safeParse({
                limit: 10,
                offset: 0,
            });

            expect(result.success).toBe(true);
            expect(result.data).toEqual({ limit: 10, offset: 0 });
        });
    });

    describe('sad path', () => {
        it('rejects limit below minimum bound', () => {
            expect(() =>
                complexesQuerySchema.parse({
                    limit: 0,
                    offset: 10,
                })
            ).toThrow();
        });

        it('rejects limit above maximum bound', () => {
            expect(() =>
                complexesQuerySchema.parse({
                    limit: 101,
                    offset: 10,
                })
            ).toThrow();
        });

        it('rejects negative offset', () => {
            expect(() =>
                complexesQuerySchema.parse({
                    limit: 10,
                    offset: -1,
                })
            ).toThrow();
        });
    });
});
