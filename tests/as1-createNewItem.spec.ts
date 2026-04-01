import { expect } from "@playwright/test";
import { test } from "@/base";
import { jenkinsData } from "@/tests/testData/as1-jenkinsData";

test.describe("US_01.003 | New Item > Copy from", () => {
	test("TC_01.003.01 | Verify autocomplete expands and displays matching project", async ({ page }) => {
		await page.locator(".task a[href $='newJob']").click();
		await page.locator("#name").fill(jenkinsData.projectName);
		await page.locator(".org_jenkinsci_plugins_workflow_job_WorkflowJob").click();
		await page.locator("#ok-button").click();
		await page.locator("#jenkins-head-icon").click();

		await page.locator(".task a[href $='newJob']").click();

		const copyFromField = page.locator("#from");
		await copyFromField.fill(jenkinsData.projectName[0]);

		const dropdown = page.locator("[data-tippy-root]");
		await expect(dropdown).toBeVisible();

		const projectNameFromDropdown = dropdown.locator(".jenkins-dropdown__item", {
			hasText: jenkinsData.projectName
		});
		await expect(projectNameFromDropdown).toContainText(jenkinsData.projectName);

		await projectNameFromDropdown.click();
		await expect(copyFromField).toHaveValue(jenkinsData.projectName);
	});
});
