import { test, expect, Page } from "@/base";
import { vvData } from "./testData/vv-data";
import { faker, fi } from "@faker-js/faker";

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

    test("TC_10.004.04 | Verify Maven global settings provider can be changed to custom", async ({ page }: { page: Page }) => {

        const globalSettingsSelect = page
            .locator('div.jenkins-form-item')
            .filter({ hasText: 'Default global settings provider' })
            .locator('select');
            
        await globalSettingsSelect.selectOption("Global settings file on filesystem");

        const globalFilePathInput = page
            .locator('div.jenkins-form-item')
            .filter({ hasText: 'File path' })
            .locator('input');

        await expect(globalFilePathInput).toBeVisible();
    });

    test("TC_10.004.05 | Verify JDK installation can be added", async ({ page }: { page: Page }) => {
        const addJdkButton = page.locator('button:has-text("Add JDK")').first();
        const jdkInsttalationsButton = page.locator('button:has-text("JDK installations")');
        if (await addJdkButton.isVisible().catch(() => false)) {
            await addJdkButton.click();
        } else {
            await jdkInsttalationsButton.isVisible().catch(() => false);
            await jdkInsttalationsButton.click();
            await addJdkButton.click();
        }

        const jdkName = `jdk-${faker.system.semver()}-${faker.lorem.word()}`;
        const firstChunk = page.locator('div.repeated-chunk.first').first();

        await expect(firstChunk.locator('input[name="_.name"]')).toBeVisible();
        await firstChunk.locator('input[name="_.name"]').fill(jdkName);

        await page.locator("button[name='Submit']").click();
        await page.locator("a[href$='configureTools']").click();
        await jdkInsttalationsButton.click();

        await expect(firstChunk.locator('input[name="_.name"]')).toHaveValue(jdkName);
    });
});
