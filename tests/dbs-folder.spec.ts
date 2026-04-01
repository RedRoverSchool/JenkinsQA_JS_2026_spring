import { test } from "@/base";
import { expect } from "@playwright/test";

test.describe("US_01.002 | New Item > Folder", () => {
	test("TC_01.002.09 | Create new folder", async ({ page }) => {
		await page.locator('a[href="/view/all/newJob"]').click();
		await page.locator("#name").fill("Folder_test");
		await page.getByRole("radio", { name: "Folder Creates a container" }).click();
		await page.locator("#ok-button").click();
		await page.locator('button[name="Submit"]').click();
		await page.waitForURL(/Folder_test/);

		await expect(page).toHaveURL(/job\/Folder_test/);
		await expect(page.locator("h1")).toContainText("Folder_test");
	});
});
