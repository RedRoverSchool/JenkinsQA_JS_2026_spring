import { expect } from "@playwright/test";
import { test } from "@/base";
import { folderTestData } from "@/tests/testData/pero-jenkinsData";

test.describe("US_01.002 | New Item > Folder", () => {
	test.beforeEach(async ({ page }) => {
		await page.getByText("New Item").click();
		await page.getByLabel("Enter an item name").fill(folderTestData.folderNames.empty);
		await page.locator(".com_cloudbees_hudson_plugins_folder_Folder").click();
		await page.getByRole("button", { name: /OK/ }).click();
		await page.getByRole("button", { name: /Save/ }).click();
	});

	test("TC_01.002.05 | Create a new empty folder - verify page title", async ({ page }) => {
		const titlePage = page.locator("h1");
		await expect(titlePage).toHaveText(folderTestData.folderNames.empty);
	});

	test("TC_01.002.06 | Create a new empty folder - verify empty folder notification", async ({ page }) => {
		const titleNotification = page.locator(".empty-state-block h2.h4");
		await expect(titleNotification).toHaveText(folderTestData.messages.emptyFolder);
	});
});
