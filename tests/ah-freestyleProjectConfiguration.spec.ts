import { expect } from "@playwright/test";
import { test } from "../base.js";
import { jenkinsData } from "@/tests/testData/ah-jenkinsData";

test.describe("UC_02.002 | Freestyle Project Configuration > Project Description", () => {
	test("TC_02.002.01 | Configuration page available after clicking Ok", async ({ page }) => {
		await page.locator("#side-panel a[href$='newJob']").click();
		await page.locator("#name").fill(jenkinsData.jobName);
		await page
			.locator(
				`#j-add-item-type-standalone-projects ul li[class*='${jenkinsData.projectName.freestyle}']`
			)
			.click();
		await page.locator("#ok-button").click();
		await expect(page.getByRole("heading", { level: 1, name: "Configure" })).toBeVisible();
	});

	test("TC_02.002.02 | Configuration page opens after clicking Configure on an existing Freestyle job ", async ({
		page
	}) => {
		await page.locator("#side-panel a[href$='newJob']").click();
		await page.locator("#name").fill(jenkinsData.jobName);
		await page
			.locator(
				`#j-add-item-type-standalone-projects ul li[class*='${jenkinsData.projectName.freestyle}']`
			)
			.click();
		await page.locator("#ok-button").click();
		await page.locator(".jenkins-button[value='Save']").click();
		await page.locator(`a.task-link[href='/job/${jenkinsData.jobName}/configure']`).click();
		const configurePage = page.locator(".jenkins-app-bar__content h1");
		await expect(configurePage).toBeVisible();
	});

	test("TC_02.002.03 | Description input field available", async ({ page }) => {
		await page.locator("#side-panel a[href$='newJob']").click();
		await page.locator("#name").fill(jenkinsData.jobName);
		await page
			.locator(
				`#j-add-item-type-standalone-projects ul li[class*='${jenkinsData.projectName.freestyle}']`
			)
			.click();
		await page.locator("#ok-button").click();
		await page.locator(".jenkins-button[value='Save']").click();
		await page.locator(`a.task-link[href='/job/${jenkinsData.jobName}/configure']`).click();
		const inputField = page.locator("textarea[name='description']");
		await expect(inputField).toBeVisible();
	});

	test("TC_02.002.04 | Description field appears and accepts alphanumeric characters + underscores", async ({
		page
	}) => {
		await page.locator("#side-panel a[href$='newJob']").click();
		await page.locator("#name").fill(jenkinsData.jobName);
		await page
			.locator(
				`#j-add-item-type-standalone-projects ul li[class*='${jenkinsData.projectName.freestyle}']`
			)
			.click();
		await page.locator("#ok-button").click();
		await page.locator(".jenkins-button[value='Save']").click();

		await page.locator("#description-link.jenkins-button").click();
		const descriptionField = page.locator("textarea[name='description']");
		await descriptionField.click();
		await descriptionField.fill(jenkinsData.descriptionProject);
		await page.locator("button[value='Save']").click();

		const savedDescription = page.locator("#description-content");
		await expect(savedDescription).toContainText(jenkinsData.descriptionProject);
	});

	test("TC_02.002.05 | Cancel button do not save the Description", async ({ page }) => {
		await page.locator("#side-panel a[href$='newJob']").click();
		await page.locator("#name").fill(jenkinsData.jobName);
		await page
			.locator(
				`#j-add-item-type-standalone-projects ul li[class*='${jenkinsData.projectName.freestyle}']`
			)
			.click();
		await page.locator("#ok-button").click();
		await page.locator(".jenkins-button[value='Save']").click();

		await page.locator("#description-link.jenkins-button").click();
		const descriptionField = page.locator("textarea[name='description']");
		await descriptionField.click();
		await descriptionField.fill(jenkinsData.descriptionProject);
		await page.locator("button.description-cancel-button").click();

		await expect(page.locator("#description-content")).not.toContainText(jenkinsData.descriptionProject);
	});
});
