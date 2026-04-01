import { test } from "@/base";
import { expect } from "@playwright/test";
import { jenkinsData } from "@/tests/testData/sk-jenkinsData";

test.describe("US_02.006.01 | Freestyle Project Configuration > Build Steps", () => {
	test("TC_02.006.01 | Access to Build Steps", async ({ page }) => {
		await page.getByRole("link", { name: "New Item" }).click();
		await page.locator("#name").fill(jenkinsData.jobFreestyleProject);
		await page.getByRole("radio", { name: "Freestyle Project" }).click();
		await page.locator("#ok-button").click();
		await page.waitForLoadState("networkidle");
		const sidePanelitems = page.locator("#side-panel .task");
		const options = await sidePanelitems.allInnerTexts();

		expect(options).toStrictEqual(jenkinsData.sidePanel.systemConfigurationOptions);

		await page.locator('[data-section-id="build-steps"]').click();
		const titleBuilStepsdpage = page.locator("#build-steps");
		await expect(titleBuilStepsdpage).toHaveText("Build Steps");
		await page.getByRole("button", { name: "Add build step" }).click();
		await page.waitForLoadState("networkidle");
		const addBuildStepMenu1 = page.locator(".jenkins-dropdown--compact button");
		//const addBuildStepMenu = page.locator('button.jenkins-dropdown__item ');
		const textBuildStepMenu = await addBuildStepMenu1.allInnerTexts();

		expect(textBuildStepMenu).toStrictEqual(jenkinsData.textBuildStepMenu1);
	});
});
