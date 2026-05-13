import { test, expect, App } from '@/POM/fixtures/baseFixtures';

test.describe("US_10.004 | Manage Jenkins > Tools", () => {

    test.beforeEach(async ({ app }: { app: App }) => {
        await app.homePage.header.clickManageJenkins();
        await app.manageJenkinsPage.clickToolsLink();
    });

    test("TC_10.004.01 | Verify Tools Configuration Page opens", async ({ app }: { app: App }) => {
        await app.toolsPage.isToolsPageOpened();
        await expect(app.toolsPage.header.toolsBreadcrumb()).toBeVisible();
    });

});