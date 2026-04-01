import { expect } from "@playwright/test";
import { test } from "@/base";
import { jenkinsData } from "@/tests/testData/mm-jenkinsData";

test.describe("US_03.006 | Pipeline Configuration > Save or Apply>", () => {
	test("TC_03.006.02 |  Verify Alert Message for Unsaved Changes on Navigation", async ({ page }) => {
		await page.locator("#side-panel a[href$='newJob']").click();
		await page.locator("#name").fill(jenkinsData.projectCategory.pipeline);
		await page.locator("li.org_jenkinsci_plugins_workflow_job_WorkflowJob").click();
		await page.locator("button#ok-button").click();
		await page.locator("textarea[name='description']").fill(jenkinsData.configureCategory.description);
		page.on("dialog", async (dialog) => {
			await dialog.dismiss();
		});
		await page.locator("#jenkins-head-icon").click();

		await expect(page.locator("#general")).toHaveText("General");
	});
});
