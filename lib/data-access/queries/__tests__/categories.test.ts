import { DeepMockProxy } from 'jest-mock-extended';
import { prisma } from '@/lib/data-access/db';
import { PrismaClient } from '@/generated/prisma';
import { fetchCategoriesSpecsCallback } from '@/lib/data-access/queries/categories';

jest.mock('@/lib/data-access/db.ts');

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

const DB_RESULT = [
    { slug: 'buy', name: 'Buy', id: 'adfaefaefdf' },
    { slug: 'sell', name: 'Sell', id: 'asdfadsfadf' },
];

const SPECS = [
    { value: 'buy', label: 'Buy' },
    { value: 'sell', label: 'Sell' },
];

const ALL_OPTION = { label: 'All Categories', value: '' };

const CATEGORY_ARGS = {
    select: {
        slug: true,
        name: true,
    },
};

describe('fetchCategoriesSpecsCallback', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('happy path', () => {
        it('should return correct array with all option', async () => {
            const hasAllOption = true;
            prismaMock.category.findMany.mockResolvedValue(DB_RESULT);

            const result = await fetchCategoriesSpecsCallback(hasAllOption);

            expect(prismaMock.category.findMany).toHaveBeenCalledTimes(1);
            expect(prismaMock.category.findMany).toHaveBeenCalledWith(CATEGORY_ARGS);

            expect(result).toEqual([ALL_OPTION, ...SPECS]);
        });

        it('should return correct array without all option', async () => {
            const hasAllOption = false;
            prismaMock.category.findMany.mockResolvedValue(DB_RESULT);

            const result = await fetchCategoriesSpecsCallback(hasAllOption);

            expect(prismaMock.category.findMany).toHaveBeenCalledTimes(1);
            expect(prismaMock.category.findMany).toHaveBeenCalledWith(CATEGORY_ARGS);

            expect(result).toEqual(SPECS);
        });
    });

    describe('edge cases', () => {
        it('should return only all option when DB returns empty array', async () => {
            const hasAllOption = true;
            prismaMock.category.findMany.mockResolvedValue([]);

            const result = await fetchCategoriesSpecsCallback(hasAllOption);

            expect(prismaMock.category.findMany).toHaveBeenCalledTimes(1);
            expect(prismaMock.category.findMany).toHaveBeenCalledWith(CATEGORY_ARGS);
            expect(result).toEqual([ALL_OPTION]);
        });

        it('should return empty array when DB returns empty array and no all option', async () => {
            const hasAllOption = false;
            prismaMock.category.findMany.mockResolvedValue([]);

            const result = await fetchCategoriesSpecsCallback(hasAllOption);

            expect(prismaMock.category.findMany).toHaveBeenCalledTimes(1);
            expect(prismaMock.category.findMany).toHaveBeenCalledWith(CATEGORY_ARGS);
            expect(result).toEqual([]);
        });
    });

    describe('sad path', () => {
        let consoleErrorSpy: jest.SpyInstance;

        beforeEach(() => {
            // eslint-disable-next-line no-empty-function
            consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        });

        afterEach(() => {
            consoleErrorSpy.mockRestore();
        });

        it('should throw error if prisma throws an error', async () => {
            const hasAllOption = true;
            const dbError = new Error('DB connection error');
            prismaMock.category.findMany.mockRejectedValue(dbError);

            await expect(fetchCategoriesSpecsCallback(hasAllOption)).rejects.toThrow(
                'Failed to fetch categories specs'
            );
            expect(prismaMock.category.findMany).toHaveBeenCalledTimes(1);
            expect(prismaMock.category.findMany).toHaveBeenCalledWith(CATEGORY_ARGS);
            expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(String), dbError);
        });
    });
});
