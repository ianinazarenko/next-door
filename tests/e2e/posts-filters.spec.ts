import { PAGES } from '@/data/pages';
import { RESET_BUTTON_TEXT, COMPLEX_ARIA_LABEL, CATEGORY_ARIA_LABEL } from '@/data/posts-filters';
import { COMPLEXES, POST_CATEGORIES, QUERY_PARAMS } from '@/tests/__fixtures__/seed.fixture';

import { test, expect } from '@playwright/test';

test.describe('Posts Filters', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(PAGES.POSTS.link);
    });

    test('should filter posts by complex and category', async ({ page }) => {
        const complexSelect = page.getByLabel(COMPLEX_ARIA_LABEL);
        const categorySelect = page.getByLabel(CATEGORY_ARIA_LABEL);
        const postsList = page.getByTestId('posts-list');
        const posts = postsList.getByRole('listitem');

        await expect(complexSelect).toHaveCount(1);
        await expect(categorySelect).toHaveCount(1);
        await expect(complexSelect).toBeEnabled();
        await complexSelect.selectOption({ value: COMPLEXES.buglessHeights.value });

        await expect(page).toHaveURL(
            (url) => url.searchParams.get(QUERY_PARAMS.complex) === COMPLEXES.buglessHeights.value
        );

        await expect(complexSelect).toBeEnabled();
        await expect(posts.filter({ hasText: COMPLEXES.buglessHeights.name }).first()).toBeVisible();
        await expect(posts.filter({ hasText: COMPLEXES.pixelPark.name })).toHaveCount(0);

        await categorySelect.selectOption({ value: POST_CATEGORIES.event.value });
        await expect(page).toHaveURL(
            (url) => url.searchParams.get(QUERY_PARAMS.category) === POST_CATEGORIES.event.value
        );

        await expect(categorySelect).toBeEnabled();
        await expect(posts.filter({ hasText: POST_CATEGORIES.event.name }).first()).toBeVisible();
        await expect(posts.filter({ hasText: POST_CATEGORIES.giveAway.name })).toHaveCount(0);
    });

    test('should reset active filters', async ({ page }) => {
        await page.goto(
            `${PAGES.POSTS.link}?${QUERY_PARAMS.complex}=${COMPLEXES.buglessHeights.value}&${QUERY_PARAMS.category}=${POST_CATEGORIES.event.value}`
        );

        const complexSelect = page.getByLabel(COMPLEX_ARIA_LABEL);
        const categorySelect = page.getByLabel(CATEGORY_ARIA_LABEL);

        const postsList = page.getByTestId('posts-list');
        const posts = postsList.getByRole('listitem');

        const resetBtn = page.getByRole('button', { name: RESET_BUTTON_TEXT });

        await expect(complexSelect).toHaveValue(COMPLEXES.buglessHeights.value);
        await expect(categorySelect).toHaveValue(POST_CATEGORIES.event.value);

        await expect(posts.filter({ hasText: COMPLEXES.buglessHeights.name }).first()).toBeVisible();
        await expect(posts.filter({ hasText: COMPLEXES.pixelPark.name })).toHaveCount(0);
        await expect(posts.filter({ hasText: POST_CATEGORIES.event.name }).first()).toBeVisible();
        await expect(posts.filter({ hasText: POST_CATEGORIES.giveAway.name })).toHaveCount(0);

        await expect(resetBtn).toBeEnabled();
        
        await Promise.all([
            page.waitForURL((url) => (
                url.pathname === PAGES.POSTS.link &&
                !url.searchParams.has(QUERY_PARAMS.complex) &&
                !url.searchParams.has(QUERY_PARAMS.category)
            )),
            resetBtn.click(),
        ]);

        await expect(posts.filter({ hasText: COMPLEXES.buglessHeights.name }).first()).toBeVisible();
        await expect(posts.filter({ hasText: COMPLEXES.pixelPark.name }).first()).toBeVisible();

        await expect(posts.filter({ hasText: POST_CATEGORIES.event.name }).first()).toBeVisible();
        await expect(posts.filter({ hasText: POST_CATEGORIES.giveAway.name }).first()).toBeVisible();

        await expect(complexSelect).toHaveValue('');
        await expect(categorySelect).toHaveValue('');
    });

    test('should initialize filters from URL on direct visit', async ({ page }) => {
        await page.goto(`${PAGES.POSTS.link}?${QUERY_PARAMS.complex}=${COMPLEXES.pixelPark.value}`);

        const complexSelect = page.getByLabel(COMPLEX_ARIA_LABEL);
        await expect(complexSelect).toHaveValue(COMPLEXES.pixelPark.value);

        const postsList = page.getByTestId('posts-list');
        const posts = postsList.getByRole('listitem');
        await expect(posts.filter({ hasText: COMPLEXES.pixelPark.name }).first()).toBeVisible();
        await expect(posts.filter({ hasText: COMPLEXES.buglessHeights.name })).toHaveCount(0);
    });

    test('should show empty state when query is not valid', async ({ page }) => {
        await page.goto(`${PAGES.POSTS.link}?${QUERY_PARAMS.complex}=something-random`);
        
        const complexSelect = page.getByLabel(COMPLEX_ARIA_LABEL);
        await expect(complexSelect).toHaveValue('');
        await expect(complexSelect).toContainText('All Complexes');

        await expect(page.getByRole('main').getByText('Sorry, no announcements found')).toBeVisible();
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
