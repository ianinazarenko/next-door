const config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testMatch: [
        '<rootDir>/**/__tests__/**/*.{test,spec}.{ts,tsx}',
        '<rootDir>/tests/integration/**/*.{test,spec}.{ts,tsx}',
    ],
    testPathIgnorePatterns: ['/node_modules/', '/tests/e2e/'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    transform: {
        '^.+\\.(ts|tsx)$': [
            'ts-jest',
            { diagnostics: true }, // check types
        ],
    },
};

module.exports = config;
