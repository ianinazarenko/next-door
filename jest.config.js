// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextJest = require('next/jest');

const createJestConfig = nextJest({
    // Pointing to Next.js app to load next.config.js and .env
    dir: './',
});

const config = {
    testEnvironment: 'jsdom',
    testMatch: [
        '<rootDir>/**/__tests__/**/*.{test,spec}.{ts,tsx}',
        '<rootDir>/tests/integration/**/*.{test,spec}.{ts,tsx}',
    ],
    testPathIgnorePatterns: ['/node_modules/', '/tests/e2e/'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '^server-only$': '<rootDir>/tests/mocks/server-only.ts',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

module.exports = createJestConfig(config);
