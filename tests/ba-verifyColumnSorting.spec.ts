import { test, expect, Page } from "base";
import { jenkinsData } from "./testData/ba-data";

test.describe("US_09.002 | Build history > Sorting", () => {

    test.beforeEach(async ({ page }) => { 
        for (let i = 0; i < 5; i++) {

            await page.locator(".task-link-wrapper").getByText("New Item").click();
            await page.locator('input[name="name"]').fill(jenkinsData.jobName +i);
            await page.locator(".j-item-options").click();
            await page.locator('button[type="submit"]').click();    
            await page.locator('button[formnovalidate="formNoValidate"]').click();
            await page.locator('.app-jenkins-logo').click();

        };

            for (let i = 0; i < 5; i++) {
                await page.getByRole('link', { name: /Schedule a Build/ }).nth(i).click();
            };
    });
    
    test("TC_09.002.05 | Build history > Sorting > Verify Name sorting", async ({ page } : { page: Page }) => {
    
        await expect(page.locator('.job-status-nobuilt')).toHaveCount(5);

        const jobValues = (await page.locator(".jenkins-table__link").allInnerTexts()).map(text => text.trim());

        const jobNameExample = jobValues;
        
        const jobNameDesc = jobNameExample.reverse();
        
        await page.locator(".sortheader").getByText("Name").click();

        await expect(jobValues).toEqual(jobNameDesc);

    });
    
});