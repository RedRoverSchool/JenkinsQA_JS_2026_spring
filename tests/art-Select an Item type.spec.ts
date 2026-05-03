import { test, expect } from "@/base";
import { Page } from "@playwright/test";
import { jenkinsData } from "./testData/art-data";

test.describe("US_01.004 | New Item > Select an Item type", () => {

    test("TC_01.004.10 | Create new Pipeline", async ({ page }: { page: Page }) => {
        await page.locator("#side-panel a[href$='newJob']").click();
        await page.locator("#name").fill(jenkinsData.pipelineName);
        await page.locator(".org_jenkinsci_plugins_workflow_job_WorkflowJob").click();
        await page.locator("#ok-button").click();

        await page.locator(".app-jenkins-logo").click();

        const job = await page.locator("#projectstatus .jenkins-table__link").getAttribute("href");
        expect(job).toContain(jenkinsData.pipelineName);           
    });

     test("TC_01.004.11 | FreeStyleProject", async ({ page }: { page: Page }) => {
        await page.locator("#side-panel a[href$='newJob']").click();
        await page.locator("#name").fill(jenkinsData.jobName);
        await page.locator(".hudson_model_FreeStyleProject").click();
        await page.locator("#ok-button").click();

        await page.locator(".app-jenkins-logo").click();

        const job = await page.locator("#projectstatus .jenkins-table__link").getAttribute("href");
        expect(job).toContain(jenkinsData.jobName);           
    });

});