import { test, expect, Page } from "@/base";
import { newItemData, newItemLocators, openNewItemPage, createFreestyleProject } from "./testData/tl-data";

test.describe("US_01.001 | New Item > Create a new item", () => {
  test("TC_01.001.21 | Verify new item page opens from dashboard", async ({ page }: { page: Page }) => {
    await openNewItemPage(page);

    await expect(page).toHaveURL(/newJob/);
  });

  test("TC_01.001.22 | Verify blank item name validation", async ({ page }: { page: Page }) => {
    await openNewItemPage(page);

    await page.locator(newItemLocators.freestyleProject).click();

    await expect(page.locator(newItemLocators.okButton)).toBeDisabled();
  });

  test("TC_01.001.23 | Verify unsupported special characters validation", async ({ page }: { page: Page }) => {
    await openNewItemPage(page);

    await page.locator(newItemLocators.itemNameInput).fill(newItemData.invalidItemName);
    await page.locator(newItemLocators.freestyleProject).click();

    await expect(page.locator(newItemLocators.invalidNameMessage)).toBeVisible();
    await expect(page.locator(newItemLocators.invalidNameMessage)).toContainText("unsafe character");  
  });

  test("TC_01.001.24 | Verify successful item creation", async ({ page }: { page: Page }) => {
  await openNewItemPage(page);

  await page.locator(newItemLocators.itemNameInput).fill(newItemData.freestyleProjectName);
  await page.locator(newItemLocators.freestyleProject).click();
  await page.locator(newItemLocators.okButton).click();

  await expect(page.getByRole("link", { name: newItemData.freestyleProjectName })).toBeVisible();});

  test("TC_01.001.25 | Verify warning for duplicate item name", async ({ page }: { page: Page }) => {
  await createFreestyleProject(page, newItemData.existingItemName);

  await openNewItemPage(page);

  await page.locator(newItemLocators.itemNameInput).fill(newItemData.existingItemName);
  await page.locator(newItemLocators.freestyleProject).click();

  await expect(page.getByText(`A job already exists with the name ‘${newItemData.existingItemName}’`)).toBeVisible();
});

});

  

