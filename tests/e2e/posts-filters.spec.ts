import { PAGES } from '@/data/pages';
import { RESET_BUTTON_TEXT, COMPLEX_ARIA_LABEL, CATEGORY_ARIA_LABEL } from '@/data/posts-filters';
import { COMPLEXES, POST_CATEGORIES, QUERY_PARAMS } from '@/tests/__fixtures__/seed.fixture';

import { test, expect, type Locator, type Page, type TestInfo } from '@playwright/test';

function shouldLogRequest(url: string): boolean {
    return url.includes('/posts') || url.includes('_rsc');
}

function attachPageDiagnostics(page: Page, testInfo: TestInfo): void {
    const prefix = `[e2e:${testInfo.title}]`;

    page.on('console', (message) => {
        if (message.type() === 'error' || message.type() === 'warning') {
            console.log(`${prefix} browser:${message.type()} ${message.text()}`);
        }
    });

    page.on('pageerror', (error) => {
        console.log(`${prefix} pageerror ${error.message}`);
    });

    page.on('request', (request) => {
        if (shouldLogRequest(request.url())) {
            console.log(`${prefix} request ${request.method()} ${request.url()}`);
        }
    });

    page.on('requestfailed', (request) => {
        if (shouldLogRequest(request.url())) {
            console.log(`${prefix} requestfailed ${request.method()} ${request.url()} ${request.failure()?.errorText}`);
        }
    });

    page.on('response', (response) => {
        if (shouldLogRequest(response.url())) {
            console.log(`${prefix} response ${response.status()} ${response.url()}`);
        }
    });
}

async function resetFiltersAndWaitForPostsPage(page: Page, resetButton: Locator): Promise<void> {
    console.log('------')
    console.log(`[e2e:reset] before click url=${page.url()}`);
    console.log('------')
    
    try {
        await Promise.all([
            page.waitForURL(PAGES.POSTS.link),
            resetButton.click(),
        ]);
    } finally {
        console.log('------')
        console.log(`[e2e:reset] after wait url=${page.url()}`);
        console.log('------')
    }
}

test.describe('Posts Filters', () => {
    test.beforeEach(async ({ page }, testInfo) => {
        attachPageDiagnostics(page, testInfo);
        await page.goto(PAGES.POSTS.link);
    });

    test('should filter posts by complex and category and reset filters', async ({ page }) => {
        const complexSelect = page.locator(`select[aria-label="${COMPLEX_ARIA_LABEL}"]:visible`);
        const categorySelect = page.locator(`select[aria-label="${CATEGORY_ARIA_LABEL}"]:visible`);
        const postsList = page.getByRole('list');

        await expect(complexSelect).toHaveCount(1);
        await expect(categorySelect).toHaveCount(1);
        await expect(complexSelect).toBeEnabled();
        await complexSelect.selectOption({ value: COMPLEXES.buglessHeights.value });

        await expect(page).toHaveURL(
            (url) => url.searchParams.get(QUERY_PARAMS.complex) === COMPLEXES.buglessHeights.value
        );
        await expect(postsList.getByText(COMPLEXES.buglessHeights.name).first()).toBeVisible();
        await expect(postsList.getByText(COMPLEXES.pixelPark.name)).not.toBeVisible();

        await categorySelect.selectOption({ value: POST_CATEGORIES.event.value });
        await expect(page).toHaveURL(
            (url) => url.searchParams.get(QUERY_PARAMS.category) === POST_CATEGORIES.event.value
        );
        await expect(postsList.getByText(POST_CATEGORIES.event.name).first()).toBeVisible();
        await expect(postsList.getByText(POST_CATEGORIES.giveAway.name)).not.toBeVisible();

        const resetBtn = page.getByRole('button', { name: RESET_BUTTON_TEXT });
        await expect(resetBtn).toBeEnabled();
        await resetFiltersAndWaitForPostsPage(page, resetBtn);

        await expect(postsList.getByText(COMPLEXES.buglessHeights.name).first()).toBeVisible();
        await expect(postsList.getByText(COMPLEXES.pixelPark.name).first()).toBeVisible();

        await expect(postsList.getByText(POST_CATEGORIES.event.name).first()).toBeVisible();
        await expect(postsList.getByText(POST_CATEGORIES.giveAway.name).first()).toBeVisible();
    });

    test('should initialize filters from URL on direct visit', async ({ page }) => {
        await page.goto(`${PAGES.POSTS.link}?${QUERY_PARAMS.complex}=${COMPLEXES.pixelPark.value}`);
        const complexSelect = page.getByLabel(COMPLEX_ARIA_LABEL);
        await expect(complexSelect).toHaveValue(COMPLEXES.pixelPark.value);

        const postsList = page.getByRole('list');
        await expect(postsList.getByText(COMPLEXES.pixelPark.name).first()).toBeVisible();
        await expect(postsList.getByText(COMPLEXES.buglessHeights.name)).not.toBeVisible();
    });

    test('should show empty state when query is not valid', async ({ page }) => {
        await page.goto(`${PAGES.POSTS.link}?${QUERY_PARAMS.complex}=something-random`);
        const complexSelect = page.getByLabel(COMPLEX_ARIA_LABEL);
        await expect(complexSelect).toHaveValue('');
        await expect(complexSelect).toContainText('All Complexes');

        await expect(page.getByRole('main').getByText('Sorry, no announcements found')).toBeVisible();

        const resetButton = page.getByRole('button', { name: RESET_BUTTON_TEXT });
        await expect(resetButton).toBeEnabled();
        await resetFiltersAndWaitForPostsPage(page, resetButton);

        const postsList = page.getByRole('list');
        await expect(postsList.getByText(COMPLEXES.buglessHeights.name).first()).toBeVisible();
        await expect(postsList.getByText(COMPLEXES.pixelPark.name).first()).toBeVisible();
    });

    // Test is valid for clear app with seed script setup
    test('should show empty state when no posts found', async ({ page }) => {
        const categorySelect = page.getByLabel(CATEGORY_ARIA_LABEL);
        const complexSelect = page.getByLabel(COMPLEX_ARIA_LABEL);

        await categorySelect.selectOption({ value: POST_CATEGORIES.sell.value });
        await complexSelect.selectOption({ value: COMPLEXES.buglessHeights.value });

        await expect(page.getByRole('main').getByText('Sorry, no announcements found')).toBeVisible();
    });
});
