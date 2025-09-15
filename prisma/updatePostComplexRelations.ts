import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function updateComplexSlugs() {
    try {
        const posts = await prisma.post.findMany({
            include: {
                complex: true,
            },
        });

        for (const post of posts) {
            if (post.complex?.slug) {
                await prisma.post.update({
                    where: { id: post.id },
                    data: { complexSlug: post.complex.slug },
                });
                console.log(`Updated post ${post.id} with complexSlug: ${post.complex.slug}`);
            } else {
                console.warn(`Post ${post.id} does not have an associated complex or slug.`);
            }
        }

        console.log('All posts updated successfully.');
    } catch (error) {
        console.error('Error updating post complex slugs:', error);
    } finally {
        await prisma.$disconnect();
    }
}

updateComplexSlugs();
