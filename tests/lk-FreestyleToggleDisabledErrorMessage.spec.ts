import { test } from "@/base";
import { expect } from "@playwright/test";

test.describe("US_02.001 | Freestyle Project Configuration > Enable or Disable the Project", () => {
	test("TC_02.001.002 | Disable via toggle before Save, then verify project page", async ({ page }) => {
		await page.getByText("New Item").click();
		await page.locator("#name").fill("FreestyleprojectLK");
		await page.getByText("Freestyle project").click();
		await page.locator("#ok-button").click();
		await page.waitForURL(/\/configure$/);

		const toggleLabel = page.locator("label.jenkins-toggle-switch__label");
		await expect(toggleLabel).toBeVisible();
		await toggleLabel.click();
		await expect(toggleLabel).toHaveAttribute("data-title", "Disabled");

		await page.getByRole("button", { name: "Save" }).click();
		await expect(page.locator("h1")).toContainText("FreestyleprojectLK");
		await expect(page.getByText("This project is currently disabled")).toBeVisible();
		await expect(page.getByRole("button", { name: "Enable" })).toBeVisible();
		await expect(page.getByText("Permalinks")).toBeVisible();
	});
});
