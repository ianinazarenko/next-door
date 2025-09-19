import { ISpec } from '@/types/common';
import { prisma } from '@/lib/db';
import { unstable_cache } from 'next/cache';
import { prepareSpec } from '@/utils/helpers/data-utils';

export async function fetchCategoriesSpecsCallback(): Promise<ISpec[]> {
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

export const fetchCategoriesSpecs = unstable_cache(
    fetchCategoriesSpecsCallback,
    ['categories-specs'],
    { revalidate: 604800 } // 1 week
  );