import { test, expect, Page } from "@/base";
import { createFolder, folderConfigData, folderConfigLocators } from "./testData/tl-data";

test.describe("US_05.001 | Folder Configuration > Display Name and Description", () => {
  test("TC_05.001.03 | Verify Configure page opens", async ({ page }: { page: Page }) => {
    await createFolder(page, folderConfigData.folderName);

    await page.locator(folderConfigLocators.configureLink).click();

    await expect(page).toHaveURL(/configure/);
  });
});