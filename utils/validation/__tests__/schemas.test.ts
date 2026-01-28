import { e164PhoneNumber, postsQuerySchema, complexesQuerySchema, createPostSchema } from '../schemas';
import { DEFAULT_CREATE_POST } from '@/tests/__fixtures__/post.fixture';
import { HTML_TAGS_ERROR } from '@/utils/constants/errors';

describe('e164PhoneNumber', () => {
    describe('happy path', () => {
        const phoneSchema = e164PhoneNumber();

        it('validates a correct full number', () => {
            const result = phoneSchema.safeParse('+12025550123');
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
            const result = phoneSchema.safeParse(12025550123);
            expect(result.success).toBe(false);
            expect(result.error?.issues[0].message).toContain('expected string');
        });

        it('rejects numbers without a leading plus and surfaces schema message', () => {
            const result = phoneSchema.safeParse('12025550123');
            expect(result.success).toBe(false);
            expect(result.error?.issues[0].message).toBe('Invalid E.164 number');
        });
    });
});

describe('postsQuerySchema', () => {
    const DEFAULT_VALS = {
        limit: 10,
        offset: 10,
        params: {},
    };

    describe('happy path', () => {
        it('accepts all params including category and complex', () => {
            const payload = {
                ...DEFAULT_VALS,
                params: {
                    category: 'category',
                    complex: 'complex',
                },
            };
            const result = postsQuerySchema.safeParse(payload);

            expect(result.success).toBe(true);
            expect(result.data).toEqual(payload);
        });

        it('accepts a valid query without optional params', () => {
            const payload = {
                ...DEFAULT_VALS,
            };

            const result = postsQuerySchema.safeParse(payload);

            expect(result.success).toBe(true);
            expect(result.data).toEqual(payload);
        });
    });

    describe('edge cases', () => {
        it('allows minimal limit with other params valid', () => {
            const payload = { ...DEFAULT_VALS, limit: 1 };

            const result = postsQuerySchema.safeParse(payload);

            expect(result.success).toBe(true);
            expect(result.data).toEqual(payload);
        });

        it('allows maximal limit with other params valid', () => {
            const payload = { ...DEFAULT_VALS, limit: 100 };

            const result = postsQuerySchema.safeParse(payload);

            expect(result.success).toBe(true);
            expect(result.data).toEqual(payload);
        });

        it('allows minimal offset while limit is valid', () => {
            const payload = { ...DEFAULT_VALS, offset: 0 };
            const result = postsQuerySchema.safeParse(payload);

            expect(result.success).toBe(true);
            expect(result.data).toEqual(payload);
        });
    });

    describe('sad path', () => {
        it('rejects limit below minimum bound', () => {
            const payload = { ...DEFAULT_VALS, limit: 0 };
            expect(() => postsQuerySchema.parse(payload)).toThrow();
        });

        it('rejects limit above maximum bound', () => {
            const payload = { ...DEFAULT_VALS, limit: 101 };
            expect(() => postsQuerySchema.parse(payload)).toThrow();
        });

        it('rejects negative offset', () => {
            const payload = { ...DEFAULT_VALS, offset: -1 };
            expect(() => postsQuerySchema.parse(payload)).toThrow();
        });
    });
});

