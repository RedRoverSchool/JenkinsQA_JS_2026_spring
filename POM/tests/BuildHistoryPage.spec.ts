import { test, expect, App } from "@/POM/fixtures/baseFixtures";
import { newItemPageData } from "../testData/newItemPageData";

test.describe("US_09.001 | Build history > Core Build History Display", () =>{
  test("RF_09.001.01 | Item displays on Build History page after building", async({ app } : { app : App })=>{

    await app.homePage.clickNewItemLink();
    await app.newItemPage.fillItemNameField(newItemPageData.itemName)
    await app.newItemPage.clickFreestyleProject();
    await app.newItemPage.clickOkButton();

    await app.configureFreestylePage.saveChanges();
    await app.freeStyleProjectPage.clickBuildNowButton();
    await app.freeStyleProjectPage.header.clickHome();
    await app.homePage.clickBuildHistoryButton();
    
    expect(app.buildHistoryPage.newItemName()).toContainText(newItemPageData.itemName);

  });

});