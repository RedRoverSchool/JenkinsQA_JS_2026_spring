import { expect } from "@playwright/test";
import { test } from "@/base";
import { jenkinsData } from "@/tests/testData/il-jenkinsData";

test.describe("US_01.001 | New item > Create a new item", () => {
	test("TC_01.001.17 | Verify new item creation", async ({ page }) => {
		await page.locator("#side-panel a[href$='newJob']").click();
		await page.locator("#name").fill(jenkinsData.jobName);

		await page
			.locator(
				`#j-add-item-type-standalone-projects ul li[class*='${jenkinsData.projectType.freestyle}']`
			)
			.click();
		await page.locator("#ok-button").click();
		await page.locator(".app-jenkins-logo").click();

		const job = await page.locator("#projectstatus .jenkins-table__link").getAttribute("href");
		expect(job).toContain(jenkinsData.jobName);
	});
});
