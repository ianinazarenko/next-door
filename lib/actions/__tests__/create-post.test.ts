import { ERole } from '@/utils/constants/users';
import { DEFAULT_CREATE_POST, DEFAULT_DB_POST, MOCK_DATE } from '@/tests/__fixtures__/post.fixture';
import { DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@/generated/prisma';
import { prisma } from '@/lib/data-access/db';
import { z } from 'zod';
import { Session } from 'next-auth';

jest.mock('@/lib/data-access/db.ts');
jest.mock('@/lib/auth/auth', () => ({
    auth: jest.fn(),
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { createPostAction } = require('@/lib/actions/create-post');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { auth } = require('@/lib/auth/auth');

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
const mockAuth = auth as unknown as jest.MockedFunction<() => Promise<Session | null>>;

describe('createPostAction', () => {
    const originalNodeEnv = process.env.NODE_ENV;

    beforeAll(() => {
        jest.useFakeTimers();
        jest.setSystemTime(MOCK_DATE);
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    let consoleErrorSpy: jest.SpyInstance;

    beforeEach(() => {
        jest.clearAllMocks();
        // Keep test output clean: expected errors are asserted explicitly in tests.
        // eslint-disable-next-line
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
        Object.defineProperty(process.env, 'NODE_ENV', { value: originalNodeEnv });
    });

    describe('when user is NOT authenticated', () => {
        it('should throw auth error', async () => {
            mockAuth.mockResolvedValue(null);

            await expect(createPostAction(DEFAULT_CREATE_POST)).rejects.toThrow(
                'Not authenticated. Please sign in to create a post.'
            );

            expect(prismaMock.$transaction).not.toHaveBeenCalled();
            expect(prismaMock.post.create).not.toHaveBeenCalled();
        });
    });

    describe('when user IS authenticated', () => {
        beforeEach(() => {
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

            // Interactive transaction: run callback with tx = prismaMock
            prismaMock.$transaction.mockImplementation((tx) => tx(prismaMock));
            // Advisory lock: default to acquired
            prismaMock.$queryRaw.mockResolvedValue([{ locked: true }]);
            // Rate limit: default to under the limit
            prismaMock.post.count.mockResolvedValue(0);
            // Deduplication: default to no existing post
            prismaMock.post.findFirst.mockResolvedValue(null);
        });

        describe('concurrency guard (advisory lock)', () => {
            it('should fail fast if create-post lock is already held', async () => {
                prismaMock.$queryRaw.mockResolvedValue([{ locked: false }]);

                await expect(createPostAction(DEFAULT_CREATE_POST)).rejects.toThrow(
                    'Post creation is already in progress. Please try again.'
                );
                expect(prismaMock.post.count).not.toHaveBeenCalled();
                expect(prismaMock.post.findFirst).not.toHaveBeenCalled();
                expect(prismaMock.post.create).not.toHaveBeenCalled();
            });
        });

        describe('rate limiting', () => {
            it('should reject when user exceeds RATE_LIMIT_MAX', async () => {
                prismaMock.post.count.mockResolvedValue(3);

                await expect(createPostAction(DEFAULT_CREATE_POST)).rejects.toThrow(
                    'You are posting too frequently. Please wait a minute.'
                );
                expect(prismaMock.post.count).toHaveBeenCalledTimes(1);
                expect(prismaMock.post.findFirst).not.toHaveBeenCalled();
                expect(prismaMock.post.create).not.toHaveBeenCalled();
            });
        });

        describe('deduplication', () => {
            it('should return existing post and not create a new one', async () => {
                const { category: categorySlug, complex: complexSlug, ...validData } = DEFAULT_CREATE_POST;

                const existingPost = {
                    ...validData,
                    ...DEFAULT_DB_POST,
                    authorId: 'test-user-id',
                    categorySlug,
                    complexSlug,
                };

                prismaMock.post.findFirst.mockResolvedValue(existingPost);

                const result = await createPostAction(DEFAULT_CREATE_POST);

                expect(prismaMock.post.findFirst).toHaveBeenCalledTimes(1);
                expect(prismaMock.post.create).not.toHaveBeenCalled();
                expect(result).toEqual({ success: true, post: existingPost });
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

            // Verify deduplication check happens before creation
            expect(prismaMock.post.findFirst).toHaveBeenCalledTimes(1);
            expect(prismaMock.post.create).toHaveBeenCalledTimes(1);
            const findFirstCallOrder = prismaMock.post.findFirst.mock.invocationCallOrder[0];
            const createCallOrder = prismaMock.post.create.mock.invocationCallOrder[0];
            expect(findFirstCallOrder).toBeLessThan(createCallOrder);

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

        describe('validation error', () => {
            it('should throw an error for dev mode if validation fails', async () => {
                Object.defineProperty(process.env, 'NODE_ENV', { value: 'development' });

                const invalidData = { ...DEFAULT_CREATE_POST, title: '' };
                await expect(createPostAction(invalidData)).rejects.toThrow(z.ZodError);
                expect(prismaMock.post.create).not.toHaveBeenCalled();
            });

            it('should throw an error for prod mode if validation fails', async () => {
                Object.defineProperty(process.env, 'NODE_ENV', { value: 'production' });

                const invalidData = { ...DEFAULT_CREATE_POST, title: '' };
                await expect(createPostAction(invalidData)).rejects.toThrow('title: Title is required');
                expect(prismaMock.post.create).not.toHaveBeenCalled();
            });
        });

        describe('DB error', () => {
            const dbError = new Error('Database connection failed');

            it('should throw an error if prisma throws an error', async () => {
                Object.defineProperty(process.env, 'NODE_ENV', { value: 'development' });

                prismaMock.post.create.mockRejectedValue(dbError);
                await expect(createPostAction(DEFAULT_CREATE_POST)).rejects.toThrow(dbError);
                expect(prismaMock.post.create).toHaveBeenCalledTimes(1);
            });

            it('should throw an error for prod if prisma throws an error', async () => {
                Object.defineProperty(process.env, 'NODE_ENV', { value: 'production' });

                prismaMock.post.create.mockRejectedValue(dbError);
                await expect(createPostAction(DEFAULT_CREATE_POST)).rejects.toThrow(
                    'Failed to create post. Please try again later.'
                );
                expect(prismaMock.post.create).toHaveBeenCalledTimes(1);
            });
        });
    });
});
