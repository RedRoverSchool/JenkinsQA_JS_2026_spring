import { expect } from "@playwright/test";
import { test } from "@/base";
import { jenkinsData } from "@/tests/testData/mm-jenkinsData";

test.describe("TC_01.001 | New Item > Creatе a new item", () => {
	test("TC_01.001.13 | Verify Verify New Item Creation", async ({ page }) => {
		await page.locator("#side-panel a[href$='newJob']").click();
		await page.locator("#name").fill(jenkinsData.jobName);
		await page.locator(`li[class$='${jenkinsData.projectCategory.freestyle}']`).click();
		await page.locator("button#ok-button").click();
		await page.locator("#jenkins-head-icon").click();

		await expect(page.locator("#projectstatus a.jenkins-table__link.model-link.inside")).toHaveAttribute(
			"href",
			`job/${jenkinsData.jobName}/`
		);
	});
});
