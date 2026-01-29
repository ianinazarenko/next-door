import { hasHtmlTags } from '@/utils/helpers/text-utils';

const TEXT_WITH_TAGS = '<b>Hello</b> world';
const TEXT_WITHOUT_TAGS = 'Plain text';

describe('hasHtmlTags', () => {
    describe('happy path', () => {
        it('should return true for text with html tags', () => {
            expect(hasHtmlTags(TEXT_WITH_TAGS)).toBe(true);
        });

        it('should return false for plain text', () => {
            expect(hasHtmlTags(TEXT_WITHOUT_TAGS)).toBe(false);
        });

        it('should return false for text with only < symbol', () => {
            expect(hasHtmlTags('Price < 100')).toBe(false);
        });

        it('should return false for text with only > symbol', () => {
            expect(hasHtmlTags('Price > 50')).toBe(false);
        });

        it('should return true for complete tags', () => {
            expect(hasHtmlTags('Hello <b>world')).toBe(true);
        });
    });

    describe('edge cases', () => {
        it('should return false for null, undefined and empty string', () => {
            expect(hasHtmlTags(null)).toBe(false);
            expect(hasHtmlTags(undefined)).toBe(false);
            expect(hasHtmlTags('')).toBe(false);
        });
    });
});
