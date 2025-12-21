export const MOCK_DATE = new Date('2025-12-14T10:00:00.000Z');

export const DEFAULT_CREATE_POST = {
    title: 'Valid post title',
    shortText: 'Short summary is long enough',
    fullText: 'Full description with more than three characters.',
    complex: 'complex-slug',
    category: 'category-slug',
    phone: '+12025550123',
    whatsapp: '+12025550123',
};

export const DEFAULT_DB_POST = {
    id: 1,
    authorName: 'Random User',
    createdAt: MOCK_DATE,
    updatedAt: MOCK_DATE,
    deadline: null,
    image: null,
};
