import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests/e2e',
  /* Run tests in parallel */
  fullyParallel: true,
  /* Limit retries on CI */
  retries: process.env.CI ? 2 : 0,
  /* Use more workers locally and fewer on CI */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter - list in the console */
  reporter: 'html',
  /* Shared settings for all projects */
  use: {
    /* Base URL for all navigations (page.goto('/')) */
    baseURL: 'http://localhost:8000',
    /* Collect trace (video, screenshots, logs) on first retry */
    trace: 'on-first-retry',
    /* Record video on failure */
    video: 'on-first-retry',
  },

  /* Project (browser) configuration */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Start the local server before tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:8000',
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
