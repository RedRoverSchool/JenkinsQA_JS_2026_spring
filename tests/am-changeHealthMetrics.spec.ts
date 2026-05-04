import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/am-data";


test.describe("US_06.009| Multibranch pipeline Configuration > Change Health metrics", () => {
    test.beforeEach(async ({page} : {page : Page}) => {
        await page.locator(".task-link-text", {hasText : "New Item"}).click();
        await page.locator("#name").fill(jenkinsData.multibranchPiplineName);
        await page.locator("[class*='WorkflowMultiBranchProject']").check();
        await page.locator("#ok-button").click();
        await page.locator(".app-jenkins-logo").click();
        await page.locator(`.job-status- a[href*=${jenkinsData.multibranchPiplineName}]`).click();
    });

    test("TC_06.009.01 | Health Metrics section is displayed", async ({page} : {page : Page}) => { 
        await page.locator(".task a[href*='configure']").click();
        const healthMetricsSection = page.locator("#health-metrics");

        await expect(healthMetricsSection).toBeVisible();
    });

    test("TC_06.009.02 | Verify that Add Metrics button is visible and provides 3 options",
    async ( {page} : {page : Page} ) => {
        await page.locator(".task a[href*='configure']").click();
        await page.locator("button[type='button']", {hasText : "Health metrics"}).scrollIntoViewIfNeeded();
        await page.locator("button[type='button']", {hasText : "Health metrics"}).click();
        await page.locator("button[type='button']", {hasText : "Add metric"}).click();

        const мetricDropdownOptions = page.locator(".jenkins-dropdown__item");

        await expect(мetricDropdownOptions).toHaveText(["Child item with the given name", "Child item with worst health", "Health of the primary branch of a repository"]);
    });
});