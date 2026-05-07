import { test, expect, Page } from "@/base";
import { vvData } from "./testData/vv-data";

test.describe("US_10.004 | Manage Jenkins > Tools", () => {

    test.beforeEach(async ({ page }: { page: Page }) => {
        await page.locator("a[href$='manage']").click();
        await page.locator("a[href$='configureTools']").click();
    });

    test("TC_10.004.01 | Verify Tools Configuration Page opens", async ({ page }: { page: Page }) => {
        expect(page.url()).toContain("/configureTools");
        await expect(page.locator(".jenkins-breadcrumbs__list-item").filter({ hasText: "Tools" })).toBeVisible();
    });

    for (const section of vvData.toolsSections) {
        test(`TC_10.004.02 | Verify Configuration section '${section}' is displayed`, async ({ page }: { page: Page }) => {
            await expect(page.locator(".jenkins-section__title").filter({ hasText: section })).toBeVisible();
        });
    }

    test("TC_10.004.03 | Verify Maven settings provider can be changed to custom", async ({ page }: { page: Page }) => {
        const settingsSelect = page
            .locator('div.jenkins-form-item')
            .filter({ hasText: 'Default settings provider' })
            .locator('select');

        await settingsSelect.selectOption("Settings file in filesystem");

        const filePathInput = page
            .locator('div.jenkins-form-item')
            .filter({ hasText: 'File path' })
            .locator('input');

        await expect(filePathInput).toBeVisible();
    });

    
});
