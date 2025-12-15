import { IPostsState, IPostsWhereParams } from '@/types/posts';

// Posts where params for query
export function buildPostsWhere(params: IPostsState) {
    const where: Partial<IPostsWhereParams> & { OR: Array<{ deadline: object | null }> } = { OR: [] };

    if (params?.complex) {
        where.complexSlug = params.complex;
    }

    if (params?.category) {
        where.categorySlug = params.category;
    }

    where.OR = [{ deadline: null }, { deadline: { gte: new Date() } }];

    return where;
}
