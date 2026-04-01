import { test } from "@/base";
import { expect } from "@playwright/test";

test.describe("US_01.001 | New Item > Creatе a new item", () => {
	test("TC_01.001.33 | Creatе Freestyle Project", async ({ page }) => {
		const projectName = "Freestyle Project";

		await page.getByText("New Item").click();
		await page.getByLabel("Enter an item name").fill(projectName);
		await page.getByText("Freestyle project").click();
		await page.locator("#ok-button").click();
		await page.getByRole("button", { name: "Save" }).click();

		await expect(page.locator("h1")).toHaveText(projectName);
	});
});
