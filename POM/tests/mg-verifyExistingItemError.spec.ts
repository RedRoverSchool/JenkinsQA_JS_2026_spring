import { test, expect } from "@/base";

import { HomePage } from "../pageObjects/pages/HomePage";
import { NewItemPage } from "../pageObjects/pages/NewItemPage";
import { ConfigureFreestylePage } from "../pageObjects/pages/ConfigureFreestylePage";

test.describe("RF_01.001.10 | New Item > Create new item > Error when item exists", () => {

  test.beforeEach(async ({ page }) => {
    const home = new HomePage(page);
    const newItem = new NewItemPage(page);
    const config = new ConfigureFreestylePage(page);

    await home.clickNewItemLink();
    await newItem.fillItemNameField("item1");
    await newItem.clickFreestyleProject();
    await newItem.clickOkButton();
    await config.clickSaveButton();

    await page.locator(".app-jenkins-logo").click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("RF_01.001.10 | Verify error message for existing item", async ({ page }) => {
    const home = new HomePage(page);
    const newItem = new NewItemPage(page);

    await home.clickNewItemLink();

    await newItem.fillItemNameField("item1");

    await expect(newItem.errorMessage()).toBeVisible();

    const text = await newItem.getErrorText();
    expect(text.toLowerCase()).toContain("already exists");
  });
});

