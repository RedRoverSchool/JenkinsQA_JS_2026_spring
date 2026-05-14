import { test, expect, App } from '@/POM/fixtures/baseFixtures';

test.describe("US_10.004 | Manage Jenkins > Tools", () => {

    test("RF_10.004.01 | Verify Tools Configuration Page opens", async ({ app }: { app: App }) => {
        await app.homePage.header.clickManageJenkins();
        await app.manageJenkinsPage.clickTools();

        const currentUrl = await app.toolsPage.getCurrentUrl();
        expect(currentUrl).toContain("/configureTools");
    });

});