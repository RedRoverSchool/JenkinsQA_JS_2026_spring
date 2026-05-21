import { test, expect, App } from '@/POM/fixtures/baseFixtures';
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

    for (const section of toolsPageData.toolsSections) {
            test(`RF_10.004.02 | Verify Configuration section '${section}' is displayed`, async ({ app }: { app: App }) => {
                await expect(app.toolsPage.sectionLocator(section)).toBeVisible();
            });
    };

    test("RF_10.004.03 | Verify Maven settings provider can be changed to custom", async ({ app }: { app: App }) => {
        await app.toolsPage.selectSettingsFileInFilesystem();

        await expect(app.toolsPage.mavenFilePathInput()).toBeVisible();
    });

    test("RF_10.004.04 | Verify Global Maven settings provider can be changed to custom", async ({ app }: { app: App }) => {
        await app.toolsPage.selectGlobalSettingsFileInFilesystem();

        await expect(app.toolsPage.globalMavenFilePathInput()).toBeVisible();
    });

    test("TC_10.004.05 | Verify JDK installation can be added", async ({ app }: { app: App }) => {
        await app.toolsPage.clickAddJdkWithFallback();

        const jdkName = toolsPageData.generateJdkName();
        const nameInput = app.toolsPage.getJdkNameInput();

        await nameInput.fill(jdkName);
        await app.toolsPage.clickSave();
        await app.manageJenkinsPage.clickTools();
        await app.toolsPage.clickJdkInstallationsButton();

        await expect(app.toolsPage.newJdkNameInput(jdkName)).toBeVisible();
        await expect(app.toolsPage.newJdkNameInput(jdkName)).toHaveValue(jdkName);
    });

});