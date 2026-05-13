import { test, expect, App } from "@/POM/fixtures/baseFixtures";

test.describe("US_10.005 | Manage Jenkins > Plugins > Updates", () => {        
    test("RF_10.005.01 | Verify user can access Plugins section", async ({ app }: { app: App }) => {
        await app.homePage.header.clickManageJenkins();
        await app.manageJenkinsPage.clickPlugins();  
        
        await expect(app.pluginsPage.pageTitle()).toBeVisible();        
    });   
});