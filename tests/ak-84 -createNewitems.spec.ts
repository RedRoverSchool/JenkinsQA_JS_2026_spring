import { expect } from "@playwright/test";
import { test } from "@/base";
import { jenkinsData } from "@/tests/testData/ak84-jenkinsData";

test.describe("US_01.001 | New Item > Creatе a new item", () => {
	test("TC_01.001.29 | Check that the Name field should not accept special characters ", async ({
		page
	}) => {
		await page.locator("#side-panel a[href$='newJob']").click();

		await page.locator("#name").fill(jenkinsData.fieldName);
		const err = page.locator("#itemname-invalid");
		expect(err).toContainText(jenkinsData.messageError);
	});
});
