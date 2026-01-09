import { AUTHOR_SELECT, MOCK_COMPLEX_FULL } from '@/tests/__fixtures__/complex.fixture';
import { DeepMockProxy } from 'jest-mock-extended';
import { prisma } from '@/lib/data-access/db';
import { PrismaClient } from '@/generated/prisma';
import { fetchComplex, fetchComplexes, fetchComplexesSpecsCallback } from '@/lib/data-access/queries/complexes';

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
                        include: {
                            author: {
                                select: AUTHOR_SELECT,
                            },
                        },
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
                        include: {
                            author: {
                                select: AUTHOR_SELECT,
                            },
                        },
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
                        include: {
                            author: {
                                select: AUTHOR_SELECT,
                            },
                        },
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

describe('fetchComplexes', () => {
    const createMockComplexes = (count: number) =>
        Array.from({ length: count }, (_, i) => ({
            id: `${i + 1}`,
            slug: `complex-${i + 1}`,
            name: `Complex ${i + 1}`,
            address: `Address ${i + 1}`,
        }));

    const SELECT_FIELDS = {
        id: true,
        slug: true,
        name: true,
        address: true,
    };

    const ORDER_BY = { name: 'asc' as const };

    const DEFAULT_LIMIT = 10;
    const DEFAULT_OFFSET = 0;
    const DEFAULT_PARAMS = { search: '' };

    const DEFAULT_PRISMA_CALL = {
        where: undefined,
        select: SELECT_FIELDS,
        orderBy: ORDER_BY,
        take: DEFAULT_LIMIT + 1,
        skip: DEFAULT_OFFSET,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('happy path', () => {
        it('should return complexes without search and hasMore false', async () => {
            const mockComplexes = createMockComplexes(3);

            // @ts-expect-error only for test purposes
            prismaMock.complex.findMany.mockResolvedValue(mockComplexes);

            const result = await fetchComplexes({
                limit: DEFAULT_LIMIT,
                offset: DEFAULT_OFFSET,
                params: DEFAULT_PARAMS,
            });

            expect(result).toEqual({
                results: mockComplexes,
                hasMore: false,
            });

            expect(prismaMock.complex.findMany).toHaveBeenCalledTimes(1);
            expect(prismaMock.complex.findMany).toHaveBeenCalledWith(DEFAULT_PRISMA_CALL);
        });

        it('should return filtered complexes when search is provided', async () => {
            const searchTerm = 'Complex';
            const params = { search: searchTerm };

            const mockComplexes = createMockComplexes(2);

            // @ts-expect-error only for test purposes
            prismaMock.complex.findMany.mockResolvedValue(mockComplexes);

            const result = await fetchComplexes({
                limit: DEFAULT_LIMIT,
                offset: DEFAULT_OFFSET,
                params,
            });

            expect(result).toEqual({
                results: mockComplexes,
                hasMore: false,
            });

            expect(prismaMock.complex.findMany).toHaveBeenCalledTimes(1);
            expect(prismaMock.complex.findMany).toHaveBeenCalledWith({
                where: {
                    OR: [
                        { name: { contains: searchTerm, mode: 'insensitive' } },
                        { address: { contains: searchTerm, mode: 'insensitive' } },
                    ],
                },
                select: SELECT_FIELDS,
                orderBy: ORDER_BY,
                take: DEFAULT_LIMIT + 1,
                skip: DEFAULT_OFFSET,
            });
        });

        it('should return hasMore true when there are more results', async () => {
            // 11 is more than the limit
            const mockComplexes = createMockComplexes(11);

            // @ts-expect-error only for test purposes
            prismaMock.complex.findMany.mockResolvedValue(mockComplexes);

            const result = await fetchComplexes({
                limit: DEFAULT_LIMIT,
                offset: DEFAULT_OFFSET,
                params: DEFAULT_PARAMS,
            });

            expect(result).toEqual({
                results: mockComplexes.slice(0, DEFAULT_LIMIT),
                hasMore: true,
            });

            expect(prismaMock.complex.findMany).toHaveBeenCalledTimes(1);
            expect(prismaMock.complex.findMany).toHaveBeenCalledWith(DEFAULT_PRISMA_CALL);
        });
    });

    describe('edge cases', () => {
        it('should return empty array when no complexes found', async () => {
            prismaMock.complex.findMany.mockResolvedValue([]);

            const result = await fetchComplexes({
                limit: DEFAULT_LIMIT,
                offset: DEFAULT_OFFSET,
                params: DEFAULT_PARAMS,
            });

            expect(result).toEqual({
                results: [],
                hasMore: false,
            });

            expect(prismaMock.complex.findMany).toHaveBeenCalledTimes(1);
            expect(prismaMock.complex.findMany).toHaveBeenCalledWith(DEFAULT_PRISMA_CALL);
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

        it('should throw error when validation fails', async () => {
            const invalidLimit = 0;

            await expect(
                fetchComplexes({
                    limit: invalidLimit,
                    offset: DEFAULT_OFFSET,
                    params: DEFAULT_PARAMS,
                })
            ).rejects.toThrow('Failed to fetch complexes. Please try again later.');

            expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
            expect(consoleErrorSpy).toHaveBeenCalledWith(
                '[queries/fetchComplexes]: Error fetching complexes:',
                expect.any(Error)
            );
            expect(prismaMock.complex.findMany).not.toHaveBeenCalled();
        });

        it('should throw error when prisma fails', async () => {
            const dbError = new Error('Database connection error');
            prismaMock.complex.findMany.mockRejectedValue(dbError);

            await expect(
                fetchComplexes({
                    limit: DEFAULT_LIMIT,
                    offset: DEFAULT_OFFSET,
                    params: DEFAULT_PARAMS,
                })
            ).rejects.toThrow('Failed to fetch complexes. Please try again later.');

            expect(prismaMock.complex.findMany).toHaveBeenCalledTimes(1);
            expect(prismaMock.complex.findMany).toHaveBeenCalledWith(DEFAULT_PRISMA_CALL);
            expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
            expect(consoleErrorSpy).toHaveBeenCalledWith(
                '[queries/fetchComplexes]: Error fetching complexes:',
                dbError
            );
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
