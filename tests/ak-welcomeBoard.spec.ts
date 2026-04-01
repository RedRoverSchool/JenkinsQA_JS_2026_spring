import { expect } from "@playwright/test";
import { test } from "@/base";
import { jenkinsData } from "@/tests/testData/ak-jenkinsData";

test.describe("US 11.001 | Welcome Dashboard", () => {
	test("TC_11.001.01 | View Welcome Message and start page", async ({ page }) => {
		await expect(
			page.locator(".empty-state-block").getByText(jenkinsData.welcomePage.welcomeText)
		).toBeVisible();
		await expect(
			page.locator(".empty-state-block").getByText(jenkinsData.welcomePage.describeText)
		).toBeVisible();
	});

	test("TC_11.001.02 | 'Create a job' button is clickable", async ({ page }) => {
		await page.locator('[href="newJob"]').click();

		await expect(page).toHaveURL(/.*newJob/);
		await expect(page.getByLabel("Enter an item name")).toBeVisible();
	});
});
