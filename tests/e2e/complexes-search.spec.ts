import { PAGES } from '@/data/pages';
import { COMPLEX_SEARCH, COMPLEXES, QUERY_PARAMS } from '@/tests/__fixtures__/seed.fixture';
import { test, expect } from '@playwright/test';

test.describe('Complexes Search', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(PAGES.COMPLEXES.link);
    });

    test('should display all complexes by default', async ({ page }) => {
        await expect(page.getByRole('heading', { name: COMPLEXES.pixelPark.name })).toBeVisible();
        await expect(page.getByRole('heading', { name: COMPLEXES.buglessHeights.name })).toBeVisible();
    });

    test('should filter complexes by search query', async ({ page }) => {
        const searchInput = page.getByPlaceholder(COMPLEX_SEARCH.placeholder);

        await searchInput.fill(COMPLEX_SEARCH.query);

        await expect(page).toHaveURL((url) => url.searchParams.get(QUERY_PARAMS.search) === COMPLEX_SEARCH.query);

        await expect(page.getByRole('heading', { name: COMPLEXES.pixelPark.name })).toBeVisible();
        await expect(page.getByRole('heading', { name: COMPLEXES.buglessHeights.name })).not.toBeVisible();
    });

    test('should show empty state when no results found', async ({ page }) => {
        const searchInput = page.getByPlaceholder(COMPLEX_SEARCH.placeholder);

        await searchInput.fill(COMPLEX_SEARCH.emptyQuery);

        await expect(page.getByText(COMPLEX_SEARCH.emptyText)).toBeVisible();
    });

    test('should clear search and restore list', async ({ page }) => {
        const searchInput = page.getByPlaceholder(COMPLEX_SEARCH.placeholder);

        await searchInput.fill(COMPLEX_SEARCH.query);
        await expect(page.getByRole('heading', { name: COMPLEXES.buglessHeights.name })).not.toBeVisible();

        await searchInput.fill('');

        await expect(page.getByRole('heading', { name: COMPLEXES.pixelPark.name })).toBeVisible();
        await expect(page.getByRole('heading', { name: COMPLEXES.buglessHeights.name })).toBeVisible();
        await expect(page).toHaveURL((url) => !url.searchParams.has(QUERY_PARAMS.search));
    });
});
