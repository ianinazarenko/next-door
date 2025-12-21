import { DEFAULT_CREATE_POST, DEFAULT_DB_POST, MOCK_DATE } from '@/tests/__fixtures__/post.fixture';
import { DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@/generated/prisma';
import { prisma } from '@/lib/data-access/db';
import { createPostAction } from '@/lib/actions/create-post';

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

    it('should create a post', async () => {
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
});
