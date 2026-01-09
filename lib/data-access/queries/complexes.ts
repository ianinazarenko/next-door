import { IComplexBase, IComplexesState, IComplexFull } from '@/types/complexes';
import { ISpec } from '@/types/common';
import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { prepareSpec } from '@/utils/helpers/data-utils';
import { prisma } from '@/lib/data-access/db';
import { complexesQuerySchema } from '@/utils/validation/schemas';

interface IFetchComplexesParams {
    limit: number;
    offset: number;
    params: IComplexesState;
}

export async function fetchComplexes({
    limit,
    offset,
    params,
}: IFetchComplexesParams): Promise<{ results: IComplexBase[]; hasMore: boolean }> {
    const search = params.search ?? '';
    try {
        const validated = complexesQuerySchema.parse({ limit, offset, search });

        const res = await prisma.complex.findMany({
            where: validated.search
                ? {
                      OR: [
                          { name: { contains: validated.search, mode: 'insensitive' } },
                          { address: { contains: validated.search, mode: 'insensitive' } },
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
            take: validated.limit + 1,
            skip: validated.offset,
        });

        const hasMore = res.length > validated.limit;
        const complexes = hasMore ? res.slice(0, validated.limit) : res;
        const results = complexes || [];
        return { results, hasMore };
    } catch (error) {
        console.error('[queries/fetchComplexes]: Error fetching complexes:', error);
        throw new Error('Failed to fetch complexes. Please try again later.');
    }
}

export async function fetchComplex(slug: string): Promise<IComplexFull | null> {
    try {
        if (!slug?.trim()) {
            throw new Error('Slug is required to fetch complex');
        }

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
        const errorContext = {
            slug: slug || 'empty',
            error,
        };

        console.error('[queries/fetchComplex]: Error fetching complex:', errorContext);
        throw error;
    }
}

export async function fetchComplexesSpecsCallback(hasAllOption: boolean): Promise<ISpec[]> {
    try {
        const res = await prisma.complex.findMany({
            select: {
                id: true,
                slug: true,
                name: true,
            },
        });

        return prepareSpec(res, {
            valueName: 'slug',
            labelName: 'name',
            allLabel: 'All Complexes',
            hasAllOption,
        });
    } catch (error) {
        console.error('[queries/fetchComplexesSpecs]: Error fetching complexes specs', error);
        throw new Error('Failed to fetch complexes specs');
    }
}

/* istanbul ignore next */
export const fetchComplexesSpecs = unstable_cache(
    (hasAllOption: boolean = true) => fetchComplexesSpecsCallback(hasAllOption),
    ['complexes-specs'],
    { revalidate: 604800 } // 1 week
);

/* istanbul ignore next */
export const fetchComplexCached = cache(fetchComplex);
