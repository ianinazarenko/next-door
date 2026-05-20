import { defineConfig, devices } from '@playwright/test';

const isCI = Boolean(process.env.CI);
const isLinux = process.platform === 'linux';
const webServerCommand = isCI ? 'npm run start -- -p 8000' : 'npm run dev';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests/e2e',
  /* Run tests in parallel */
  fullyParallel: true,
  /* Limit retries on CI */
  retries: isCI ? 2 : 0,
  /* Fail CI if a test only passes after retry */
  failOnFlakyTests: isCI,
  /* Use more workers locally and fewer on CI */
  workers: isCI ? 1 : undefined,
  /* Reporter - GitHub annotations on CI, HTML report locally */
  reporter: isCI ? 'github' : 'html',
  /* Shared settings for all projects */
  use: {
    /* Base URL for all navigations (page.goto('/')) */
    baseURL: 'http://localhost:8000',
    /* Collect trace locally on first retry */
    trace: 'retain-on-failure',
    /* Record video locally on first retry */
    video: isCI ? 'off' : 'on-first-retry',
  },

  /* Project (browser) configuration */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-iphone-15',
      use: {
        ...devices['iPhone 15'],
        ...(isLinux ? { browserName: 'chromium' as const } : {}),
      },
    },
  ],

  /* Start the local server before tests */
  webServer: {
    command: webServerCommand,
    url: 'http://localhost:8000',
    reuseExistingServer: !isCI,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
