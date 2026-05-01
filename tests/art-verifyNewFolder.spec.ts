import { test, expect } from "@/base";
import { Page } from "@playwright/test";
import { jenkinsData } from "./testData/atr-data";

test.beforeEach( async ({ page }: { page: Page }) => {
	await page.locator("#side-panel a[href$='newJob']").click();
	});

test.describe("US_01.002 | New Item > Folder", () => {

    test("TC_01.002.01 | Verify new folder", async ({ page }: { page: Page }) => {
		await page.locator("#name").fill(jenkinsData.folder);
		await page.locator(".com_cloudbees_hudson_plugins_folder_Folder").click();
		await page.locator("#ok-button").click();

		await page.locator(".jenkins-input.validated").fill(jenkinsData.displayName);
		await page.locator("[name='_.description']").fill(jenkinsData.description);
		await page.locator(".jenkins-button.jenkins-submit-button.jenkins-button--primary").click();

		await page.locator(".app-jenkins-logo").click();

		const job = await page.locator("#projectstatus .jenkins-table__link").getAttribute("href");
		expect(job).toContain(jenkinsData.folder);

		await page.locator("#projectstatus .jenkins-table__link").click();
		const displayName = await page.locator(".job-index-headline.page-headline");
		expect(displayName).toContainText(jenkinsData.displayName);
		const description = await page.locator("#view-message");
		expect(description).toContainText(jenkinsData.description);
	});

});
