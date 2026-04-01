import { test } from "@/base";
import { expect } from "@playwright/test";

test.describe("TC_01.001.03 | New Item", () => {
	test("TC_01.001.03 | Verify new Item creation", async ({ page }) => {
		const newItemButton = page.locator(
			'.task .task-link-wrapper:nth-child(1) a[href="/view/all/newJob"]'
		);
		await newItemButton.click();

		const itemNameField = page.locator("#name");
		await itemNameField.fill("Item_1");

		const folderType = page.locator(".j-item-options .com_cloudbees_hudson_plugins_folder_Folder");
		await folderType.click();

		const okButton = page.locator("#ok-button");
		await okButton.click();

		const logo = page.locator("#jenkins-head-icon");
		await logo.click();

		const newJob = await page
			.locator(".dashboard .jenkins-jobs-list__item__details")
			.getAttribute("href");

		expect(newJob).toContain("Item_1");
	});
});
