// Types
import { IComplexBase, IComplexFull } from '@/types/complexes';
import { IPostListItem } from '@/types/posts';
import { IPostsPageParams } from '@/app/posts/page';
// Prisma
import { prisma } from '@/lib/db';

export async function fetchComplexes({
    limit,
    offset,
    search,
}: {
    limit: number;
    offset: number;
    search?: string;
}): Promise<IComplexBase[]> {
    try {
        const res = await prisma.complex.findMany({
            where: search
                ? {
                      OR: [
                          { name: { contains: search, mode: 'insensitive' } },
                          { address: { contains: search, mode: 'insensitive' } },
                      ],
                  }
                : undefined,

            select: {
                id: true,
                slug: true,
                name: true,
                address: true,
            },

            orderBy: { name: 'asc' },
            take: limit,
            skip: offset,
        });

        return res ?? [];
    } catch (error) {
        console.error('[queries/fetchComplexes]: Error fetching complexes:', error);
        throw new Error('Failed to fetch complexes. Please try again later.');
    }
}

export async function fetchComplex(slug: string): Promise<IComplexFull | null> {
    if (!slug?.trim()) {
        console.error('[queries/fetchComplex]: Error fetching complex: not slug provided');
        throw new Error(`Need to provide slug to fetch complex`);
    }

    try {
        return await prisma.complex.findUnique({
            where: { slug },
            include: {
                posts: {
                    orderBy: { createdAt: 'desc' },
                    take: 10,
                },
                managementCompany: true,
                usefulPhones: true,
            },
        });
    } catch (error) {
        console.error('[queries/fetchComplex]: Error fetching complex:', { slug, error });
        throw new Error(`Failed to fetch complex with slug: ${slug}`);
    }
}

export async function fetchPosts({
    limit,
    offset,
    params,
}: {
    limit: number;
    offset: number;
    params: IPostsPageParams;
}): Promise<IPostListItem[]> {
    try {
        const where: Partial<IPostsPageParams> = {};

        if (params.complexSlug) {
            where.complexSlug = params.complexSlug;
        }

        if (params.categorySlug) {
            where.categorySlug = params.categorySlug;
        }

        const res = await prisma.post.findMany({
            where: Object.keys(where).length > 0 ? where : undefined,

            select: {
                id: true,
                title: true,
                shortText: true,
                authorName: true,
                image: true,
                deadline: true,
                createdAt: true,
                complexSlug: true,
                categorySlug: true,
                category: {
                    select: {
                        id: true,
                        slug: true,
                        name: true,
                    },
                },

                complex: {
                    select: {
                        name: true,
                    },
                },

                _count: {
                    select: {
                        comments: true,
                    },
                },
            },

            orderBy: { createdAt: 'desc' }, // Изменил на desc для новых постов сверху
            take: limit,
            skip: offset,
        });

        return res ? res.map(({ _count, ...post }) => ({ ...post, commentsCount: _count?.comments || 0 })) : [];
    } catch (error) {
        console.error('[queries/fetchPosts]: Error fetching posts:', error);
        throw new Error('Failed to fetch posts. Please try again later.');
    }
}
