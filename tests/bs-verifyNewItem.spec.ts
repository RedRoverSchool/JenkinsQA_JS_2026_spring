import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/bs-data";

test.describe("US_01.001 | New Item > Create a new item", () => {
	test("TC_01.001.01 | Verify new item creation", async ({ page }: { page: Page }) => {
		await page.locator("#side-panel a[href$='newJob']").click();
		await page.locator("#name").fill(jenkinsData.jobName);
		await page.locator("#j-add-item-type-standalone-projects ul li[class*='FreeStyleProject']").click();
		await page.locator("#ok-button").click();

		await page.locator(".app-jenkins-logo").click();

		const job = await page.locator("#projectstatus .jenkins-table__link").getAttribute("href");
		expect(job).toContain(jenkinsData.jobName);
	});

	test("Test_WelcomMessage", async ({ page }) => {
		await expect(page.locator("h1")).toHaveText("Welcome to Jenkins!");
	});

	test("Test_FooterVersion", async ({ page }) => {
		const footer = page.locator("footer .jenkins_ver");
		await expect(footer).toHaveText(jenkinsData.jenkinsVersion);
	});
});
