import { expect } from "@playwright/test";
import { test } from "@/base";

test.describe("US_01.001 | New Item > Create a new item", () => {
	test("TC_01.001.25 | Checking page accessibility 'New Item'", async ({ page }) => {
		await page.locator('a[href="/view/all/newJob"] span:nth-child(2)').click();
		await page.waitForURL("http://localhost:8080/view/all/newJob");
		const title = await page.title();
		expect(title).toEqual("New Item - Jenkins");
	});
});
