import { test, expect, Page } from "@/base";
import { jobName } from "./testData/ok-data";

test.describe("US_02.002 | Freestyle Project Configuration > Project Description", () => {

    test.beforeEach(async ({ page }: { page: Page }) => {
        await page.getByRole('link', { name: "Create a job" }).click();
        await page.getByRole('textbox', { name: "name" }).fill(jobName);
        await page.getByRole('radio', { name: "Freestyle project" }).click();
        await page.getByRole('button', { name: "OK" }).click();
    });

    test("TC_02.002.01 | Verify Description field is displayed", async ({ page }: { page: Page }) => {
        const sectionTitle = page.locator("#general");
        await expect(sectionTitle).toBeVisible();

        const descriptionTextarea = page.locator("textarea[name='description']");
        await expect(descriptionTextarea).toBeVisible();
    });

    test("TC_02.002.02 | Verify Preview option is displayed", async ({ page }: { page: Page }) => {
        const sectionTitle = page.locator("#general");
        await expect(sectionTitle).toBeVisible();

        const previewLink = page.locator("a.textarea-show-preview");
        await expect(previewLink).toBeVisible();      
    });
});

