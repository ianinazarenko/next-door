import { ISpec } from '@/types/common';
import { prisma } from '@/lib/db';
import { prepareSpec } from '@/utils/helpers/data-utils';

export async function fetchCategoriesSpecs(): Promise<ISpec[]> {
    try {
        const res = await prisma.category.findMany({
            select: {
                slug: true,
                name: true,
            },
        });

        return prepareSpec(res, {
            valueName: 'slug',
            labelName: 'name',
            allLabel: 'All Categories',
        });
    } catch (error) {
        console.error('[queries/fetchCategories]:', error);
        throw new Error('Failed to fetch categories specs');
    }
}
