import { test, expect, Page } from '@/base'
import { jenkinsData } from './testData/tz-data';

test.describe("US_12.002 | Dashboard with the items > Sort and Filter Items", () => {

    test.beforeEach(async ({page}: {page: Page}) => {

        for (let i = 1; i <= jenkinsData.dashboardItemsCount; i++) {
            
            const itemName = jenkinsData.generateItemName();
            jenkinsData.createdDashboardItems.push(itemName)

            await page.locator("#side-panel a[href$='newJob']").click();
            await page.locator("#name").fill(itemName);
            await page.locator("#j-add-item-type-standalone-projects ul li[class*='WorkflowJob']").click()
            await page.locator("#ok-button").click();
            await page.locator(".app-jenkins-logo").click();
        }
    });

    test("TC_12.002.01 | Default Sorting by Name (A→Z)", async ( {page} : {page: Page} ) => {
    
        const dashboardItems = (await page.locator(".app-project-status-table [href ^= 'job/']")
                            .allTextContents()).map(n => n.trim()).filter(n => n.length > 0)
        const sortedDashboardItems = [...dashboardItems].sort((a, b) => a.localeCompare(b))

        expect(dashboardItems).toEqual(sortedDashboardItems)

    });

    test("TC_12.002.02 | Persisted Sorting by Name Preference Is Applied on Dashboard Load", async({page} : {page: Page}) => {

        await page.locator('[initialsortdir] a').click();

        const dashboardItemsNewOrder = (await page.locator(".app-project-status-table [href ^= 'job/']")
                            .allTextContents()).map(n => n.trim()).filter(n => n.length > 0)
        
        const sortedItemsZtoA = [...jenkinsData.createdDashboardItems].sort((a, b) => b.localeCompare(a));

        expect(dashboardItemsNewOrder).toEqual(sortedItemsZtoA);

        await page.getByRole('link', { name: 'Build History' }).click()
        await page.locator(".app-jenkins-logo").click();

        const dashboardItemsCurrentOrder = (await page.locator(".app-project-status-table [href ^= 'job/']")
                            .allTextContents()).map(n => n.trim()).filter(n => n.length > 0)       
        
        expect(dashboardItemsNewOrder).toEqual(dashboardItemsCurrentOrder)
    });

});