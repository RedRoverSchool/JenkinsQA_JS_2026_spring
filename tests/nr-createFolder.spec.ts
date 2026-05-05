import { test, expect, Page } from "@/base";
import { createFolderData } from "./testData/nr-data";

test.describe("US_01.002 | New Item > Folder", () => {
    test("ID: TC_01.002.16 | Create folder from Dashboard", async ({ page }: { page: Page}) => {
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
});