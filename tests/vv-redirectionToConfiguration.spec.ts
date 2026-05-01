import { test, expect, Page } from "@/base";
import { vvData } from "./testData/vv-data";

test.describe("US_01.001 | New Item > Creatе a new item", () => {
    test("TC_01.001.08 | Verify redirection to configuration page", async ({ page }: { page: Page }) => {
        await page.locator("#side-panel a[href$='newJob']").click();
        await page.locator("#name").fill(vvData.jobName);
        await page.locator("#j-add-item-type-standalone-projects ul li[class*='FreeStyleProject']").click();
        await page.locator("#ok-button").click();

        expect(page.url()).toContain("/configure");
        await expect(page.locator(".jenkins-app-bar .jenkins-app-bar__content h1")).toHaveText("Configure");
    });
});