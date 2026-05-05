import { test, expect, Page } from "@/base";
import { createFolderData, applyFolderConfigurationData } from "./testData/nr-data";

test.describe("US_01.002 | New Item > Folder", () => {
  test("TC_01.002.16 | Create folder from Dashboard", async ({ page }: { page: Page }) => {
    // Open New Item page
    await page.locator("#side-panel a[href$='newJob']").click();

    // Fill in the item name
    await page.locator("#name").fill(createFolderData.folderName);

    // Select the Folder item type
    await page.locator("li.com_cloudbees_hudson_plugins_folder_Folder").click();

    // Click the OK button
    await page.locator("#ok-button").click();

    // Click Save button
    await page.getByRole("button", { name: "Save" }).click();

    const currentUrl = page.url();
    expect(currentUrl).toContain(createFolderData.folderName);
  });

  test.describe("US_01.002 | New Item > Folder", () => {
    test.beforeEach(async ({ page }) => {
      // Create folder
      await page.locator("#side-panel a[href$='newJob']").click();
      await page.locator("#name").fill(applyFolderConfigurationData.folderName);
      await page.locator("li.com_cloudbees_hudson_plugins_folder_Folder").click();
      await page.locator("#ok-button").click();
      await page.getByRole("button", { name: "Save" }).click();
    });

    test("ID: TC_01.002.19 | Apply folder configuration", async ({ page }: { page: Page }) => {
      // Click Configure button
      await page.locator("#side-panel a[href$='configure']").click();

      // Enter description
      await page.locator("textarea[name='_.description']").fill(applyFolderConfigurationData.description);

      // Click Apply button
      await page.locator(".apply-button").click();

      const currentUrl = page.url();
      expect(currentUrl).toContain("configure");

      await expect(page.locator("textarea[name='_.description']")).toHaveValue(applyFolderConfigurationData.description);
    });
  });
});