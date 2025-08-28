import { IComplexBase, IComplexFull } from '@/types/complexes';
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
            },
        });
    } catch (error) {
        console.error('[queries/fetchComplex]: Error fetching complex:', { slug, error });
        throw new Error(`Failed to fetch complex with slug: ${slug}`);
    }
}
