import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/ech-data";

test.describe("US_13.002 | Header > Global Search", () => {

    test.beforeEach (async ({ page }: { page: Page }) => {
        await page.locator("[href='newJob']").click();
        await page.locator("#name").fill(jenkinsData.jobName);
        await page.locator("#j-add-item-type-standalone-projects ul li[class*='FreeStyleProject']").click();
        await page.locator("#ok-button").click();
        await page.locator("#jenkins-head-icon").click();
    });

    test("TC_13.002.01 | Verify search results appear", async ({ page }: { page: Page}) => {
        await page.locator("#root-action-SearchAction").click();
        await page.locator("#command-bar").fill(jenkinsData.jobName);
        await expect(page.locator("#search-results a")).toHaveText(jenkinsData.jobName);
    });

    test("TC_13.002.02 | Verify search with keywords", async ({ page }: { page: Page}) => {
        await page.locator("[href*='newJob']").click();
        await page.locator("#name").fill(jenkinsData.jobName2);
        await page.locator(".com_cloudbees_hudson_plugins_folder_Folder").click();
        await page.locator("#ok-button").click();

        await page.locator("#root-action-SearchAction").click();
        await page.locator("#command-bar").fill(jenkinsData.jobName.substring(0, 2));
        
        const container = page.locator('#search-results-container');
        await expect(container.getByText(jenkinsData.jobName)).toBeVisible();
        await expect(container.getByText(jenkinsData.jobName2)).toBeVisible();
    });

})