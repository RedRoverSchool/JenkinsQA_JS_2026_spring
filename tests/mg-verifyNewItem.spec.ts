import { test, expect } from "@/base";
import { Page } from "@playwright/test";
import { jenkinsData } from "./testData/mg-data";


test.describe("US_01.001.10 | New Item > Create New Item", () => {
    test("TC_01.001.10 | Verify new item creation", async ({page} : { page: Page }) => {
        await page.locator("#side-panel a[href$='newJob']").click();
        await page.locator("#name").fill(jenkinsData.jobName);
        await page.getByRole('radio', { name: 'Freestyle project' }).click();
        await page.locator("#ok-button").click();        



        await page.locator(".app-jenkins-logo").click();
        const job = await page.locator("#projectstatus .jenkins-table__link").getAttribute("href");

        expect(job).toContain(jenkinsData.jobName);



    });
});