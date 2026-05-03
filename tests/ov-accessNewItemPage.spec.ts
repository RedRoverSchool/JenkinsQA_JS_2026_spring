import { test, expect, Page } from '@/base';

test.describe("US_01.002 | New Item > Folder", () => {
    test("TC_01.002.01 | Access the New Item page", async ({page}: {page: Page}) => {
        await page.locator("#side-panel a[href$='newJob']").click();

        const folderOption = page.locator("li.com_cloudbees_hudson_plugins_folder_Folder");

        await expect(folderOption).toBeVisible();
        await expect(folderOption).toContainText("Folder");
    });
});
