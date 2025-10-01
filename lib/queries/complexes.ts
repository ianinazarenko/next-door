import { IComplexBase, IComplexFull } from '@/types/complexes';
import { ISpec } from '@/types/common';
import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { prepareSpec } from '@/utils/helpers/data-utils';
import { prisma } from '@/lib/db';
import { complexesQuerySchema } from '@/utils/validation/schemas';

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
        complexesQuerySchema.parse({ limit, offset, search });

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

export const fetchComplexesSpecs = unstable_cache(
    (hasAllOption: boolean = true) => fetchComplexesSpecsCallback(hasAllOption),
    ['complexes-specs'],
    { revalidate: 604800 } // 1 week
);

export const fetchComplexCached = cache(fetchComplex);
