import { test, expect, App } from "@/POM/fixtures/baseFixtures";
import { newItemPageData } from "@/POM/testData/newItemPageData";

test.describe("US_01.001 | New Item > Create a new item", () => {
  test("RF_01.001.21 | Verify new item page opens from dashboard", async ({
    app,
  }: {
    app: App;
  }) => {
    await app.homePage.clickNewItemLink();

    await expect(app.newItemPage.newItemTitle()).toContainText("New Item");
  });

  test("RF_01.001.22 | Verify blank item name validation", async ({
    app,
  }: {
    app: App;
  }) => {
    await app.homePage.clickNewItemLink();

    await expect(app.newItemPage.itemNameValidationMessage()).toContainText(
      "This field cannot be empty",
    );
  });

  test("RF_01.001.25 | Verify warning for duplicate item name", async ({
    app,
  }: {
    app: App;
  }) => {
    const itemName = newItemPageData.duplicateItemName;

    await app.homePage.clickNewItemLink();

    await app.newItemPage.createFreestyleProject(itemName);

    await app.configureFreestylePage.header.clickHome();

    await app.homePage.clickNewItemLink();

    await app.newItemPage.fillItemNameField(itemName);

    await app.newItemPage.clickFreestyleProject();

    await expect(app.newItemPage.duplicateItemNameWarning()).toContainText(
      itemName,
    );
  });
});
