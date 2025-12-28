import { MOCK_COMPLEX_FULL } from '@/tests/__fixtures__/complex.fixture';
import { DeepMockProxy } from 'jest-mock-extended';
import { prisma } from '@/lib/data-access/db';
import { PrismaClient } from '@/generated/prisma';
import { fetchComplex, fetchComplexesSpecsCallback } from '@/lib/data-access/queries/complexes';

jest.mock('@/lib/data-access/db.ts');

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

describe('fetchComplex', () => {
    const SLUG = 'residential-complex-1';
    const DB_RESULT = MOCK_COMPLEX_FULL;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('happy path', () => {
        it('should return correct complex', async () => {
            // @ts-expect-error only for test purposes
            prismaMock.complex.findUnique.mockResolvedValue(DB_RESULT);

            const result = await fetchComplex(SLUG);

            expect(prismaMock.complex.findUnique).toHaveBeenCalledTimes(1);
            expect(prismaMock.complex.findUnique).toHaveBeenCalledWith({
                where: { slug: SLUG },
                include: {
                    posts: {
                        orderBy: { createdAt: 'desc' },
                        take: 10,
                    },
                    managementCompany: true,
                    usefulPhones: true,
                },
            });

            expect(result).toEqual(DB_RESULT);
        });
    });

    describe('edge cases', () => {
        it('should return null when complex is not found', async () => {
            prismaMock.complex.findUnique.mockResolvedValue(null);

            const result = await fetchComplex(SLUG);

            expect(result).toBeNull();
            expect(prismaMock.complex.findUnique).toHaveBeenCalledTimes(1);
            expect(prismaMock.complex.findUnique).toHaveBeenCalledWith({
                where: { slug: SLUG },
                include: {
                    posts: {
                        orderBy: { createdAt: 'desc' },
                        take: 10,
                    },
                    managementCompany: true,
                    usefulPhones: true,
                },
            });
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

        it('should throw error when slug is not provided', async () => {
            const emptySlug = '';

            await expect(fetchComplex(emptySlug)).rejects.toThrow('Slug is required to fetch complex');

            expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
            expect(consoleErrorSpy).toHaveBeenCalledWith('[queries/fetchComplex]: Error fetching complex:', {
                slug: 'empty',
                error: expect.any(Error),
            });
            expect(prismaMock.complex.findUnique).not.toHaveBeenCalled();
        });

        it('should throw error when prisma throws an error', async () => {
            const dbError = new Error('Database connection error');
            prismaMock.complex.findUnique.mockRejectedValue(dbError);

            await expect(fetchComplex(SLUG)).rejects.toThrow(dbError);

            expect(prismaMock.complex.findUnique).toHaveBeenCalledTimes(1);
            expect(prismaMock.complex.findUnique).toHaveBeenCalledWith({
                where: { slug: SLUG },
                include: {
                    posts: {
                        orderBy: { createdAt: 'desc' },
                        take: 10,
                    },
                    managementCompany: true,
                    usefulPhones: true,
                },
            });
            expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
            expect(consoleErrorSpy).toHaveBeenCalledWith('[queries/fetchComplex]: Error fetching complex:', {
                slug: SLUG,
                error: dbError,
            });
        });
    });
});

describe('fetchComplexesSpecsCallback', () => {
    const DB_RESULT = [{ slug: 'slug', name: 'Name', id: 'adfaefaefdf' }];

    const SPECS = [{ value: 'slug', label: 'Name' }];

    const ALL_OPTION = { label: 'All Complexes', value: '' };

    const COMPLEX_ARGS = {
        select: {
            id: true,
            slug: true,
            name: true,
        },
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('happy path', () => {
        it('should return correct array with all option', async () => {
            const hasAllOption = true;
            // @ts-expect-error only for test purposes
            prismaMock.complex.findMany.mockResolvedValue(DB_RESULT);

            const result = await fetchComplexesSpecsCallback(hasAllOption);

            expect(prismaMock.complex.findMany).toHaveBeenCalledTimes(1);
            expect(prismaMock.complex.findMany).toHaveBeenCalledWith(COMPLEX_ARGS);

            expect(result).toEqual([ALL_OPTION, ...SPECS]);
        });

        it('should return correct array without all option', async () => {
            const hasAllOption = false;
            // @ts-expect-error only for test purposes
            prismaMock.complex.findMany.mockResolvedValue(DB_RESULT);

            const result = await fetchComplexesSpecsCallback(hasAllOption);

            expect(prismaMock.complex.findMany).toHaveBeenCalledTimes(1);
            expect(prismaMock.complex.findMany).toHaveBeenCalledWith(COMPLEX_ARGS);

            expect(result).toEqual(SPECS);
        });
    });

    describe('edge cases', () => {
        it('should return only all option when DB returns empty array', async () => {
            const hasAllOption = true;
            prismaMock.complex.findMany.mockResolvedValue([]);

            const result = await fetchComplexesSpecsCallback(hasAllOption);

            expect(prismaMock.complex.findMany).toHaveBeenCalledTimes(1);
            expect(prismaMock.complex.findMany).toHaveBeenCalledWith(COMPLEX_ARGS);
            expect(result).toEqual([ALL_OPTION]);
        });

        it('should return empty array when DB returns empty array and no all option', async () => {
            const hasAllOption = false;
            prismaMock.complex.findMany.mockResolvedValue([]);

            const result = await fetchComplexesSpecsCallback(hasAllOption);

            expect(prismaMock.complex.findMany).toHaveBeenCalledTimes(1);
            expect(prismaMock.complex.findMany).toHaveBeenCalledWith(COMPLEX_ARGS);
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
            prismaMock.complex.findMany.mockRejectedValue(dbError);

            await expect(fetchComplexesSpecsCallback(hasAllOption)).rejects.toThrow('Failed to fetch complexes specs');
            expect(prismaMock.complex.findMany).toHaveBeenCalledTimes(1);
            expect(prismaMock.complex.findMany).toHaveBeenCalledWith(COMPLEX_ARGS);
            expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(String), dbError);
        });
    });
});
