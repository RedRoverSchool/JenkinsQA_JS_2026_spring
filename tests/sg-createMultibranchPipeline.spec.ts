import { expect } from "@playwright/test";
import { test } from "@/base";
import { jenkinsData } from "@/tests/testData/sg-jenkinsData";

test.describe("US_01.005 | New Item > Create Multibranch Pipeline", () => {
	test("TC_01.005.02 | Create Multibranch Pipeline using 'Create Job' link", async ({ page }) => {
		const createJobLink = page.getByText("Create a job");
		await createJobLink.click();

		const nameInput = page.locator("#name");
		await nameInput.fill("mp1");

		const multiBranchPipeLine = page.getByRole("radio", { name: "Multibranch Pipeline" });
		await multiBranchPipeLine.click();

		const okButton = page.locator("#ok-button");
		await okButton.click();

		const saveButton = page.getByText("Save");
		await saveButton.click();

		const jenkinsIcon = page.locator("#jenkins-head-icon");
		await jenkinsIcon.click();

		const job = await page.locator("#projectstatus .jenkins-table__link").getAttribute("href");

		expect(job).toContain(jenkinsData.jobName);
	});
});
