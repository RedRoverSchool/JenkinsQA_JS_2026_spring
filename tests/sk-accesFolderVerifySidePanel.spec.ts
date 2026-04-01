import { test } from "@/base";
import { expect } from "@playwright/test";
import { jenkinsData } from "@/tests/testData/sk-jenkinsData";

test.describe("US_21.001 | Folder Management > Navigate Side Panel", () => {
	test.beforeEach(async ({ page }) => {
		await page.locator("#side-panel a[href$='newJob']").click();
	});
	test("TC_21.001.02 | Folder Management > Navigate Side Panel", async ({ page }) => {
		await page.locator("#name").fill(jenkinsData.jobName.jobFolderName);
		await page.getByRole("radio", { name: "Folder Creates a container" }).check();
		await page.locator("#ok-button").click();
		await page.locator('button[name="Submit"]').click();
		await page.locator("#jenkins-head-icon").click();
		const foldername = page.locator("a:has(button)>span");
		await page.waitForLoadState("networkidle");
		expect(foldername).toHaveText(jenkinsData.jobName.jobFolderName);
		await page.getByRole("link", { name: jenkinsData.jobName.jobFolderName }).click();
		await expect(page.getByRole("heading", { name: jenkinsData.jobName.jobFolderName })).toBeVisible();
		const sidePanelitems = await page.locator("#side-panel .task").allInnerTexts();
		expect(sidePanelitems).toStrictEqual(jenkinsData.allElements);
	});
});
