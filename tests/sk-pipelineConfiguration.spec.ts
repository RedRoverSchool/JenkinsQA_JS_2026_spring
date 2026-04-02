import { test } from "@/base";
import { expect } from "@playwright/test";
import { jenkinsData } from "@/tests/testData/sk-jenkinsData";

test.describe("US_03.001.01 | Pipeline Configuration > Enable or Disable the Projectt", () => {
	test.beforeEach(async ({ page }) => {
		await page.getByRole("link", { name: "New Item" }).click();
	});

	test('AT_03.001.01 |  "Enabled"  project', async ({ page }) => {
		await page.locator("#name").fill(jenkinsData.jobPipelineName);
		await page.getByRole("radio", { name: "Pipeline" }).click();
		await page.locator("#ok-button").click();
		const toggleSwitch = page.locator("#enable-disable-project");
		const isChecked = await toggleSwitch.isChecked();
		expect(isChecked).toBe(true);
	});
	test("AT_03.001.02 | Disable project ", async ({ page }) => {
		await page.locator("#name").fill(jenkinsData.jobPipelineName);
		await page.getByRole("radio", { name: "Pipeline" }).click();
		await page.locator("#ok-button").click();

		const toggleInput = page.locator("#enable-disable-project");
		await toggleInput.waitFor({ state: "visible" });
		await expect(toggleInput).toBeChecked();
		const toggleLabel = page.locator('label[for="enable-disable-project"]');
		await expect(toggleLabel.locator(".jenkins-toggle-switch__label__checked-title")).toBeVisible();
		await toggleLabel.click();

		await expect(toggleInput).not.toBeChecked();
		await expect(toggleLabel.locator(".jenkins-toggle-switch__label__unchecked-title")).toBeVisible();
	});
	test("AT_03.001.03 | Disable project on Homepage", async ({ page }) => {
		await page.locator("#name").fill(jenkinsData.jobPipelineName);
		await page.getByRole("radio", { name: "Pipeline" }).click();
		await page.locator("#ok-button").click();
		await page.locator("#toggle-switch-enable-disable-project").click();
		await page.getByRole("button", { name: "Save" }).click();
		const warning = page.locator("#enable-project");
		await expect(warning).toContainText("This project is currently disabled");
		await page.locator("#jenkins-head-icon").click();

		const disabledButton = page.locator('td[data="8"] .jenkins-table__cell__button-wrapper svg');

		await expect(disabledButton).toBeVisible();

		await expect(disabledButton).toHaveAttribute("tooltip", "Disabled");
	});
	test("AT_03.001.04 | Enable project on Homepage", async ({ page }) => {
		await page.locator("#name").fill(jenkinsData.jobPipelineName);
		await page.getByRole("radio", { name: "Pipeline" }).click();
		await page.locator("#ok-button").click();
		await page.getByRole("button", { name: "Save" }).click();
		await page.locator("#jenkins-head-icon").click();
		const enabledButton = page.locator('td[data="12"] .jenkins-table__cell__button-wrapper svg');
		await expect(enabledButton).toBeVisible();
		await expect(enabledButton).toHaveAttribute("tooltip", "Not built");
	});
});
