import { PrismaClient } from '@/generated/prisma';
import { POST_IMAGE, POSTS_SEED_DATA } from './seed-data';

const prisma = new PrismaClient();

async function main() {
    console.log('database seed...');

    await clearSeedData();

    const { patchManagement, renderWorks } = await createManagementCompanies();
    const { pixelPark, buglessHeights } = await createComplexes({
        patchManagementId: patchManagement.id,
        renderWorksId: renderWorks.id,
    });
    await createCategories();

    await createUsefulPhones({
        pixelParkId: pixelPark.id,
        buglessHeightsId: buglessHeights.id,
    });

    const { jane, mike, sara } = await createUsers({
        pixelParkId: pixelPark.id,
        buglessHeightsId: buglessHeights.id,
    });

    const { post1, post3, post4 } = await createPosts();

    await createComments({
        deskId: post1.id,
        sofaId: post3.id,
        bbqId: post4.id,
        janeId: jane.id,
        mikeId: mike.id,
        saraId: sara.id,
    });

    console.log('Database seeded successfully!');
}

async function clearSeedData() {
    await prisma.comment.deleteMany({});
    await prisma.post.deleteMany({});
    await prisma.usefulPhone.deleteMany({});
}

async function createUsers({ pixelParkId, buglessHeightsId }: { pixelParkId: string; buglessHeightsId: string }) {
    const alex = await prisma.user.upsert({
        where: { email: 'alex-coder@example.com' },
        update: {},
        create: {
            name: 'Alex Coder',
            email: 'alex-coder@example.com',
            phone: '+123456789',
            whatsapp: '+123456789',
            complexId: pixelParkId,
        },
    });

    const maya = await prisma.user.upsert({
        where: { email: 'maya-bloom@example.com' },
        update: {},
        create: {
            name: 'Maya Bloom',
            email: 'maya-bloom@example.com',
            phone: '+987654321',
            whatsapp: '+987654321',
            complexId: buglessHeightsId,
        },
    });

    const chris = await prisma.user.upsert({
        where: { email: 'chris-lift@example.com' },
        update: {},
        create: {
            name: 'Chris Lift',
            email: 'chris-lift@example.com',
            phone: '+123123123',
            whatsapp: '+123123123',
            complexId: pixelParkId,
        },
    });

    const committee = await prisma.user.upsert({
        where: { email: 'committee@example.com' },
        update: {},
        create: {
            name: 'Event Committee',
            email: 'committee@example.com',
            phone: '+321321321',
            whatsapp: '+321321321',
            complexId: buglessHeightsId,
        },
    });

    // Users for comments
    const jane = await prisma.user.upsert({
        where: { email: 'jane-neighbor@example.com' },
        update: {},
        create: {
            name: 'Jane Neighbor',
            email: 'jane-neighbor@example.com',
            complexId: pixelParkId,
        },
    });

    const mike = await prisma.user.upsert({
        where: { email: 'mike-helper@example.com' },
        update: {},
        create: {
            name: 'Mike Helper',
            email: 'mike-helper@example.com',
            complexId: pixelParkId,
        },
    });

    const sara = await prisma.user.upsert({
        where: { email: 'sara-green@example.com' },
        update: {},
        create: {
            name: 'Sara Green',
            email: 'sara-green@example.com',
            complexId: buglessHeightsId,
        },
    });

    return { alex, maya, chris, jane, mike, sara, committee };
}

async function createComplexes({
    patchManagementId,
    renderWorksId,
}: {
    patchManagementId: string;
    renderWorksId: string;
}) {
    const pixelPark = await prisma.complex.upsert({
        where: { slug: 'pixel-park' },
        update: {},
        create: {
            name: 'Pixel Park Residences',
            slug: 'pixel-park',
            address: '42 Render Street, Codeville',
            metro: 'Debug Station',
            description:
                'A modern complex for tech lovers. Every apartment comes with built-in Ethernet ports, ergonomic coffee machines, and a neighbor who will fix your Wi-Fi at 2 AM.',
            timeToMetro: 5,
            managementCompanyId: patchManagementId,
        },
    });

    const buglessHeights = await prisma.complex.upsert({
        where: { slug: 'bugless-heights' },
        update: {},
        create: {
            name: 'Bugless Heights',
            slug: 'bugless-heights',
            address: '101 Compile Avenue, Dev City',
            metro: 'Hotfix Square',
            description:
                'A peaceful community where bugs are rare and commits are always clean. Weekly meetups in the courtyard to discuss life, code, and the meaning of semicolons.',
            timeToMetro: 8,
            managementCompanyId: renderWorksId,
        },
    });

    return { pixelPark, buglessHeights };
}

