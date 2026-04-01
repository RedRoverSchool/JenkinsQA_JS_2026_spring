import { expect } from "@playwright/test";
import { test } from "@/base";

test.describe("US_05.001 | Folder Configuration > Display Name and Description", () => {
	test("TC_05.001.01 | Set Display Name", async ({ page }) => {
		await page.locator("#side-panel a[href$='newJob']").click();

		await page.locator("#name").fill("New Folder 1");
		await page.locator(".com_cloudbees_hudson_plugins_folder_Folder").click();
		await page.locator("#ok-button").click();

		await page
			.locator("div.setting-main > input[name='_.displayNameOrNull']")
			.fill("Displayed folder name");
		await page.locator(".jenkins-submit-button").click();

		await page.locator(".app-jenkins-logo").click();

		expect(page.locator(".jenkins-jobs-list")).toHaveText("Displayed folder name");
	});

	test("TC_05.001.02 | Set description for folder", async ({ page }) => {
		await page.locator("#side-panel a[href$='newJob']").click();

		await page.locator("#name").fill("New Folder 1");
		await page.locator(".com_cloudbees_hudson_plugins_folder_Folder").click();
		await page.locator("#ok-button").click();

		await page.locator("div.setting-main > textarea").fill("Some folder description");
		await page.locator(".jenkins-submit-button").click();

		expect(page.locator("#view-message")).toHaveText("Some folder description");
	});
});