describe('complexesQuerySchema', () => {
    const DEFAULT_VALS = {
        limit: 10,
        offset: 10,
    };

    describe('happy path', () => {
        it('validates when all query params are present', () => {
            const result = complexesQuerySchema.safeParse({
                ...DEFAULT_VALS,
                search: 'hello',
            });

            expect(result.success).toBe(true);
            expect(result.data).toEqual({
                ...DEFAULT_VALS,
                search: 'hello',
            });
        });

        it('validates when optional search is omitted', () => {
            const result = complexesQuerySchema.safeParse({
                ...DEFAULT_VALS,
            });

            expect(result.success).toBe(true);
            expect(result.data).toEqual({
                ...DEFAULT_VALS,
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

        it('rejects search that exceeds maximum length', () => {
            expect(() =>
                complexesQuerySchema.parse({
                    ...DEFAULT_VALS,
                    search: 'A'.repeat(101),
                })
            ).toThrow();
        });
    });
});

describe('createPostSchema', () => {
    describe('happy path', () => {
        it('validates a default payload with all fields', () => {
            const result = createPostSchema.safeParse(DEFAULT_CREATE_POST);
            expect(result.success).toBe(true);
            expect(result.data).toEqual(DEFAULT_CREATE_POST);
        });
    });

    // ----------------- HTML tags validation --------
    describe('HTML tags validation', () => {
        const htmlTagFieldsConfig = [
            ['title', HTML_TAGS_ERROR],
            ['shortText', HTML_TAGS_ERROR],
            ['fullText', HTML_TAGS_ERROR],
        ];

        describe('should reject fields with HTML tags', () => {
            it.each(htmlTagFieldsConfig)('should reject %s with HTML tags', (field, message) => {
                const result = createPostSchema.safeParse({
                    ...DEFAULT_CREATE_POST,
                    [field]: '<b>Bold text</b>',
                });

                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe(message);
                }
            });

            it.each(htmlTagFieldsConfig)('should reject %s with script tags (XSS attempt)', (field, message) => {
                const result = createPostSchema.safeParse({
                    ...DEFAULT_CREATE_POST,
                    [field]: '<script>alert("xss")</script>Test content',
                });

                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe(message);
                }
            });

            it.each(htmlTagFieldsConfig)('should reject %s with HTML tags with attributes', (field, message) => {
                const result = createPostSchema.safeParse({
                    ...DEFAULT_CREATE_POST,
                    [field]: 'Text with <b style="color:red"> tag',
                });

                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe(message);
                }
            });
        });

        describe('should accept fields without HTML tags', () => {
            it.each(['title', 'shortText', 'fullText'])('should accept %s with clean text', (field) => {
                const result = createPostSchema.safeParse({
                    ...DEFAULT_CREATE_POST,
                    [field]: 'Clean text without any tags',
                });

                expect(result.success).toBe(true);
            });

            it.each(['title', 'shortText', 'fullText'])(
                'should accept %s with math symbols and comparisons',
                (field) => {
                    const result = createPostSchema.safeParse({
                        ...DEFAULT_CREATE_POST,
                        [field]: 'Price < 1000 and area > 50',
                    });

                    expect(result.success).toBe(true);
                }
            );
        });
    });

    // ----------------- required validation --------
    describe('required validation', () => {
        const requiredFieldsConfig = [
            ['title', 'Title is required'],
            ['shortText', 'Short text is required'],
            ['fullText', 'Text is required'],
            ['complex', 'Complex is required'],
            ['category', 'Category is required'],
        ];

        it.each(requiredFieldsConfig)('should reject empty string for required field %s', (field, message) => {
            const result = createPostSchema.safeParse({
                ...DEFAULT_CREATE_POST,
                [field]: '',
            });

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toBe(message);
            }
        });
    });

    // ----------------- minLength validation --------
    describe('minLength validation', () => {
        const minLengthFieldsConfig = [
            ['title', 3, 'Title should be more than 2 chars'],
            ['shortText', 3, 'Short text should be more than 2 chars'],
            ['fullText', 3, 'Text should be more than 2 chars'],
        ];

        it.each(minLengthFieldsConfig)(
            'should reject %s if it is shorter than minimum length',
            (field, min, message) => {
                const result = createPostSchema.safeParse({
                    ...DEFAULT_CREATE_POST,
                    [field]: 'A'.repeat((min as number) - 1),
                });

                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe(message);
                }
            }
        );
    });

    // ----------------- maxLength validation --------
    describe('maxLength validation', () => {
        const maxLengthFieldsConfig = [
            ['title', 40, 'Title is too long'],
            ['shortText', 80, 'Short text is too long'],
            ['fullText', 500, 'Text is too long'],
        ];

        it.each(maxLengthFieldsConfig)(
            'should reject %s if it is longer than maximum length',
            (field, max, message) => {
                const result = createPostSchema.safeParse({
                    ...DEFAULT_CREATE_POST,
                    [field]: 'A'.repeat((max as number) + 1),
                });

                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe(message);
                }
            }
        );
    });

    // ----------------- null & undefined validation --------
    describe('null & undefined validation', () => {
        it.each(['title', 'shortText', 'fullText', 'complex', 'category'])(
            'should reject when required field %s is undefined or null',
            (field) => {
                const resultUndefined = createPostSchema.safeParse({ ...DEFAULT_CREATE_POST, [field]: undefined });
                expect(resultUndefined.success).toBe(false);

                const resultNull = createPostSchema.safeParse({ ...DEFAULT_CREATE_POST, [field]: null });
                expect(resultNull.success).toBe(false);
            }
        );
    });
});
