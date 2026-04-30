import { test, expect, Page } from "@/base";
import { generateFreeStyleProjectName } from "./testData/az-data";

test.describe("US_01.001 | New Item > Create a new item", () => {
    test("TC_01.001.06 | Create Free Style Project", async ({ page }: { page: Page }) => {
        const freeStyleProjectName = generateFreeStyleProjectName();

        await page.locator("#side-panel a[href$='newJob']").click();
        await page.locator("#name").fill(freeStyleProjectName);
        await page.locator("#j-add-item-type-standalone-projects ul li[class*='FreeStyleProject']").click();
        await page.locator("#ok-button").click();

        await page.locator('#bottom-sticker .jenkins-submit-button').click();

        await page.locator(".app-jenkins-logo").click();

        const job = await page.locator("#projectstatus .jenkins-table__link").getAttribute("href");
        expect(job).toContain(freeStyleProjectName);
    });
});