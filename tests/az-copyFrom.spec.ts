import { expect } from "@playwright/test";
import { test } from "@/base";

test.describe("US_01.003 | New Item > Copy from", () => {
	test("TC_01.003.02 | Create new item from copy other existing one without any parameters", async ({
		page
	}) => {
		const baseItemName = "Multibranch Pipeline";
		const newItemName = "Copy Item";

		// Create origin Item
		await page.getByText("New Item").click();
		await page.locator("#name").fill(baseItemName);
		await page.locator(".org_jenkinsci_plugins_workflow_multibranch_WorkflowMultiBranchProject").click();
		await page.locator("#ok-button").click();

		// Return to the main page
		await page.locator("#jenkins-head-icon").click();

		// Create an Item by selecting existing one
		await page.getByText("New Item").click();
		const copyFromField = page.locator("#from");
		await page.locator("#name").fill(newItemName);

		// Check that the "Copy from" field is visible
		await expect(copyFromField).toBeVisible();

		// Enter partial name to trigger autocomplete
		await copyFromField.fill(baseItemName.slice(0, 3)); // "Mul"

		// Await for the dropdown to appear
		const dropdown = page.locator("[data-tippy-root]");
		await expect(dropdown).toBeVisible();

		// Find the option in the dropdown
		const option = dropdown.locator(".jenkins-dropdown__item", { hasText: baseItemName });
		await expect(option).toBeVisible();

		// Select the option
		await option.click();

		// Await for the "Copy from" field to be populated
		await expect(copyFromField).toHaveValue(baseItemName);

		// Create the new item
		await page.locator("#ok-button").click();
	});
});
