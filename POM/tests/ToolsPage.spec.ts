import { test, expect, App } from '@/POM/fixtures/baseFixtures';
import {toolsTitles} from '../testData/ToolsPageData'
import { toolsPageData } from '../testData/toolsPageData';

test.describe("US_10.004 | Manage Jenkins > Tools", () => {

    test.beforeEach(async ({ app }: { app: App }) => {
        await app.homePage.header.clickManageJenkins();
        await app.manageJenkinsPage.clickTools();
    });

    test("RF_10.004.01 | Verify Tools Configuration Page opens", async ({ app }: { app: App }) => {
        const currentUrl = await app.toolsPage.getCurrentUrl();
        expect(currentUrl).toContain("/configureTools");
    });

    test('RF_10.004.06 | Verify Configuration settings are displayed correctly', async ({ app }: { app: App }) => {
        await app.homePage.header.clickManageJenkins();
        await app.manageJenkinsPage.clickTools();

        for(const title of toolsTitles){
            await expect(app.toolsPage.getTitle(title)).toBeVisible()
        }
    })

    for (const section of toolsPageData.toolsSections) {
            test(`RF_10.004.02 | Verify Configuration section '${section}' is displayed`, async ({ app }: { app: App }) => {
                await expect(app.toolsPage.sectionLocator(section)).toBeVisible();
            });
    }

});
