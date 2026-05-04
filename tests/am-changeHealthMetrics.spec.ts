import { test, expect, Page } from "@/base";
import { chooseTheMetric, cleanUpRedundantSpace, jenkinsData, navigateToHealthMetrics } from "./testData/am-data";


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

    test("TC_06.009.03 | Each metric displays its specific fields after being added to Health Metrics section",
    async ({page} : {page : Page}) =>{
        await page.locator(".task a[href*='configure']").click();
        await navigateToHealthMetrics(page);
        await chooseTheMetric(page, "Child item with the given name");
        await chooseTheMetric(page, "Child item with worst health");
        await chooseTheMetric(page, "Health of the primary branch of a repository");

        const metrics = page.locator("[descriptorid]");
        const textResultMetrics = (await metrics.allTextContents()).map(cleanUpRedundantSpace);
    
        expect(textResultMetrics).toEqual([
            "Child item with the given name Child Name",
            "Child item with worst health Recursive",
            "Health of the primary branch of a repository"])
        });

});