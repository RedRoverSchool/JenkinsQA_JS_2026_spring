import { test, expect, Page } from "@/base";
import { invalidItemData } from "./testData/tl-data";

test.describe("US_01.001 | New Item > Create a new item", () => {
  test("TC_01.001.21 | Verify new item page opens from dashboard", async ({ page }: { page: Page }) => {
    // Locators
    const newItemLink = page.getByRole("link", { name: "New Item" });
    const itemNameInput = page.locator("#name");
    const okButton = page.locator("#ok-button");

    // Steps
    await newItemLink.click();

    // Expected results
    await expect(page).toHaveURL(/newJob/);
    await expect(itemNameInput).toBeVisible();
    await expect(okButton).toBeVisible();
  });
  
  test("TC_01.001.22 | Verify blank item name validation", async ({ page }: { page: Page }) => {
  // Locators
  const newItemLink = page.getByRole("link", { name: "New Item" });
  const freestyleProject = page.locator("#j-add-item-type-standalone-projects li[class*=FreeStyleProject]");
  const okButton = page.locator("#ok-button");

  // Steps
  await newItemLink.click();

  // Leave item name field blank
  await freestyleProject.click();

  // Expected result
  await expect(okButton).toBeDisabled();
  });

  test("TC_01.001.23 | Verify unsupported special characters validation", async ({ page }) => {
  // Locators
  const newItemLink = page.getByRole("link", { name: "New Item" });
  const itemNameInput = page.locator("#name");
  const freestyleProject = page.locator("#j-add-item-type-standalone-projects li[class*=FreeStyleProject]");
  const okButton = page.locator("#ok-button");
  const invalidNameMessage = page.locator("#itemname-invalid");

  // 1. Open New Item page
  await newItemLink.click();

  // 2. Enter item name with unsupported special character
  await itemNameInput.fill("test?item");

  // 3. Select "Freestyle project"
  await freestyleProject.click();

  // 4. Verify warning message is displayed
  await expect(invalidNameMessage).toBeVisible();
  await expect(invalidNameMessage).toContainText("unsafe character");

  // 5. Verify OK button remains disabled
  await expect(okButton).toBeDisabled();
});

});