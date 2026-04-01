import { expect } from "@playwright/test";
import { test } from "@/base";
import { jenkinsData } from "@/tests/testData/db-jenkinsData";

test.describe("US_03.001 | Pipeline Configuration > Enable or Disable the Project", () => {
	test.beforeEach(async ({ page }) => {
		await page.getByRole("link", { name: "New Item" }).click();
		await page.locator("#name").fill(jenkinsData.jobName);

		await page.locator(".org_jenkinsci_plugins_workflow_job_WorkflowJob").click();
		await page.locator("#ok-button").click();
		await expect(page).toHaveURL(`/job/${jenkinsData.jobName}/configure`);
	});
	test("TC_03.001.05 | Verify the project status toggle", async ({ page }) => {
		const toggleBtn = page.getByText("DisabledEnabled");

		await expect(toggleBtn).toBeChecked();

		await toggleBtn.click();
		await expect(page.getByText("Disabled")).toBeVisible();
		await expect(toggleBtn).not.toBeChecked();

		await toggleBtn.click();
		await expect(page.getByText("Enabled")).toBeVisible();
		await expect(toggleBtn).toBeChecked();
	});

	test("TC_03.001.07 | Enable Disabled Project on Status Page", async ({ page }) => {
		const toggleBtn = page.locator("#toggle-switch-enable-disable-project");
		await toggleBtn.click();

		await page.getByRole("button", { name: "Save" }).click();

		await expect(page).toHaveURL(`/job/${jenkinsData.jobName}/`);
		await expect(page.getByText("This project is currently disabled")).toBeVisible();

		const enableBtn = page.getByRole("button", { name: "Enable" });
		await expect(enableBtn).toBeVisible();
		await expect(enableBtn).toBeEnabled();
	});

	test("TC_03.001.08 | Disabled Status Tooltip and Icon Legend Match", async ({ page }) => {
		const toggleBtn = page.locator("#toggle-switch-enable-disable-project");
		await toggleBtn.click();

		await page.getByRole("button", { name: "Save" }).click();

		const logoImg = page.locator(".app-jenkins-logo");
		await logoImg.click();

		const tooltipText = (
			await page.locator(`#job_${jenkinsData.jobName} svg`).first().getAttribute("tooltip")
		)?.toLowerCase();

		const moreOptionsBtn = page.locator(".jenkins-overflow-button__ellipsis");
		await moreOptionsBtn.click();

		const iconLegendBtn = page.locator("#button-icon-legend");
		await iconLegendBtn.click();

		const disabledLegendText = (
			await page.locator(".jenkins-dialog dd").nth(10).innerText()
		).toLowerCase();
		expect(disabledLegendText).toContain(tooltipText);
	});
});
