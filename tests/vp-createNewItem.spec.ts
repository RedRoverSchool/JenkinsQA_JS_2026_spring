import { expect } from "@playwright/test";
import { test } from "../base.js";
import { jenkinsData } from "@/tests/testData/vp-jenkinsData.js";

test.describe("US_01.001. | New Item > Creatе a new item", () => {
	test("TC_01.001.24 | Verify new item creation", async ({ page }) => {
		await page.locator("#tasks").getByText("New Item").click();
		await page.locator("#name.jenkins-input").fill(jenkinsData.jobName);
		await page
			.locator(
				`#j-add-item-type-standalone-projects ul li[class*='${jenkinsData.projectType.freestyle}']`
			)
			.click();
		await page.locator("#ok-button").click();
		await page.locator("#jenkins-head-icon").click();

		const job = await page.locator("#projectstatus .jenkins-table__link").getAttribute("href");
		expect(job).toContain(jenkinsData.jobName);
	});
});
