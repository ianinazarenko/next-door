import { TSchema } from '@/types/forms';
import { createPostServerSchema } from '../server-schemas';
import { DEFAULT_CREATE_POST } from '@/tests/__fixtures__/post.fixture';

describe('createPostServerSchema', () => {
    describe('HTML sanitization', () => {
        const sanitizationTestCases: Array<[keyof TSchema, string, string]> = [
            ['title', '<b>Hello</b> World', 'Hello World'],
            ['shortText', '<em>Italic</em> short text here', 'Italic short text here'],
            ['fullText', '<p>Paragraph</p> full text content here', 'Paragraph full text content here'],
        ];

        it.each(sanitizationTestCases)('should strip HTML tags from %s', (field, input, expected) => {
            const result = createPostServerSchema.safeParse({
                ...DEFAULT_CREATE_POST,
                [field]: input,
            });

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data[field]).toBe(expected);
            }
        });

        it('should accept clean data without modification', () => {
            const result = createPostServerSchema.safeParse(DEFAULT_CREATE_POST);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data).toEqual(DEFAULT_CREATE_POST);
            }
        });
    });

    describe('Symbol preservation (unescaping)', () => {
        const symbolTestCases = [
            ['Price < 100', 'Price < 100'],
            ['Area > 50', 'Area > 50'],
            ['"Quoted text"', '"Quoted text"'],
            ["'Single quoted'", "'Single quoted'"],
            ['Me & You', 'Me & You'],
            ['5 < 10 & 20 > 15', '5 < 10 & 20 > 15'],

            // Numeric and Hex entities (handled by 'he')
            ['Price &#60; 100', 'Price < 100'],
            ['Symbol &#x3E;', 'Symbol >'],
            ['Copyright &copy;', 'Copyright ©'],
        ];

        it.each(symbolTestCases)('should preserve symbols in text: %s', (input, expected) => {
            const result = createPostServerSchema.safeParse({
                ...DEFAULT_CREATE_POST,
                title: input,
            });

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.title).toBe(expected);
                // Explicitly check for absence of common HTML entities
                expect(result.data.title).not.toContain('&lt;');
                expect(result.data.title).not.toContain('&#x3E;');
                expect(result.data.title).not.toContain('&amp;');
            }
        });

        // Edge case: User inputs entities manually
        it('should unescape manually entered entities (safe behavior for plain text)', () => {
            const result = createPostServerSchema.safeParse({
                ...DEFAULT_CREATE_POST,
                title: 'Price &lt; 100',
            });

            // We expect it to be converted to real symbol because we want clean text in DB
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.title).toBe('Price < 100');
            }
        });
    });

	    describe('XSS protection (advanced cases)', () => {
	        describe('stable cases (exact expected)', () => {
	            const stableCases: Array<[input: string, expected: string]> = [
	                // Basic script tag
	                ['<script>alert("xss")</script>Safe Title', 'Safe Title'],

	                // Case-insensitive tags
	                ['<SCRIPT>alert("xss")</SCRIPT>Title', 'Title'],

	                // SVG injection (popular bypass)
	                ['<svg/onload=alert("xss")>Title', 'Title'],

	                // Event handlers
	                ['<img src=x onerror="alert(1)">Title', 'Title'],

	                // Nested tags
	                ['<div><script>alert("xss")</script></div>Title', 'Title'],

	                // JavaScript protocol
	                ['<img src="javascript:alert(\'XSS\')">Title', 'Title'],

	                // This one is stable enough to keep exact
	                ['Safe Prefix <<script>alert(1)</script>> Text', 'Safe Prefix <> Text'],
	            ];

	            it.each(stableCases)('should sanitize: %s → %s', (input, expected) => {
	                const result = createPostServerSchema.safeParse({
	                    ...DEFAULT_CREATE_POST,
	                    title: input,
	                });

	                expect(result.success).toBe(true);
	                if (result.success) {
	                    expect(result.data.title).toBe(expected);
	                    expect(result.data.title).not.toMatch(/<script|<svg|onerror|javascript:/i);
	                }
	            });
	        });

	        describe('malformed HTML (invariants only)', () => {
	            const malformedCases: Array<[input: string, mustContain: string]> = [
	                // sanitize-html behavior can be slightly variable for malformed HTML
	                ['Safe Prefix <<script> Text', 'Safe Prefix'],
	                ['Safe Prefix <script>> Text', 'Safe Prefix'],
	            ];

	            it.each(malformedCases)('should sanitize: %s', (input, mustContain) => {
	            const result = createPostServerSchema.safeParse({
	                ...DEFAULT_CREATE_POST,
	                title: input,
	            });

	            expect(result.success).toBe(true);
	            if (result.success) {
	                expect(result.data.title).toContain(mustContain);
	                expect(result.data.title).not.toMatch(/<script|<svg|onerror|javascript:/i);
	            }
	        });
	        });

	        // Cases where unescaping restores dangerous tags that Zod should then catch
	        it('should reject unescaped content that becomes valid HTML tags', () => {
	            const result = createPostServerSchema.safeParse({
	                ...DEFAULT_CREATE_POST,
                title: '&lt;script&gt;alert(1)&lt;/script&gt;',
            });

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toBe('HTML tags are not allowed');
            }
        });
    });

    describe('validation after sanitization', () => {
        const validationTestCases = [
            ['title', '<b>Hi</b>', 'Title should be more than 2 chars'],
            ['shortText', '<div></div>', 'Short text is required'],
            ['fullText', '<p>   </p>', 'Text is required'],
        ];

        it.each(validationTestCases)(
            'should reject %s that becomes invalid after sanitization',
            (field, input, expectedMessage) => {
                const result = createPostServerSchema.safeParse({
                    ...DEFAULT_CREATE_POST,
                    [field]: input,
                });

                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toBe(expectedMessage);
                }
            }
        );
    });

    describe('non-sanitized fields', () => {
        it('should not sanitize complex and category fields', () => {
            const result = createPostServerSchema.safeParse({
                ...DEFAULT_CREATE_POST,
                complex: 'complex-slug',
                category: 'category-slug',
            });

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.complex).toBe('complex-slug');
                expect(result.data.category).toBe('category-slug');
            }
        });
    });
});
