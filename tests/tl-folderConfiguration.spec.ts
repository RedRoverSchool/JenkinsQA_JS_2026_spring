import { test, expect, Page } from "@/base";
import { createFolder, folderConfigData, folderConfigLocators } from "./testData/tl-data";

test.describe("US_05.001 | Folder Configuration > Display Name and Description", () => {

  test("TC_05.001.03 | Verify Configure page opens", async ({ page }: { page: Page }) => {
    await createFolder(page, folderConfigData.folderName);

    await page.locator(folderConfigLocators.configureLink).click();

    await expect(page).toHaveURL(/configure/);
  });

  test("TC_05.001.04 | Verify Display Name and Description fields are available", async ({ page }: { page: Page }) => {
  await createFolder(page, folderConfigData.folderName);

  await page.locator(folderConfigLocators.configureLink).click();

  await expect(page.getByLabel("Display Name")).toBeVisible();
  await expect(page.getByText("Description")).toBeVisible();
});

  test("TC_05.001.05 | Verify user can update Display Name", async ({ page }: { page: Page }) => {
  await createFolder(page, folderConfigData.folderName);

  await page.locator(folderConfigLocators.configureLink).click();

  await page.getByText("Display Name").locator("..").locator("input").fill(folderConfigData.displayName);

  await page.locator("button[name='Submit']").click();

  await expect(
  page.getByRole("heading", { name: folderConfigData.displayName })
).toBeVisible();
});

});