import { test, expect, Page } from '@/base';
import { jenkinsData } from './testData/nail-data';

test.describe("US_02.002 | Freestyle Project Configuration > Project Description", () => {
    test.beforeEach(async ({ page }: { page: Page }) => {
        await page.getByRole("link", { name: "Create a job" }).click();
        await page.getByRole("textbox", { name: "name" }).fill(jenkinsData.jobName);
        await page.getByRole("radio", { name: "Freestyle project" }).click();
        await page.getByRole("button", { name: "OK" }).click();
    });

    test("TC_02.002.12 | Verify 'description' field is present", async ({ page }: { page: Page }) => {
        await expect(page.locator("textarea[name='description']")).toBeVisible();
    });
});
