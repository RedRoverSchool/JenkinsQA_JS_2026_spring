import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/ech-data";

test.describe("US_13.001 | Header > Navigate to Dashboard", () => {
    
    test("TC_13.001.01 | Verify Dashboard is visible", async ({ page }: { page: Page }) => {
        await page.locator("#root-action-ManageJenkinsAction").click();
        await page.locator("[href='configureTools']").click();

        await expect(page.locator(".app-jenkins-logo")).toBeVisible();
    });

     test("TC_13.001.02 | Verify redirection to Dashboard and content visibility", async ({ page }: { page: Page }) => {
        await page.locator("#side-panel a[href$='newJob']").click();
        await page.locator("#name").fill(jenkinsData.jobName);
        await page.locator("#j-add-item-type-standalone-projects ul li[class*='MatrixProject']").click();
        await page.locator("#ok-button").click();

        await page.locator(".app-jenkins-logo").click();

        await expect(page.locator(".jenkins-table__link")).toHaveText(jenkinsData.jobName);
    });

});