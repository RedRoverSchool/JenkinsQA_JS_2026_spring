import { test, expect } from '../../POM/fixtures/baseFixtures';
test.describe('US_13.001 | Header > Navigate to Dashboard', () => {
    test('RF_13.001.01 | Verify header is visible from tools page', async ({ app }) => {
        await app.homePage.header.clickManageJenkins();
        await app.manageJenkinsPage.clickToolsLink();
        expect(app.toolsPage.header.logoLink()).toBeVisible;
    });
});
//# sourceMappingURL=Header.spec.js.map