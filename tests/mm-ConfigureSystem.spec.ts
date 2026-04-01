import { expect } from "@playwright/test";
import { test } from "@/base";
import { jenkinsData } from "@/tests/testData/mm-jenkinsData";

test.describe("TC_10.001 | Manage Jenkins > Configure System", () => {
	test("TC_10.001.001 | Verify System Configuration Options", async ({ page }) => {
		await page.locator("#root-action-ManageJenkinsAction").click();
		await page.waitForLoadState("networkidle");
		const child = page.getByRole("heading", { name: "System Configuration" });
		const parent = page.locator("section.jenkins-section").filter({ has: child });
		const options = await parent.locator(".jenkins-section__item dt").allInnerTexts();

		expect(options).toStrictEqual(jenkinsData.manageJenkins.systemConfigurationOptions);
	});
});
