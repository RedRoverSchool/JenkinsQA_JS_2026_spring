import { expect } from "@playwright/test";
import { test } from "@/base";

test.describe("US_05.004 | Folder Configuration > Save or Apply", () => {
	test("TC_05.004.01 | Verify Save button saves changes", async ({ page }) => {
		const folderName = "Test_Folder";

		//create new folder
		await page.locator("#side-panel a[href$='newJob']").click();
		await page.locator("#name").fill(folderName);
		await page.locator("li[class='com_cloudbees_hudson_plugins_folder_Folder']").click();
		await page.locator("#ok-button").click();

		await page.locator("input[name='_.displayNameOrNull'] ").fill("Display_Name");
		await page.locator("textarea[name='_.description']").fill("Some_Description");

		await page.locator("#bottom-sticker button[name='Submit']").click();

		await page.locator("#tasks a[href='/job/Test_Folder/configure']").click();

		await page.locator("textarea[name='_.description']").fill("New_Description");

		await page.locator("#bottom-sticker button[name='Submit']").click();

		await expect(page).toHaveURL(`./job/${folderName}/`);

		const folderDescription = page.locator("#view-message");
		await expect(folderDescription).toContainText("New_Description");
	});
});
