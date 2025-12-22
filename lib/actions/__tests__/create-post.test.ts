import { DEFAULT_CREATE_POST, DEFAULT_DB_POST, MOCK_DATE } from '@/tests/__fixtures__/post.fixture';
import { DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@/generated/prisma';
import { prisma } from '@/lib/data-access/db';
import { createPostAction } from '@/lib/actions/create-post';
import { z } from 'zod';

jest.mock('@/lib/data-access/db.ts');

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

describe('createPostAction', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        jest.setSystemTime(MOCK_DATE);
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    beforeEach(() => jest.clearAllMocks());

    it('happy path: should create a post', async () => {
        const { category: categorySlug, complex: complexSlug, ...validData } = DEFAULT_CREATE_POST;

        const expectedPost = {
            ...validData,
            ...DEFAULT_DB_POST,

            categorySlug,
            complexSlug,
        };

        prismaMock.post.create.mockResolvedValue(expectedPost);

        const result = await createPostAction(DEFAULT_CREATE_POST);

        expect(prismaMock.post.create).toHaveBeenCalledTimes(1);
        expect(prismaMock.post.create).toHaveBeenCalledWith({
            data: {
                ...DEFAULT_CREATE_POST,
                authorName: 'Random User', // for MVP only
                category: {
                    connect: {
                        slug: DEFAULT_CREATE_POST.category,
                    },
                },
                complex: {
                    connect: {
                        slug: DEFAULT_CREATE_POST.complex,
                    },
                },
            },
        });
        expect(result).toEqual({ success: true, post: expectedPost });
    });

    it('edge case: should create a post without phone and whatsapp', async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { phone, whatsapp, ...validData } = DEFAULT_CREATE_POST;

        const expectedPost = {
            ...validData,
            ...DEFAULT_DB_POST,

            complexSlug: validData.complex,
            categorySlug: validData.category,

            phone: null,
            whatsapp: null,
        };

        prismaMock.post.create.mockResolvedValue(expectedPost);

        const result = await createPostAction(validData);

        expect(prismaMock.post.create).toHaveBeenCalledTimes(1);
        expect(prismaMock.post.create).toHaveBeenCalledWith({
            data: {
                ...validData,
                authorName: 'Random User', // for MVP only
                category: {
                    connect: {
                        slug: validData.category,
                    },
                },
                complex: {
                    connect: {
                        slug: validData.complex,
                    },
                },
            },
        });
        expect(result).toEqual({ success: true, post: expectedPost });
    });

    describe('sad path', () => {
        const originalNodeEnv = process.env.NODE_ENV;
        let consoleErrorSpy: jest.SpyInstance;

        beforeEach(() => {
            // eslint-disable-next-line no-empty-function
            consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        });

        afterEach(() => {
            consoleErrorSpy.mockRestore();
        });

        afterAll(() => {
            Object.defineProperty(process.env, 'NODE_ENV', { value: originalNodeEnv });
            consoleErrorSpy.mockRestore();
        });

        it('sad path: should throw an error for dev mode if validation fails', async () => {
            Object.defineProperty(process.env, 'NODE_ENV', { value: 'development' });

            const invalidData = { ...DEFAULT_CREATE_POST, title: '' };
            await expect(createPostAction(invalidData)).rejects.toThrow(z.ZodError);
            expect(prismaMock.post.create).not.toHaveBeenCalled();
            expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        });

        it('sad path: should throw an error for prod mode if validation fails', async () => {
            Object.defineProperty(process.env, 'NODE_ENV', { value: 'production' });

            const invalidData = { ...DEFAULT_CREATE_POST, title: '' };
            await expect(createPostAction(invalidData)).rejects.toThrow('Invalid data');
            expect(prismaMock.post.create).not.toHaveBeenCalled();
            expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        });
    });
});
