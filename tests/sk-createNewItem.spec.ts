import { test } from "@/base";
import { expect } from "@playwright/test";
import { jenkinsData } from "@/tests/testData/sk-jenkinsData";

test.describe("US_01.001 | New Item > Creatе a new item", () => {
	test.beforeEach(async ({ page }) => {
		await page.getByRole("link", { name: "New Item" }).click();
	});

	test("TC_01.001.08 |Check Name field should not accept special characters", async ({ page }) => {
		await page.locator("#name").fill("#%^");
		const message = page.locator("#itemname-invalid");
		expect(message).toContainText(jenkinsData.messageError);
	});

	test("TC_01.001.09 |New Item be accessible", async ({ page }) => {
		const title = page.locator("#add-item-panel h1");
		await expect(title).toHaveText(jenkinsData.titleNewitem);
	});

	test("TC_01.001.10 |The OK button is not active if item type not select", async ({ page }) => {
		const button = page.locator("#ok-button");
		await expect(button).toBeDisabled();
	});
});