async function createCategories() {
    const buy = await prisma.category.upsert({
        where: { slug: 'buy' },
        update: {},
        create: { name: 'Buy', slug: 'buy' },
    });

    const sell = await prisma.category.upsert({
        where: { slug: 'sell' },
        update: {},
        create: { name: 'Sell', slug: 'sell' },
    });

    const giveAway = await prisma.category.upsert({
        where: { slug: 'give-away' },
        update: {},
        create: { name: 'Give Away', slug: 'give-away' },
    });

    const offerHelp = await prisma.category.upsert({
        where: { slug: 'offer-help' },
        update: {},
        create: { name: 'Offer Help', slug: 'offer-help' },
    });

    const requestHelp = await prisma.category.upsert({
        where: { slug: 'request-help' },
        update: {},
        create: { name: 'Request Help', slug: 'request-help' },
    });

    const event = await prisma.category.upsert({
        where: { slug: 'event' },
        update: {},
        create: { name: 'Event', slug: 'event' },
    });

    return { buy, sell, giveAway, offerHelp, requestHelp, event };
}

async function createUsefulPhones({
    pixelParkId,
    buglessHeightsId,
}: {
    pixelParkId: string;
    buglessHeightsId: string;
}) {
    // Clear existing useful phones to avoid duplicates
    await prisma.usefulPhone.deleteMany({});

    // Pixel Park useful phones
    await prisma.usefulPhone.createMany({
        data: [
            {
                name: 'Security Service',
                number: '15551234567',
                complexId: pixelParkId,
            },
            {
                name: 'Plumber',
                number: '15552345678',
                complexId: pixelParkId,
            },
            {
                name: 'Electrician',
                number: '15553456789',
                complexId: pixelParkId,
            },
            {
                name: 'Emergency',
                number: '911',
                complexId: pixelParkId,
            },
        ],
    });

    // Bugless Heights useful phones
    await prisma.usefulPhone.createMany({
        data: [
            {
                name: 'Plumber',
                number: '15554567890',
                complexId: buglessHeightsId,
            },
            {
                name: 'Electrician',
                number: '15555678901',
                complexId: buglessHeightsId,
            },
            {
                name: 'Emergency',
                number: '911',
                complexId: buglessHeightsId,
            },
        ],
    });
}

async function createPosts() {
    const posts = await Promise.all(
        POSTS_SEED_DATA.map((post) => {
            const createdAt = new Date(post.createdAt);

            return prisma.post.create({
                data: {
                    title: post.title,
                    shortText: post.shortText,
                    fullText: post.fullText,
                    author: { connect: { email: post.authorEmail } },
                    image: POST_IMAGE,
                    deadline: 'deadline' in post ? post.deadline : null,
                    complex: { connect: { slug: post.complexSlug } },
                    category: { connect: { slug: post.categorySlug } },
                    createdAt,
                    updatedAt: createdAt,
                },
            });
        })
    );

    const [post1, post2, post3, post4] = posts;

    return { post1, post2, post3, post4 };
}

async function createComments({
    deskId,
    sofaId,
    bbqId,
    janeId,
    mikeId,
    saraId,
}: {
    deskId: number;
    sofaId: number;
    bbqId: number;
    janeId: string;
    mikeId: string;
    saraId: string;
}) {
    const now = new Date();
    await prisma.comment.create({
        data: {
            authorId: janeId,
            text: 'Is the desk still available?',
            postId: deskId,
            createdAt: now,
            updatedAt: now,
        },
    });

    await prisma.comment.create({
        data: {
            authorId: mikeId,
            text: 'I can help you with the sofa, just tell me when.',
            postId: sofaId,
            createdAt: now,
            updatedAt: now,
        },
    });

    await prisma.comment.create({
        data: {
            authorId: saraId,
            text: "I'll bring lemonade for the BBQ!",
            postId: bbqId,
            createdAt: now,
            updatedAt: now,
        },
    });
}

async function createManagementCompanies() {
    const patchManagement = await prisma.managementCompany.upsert({
        where: { slug: 'patch-management' },
        update: {
            name: 'Patch Management Co.',
            phone: '15551234545',
            email: 'patch.management@mail.com',
        },
        create: {
            name: 'Patch Management Co.',
            slug: 'patch-management',
            phone: '15551234545',
            email: 'patch.management@mail.com',
        },
    });

    const renderWorks = await prisma.managementCompany.upsert({
        where: { slug: 'render-works' },
        update: {
            name: 'RenderWorks Ltd.',
            phone: '15559876567',
            email: 'render_works@mail.com',
        },
        create: {
            name: 'RenderWorks Ltd.',
            slug: 'render-works',
            phone: '15559876567',
            email: 'render_works@mail.com',
        },
    });

    return { patchManagement, renderWorks };
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
