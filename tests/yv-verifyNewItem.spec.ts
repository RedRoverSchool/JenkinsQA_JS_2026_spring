import { test, expect, Page } from "@/base";
import { dataYV } from "./testData/yv-data";

test.describe("US_01.001 | New Item > Creatе a new item", () =>{
    test("TC_01.001.11 | Verify new item creation", async ({ page }: {page:Page} ) => {
        await page.locator(`[href="/view/all/newJob"]`).click();
        await page.locator('#name').fill(dataYV.jobName);
        await page.locator('.hudson_model_FreeStyleProject').click();
        await page.locator('#ok-button').click();
        await page.locator('.app-jenkins-logo').click();

        const job = await page.locator('#projectstatus .jenkins-table__link').getAttribute('href');
        expect(job).toContain(dataYV.jobName);

    });
});