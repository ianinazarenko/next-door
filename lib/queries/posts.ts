import { IPostListItem, IPostsState } from '@/types/posts';
import { buildPostsWhere } from '@/utils/helpers/data-utils';
import { prisma } from '@/lib/db';

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
