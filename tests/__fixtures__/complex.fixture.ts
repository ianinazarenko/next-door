import { IComplexFull } from '@/types/complexes';
import { IUserBase } from '@/types/users';

export const MOCK_DATE = new Date('2024-01-15T00:00:00.000Z');

export const MOCK_AUTHOR: IUserBase = {
    id: 'user-1',
    name: 'John Doe',
    image: null,
    phone: null,
    whatsapp: null,
};

// Prisma select object for author - matches IUserBase fields
export const AUTHOR_SELECT = {
    id: true,
    name: true,
    image: true,
    phone: true,
    whatsapp: true,
};

export const MOCK_COMPLEX_FULL: IComplexFull = {
    // IComplexBase fields
    id: 'complex-123',
    slug: 'residential-complex-1',
    name: 'Residential Complex 1',
    address: '123 Main Street, City',

    // IComplexFull additional fields
    metro: 'Central Station',
    description: 'A modern residential complex with all amenities',
    timeToMetro: 10,
    phone: '+1234567890',
    email: 'info@complex.com',

    // Relations
    posts: [
        {
            id: 1,
            title: 'Selling furniture',
            shortText: 'Selling used furniture in good condition',
            author: MOCK_AUTHOR,
            authorId: MOCK_AUTHOR.id,
            image: null,
            deadline: null,
            createdAt: MOCK_DATE,
            complexSlug: 'residential-complex-1',
            categorySlug: 'sell',
        },
    ],

    usefulPhones: [
        {
            id: 'phone-1',
            name: 'Reception',
            number: '+1234567890',
        },
        {
            id: 'phone-2',
            name: 'Security',
            number: '+1234567891',
        },
    ],

    managementCompany: {
        id: 'company-1',
        name: 'City Property Management',
        slug: 'city-property-management',
        phone: '+1987654321',
        email: 'contact@citypm.com',
    },
};
