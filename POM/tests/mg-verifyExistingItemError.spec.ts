import { test, expect } from "@/base";
import { App } from "../pageObjects/App";

test.describe("RF_01.001.10 | New Item > Create new item > Error when item exists", () => {

  test.beforeEach(async ({ page }) => {
    const app = new App(page);

    const home = app.homePage;
    const newItem = app.newItemPage;
    const config = app.configureFreestylePage;

  
    await home.clickNewItemLink();
    await newItem.fillItemNameField("item1");
    await newItem.clickFreestyleProject();
    await newItem.clickOkButton();
    await config.clickSaveButton();

    
    await page.locator(".app-jenkins-logo").click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("RF_01.001.10 | Verify error message for existing item", async ({ page }) => {
    const app = new App(page);

    const home = app.homePage;
    const newItem = app.newItemPage;

    await home.clickNewItemLink();
    await newItem.fillItemNameField("item1");

    await expect(newItem.errorMessage()).toBeVisible();

    const text = await newItem.getErrorText();
    expect(text.toLowerCase()).toContain("already exists");
  });
});
