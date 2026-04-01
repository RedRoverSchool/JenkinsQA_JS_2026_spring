import { expect } from "@playwright/test";
import { test } from "@/base";

test.describe("US_01.002 | New Item > Folder", () => {
	const folderName = "My first folder";
	test("TC_01.001.07 | Create new folder", async ({ page }) => {
		await page.getByText("New Item").click();
		await expect(page).toHaveURL("/view/all/newJob");

		await page.locator("#name").fill(folderName);
		await page.locator(".com_cloudbees_hudson_plugins_folder_Folder").click();

		const okButton = page.getByRole("button", { name: "OK" });
		await expect(okButton).toBeEnabled();

		await okButton.click();
		await expect(page).toHaveURL(`/job/${folderName}/configure`);

		const saveButton = page.getByRole("button", { name: "Save" });
		await expect(saveButton).toBeEnabled();

		await saveButton.click();
		await expect(page).toHaveURL(`./job/${folderName}/`);
		await expect(page.locator(".empty-state-section")).toContainText("This folder is empty");

		await page.locator("#page-header .jenkins-mobile-hide").click();
		expect(page.locator(".jenkins-table__link")).toContainText(folderName);
	});
});
