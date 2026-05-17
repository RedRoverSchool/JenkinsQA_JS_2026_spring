import { test, expect, App } from '@/POM/fixtures/baseFixtures';
import {toolsTitles} from '../testData/ToolsPageData'
test.describe("US_10.004 | Manage Jenkins > Tools", () => {

    test("RF_10.004.01 | Verify Tools Configuration Page opens", async ({ app }: { app: App }) => {
        await app.homePage.header.clickManageJenkins();
        await app.manageJenkinsPage.clickTools();

        const currentUrl = await app.toolsPage.getCurrentUrl();
        expect(currentUrl).toContain("/configureTools");
    });

});

test('RF_10.004.06 | Verify Configuration settings are displayed correctly', async ({ app }: { app: App }) => {
    await app.homePage.header.clickManageJenkins();
    await app.manageJenkinsPage.clickTools();

    for(const title of toolsTitles){
        await expect(app.toolsPage.getTitle(title)).toBeVisible()
    }
})