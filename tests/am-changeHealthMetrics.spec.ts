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
});