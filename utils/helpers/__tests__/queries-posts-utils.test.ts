import { buildPostsWhere } from '../queries-posts-utils';

const MOCK_DATE = new Date('2025-12-14T10:00:00.000Z');

describe('buildPostsWhere', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        jest.setSystemTime(MOCK_DATE);
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    describe('happy path', () => {
        it('should return only date condition if no params provided', () => {
            const params = {};
            // @ts-expect-error only for test purposes
            const result = buildPostsWhere(params);
            expect(result).toEqual({
                OR: [{ deadline: null }, { deadline: { gte: MOCK_DATE } }],
            });
        });

        it('should add complexSlug when complex param is provided', () => {
            const params = { complex: 'my-complex-slug' };
            // @ts-expect-error only for test purposes
            const result = buildPostsWhere(params);
            expect(result).toEqual({
                complexSlug: 'my-complex-slug',
                OR: [{ deadline: null }, { deadline: { gte: MOCK_DATE } }],
            });
        });

        it('should add categorySlug when category param is provided', () => {
            const params = { category: 'my-category-slug' };
            // @ts-expect-error only for test purposes
            const result = buildPostsWhere(params);
            expect(result).toEqual({
                categorySlug: 'my-category-slug',
                OR: [{ deadline: null }, { deadline: { gte: MOCK_DATE } }],
            });
        });

        it('should add all params when they are provided', () => {
            const params = {
                complex: 'my-complex-slug',
                category: 'my-category-slug',
            };
            const result = buildPostsWhere(params);
            expect(result).toEqual({
                complexSlug: 'my-complex-slug',
                categorySlug: 'my-category-slug',
                OR: [{ deadline: null }, { deadline: { gte: MOCK_DATE } }],
            });
        });
    });

    describe('edge cases', () => {
        it('should handle empty strings in params', () => {
            const params = { complex: '', category: 'some-category' };
            const result = buildPostsWhere(params);
            expect(result).toEqual({
                categorySlug: 'some-category',
                OR: [{ deadline: null }, { deadline: { gte: MOCK_DATE } }],
            });
        });
    });

    describe('corner cases', () => {
        it('should ignore extra properties in params object', () => {
            const params = {
                complex: 'my-slug',
                someOtherProp: 'should-be-ignored',
            };
            // @ts-expect-error only for test purposes
            const result = buildPostsWhere(params);
            expect(result).toEqual({
                complexSlug: 'my-slug',
                OR: [{ deadline: null }, { deadline: { gte: MOCK_DATE } }],
            });
            expect(result).not.toHaveProperty('someOtherProp');
        });
    });

    describe('failure cases', () => {
        it('should not throw an error if params object is null', () => {
            // @ts-expect-error only for test purposes
            expect(() => buildPostsWhere(null)).not.toThrow();
            // @ts-expect-error only for test purposes
            const result = buildPostsWhere(null);
            expect(result).toEqual({
                OR: [{ deadline: null }, { deadline: { gte: MOCK_DATE } }],
            });
        });

        it('should not throw an error if params object is undefined', () => {
            // @ts-expect-error only for test purposes
            expect(() => buildPostsWhere(undefined)).not.toThrow();
            // @ts-expect-error only for test purposes
            const result = buildPostsWhere(undefined);
            expect(result).toEqual({
                OR: [{ deadline: null }, { deadline: { gte: MOCK_DATE } }],
            });
        });
    });
});
