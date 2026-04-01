import { expect } from "@playwright/test";
import { test } from "@/base";
import { jenkinsData } from "@/tests/testData/db-jenkinsData";

test.describe("US_02.008 | Freestyle Project Configuration > Save or Apply", () => {
	test("TC_02.008.01 | Verify buttons visibility and clickability", async ({ page }) => {
		await page.locator("#side-panel a[href$='newJob']").click();
		await page.locator("#name").fill(jenkinsData.jobName);

		await page.locator(".hudson_model_FreeStyleProject").click();
		await page.locator("#ok-button").click();

		const saveBtn = page.getByRole("button", { name: "Save" });
		await expect(saveBtn).toBeVisible();
		await expect(saveBtn).toBeEnabled();

		const applyBtn = page.getByRole("button", { name: "Apply" });
		await expect(applyBtn).toBeVisible();
		await expect(applyBtn).toBeEnabled();
	});

	test("TC_02.008.02 | App behavior on Apply button click", async ({ page }) => {
		await page.getByRole("link", { name: "New Item" }).click();
		await page.locator("#name").fill(jenkinsData.jobName);

		await page.locator(".hudson_model_FreeStyleProject").click();
		await page.locator("#ok-button").click();

		await page.getByRole("button", { name: "Apply" }).click();
		await expect(page).toHaveURL(`/job/${jenkinsData.jobName}/configure`);

		await expect(page.getByText("Saved")).toBeVisible();
	});

	test("TC_02.008.03 | App behavior on Save button click", async ({ page }) => {
		await page.getByRole("link", { name: "New Item" }).click();
		await page.locator("#name").fill(jenkinsData.jobName);

		await page.locator(".hudson_model_FreeStyleProject").click();
		await page.locator("#ok-button").click();

		await page.getByRole("button", { name: "Save" }).click();

		const statusItem = page.locator(".task-link--active").getByText("Status");
		await expect(statusItem).toBeVisible();
	});
});
