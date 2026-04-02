import { test } from "@/base";
import { expect } from "@playwright/test";
import { jenkinsData } from "@/tests/testData/sk-jenkinsData";

test.describe("US_03.006 | Pipeline Configuration > Save or Apply", () => {
	test.beforeEach(async ({ page }) => {
		await page.getByRole("link", { name: "New Item" }).click();
	});

	test("TC_03.006.01 | Alert for Unsaved Changes on Navigation", async ({ page }) => {
		await page.locator("#name").fill(jenkinsData.jobPipelineName);
		await page.getByRole("radio", { name: "Pipeline" }).click();
		await page.locator("#ok-button").click();
		await page.locator('[name="description"].jenkins-input').fill(jenkinsData.jobPipelineName);

		page.on("dialog", async (dialog) => {
			await dialog.accept();
		});

		await page.locator(`[href="/job/${jenkinsData.jobPipelineName}/"]`).click();
		await page.waitForLoadState("networkidle");
		const nameItem = page.getByRole("heading", { name: jenkinsData.jobPipelineName });
		await expect(nameItem).toBeVisible();
	});
});
