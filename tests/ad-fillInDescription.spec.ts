import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/ad-data";

test.describe("US_02.002 | Freestyle Project Configuration > Project Description", () => {
    test("TC_02.002.11 | Fill in description", async ({ page }: { page: Page }) => {
        await page.getByRole("link", { name: "New Item"}).click();
        await page.getByRole("textbox", { name: "name"}).fill(jenkinsData.freeStyleProjectName);
        await page.getByRole("radio", {name: "Freestyle project"}).click();
        await page.getByRole("button", { name: "OK" }).click();
        await page.locator("#general").isVisible();
        await page.locator("textarea[name='description']").fill(jenkinsData.projectDescription);
        await page.getByRole("button", { name: "Save" }).click();
        await page.locator("jenkins-app-bar").isVisible();
        const desc = await page.locator("#description-content");
        
        await expect(desc).toContainText(jenkinsData.projectDescription);
    });
});