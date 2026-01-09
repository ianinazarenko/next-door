import { DEFAULT_CREATE_POST, DEFAULT_DB_POST, MOCK_DATE } from '@/tests/__fixtures__/post.fixture';
import { DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@/generated/prisma';
import { prisma } from '@/lib/data-access/db';
import { z } from 'zod';
import { ERole } from '@/utils/constants/users';
import { Session } from 'next-auth';

jest.mock('@/lib/data-access/db.ts');
jest.mock('@/lib/auth', () => ({
    auth: jest.fn(),
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { createPostAction } = require('@/lib/actions/create-post');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { auth } = require('@/lib/auth');

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
const mockAuth = auth as unknown as jest.MockedFunction<() => Promise<Session | null>>;

describe('createPostAction', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        jest.setSystemTime(MOCK_DATE);
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    beforeEach(() => {
        jest.clearAllMocks();
        // Mock authenticated user session
        mockAuth.mockResolvedValue({
            user: {
                id: 'test-user-id',
                role: ERole.User,
                name: 'Test User',
                email: 'test@example.com',
            },
            expires: '2025-12-15T10:00:00.000Z', // 1 day after MOCK_DATE
        });
    });

    it('happy path: should create a post', async () => {
        const { category: categorySlug, complex: complexSlug, ...validData } = DEFAULT_CREATE_POST;

        const expectedPost = {
            ...validData,
            ...DEFAULT_DB_POST,
            authorId: 'test-user-id',
            categorySlug,
            complexSlug,
        };

        prismaMock.post.create.mockResolvedValue(expectedPost);

        const result = await createPostAction(DEFAULT_CREATE_POST);

        expect(prismaMock.post.create).toHaveBeenCalledTimes(1);
        expect(prismaMock.post.create).toHaveBeenCalledWith({
            data: {
                ...validData,
                author: {
                    connect: {
                        id: 'test-user-id',
                    },
                },
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
        });

        describe('authentication error', () => {
            it('should throw specific error in dev mode when user is not authenticated', async () => {
                Object.defineProperty(process.env, 'NODE_ENV', { value: 'development' });
                mockAuth.mockResolvedValue(null);

                await expect(createPostAction(DEFAULT_CREATE_POST)).rejects.toThrow(
                    'Not authenticated. Please sign in to create a post.'
                );
                expect(prismaMock.post.create).not.toHaveBeenCalled();
            });

            it('should throw generic error in prod mode when user is not authenticated', async () => {
                Object.defineProperty(process.env, 'NODE_ENV', { value: 'production' });
                mockAuth.mockResolvedValue(null);

                await expect(createPostAction(DEFAULT_CREATE_POST)).rejects.toThrow(
                    'Failed to create post. Please try again later.'
                );
                expect(prismaMock.post.create).not.toHaveBeenCalled();
            });
        });

        describe('validation error', () => {
            it('should throw an error for dev mode if validation fails', async () => {
                Object.defineProperty(process.env, 'NODE_ENV', { value: 'development' });

                const invalidData = { ...DEFAULT_CREATE_POST, title: '' };
                await expect(createPostAction(invalidData)).rejects.toThrow(z.ZodError);
                expect(prismaMock.post.create).not.toHaveBeenCalled();
                expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
            });

            it('should throw an error for prod mode if validation fails', async () => {
                Object.defineProperty(process.env, 'NODE_ENV', { value: 'production' });

                const invalidData = { ...DEFAULT_CREATE_POST, title: '' };
                await expect(createPostAction(invalidData)).rejects.toThrow('title: Title is required');
                expect(prismaMock.post.create).not.toHaveBeenCalled();
                expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
            });
        });

        describe('DB error', () => {
            const dbError = new Error('Database connection failed');

            beforeAll(() => {
                prismaMock.post.create.mockRejectedValue(dbError);
            });

            it('should throw an error if prisma throws an error', async () => {
                Object.defineProperty(process.env, 'NODE_ENV', { value: 'development' });

                await expect(createPostAction(DEFAULT_CREATE_POST)).rejects.toThrow(dbError);
                expect(prismaMock.post.create).toHaveBeenCalledTimes(1);
                expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(String), dbError);
            });

            it('should throw an error for prod if prisma throws an error', async () => {
                Object.defineProperty(process.env, 'NODE_ENV', { value: 'production' });

                await expect(createPostAction(DEFAULT_CREATE_POST)).rejects.toThrow(
                    'Failed to create post. Please try again later.'
                );
                expect(prismaMock.post.create).toHaveBeenCalledTimes(1);
                expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(String), dbError);
            });
        });
    });
});
