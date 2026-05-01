import { test, expect } from "@/base";
import { Page } from "@/base";
import { jenkinsData } from "./testData/am-data";


test.describe("US_01.005 | New Item > Create Multibranch Pipeline" , () => {
    test("TC_01.005.01 | Verify Multibranch Pipeline Creation", 
        async ({ page } : {page : Page}) => {

            await page.locator(".task-link-text", {hasText : "New Item"}).click();
            await page.locator("#name").fill(jenkinsData.multibranchPiplineName);
            await page.locator("[class*='WorkflowMultiBranchProject']").check();
            await page.locator("#ok-button").click();
            await page.locator(".app-jenkins-logo").click();

            const job = page.getByRole('link', { name: jenkinsData.multibranchPiplineName });
            await expect(job).toBeVisible();
    });


    
});