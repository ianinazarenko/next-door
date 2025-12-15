import { e164PhoneNumber, postsQuerySchema, complexesQuerySchema, createPostSchema } from '../schemas';

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

});

describe('complexesQuerySchema', () => {

});

describe('createPostSchema', () => {

});
