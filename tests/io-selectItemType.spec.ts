import { expect } from "@playwright/test";
import { test } from "@/base";

test.describe("US_01.004 | New Item > Select an Item type", () => {
	const folderName = "My first folder";
	test("TC_01.004.02 | Item background color changed", async ({ page }) => {
		await page.getByText("New Item").click();
		await expect(page).toHaveURL("/view/all/newJob");

		await page.locator(".com_cloudbees_hudson_plugins_folder_Folder").click();

		await expect(page.locator(".com_cloudbees_hudson_plugins_folder_Folder")).not.toHaveCSS(
			"background-color",
			"transparent"
		);
	});
});
