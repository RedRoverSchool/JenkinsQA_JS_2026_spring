import { expect } from "@playwright/test";
import { test } from "@/base";
import { jenkinsData } from "@/tests/testData/mm-jenkinsData";

test.describe("US_01.002 | New Item > Folder", () => {
	test("TC_01.002.06 | Verify dropdown menu options for created Folder", async ({ page }) => {
		await page.locator("#side-panel a[href$='newJob']").click();
		await page.locator("#name").fill(jenkinsData.folderName);
		await page.locator(`li[class$='_folder_${jenkinsData.projectCategory.folder}']`).click();
		await page.locator("button#ok-button").click();
		await page.locator("#jenkins-head-icon").click();
		await page.waitForLoadState("networkidle");
		const folderLink = page.getByRole("link", { name: jenkinsData.folderName, exact: true });
		await folderLink.hover();
		const chevron = page.locator(".jenkins-menu-dropdown-chevron");
		await chevron.waitFor({ state: "visible" });
		await chevron.focus();
		await chevron.press("Enter");
		const dropdown = page.locator(".tippy-box");
		await dropdown.waitFor({ state: "attached", timeout: 5000 });

		const dropdownOptions = await page
			.locator(".jenkins-dropdown .jenkins-dropdown__item")
			.allInnerTexts();
		expect(dropdownOptions).toStrictEqual(jenkinsData.dropdown.dropdownFolder);
	});
});
