import { test } from "@/base";
import { expect } from "@playwright/test";
import { jenkinsData } from "@/tests/testData/mdem-jenkinsData";

test.describe("US_01.002 | New Item > Folder", () => {
	test("TC_01.002.03 | Verify content of the folder", async ({ page }) => {
		const newItemButton = page.locator(
			'.task .task-link-wrapper:nth-child(1) a[href="/view/all/newJob"]'
		);
		await newItemButton.click();

		const itemNameField = page.locator("#name");
		await itemNameField.fill("Item_2");

		const folderType = page.locator(".j-item-options .com_cloudbees_hudson_plugins_folder_Folder");
		await folderType.click();

		const okButton = page.locator("#ok-button");
		await okButton.click();

		const displayNameField = page.locator('.setting-main .jenkins-input[name="_.displayNameOrNull"]');
		await displayNameField.fill("Folder Test");

		const desctiptionField = page.locator('.setting-main [name="_.description"]');
		await desctiptionField.fill("Description test");

		const submitButton = page.locator('.bottom-sticker-inner [name="Submit"]');
		submitButton.click();

		await expect(page.locator("h1")).toContainText("Folder Test");
		await expect(page.locator("#view-message")).toHaveText("Description test");
	});

	test("TC_01.002.08 | Verify that another item can be added to the folder", async ({ page }) => {
		const newItemButton = page.locator(
			'.task .task-link-wrapper:nth-child(1) a[href="/view/all/newJob"]'
		);
		await newItemButton.click();

		const itemNameField = page.locator("#name");
		await itemNameField.fill(jenkinsData.folderName);

		const folderType = page.locator(".j-item-options .com_cloudbees_hudson_plugins_folder_Folder");
		await folderType.click();
		await page.locator("#ok-button").click();

		await page.locator("#jenkins-head-icon").click();

		const jobLink = page.getByRole("link", { name: jenkinsData.folderName, exact: true });
		await jobLink.hover();

		const chevronButton = page.locator(".jenkins-menu-dropdown-chevron");
		await chevronButton.waitFor({ state: "visible" });

		await chevronButton.focus();
		await chevronButton.press("Enter");

		const popupRoot = page.locator("div[id^='tippy-']");
		await popupRoot.waitFor({ state: "attached", timeout: 5000 });

		const newItemButton2 = page.locator('.jenkins-dropdown__item[href="/job/Test%20Folder%201/newJob"]');
		await newItemButton2.click();

		await page.locator("#name").fill(jenkinsData.folderOrganization);
		await page.locator(".j-item-options .jenkins_branch_OrganizationFolder").click();
		await page.locator("#ok-button").click();

		await page.locator("#jenkins-head-icon").click();

		await page.locator('a[href="job/Test%20Folder%201/"] span').click();

		const organizationFolder = page.locator('a[href="job/Test%20Organization%20Folder%202/"] span');

		expect(organizationFolder).toContainText(jenkinsData.folderOrganization);
	});
});
