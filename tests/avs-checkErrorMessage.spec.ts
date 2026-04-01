import { expect } from "@playwright/test";
import { test } from "@/base";
import { jenkinsData } from "@/tests/testData/bs-jenkinsData";

test.describe("US_01.001 | New Item > Create a new item", () => {
	test("TC_01.001.16 | Check for an error if the field is empty", async ({ page }) => {
		await page.locator("#side-panel a[href$='newJob']").click();
		await page
			.locator(
				`#j-add-item-type-standalone-projects ul li[class*='${jenkinsData.projectType.freestyle}']`
			)
			.click();
		const errorMessage = "» This field cannot be empty, please enter a valid name";

		const divMessageError = page.locator("#itemname-required");
		expect(errorMessage).toEqual(await divMessageError.innerText());
		await expect(divMessageError).toBeVisible();
	});
});
