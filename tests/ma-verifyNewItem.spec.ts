import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/ma-data";

test.describe("US_01.001 | New Item > Create a new item", () => {
	test("TC_01.001.01 | Verify new item creation when another one present yet", async ({ page }: { page: Page }) => {
		await page.locator("#side-panel a[href$='newJob']").click();
		await page.locator("#name").fill(jenkinsData.jobName);
		await page.locator("#j-add-item-type-standalone-projects ul li[class*='FreeStyleProject']").click();
		await page.locator("#ok-button").click();

		await page.locator(".app-jenkins-logo").click();

		const firstLink = page.locator("#projectstatus .jenkins-table__link").first();
		await firstLink.waitFor({ state: "attached", timeout: 10000 }); 

		const jobsHrefsList = await page.locator("#projectstatus .jenkins-table__link")
			.evaluateAll(elements => elements.map(el => el.getAttribute("href")));

		expect(jobsHrefsList).toContain(`job/${jenkinsData.jobName}/`);
	});
});
