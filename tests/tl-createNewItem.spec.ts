import { expect } from "@playwright/test";
import { test } from "@/base";

test.describe("US_01.001 | New Item > Create a new item", () => {
	test("TC_01.001.05 | Blank item name validation", async ({ page }) => {
		await page.locator("#tasks a[href$='newJob']").click();
		await expect(page.locator("#name")).toBeEmpty();
		await page.locator("#items li[class$='FreeStyleProject']").click();
		await expect(page.locator("#ok-button")).toBeDisabled();

		const nameItem = page.locator("#itemname-required");

		await expect(nameItem).toHaveText("» This field cannot be empty, please enter a valid name");
	});
});
