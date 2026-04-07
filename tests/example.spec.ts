import { expect } from "@playwright/test";
import { test } from "@/base";

test.describe("Test Suite", () => {
    test("Test1", async ({ page }) => {
        await page.goto('https://playwright.dev/');
        await expect(page).toHaveTitle(/Playwright/);
    });

    test("TEST2", async ({ page }) => {
        await page.goto('https://playwright.dev/');
        await page.getByRole('link', { name: 'Get started' }).click();
        await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
    });
});
