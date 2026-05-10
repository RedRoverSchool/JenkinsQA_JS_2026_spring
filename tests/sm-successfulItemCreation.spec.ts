import { test, expect } from "@/base";
import { Page } from "@playwright/test";
import { jenkinsData } from "./testData/sm-data";

test.describe("US_01.001 | New Item > Creatе a new item", () => {
    test("TC_01.001.35 | New Item > Create a new item > Successful item creation", async ({ page }: { page: Page }) => {
        await page.locator("a:has-text('New Item')").click();
        await page.locator("#name").fill(jenkinsData.jobName);
        await page.locator(".hudson_model_FreeStyleProject").click();
        await page.locator("#ok-button").click();

        const job = await page.locator(".jenkins-breadcrumbs__list-item a").getAttribute("href");
        expect(job).toContain(jenkinsData.jobName);
    })
})
