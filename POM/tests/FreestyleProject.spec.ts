import { test, expect, App } from "@/POM/fixtures/baseFixtures";
import { newItemPageData } from "../testData/newItemPageData";

test.describe("US_02.001 | Freestyle Project Configuration > Enable or Disable the Project", async () => {
  test.beforeEach(async ({ app }: { app: App }) => {
    await app.homePage.clickNewItemLink();
    await app.newItemPage.fillItemNameField(newItemPageData.itemName);
    await app.newItemPage.clickFreestyleProject();
    await app.newItemPage.clickOkButton();
    await app.configureFreestylePage.header.clickHome();

    await app.homePage.hoverItemName();
    await app.homePage.openItemDropdownMenu();
    await app.homePage.clickItemDropDownConfigureButton(newItemPageData.itemName);
    await app.configureFreestylePage.disableProject();
    await app.configureFreestylePage.saveChanges();
  });

  test("RF_02.001.01 |Verify that warning message appears after disabling the project", async ({
    app,
  }: {
    app: App;
  }) => {
    await expect(app.freeStyleProjectPage.disabledProjectWarning()).toBeVisible();
    await expect(app.freeStyleProjectPage.disabledProjectWarning()).toContainText(
      "This project is currently disabled",
    );
  });

  test("TC_02.001.09 | Verify Enable button is shown while project is disabled", async ({
    app,
  }: {
    app: App;
  }) => {
    await expect(app.freeStyleProjectPage.enableProjectBtn()).toBeVisible();
    await expect(app.freeStyleProjectPage.enableProjectBtn()).toBeEnabled();
  });
});
