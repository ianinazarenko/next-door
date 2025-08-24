import { IComplexBase } from '@/types/complexes';
import { prisma } from '@/lib/db';

export async function fetchComplexes({ limit, offset }: { limit: number; offset: number }): Promise<IComplexBase[]> {
    try {
        const res = await prisma.complex.findMany({
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
        throw error;
    }
}
