import { test } from "@/base";
import { expect } from "@playwright/test";

test.describe("US_02.001 | Freestyle Project Configuration > Enable or Disable the Project", () => {
	test("TC_02.001.001 | Freestyle Project Configuration Verify Project enabled by toggle to be checked", async ({
		page
	}) => {
		await page.getByText("New Item").click();
		await page.locator("#name").fill("FreestyleprojectLK");
		await page.getByText("Freestyle project").click();
		await page.locator("#ok-button").click();
		await page.waitForURL(/\/configure$/);

		const toggleLabel = page.locator("label.jenkins-toggle-switch__label");
		await expect(toggleLabel).toBeChecked();
	});
});
