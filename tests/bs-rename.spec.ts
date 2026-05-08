import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/bs-data";

test.describe("US_06.002 | Multibranch pipeline Configuration > Rename", () => {
	test("TC_06.002.05 | Rename Job", async ({ page }: { page: Page }) => {
		await page.locator("#side-panel a[href$='newJob']").click();
		await page.locator("#name").fill(jenkinsData.jobName);
		await page.locator("#j-add-item-type-standalone-projects ul li[class*='FreeStyleProject']").click();
		await page.locator("#ok-button").click();

		await page.locator(".app-jenkins-logo").click();

		const item = page.locator(`#job_${jenkinsData.jobName} .jenkins-table__link`);
		await item.hover();
		await item.locator("button").click();

		const popup = page.locator("div[id^='tippy-'] .jenkins-dropdown");

		await popup.locator(`[href*='${jenkinsData.jobName}/confirm-rename']`).click();

		await page.locator(".jenkins-form-item input").fill(jenkinsData.jobNameRenamed);
		await page.locator("#bottom-sticker button").click();

		await page.locator(".app-jenkins-logo").click();

		const job = await page.locator("#projectstatus .jenkins-table__link").getAttribute("href");
		expect(job).toContain(jenkinsData.jobNameRenamed);
	});
});
