import { test, expect, App } from '@/POM/fixtures/baseFixtures';


test.describe("US_10 | Manage Jenkins > Plugins", () => {
    test("RF_10.005.01 | Verify user can access Plugins section", async ({ app }: { app: App }) => {
        await app.homePage.header.clickManageJenkins();
        await app.manageJenkinsPage.clickPlugins();

        await expect(app.pluginManagerPage.mainTitle()).toBeVisible();
    });

    test("RF_10.005.02 | Verify 'Updates' option is available in the left side-menu", async ({ app }: { app: App }) => {
        await app.homePage.header.clickManageJenkins();
        await app.manageJenkinsPage.clickPlugins();

        await expect(app.pluginManagerPage.updatesTaskLink()).toBeVisible();
    });

    test("RF_10.005.03 | TC_10.005.03 | Verify 'Updates' Button is available", async ({ app }: { app: App }) => {
        await app.homePage.header.clickManageJenkins();
        await app.manageJenkinsPage.clickPlugins();

        await expect(app.pluginManagerPage.updateButton()).toBeVisible();
        await expect(app.pluginManagerPage.updateButton()).toBeDisabled();
    });

    test("RF_10.006.01 | Verify Available plugins are displayed", async ({ app }: { app: App }) => {
        await app.homePage.header.clickManageJenkins();
        await app.manageJenkinsPage.clickPlugins();
        await app.pluginManagerPage.clickAvailableplugins()
 
        await app.pluginManagerPage.pluginsTableContent().first().waitFor({state: 'visible'})
        const count = await app.pluginManagerPage.pluginsTableContent().count();
        await expect(count).toBeGreaterThan(0)
        
    })


})
