import { IComplexFull } from '@/types/complexes';

export const MOCK_DATE = new Date('2024-01-15T00:00:00.000Z');

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
            authorName: 'John Doe',
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
