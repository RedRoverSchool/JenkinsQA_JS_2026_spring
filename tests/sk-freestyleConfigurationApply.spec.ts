import { test } from "@/base";
import { expect } from "@playwright/test";
import { jenkinsData } from "@/tests/testData/sk-jenkinsData";

test.describe("US_02.008 | Freestyle Project Configuration > Save or Apply", () => {
	test("TC_02.008.04 | App behavior on Apply button click", async ({ page }) => {
		await page.getByRole("link", { name: "New Item" }).click();
		await page.locator("#name").fill(jenkinsData.jobFreestyleProject);
		await page.getByRole("radio", { name: "Freestyle Project" }).click();
		await page.locator("#ok-button").click();
		await page.waitForLoadState("networkidle");

		const titleConfigurePage = page.locator("div h1");
		await expect(titleConfigurePage).toHaveText("Configure");

		await page.locator('[name="description"]').fill(jenkinsData.description);
		await page.getByRole("button", { name: "Apply" }).click();
		const apply = page.locator("#notification-bar");

		await expect(apply).toHaveText("Saved");

		await expect(titleConfigurePage).toBeVisible();
	});
});
