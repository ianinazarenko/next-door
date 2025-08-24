import { prisma } from '@/lib/db';

export async function fetchComplexes({ limit, offset }: { limit: number; offset: number }) {
    return prisma.complex.findMany({
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
}
