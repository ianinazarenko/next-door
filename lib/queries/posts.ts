import { IPostFull, IPostListItem, IPostsState } from '@/types/posts';
import { buildPostsWhere } from '@/utils/helpers/data-utils';
import { cache } from 'react';
import { prisma } from '@/lib/db';
import { postsQuerySchema } from '@/utils/validation/schemas';

export async function fetchPosts({
    limit,
    offset,
    params,
}: {
    limit: number;
    offset: number;
    params: IPostsState;
}): Promise<IPostListItem[]> {
    try {
        postsQuerySchema.parse({ limit, offset, params });

        const where = buildPostsWhere(params);

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

export async function fetchPost(id: number | string): Promise<IPostFull | null> {
    if (!id || isNaN(Number(id))) {
        throw new Error('Invalid post ID');
    }

    try {
        const res = await prisma.post.findUnique({
            where: { id: Number(id) },
            include: {
                complex: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        address: true,
                    },
                },
                category: true,
                comments: {
                    orderBy: { createdAt: 'desc' },
                    take: 10,
                },
            },
        });

        return res || null;
    } catch (error) {
        console.error('[queries/fetchPost]: Error fetching post:', error);
        throw new Error('Failed to fetch post. Please try again later.');
    }
}

export const fetchPostCached = cache(fetchPost);
