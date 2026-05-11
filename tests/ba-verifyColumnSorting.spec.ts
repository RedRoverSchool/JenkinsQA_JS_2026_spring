import { test, expect, Page } from "base";
import { jenkinsData } from "./testData/ba-data";

test.describe("US_09.002 | Build history > Sorting", () => {

    test.beforeEach(async ({ page }) => { 
        for (let i = 0; i < 5; i++) {

            await page.locator(".task-link-wrapper").getByText("New Item").click();
            await page.locator('input[name="name"]').fill(jenkinsData.jobName +i);
            await page.locator(".category").getByText("Freestyle project").click();
            await page.locator('button[type="submit"]').click();    
            await page.locator('button[formnovalidate="formNoValidate"]').click();
            await page.locator('.app-jenkins-logo').click();

        };

            // Build Excecution Script 
            
            // for (let i = 0; i < 5; i++) {
            //     await page.getByRole('link', { name: /Schedule a Build/ }).nth(i).click();
            // };

        
    });
    
    test("TC_09.002.05 | Build history > Sorting > Verify 'Name' colomn sorting", async ({ page } : { page: Page }) => {
    
        const beforeSort = (await page.locator(".jenkins-table__link").allInnerTexts()).map(text => text.trim());
        
        const expectedDesc = [...beforeSort].sort().reverse();
        
        await page.locator(".sortheader").getByText("Name").click();
        
        const afterSort = (await page.locator(".jenkins-table__link").allInnerTexts()).map(text => text.trim());

        await expect(afterSort).toEqual(expectedDesc);

    });

    test("TC_09.002.06 | Build history > Sorting > Verify 'Last Success' colomn sorting", async ({ page } : {page: Page }) => {

        const beforeSort = (await page.locator(".job-status-blue").nth(3).allInnerTexts()).map(text => text.trim());

        const expectedDesc = [...beforeSort].sort().reverse();
        
        await page.locator(".sortheader").getByText("Last Success").click();

        const afterSort = (await page.locator(".status-blue").nth(3).allInnerTexts()).map(text => text.trim());

        await expect(afterSort).toEqual(expectedDesc);

    });

    test("TC_09.002.07 | Build history > Sorting > Verify 'Last Failure' colomn sorting", async ({ page } : {page: Page }) => {

        const beforeSort = (await page.locator(".job-status-blue").nth(4).allInnerTexts()).map(text => text.trim());

        const expectedDesc = [...beforeSort].sort().reverse();
        
        await page.locator(".sortheader").getByText("Last Failure").click();

        const afterSort = (await page.locator(".status-blue").nth(4).allInnerTexts()).map(text => text.trim());

        await expect(afterSort).toEqual(expectedDesc);

    });

    test("TC_09.002.07 | Build history > Sorting > Verify 'Last Duration' colomn sorting", async ({ page } : {page: Page }) => {

        const beforeSort = (await page.locator(".job-status-blue").nth(5).allInnerTexts()).map(text => text.trim());

        const expectedDesc = [...beforeSort].sort().reverse();
        
        await page.locator(".sortheader").getByText("Last Duration").click();

        const afterSort = (await page.locator(".status-blue").nth(4).allInnerTexts()).map(text => text.trim());

        await expect(afterSort).toEqual(expectedDesc);

    });


});