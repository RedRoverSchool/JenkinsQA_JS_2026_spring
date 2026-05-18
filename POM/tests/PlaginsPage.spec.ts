import { test, expect, App } from '@/POM/fixtures/baseFixtures';
import {plaginsPageData} from '../testData/plaginsPageData';

test.describe("US_10.006 | Manage Jenkins > Plugins", () => {

    test("Verify Available plugins are displayed", async ({ app }: { app: App }) => {
        await app.homePage.header.clickManageJenkins();
        await app.manageJenkinsPage.clickPlugins();
 
        for(const plugin of plaginsPageData.pluginsData){
        await expect(app.pluginsPage.plaginsName(plugin)).toBeVisible();
        }
    })


})
