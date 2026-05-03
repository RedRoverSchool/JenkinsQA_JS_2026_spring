import { test, expect, Page } from "@/base";
import { jobName, description } from "./testData/ok-data";

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

    test("TC_02.002.03 | Add description via Configuration page", async ({ page }: { page: Page }) => {
        await page.locator("textarea[name='description']").fill(description);
        await page.locator("button[value='Save']").click();

        const descriptionField = page.locator("#description-content");
                
        await expect(page.getByRole('link', { name: 'Status' })).toHaveClass(/task-link--active/);
        await expect(descriptionField).toHaveText(description);
    });

    test("TC_02.002.04 | Add description via Status page", async ({ page }: { page: Page }) => {
        await page.getByRole("button", {name: "Save"}).click();
        await page.getByRole('link', { name: 'Add description' }).click();

        const descriptionInputField = page.locator("textarea[name='description']");
        const descriptionField = page.locator("#description-content");

        await descriptionInputField.fill(description);
        await page.getByRole('button', { name: 'Save' }).click();

        await expect(descriptionField).toHaveText(description);
        await expect(page.getByRole('link', { name: 'Status' })).toHaveClass(/task-link--active/);
    });    
});
