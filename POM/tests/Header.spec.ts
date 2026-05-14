import { test, expect, App } from '@/POM/fixtures/baseFixtures';

test.describe('US_13.001 | Header > Navigate to Dashboard', () => {
    test('RF_13.001.01 | Verify header is visible from tools page', async ({ app }: { app: App }) => {
        await app.homePage.header.clickManageJenkins();
        await app.manageJenkinsPage.clickToolsLink();

        expect (app.ToolsPage.header.logoLink()).toBeVisible;
    });

});