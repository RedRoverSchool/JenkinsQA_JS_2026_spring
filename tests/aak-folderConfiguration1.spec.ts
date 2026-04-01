import { expect } from "@playwright/test";
import { test } from "@/base";

test.describe("US_05.004 | Folder Configuration > Save or Apply", () => {
	test("TC_05.004.01 | Verify Apply button applies changes without closing configuration page", async ({
		page
	}) => {
		const folderName = "Test_Folder";

		//create new folder
		await page.locator("#side-panel a[href$='newJob']").click();
		await page.locator("#name").fill(folderName);
		await page.locator("li[class='com_cloudbees_hudson_plugins_folder_Folder']").click();
		await page.locator("#ok-button").click();

		//fill initial configuration
		const displayNameField = await page.locator("input[name='_.displayNameOrNull']");
		await displayNameField.fill("Display_Name");

		const descriptionField = await page.locator("textarea[name='_.description']");
		await descriptionField.fill("Some_Description");

		await page.locator("#bottom-sticker button[name='Submit']").click();

		//navigate to configuration page
		await page.locator("#tasks a[href='/job/Test_Folder/configure']").click();
		await expect(page).toHaveURL(`./job/${folderName}/configure`);

		//modify display name field
		await displayNameField.fill("New_Display_name");

		//click apply button
		await page.locator("button[name='Apply']").click({ noWaitAfter: true });

		//ensure we still stay on configuration page
		await expect(page).toHaveURL(`./job/${folderName}/configure`);

		//see new value in the dislay name field
		await expect(displayNameField).toHaveValue("New_Display_name");
	});
});
