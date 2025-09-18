import { ISpec } from '@/types/common';
import { IPostsState, IPostsWhereParams } from '@/types/posts';

// General specs prepare function
export function prepareSpec<T extends Record<string, string | number>>(
    res: T[] | undefined,
    {
        valueName,
        labelName,
        hasAllOption = true,
        allLabel = 'All',
    }: {
        valueName: keyof T;
        labelName: keyof T;
        hasAllOption?: boolean;
        allLabel?: string;
    }
): ISpec[] {
    if (!res) return [];

    const mapped = res.map((item) => ({
        value: String(item[valueName]),
        label: String(item[labelName]),
    }));

    return hasAllOption ? [{ label: allLabel, value: '' }, ...mapped] : mapped;
}

// Posts where params for query
export function buildPostsWhere(params: IPostsState) {
    const where: Partial<IPostsWhereParams> & { OR: Array<{ deadline: object | null }> } = { OR: [] };

    if (params.complex) {
        where.complexSlug = params.complex;
    }

    if (params.category) {
        where.categorySlug = params.category;
    }

    where.OR = [{ deadline: null }, { deadline: { gte: new Date() } }];

    return where;
}
