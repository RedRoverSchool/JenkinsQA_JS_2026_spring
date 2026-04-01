import { expect } from "@playwright/test";
import { test } from "@/base";
import { jenkinsData } from "@/tests/testData/ob-jenkinsData";

test.describe("US_02.005 | Freestyle Project Configuration > Set up Environment", () => {
	test("TC_02.005.01 |Verify the “Environment” item is visible", async ({ page }) => {
		await page.locator("#side-panel a[href$='newJob']").click();
		await page.locator("#name").fill(jenkinsData.jobName);
		await page
			.locator(
				`#j-add-item-type-standalone-projects ul li[class*='${jenkinsData.projectType.freestyle}']`
			)
			.check();
		await page.locator("#ok-button").click();

		const sidePanel = page.locator("#side-panel");
		const environmentItem = sidePanel.getByRole("button", { name: "Environment" });
		await expect(environmentItem).toBeVisible();
	});
});
