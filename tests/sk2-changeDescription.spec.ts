import { expect, Page } from "@playwright/test";
import { test } from "@/base";
import {
	jenkinsTestData,
	generateNewJob,
	jobDescription,
	updatedJobDescription
} from "@/tests/testData/sk2-jenkinsData";

test.describe("US_06.003 | Multibranch pipeline Configuration > Change Description", () => {
	const fillJobDescriptionAndClickSave = async (page: Page, jobDescription: string) => {
		await page.locator("textarea[name='_.description']").fill(jobDescription);
		await page.getByRole("button", { name: "Save" }).click();
	};

	test.beforeEach(async ({ page }: { page: Page }) => {
		await generateNewJob(page, jenkinsTestData);
		await page.locator("textarea[name='_.description']").fill(jobDescription);
	});

	test("TC_06.003.01 | Verify the preview description of the job.", async ({ page }: { page: Page }) => {
		await page.getByRole("link", { name: "Preview", exact: true }).click();

		const textareaPreview = page.locator(".textarea-preview");
		await textareaPreview.waitFor({ state: "visible" });
		await expect(textareaPreview).toHaveText(jobDescription);
	});

	test("TC_06.003.02 | Verify the project description", async ({ page }: { page: Page }) => {
		await fillJobDescriptionAndClickSave(page, jobDescription);

		const actualProjectDescription = await page.locator("#view-message").innerText();
		expect(actualProjectDescription).toBe(jobDescription);
	});

	test("TC_06.003.03 | Verify editing of the existing project description", async ({
		page
	}: {
		page: Page;
	}) => {
		await fillJobDescriptionAndClickSave(page, jobDescription);
		await page.getByRole("link", { name: "Configure", exact: true }).click();
		await fillJobDescriptionAndClickSave(page, updatedJobDescription);

		const actualProjectDescription = await page.locator("#view-message").innerText();
		expect(actualProjectDescription).toBe(updatedJobDescription);
	});
});
