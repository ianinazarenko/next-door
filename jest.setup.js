/* eslint-disable-next-line */
require('@testing-library/jest-dom');

// Mock Next.js cache functions
jest.mock('next/cache', () => ({
    unstable_cache: jest.fn((fn) => fn),
    revalidatePath: jest.fn(),
    revalidateTag: jest.fn(),
}));
