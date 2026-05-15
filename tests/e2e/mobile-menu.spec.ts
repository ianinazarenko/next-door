import { test, expect } from '@playwright/test';
import { MENU_LIST } from '@/data/menu';
import { PAGES } from '@/data/pages';

test.describe('Mobile Navigation Menu', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should show/hide mobile menu based on device type', async ({ page, isMobile }) => {
        const mobileMenu = page.getByRole('navigation', { name: 'Mobile navigation' });

        if (isMobile) {
            await expect(mobileMenu).toBeVisible();

            await expect(mobileMenu).toContainText(PAGES.HOME.title);
            await expect(mobileMenu.getByRole('link', { name: PAGES.HOME.title })).toBeVisible();
        } else {
            await expect(mobileMenu).not.toBeVisible();
        }
    });

    test('should navigate via mobile menu', async ({ page, isMobile }) => {
        test.skip(!isMobile, 'This test is only for mobile devices');

        const mobileMenu = page.getByRole('navigation', { name: 'Mobile navigation' });
        const complexLink = mobileMenu.getByRole('link', { name: PAGES.COMPLEXES.title });
        await expect(complexLink).toBeVisible();
        
        await complexLink.click();
        
        await expect(page).toHaveURL(PAGES.COMPLEXES.link);
    });
});
