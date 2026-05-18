import { test, expect } from "@/POM/fixtures/baseFixtures";
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

  test("RF_09.001.01 | Item displays on Build History page after building", async({ app })=>{

    await app.homePage.clickNewItemLink();
    await app.newItemPage.fillItemNameField(newItemPageData.itemName)
    await app.newItemPage.clickFreestyleProject();
    await app.newItemPage.clickOkButton();

    await app.configureFreestylePage.saveChanges();
    await app.freeStyleProjectPage.clickBuildNowLink();
    await app.freeStyleProjectPage.header.clickHome();
    await app.homePage.clickBuildHistoryLink();
    
    await expect(app.buildHistoryPage.newItemName()).toContainText(newItemPageData.itemName);
  });

});
