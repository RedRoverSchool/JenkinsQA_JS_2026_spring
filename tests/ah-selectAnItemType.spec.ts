import { expect } from "@playwright/test";
import { test } from "../base.js";
import { jenkinsData } from "@/tests/testData/ah-jenkinsData";
test.describe("TC_01.004 | New Item > Select an Item type", () => {
	test("TC_01.004.01 | Section Select an item type is visible", async ({ page }) => {
		await page.locator("#side-panel a[href$='newJob']").click();

		const radiogroup = page.locator('[role="radiogroup"]');
		const radios = page.locator('[role="radio"]');

		await expect(radiogroup).toBeVisible();
		await expect(radios).toHaveCount(6);

		const count = await radios.count();
		for (let i = 0; i < count; i++) {
			await expect(radios.nth(i)).toBeVisible();
		}
	});

	test("TC_01.004.05 | OK button is enabled", async ({ page }) => {
		await page.locator("#side-panel a[href$='newJob']").click();
		await page.locator("#name").fill(jenkinsData.jobName);
		await page
			.locator(
				`#j-add-item-type-standalone-projects ul li[class*='${jenkinsData.projectName.freestyle}']`
			)
			.click();
		const button = page.locator("#ok-button");
		await expect(button).toBeEnabled();
	});

	test("TC_01.004.06 | Redirecting to Configuration page", async ({ page }) => {
		await page.locator("#side-panel a[href$='newJob']").click();
		await page.locator("#name").fill(jenkinsData.jobName);
		await page
			.locator(
				`#j-add-item-type-standalone-projects ul li[class*='${jenkinsData.projectName.freestyle}']`
			)
			.click();
		await page.locator("#ok-button").click();
		const configurePage = page.locator(".jenkins-app-bar__content h1");
		await expect(configurePage).toBeVisible();
	});
});
