import { expect } from "@playwright/test";
import { test } from "@/base";

test.describe("US_01.001 | New Item > Create a new item", () => {
	test("TC_01.001.07 | Create New Pipeline", async ({ page }) => {
		const pipelineName = "My_First_Pipeline";

		// 1 Create new item "Pipeline"
		await page.getByText("New Item").click();
		expect(page.url()).toContain("/view/all/newJob");

		// 2 Check the field "Enter an item name"
		await expect(page.locator("#name")).toBeEnabled();

		await page.locator("#name").fill(pipelineName);

		// 3 Select Item type "Pipeline"
		await page.locator(".org_jenkinsci_plugins_workflow_job_WorkflowJob").click();
		await expect(page.getByRole("button", { name: "OK" })).toBeEnabled();

		// 4 Click "OK" button
		await page.locator("#ok-button").click();
		expect(page.url()).toContain(`/job/${pipelineName}/configure`);

		// 5 Saving Pipeline by clicking "Save" button
		await expect(page.locator(".jenkins-submit-button")).toBeEnabled();
		await page.locator(".jenkins-submit-button").click();
		expect(page.url()).toContain(`/job/${pipelineName}/`);

		// 6 Verify created Pipeline on the Home Page
		await page.locator("#jenkins-head-icon").click();
		await expect(page.locator("#projectstatus .jenkins-table__link")).toHaveText(pipelineName);
	});
});
