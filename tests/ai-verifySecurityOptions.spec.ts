import { expect } from "@playwright/test";
import { test } from "@/base";
import { jenkinsData } from "@/tests/testData/ai-jenkinsData";

test.describe("US_10.013 | Manage Jenkins > Configure Security", () => {
	test("TC_10.013.01 | Verify Security Options", async ({ page }) => {
		await page.locator("#root-action-ManageJenkinsAction").click();
		await page.waitForLoadState("networkidle");
		const child = page.getByRole("heading", { name: "Security" });
		const parent = page.locator("section.jenkins-section").filter({ has: child });
		const options = await parent.locator(".jenkins-section__item dt").allInnerTexts();

		expect(options).toStrictEqual(jenkinsData.manageJenkins.securityOptions);
	});
});
