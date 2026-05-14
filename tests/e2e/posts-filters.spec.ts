import { PAGES } from '@/data/pages';
import { RESET_BUTTON_TEXT, COMPLEX_ARIA_LABEL, CATEGORY_ARIA_LABEL } from '@/data/posts-filters';
import { COMPLEXES, POST_CATEGORIES, QUERY_PARAMS } from '@/tests/__fixtures__/seed.fixture';

import { test, expect } from '@playwright/test';

test.describe('Posts Filters', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(PAGES.POSTS.link);
    });

    test('should filter posts by complex and category and reset filters', async ({ page }) => {
        const complexSelect = page.getByLabel(COMPLEX_ARIA_LABEL);
        const categorySelect = page.getByLabel(CATEGORY_ARIA_LABEL);
        const list = page.getByRole('list');

        await expect(complexSelect).toBeEnabled();
        await complexSelect.selectOption({ value: COMPLEXES.buglessHeights.value });

        await expect(page).toHaveURL(
            (url) => url.searchParams.get(QUERY_PARAMS.complex) === COMPLEXES.buglessHeights.value
        );
        await expect(list.getByText(COMPLEXES.buglessHeights.name).first()).toBeVisible();
        await expect(list.getByText(COMPLEXES.pixelPark.name)).not.toBeVisible();

        await categorySelect.selectOption({ value: POST_CATEGORIES.event.value });
        await expect(page).toHaveURL(
            (url) => url.searchParams.get(QUERY_PARAMS.category) === POST_CATEGORIES.event.value
        );
        await expect(list.getByText(POST_CATEGORIES.event.name).first()).toBeVisible();
        await expect(list.getByText(POST_CATEGORIES.giveAway.name)).not.toBeVisible();

        const resetBtn = page.getByRole('button', { name: RESET_BUTTON_TEXT });
        await resetBtn.click();

        await expect(page).toHaveURL(PAGES.POSTS.link);

        await expect(list.getByText(COMPLEXES.buglessHeights.name).first()).toBeVisible();
        await expect(list.getByText(COMPLEXES.pixelPark.name).first()).toBeVisible();

        await expect(list.getByText(POST_CATEGORIES.event.name).first()).toBeVisible();
        await expect(list.getByText(POST_CATEGORIES.giveAway.name).first()).toBeVisible();
    });
});
