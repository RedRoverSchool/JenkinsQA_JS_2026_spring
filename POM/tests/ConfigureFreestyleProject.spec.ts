import { test, expect, App } from "@/POM/fixtures/baseFixtures";
import { newItemPageData } from "../testData/newItemPageData";

test.describe("US_02.004 | Freestyle Project Configuration > Build Triggers", () => {
  test.beforeEach(async ({ app }: { app: App }) => {
    await app.homePage.clickNewItemLink();
    await app.newItemPage.fillItemNameField(newItemPageData.itemName);
    await app.newItemPage.clickFreestyleProject();
    await app.newItemPage.clickOkButton();
    await app.configureFreestylePage.goToTriggersSection();
  });

  test("TC_02.004.01 | Verify Build Triggers section is available during project setup", async ({
    app,
  }: {
    app: App;
  }) => {
    await expect(app.configureFreestylePage.triggersSectionTitle()).toBeInViewport();
    await expect(app.configureFreestylePage.triggersSectionTitle()).toContainText("Triggers");
  });

  test(`TC_02.004.02 | Verify Authentication Token field is displayed when "Trigger builds remotely" is selected`, async ({
    app,
  }: {
    app: App;
  }) => {
    await app.configureFreestylePage.checkTriggerBuildsRemotely();
    await expect(app.configureFreestylePage.authTokenField()).toBeVisible();
    await expect(app.configureFreestylePage.authTokenField()).toBeEnabled();
  });
});
