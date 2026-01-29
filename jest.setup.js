/* eslint-disable-next-line */
require('@testing-library/jest-dom');

// Mock Next.js cache functions
jest.mock('next/cache', () => ({
    unstable_cache: jest.fn((fn) => fn),
    revalidatePath: jest.fn(),
    revalidateTag: jest.fn(),
}));

// Mock next-auth ESM module
jest.mock('next-auth', () => ({
    __esModule: true,
    default: jest.fn(() => ({
        auth: jest.fn(),
        handlers: { GET: jest.fn(), POST: jest.fn() },
        signIn: jest.fn(),
        signOut: jest.fn(),
    })),
}));

// Mock next-auth adapters and providers
jest.mock('@auth/prisma-adapter', () => ({
    PrismaAdapter: jest.fn(),
}));

jest.mock('next-auth/providers/github', () => ({
    __esModule: true,
    default: jest.fn(),
}));
