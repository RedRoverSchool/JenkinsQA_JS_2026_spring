import { test, expect, App } from '@/POM/fixtures/baseFixtures';


test.describe("US_10.006 | Manage Jenkins > Plugins", () => {

    test("RF_10.006.01 | Verify Available plugins are displayed", async ({ app }: { app: App }) => {
        await app.homePage.header.clickManageJenkins();
        await app.manageJenkinsPage.clickPlugins();
        await app.pluginManagerPage.clickAvailableplugins()
 
        await app.pluginManagerPage.pluginsTableContent().first().waitFor({state: 'visible'})
        const count = await app.pluginManagerPage.pluginsTableContent().count();
        await expect(count).toBeGreaterThan(0)
        
    })


})
