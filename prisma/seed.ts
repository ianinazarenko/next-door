import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

async function main() {
    console.log('database seed...');

    const { patchManagement, renderWorks } = await createManagementCompanies();
    const { pixelPark, buglessHeights } = await createComplexes({
        patchManagementId: patchManagement.id,
        renderWorksId: renderWorks.id,
    });
    const { buy, sell, giveAway, offerHelp, requestHelp, event } = await createCategories();

    await createUsefulPhones({
        pixelParkId: pixelPark.id,
        buglessHeightsId: buglessHeights.id,
    });

    const { alex, maya, chris, jane, mike, sara, committee } = await createUsers({
        pixelParkId: pixelPark.id,
        buglessHeightsId: buglessHeights.id,
    });

    const { post1, post3, post4 } = await createPosts({
        pixelParkSlug: pixelPark.slug,
        buglessHeightsSlug: buglessHeights.slug,
        buySlug: buy.slug,
        sellSlug: sell.slug,
        giveAwaySlug: giveAway.slug,
        offerHelpSlug: offerHelp.slug,
        requestHelpSlug: requestHelp.slug,
        eventSlug: event.slug,
        alexId: alex.id,
        mayaId: maya.id,
        chrisId: chris.id,
        committeeId: committee.id,
    });

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

async function createPosts({
    pixelParkSlug,
    buglessHeightsSlug,
    buySlug,
    sellSlug,
    giveAwaySlug,
    offerHelpSlug,
    requestHelpSlug,
    eventSlug,
    alexId,
    mayaId,
    chrisId,
    committeeId,
}: {
    pixelParkSlug: string;
    buglessHeightsSlug: string;
    buySlug: string;
    sellSlug: string;
    giveAwaySlug: string;
    offerHelpSlug: string;
    requestHelpSlug: string;
    eventSlug: string;
    alexId: string;
    mayaId: string;
    chrisId: string;
    committeeId: string;
}) {
    const post1 = await prisma.post.create({
        data: {
            title: 'Selling a standing desk',
            shortText: 'Ergonomic standing desk, great condition',
            fullText:
                "I'm selling my adjustable standing desk. It's in great condition and perfect for home office setups. Price negotiable, pick up in Pixel Park.",
            authorId: alexId,
            image: 'https://via.placeholder.com/600x400',
            deadline: null,
            complexSlug: pixelParkSlug,
            categorySlug: sellSlug,
            createdAt: new Date('2025-09-04T07:30:18.629Z'),
            updatedAt: new Date('2025-09-15T11:59:15.013Z'),
        },
    });

    const post2 = await prisma.post.create({
        data: {
            title: 'Free houseplants',
            shortText: 'Giving away two healthy monstera plants',
            fullText:
                'I have two large monstera plants that need a new home. Perfect for adding some greenery to your apartment. Free to a good home.',
            authorId: mayaId,
            image: 'https://via.placeholder.com/600x400',
            deadline: null,
            complexSlug: buglessHeightsSlug,
            categorySlug: giveAwaySlug,
            createdAt: new Date('2025-09-04T07:30:18.707Z'),
            updatedAt: new Date('2025-09-15T11:59:15.118Z'),
        },
    });

    const post3 = await prisma.post.create({
        data: {
            title: 'Need help moving furniture',
            shortText: 'Looking for someone to help move a sofa',
            fullText:
                'I need a hand moving a sofa from my apartment to the basement storage. Should take about 30 minutes. Beer and snacks included.',
            authorId: chrisId,
            image: 'https://via.placeholder.com/600x400',
            deadline: '2026-08-20T00:00:00.000Z',
            complexSlug: pixelParkSlug,
            categorySlug: requestHelpSlug,
            createdAt: new Date('2025-09-04T07:30:18.745Z'),
            updatedAt: new Date('2025-09-15T15:45:09.329Z'),
        },
    });

    const post4 = await prisma.post.create({
        data: {
            title: 'Community BBQ this Saturday',
            shortText: 'Join us for burgers, music and fun',
            fullText:
                "We're organizing a BBQ in the Bugless Heights courtyard this Saturday at 4 PM. Bring something to grill and a good mood!",
            authorId: committeeId,
            image: 'https://via.placeholder.com/600x400',
            deadline: '2026-08-15T00:00:00.000Z',
            complexSlug: buglessHeightsSlug,
            categorySlug: eventSlug,
            createdAt: new Date('2025-09-04T07:30:18.783Z'),
            updatedAt: new Date('2025-09-15T15:45:09.329Z'),
        },
    });

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
