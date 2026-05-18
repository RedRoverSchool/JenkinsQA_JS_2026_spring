import { test, expect, App } from "@/POM/fixtures/baseFixtures";
import { newItemPageData } from "@/POM/testData/newItemPageData";

test.describe("US_09.001 | Build history > Core Build History Display", () => {
  test("RF_09.001.05 | Verify successful build entry displays success status icon", async ({
    app,
  }) => {
    const projectName = newItemPageData.itemName;

    await app.homePage.clickNewItemLink();
    await app.newItemPage.createFreestyleProject(projectName);
    await app.configureFreestylePage.clickSaveButton();

    await app.freeStyleProjectPage.clickBuildNowLink();
    await app.freeStyleProjectPage.buildNumber("#1").waitFor();
    await app.header.clickHome();
    await app.homePage.clickBuildHistoryLink();

    await expect(
      app.buildHistoryPage.successfulBuildStatusIcon(projectName),
    ).toBeVisible();
  });

  test("RF_09.001.01 | Item displays on Build History page after building", async ({
    app,
  }) => {
    await app.homePage.clickNewItemLink();
    await app.newItemPage.fillItemNameField(newItemPageData.itemName);
    await app.newItemPage.clickFreestyleProject();
    await app.newItemPage.clickOkButton();

    await app.configureFreestylePage.saveChanges();
    await app.freeStyleProjectPage.clickBuildNowLink();
    await app.freeStyleProjectPage.header.clickHome();
    await app.homePage.clickBuildHistoryLink();

    await expect(app.buildHistoryPage.newItemName()).toContainText(
      newItemPageData.itemName,
    );
  });
});

test.describe("US_09.002 | Build history > Sorting", () => {
  test("RF_09.002.02 | Verify sorting toggle changes build order", async ({
    app,
  }: {
    app: App;
  }) => {
    const projectName = newItemPageData.itemName;

    await app.homePage.clickNewItemLink();
    await app.newItemPage.createFreestyleProject(projectName);

    await app.configureFreestylePage.clickSaveButton();
    await app.freeStyleProjectPage.createBuilds(4);

    await app.freeStyleProjectPage.header.clickHome();
    await app.homePage.clickBuildHistoryLink();

    await expect(app.buildHistoryPage.buildValues().first()).toBeVisible();

    const initialOrder = await app.buildHistoryPage.getBuildValues();

    await app.buildHistoryPage.clickSortableBuildHeader();

    await expect(app.buildHistoryPage.buildValues().first()).toBeVisible();

    const firstSortOrder = await app.buildHistoryPage.getBuildValues();

    await app.buildHistoryPage.clickSortableBuildHeader();

    await expect(app.buildHistoryPage.buildValues().first()).toBeVisible();

    const secondSortOrder = await app.buildHistoryPage.getBuildValues();

    expect(firstSortOrder).not.toEqual(initialOrder);
    expect(secondSortOrder).toEqual(initialOrder);
  });
});
