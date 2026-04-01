import { expect } from "@playwright/test";
import { test } from "@/base";
import { jenkinsData } from "@/tests/testData/ak84-jenkinsData";

test.describe("US_01.002 | New Item > Folder", () => {
	test("TC_01.002.01 |  Add Folder ", async ({ page }) => {
		await page.locator("#side-panel a[href$='newJob']").click();

		await page.locator("#name").fill(jenkinsData.folderName);
		await page.getByRole("radio", { name: "Folder Creates a container" }).check();
		await page.getByRole("button", { name: "OK" }).click();

		await page.locator("button[name='Submit']").click();
		await page.locator("a:has(#jenkins-head-icon)").click();

		const folderName2 = page.locator("a:has(button)>span");
		expect(folderName2).toHaveText(jenkinsData.folderName);
	});
});
