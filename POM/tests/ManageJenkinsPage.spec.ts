import { test, expect, App } from "@/POM/fixtures/baseFixtures";
import { manageJenkinsPageData } from "../testData/jenkinsData";

test.describe("US_10.005 | Manage Jenkins > Plugins > Updates", () => {
  test("RF_10.005.01 | Verify user can access Plugins section", async ({ app }: { app: App }) => {
    await app.homePage.header.clickManageJenkins();
    await app.manageJenkinsPage.clickPlugins();

    await expect(app.pluginsPage.mainTitle()).toBeVisible();
  });
});

test.describe(`US_11.003 | Welcome Dashboard > Manage Jenkins > `, () => {
  test("TC_11.003.01 | Verify Manage Jenkins page contains all grouped sections", async ({
    app,
  }: {
    app: App;
  }) => {
    await app.homePage.header.clickManageJenkins();
    const actualSections = await app.manageJenkinsPage.jenkinsSectionTitle().allTextContents();
    expect(actualSections).toEqual(manageJenkinsPageData.sections);
    console.log(await app.manageJenkinsPage.jenkinsSectionTitle().allTextContents());
  });
});
