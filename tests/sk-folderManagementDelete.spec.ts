import { expect } from "@playwright/test";
import { test } from "@/base";
import { jenkinsData } from "@/tests/testData/sk-jenkinsData";

test.describe("US_21.003.02 | Folder Management > Delete", async () => {
	test.beforeEach(async ({ page }) => {
		await page.getByRole("link", { name: "New Item" }).click();
	});
	test("TC_21.003.02 | Delete Folder", async ({ page }) => {
		await page.locator("#name").fill(jenkinsData.jobName.jobFolderName);
		await page.getByRole("radio", { name: "Folder Creates a container" }).check();
		await page.locator("#ok-button").click();
		await page.waitForLoadState("networkidle");
		await page.locator('button[name="Submit"]').click();
		await page.locator("#jenkins-head-icon").click();

		const nameFolder = page.getByRole("link", { name: jenkinsData.jobName.jobFolderName });
		await expect(nameFolder).toBeVisible();
		await nameFolder.click();

		await page.getByRole("link", { name: "Delete Folder" }).click();
		await page.getByRole("button", { name: "Yes" }).click();
		const empty = page.getByRole("heading", { name: "Welcome to Jenkins!" });
		await expect(empty).toBeVisible();
		await expect(nameFolder).not.toBeVisible();
	});
});
