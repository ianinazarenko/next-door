export const POST_IMAGE = 'https://via.placeholder.com/600x400';

const futureDeadline = new Date();
futureDeadline.setDate(futureDeadline.getDate() + 30);

export const SEED_COMPLEX_SLUGS = {
    pixelPark: 'pixel-park',
    buglessHeights: 'bugless-heights',
} as const;

export const SEED_CATEGORY_SLUGS = {
    buy: 'buy',
    sell: 'sell',
    giveAway: 'give-away',
    offerHelp: 'offer-help',
    requestHelp: 'request-help',
    event: 'event',
} as const;

export const SEED_USER_EMAILS = {
    alex: 'alex-coder@example.com',
    maya: 'maya-bloom@example.com',
    chris: 'chris-lift@example.com',
    committee: 'committee@example.com',
    jane: 'jane-neighbor@example.com',
    mike: 'mike-helper@example.com',
    sara: 'sara-green@example.com',
} as const;

export const POSTS_SEED_DATA = [
    {
        title: 'Selling a standing desk',
        shortText: 'Ergonomic standing desk, great condition',
        fullText:
            "I'm selling my adjustable standing desk. It's in great condition and perfect for home office setups. Price negotiable, pick up in Pixel Park.",
        authorEmail: SEED_USER_EMAILS.alex,
        complexSlug: SEED_COMPLEX_SLUGS.pixelPark,
        categorySlug: SEED_CATEGORY_SLUGS.sell,
        createdAt: '2025-09-18T07:30:18.629Z',
    },
    {
        title: 'Free houseplants',
        shortText: 'Giving away two healthy monstera plants',
        fullText:
            'I have two large monstera plants that need a new home. Perfect for adding some greenery to your apartment. Free to a good home.',
        authorEmail: SEED_USER_EMAILS.maya,
        complexSlug: SEED_COMPLEX_SLUGS.buglessHeights,
        categorySlug: SEED_CATEGORY_SLUGS.giveAway,
        createdAt: '2025-09-17T07:30:18.707Z',
    },
    {
        title: 'Need help moving furniture',
        shortText: 'Looking for someone to help move a sofa',
        fullText:
            'I need a hand moving a sofa from my apartment to the basement storage. Should take about 30 minutes. Beer and snacks included.',
        authorEmail: SEED_USER_EMAILS.chris,
        complexSlug: SEED_COMPLEX_SLUGS.pixelPark,
        categorySlug: SEED_CATEGORY_SLUGS.requestHelp,
        deadline: '2026-08-20T00:00:00.000Z',
        createdAt: '2025-09-16T07:30:18.745Z',
    },
    {
        title: 'Community BBQ this Saturday',
        shortText: 'Join us for burgers, music and fun',
        fullText:
            "We're organizing a BBQ in the Bugless Heights courtyard this Saturday at 4 PM. Bring something to grill and a good mood!",
        authorEmail: SEED_USER_EMAILS.committee,
        complexSlug: SEED_COMPLEX_SLUGS.buglessHeights,
        categorySlug: SEED_CATEGORY_SLUGS.event,
        deadline: futureDeadline.toISOString(),
        createdAt: '2025-09-15T07:30:18.783Z',
    },
    {
        title: 'Looking for a spare HDMI cable',
        shortText: 'My movie night depends on one tiny cable',
        fullText:
            'Does anyone have a spare HDMI cable I could borrow for the evening? The projector is ready, the popcorn is dramatic, and the laptop is pretending it has no responsibilities.',
        authorEmail: SEED_USER_EMAILS.alex,
        complexSlug: SEED_COMPLEX_SLUGS.pixelPark,
        categorySlug: SEED_CATEGORY_SLUGS.buy,
        createdAt: '2025-09-14T07:30:18.783Z',
    },
    {
        title: 'Balcony plant watering squad',
        shortText: 'Happy to water plants while neighbors travel',
        fullText:
            'I can water balcony plants this week for anyone who is away. I follow instructions, respect dramatic fern personalities, and will not overwater your basil.',
        authorEmail: SEED_USER_EMAILS.maya,
        complexSlug: SEED_COMPLEX_SLUGS.buglessHeights,
        categorySlug: SEED_CATEGORY_SLUGS.offerHelp,
        createdAt: '2025-09-13T07:30:18.783Z',
    },
    {
        title: 'Coffee machine seeking new kitchen',
        shortText: 'Reliable espresso machine with minor opinions',
        fullText:
            'Selling a compact espresso machine. It makes good coffee, takes up little space, and only judges you mildly if you choose decaf after 9 AM.',
        authorEmail: SEED_USER_EMAILS.alex,
        complexSlug: SEED_COMPLEX_SLUGS.pixelPark,
        categorySlug: SEED_CATEGORY_SLUGS.sell,
        createdAt: '2025-09-12T07:30:18.783Z',
    },
    {
        title: 'Lost access badge near lobby',
        shortText: 'Small blue badge probably feeling abandoned',
        fullText:
            'I lost a small blue access badge somewhere near the lobby. If you found it, please let me know before I become a permanent courtyard resident.',
        authorEmail: SEED_USER_EMAILS.committee,
        complexSlug: SEED_COMPLEX_SLUGS.buglessHeights,
        categorySlug: SEED_CATEGORY_SLUGS.requestHelp,
        createdAt: '2025-09-11T07:30:18.783Z',
    },
    {
        title: 'Board game night in the lounge',
        shortText: 'Strategy, snacks, and absolutely no table flipping',
        fullText:
            'Board game night is happening in the Pixel Park lounge. Bring your favorite game, a snack, and the emotional maturity to lose at Catan gracefully.',
        authorEmail: SEED_USER_EMAILS.chris,
        complexSlug: SEED_COMPLEX_SLUGS.pixelPark,
        categorySlug: SEED_CATEGORY_SLUGS.event,
        deadline: '2026-09-10T00:00:00.000Z',
        createdAt: '2025-09-10T07:30:18.783Z',
    },
    {
        title: 'Free stack of moving boxes',
        shortText: 'Cardboard boxes ready for their next mission',
        fullText:
            'I have a stack of clean moving boxes to give away. They survived one relocation and are emotionally prepared for another.',
        authorEmail: SEED_USER_EMAILS.chris,
        complexSlug: SEED_COMPLEX_SLUGS.pixelPark,
        categorySlug: SEED_CATEGORY_SLUGS.giveAway,
        createdAt: '2025-09-09T07:30:18.783Z',
    },
] as const;
