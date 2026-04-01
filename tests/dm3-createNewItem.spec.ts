import { expect } from "@playwright/test";
import { test } from "@/base";

test.describe("US_01.001 | New Item > Create a new item", () => {
	test("TC_01.001.18 | Display appropriate validation message", async ({ page }) => {
		await page.locator("#side-panel a[href$='newJob']").click();

		await page.locator("#ok-button").click({ force: true });

		await expect(page.locator("#itemname-required")).toHaveText(
			"» This field cannot be empty, please enter a valid name"
		);
	});
});
