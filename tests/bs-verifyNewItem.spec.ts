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

	test("drag and drop", async ({ page }: { page: Page }) => {
		await page.goto("https://www.qa-practice.com/elements/dragndrop/boxes");

		const sourceEl = page.locator("#rect-draggable");
		const destinationEl = page.locator("#rect-droppable");

		// await sourceEl.dragTo(destinationEl);

		await sourceEl.hover();
		await page.mouse.down();
		await destinationEl.hover();
		await page.mouse.up();

		await expect(destinationEl).toContainText("Drag me");
	});

	test("iframes", async ({ page }: { page: Page }) => {
		await page.goto("https://www.qa-practice.com/elements/iframe/iframe_page");

		const iframe = page.frameLocator(".embed-responsive-item");

		const buttonInsideIframe = iframe.locator(".btn-primary");

		await buttonInsideIframe.click();

		await expect(buttonInsideIframe).toBeVisible();
	});

	test("alert", async ({ page }: { page: Page }) => {
		await page.goto("https://www.qa-practice.com/elements/alert/alert");

		page.on("dialog", async (d) => {
			expect(d.message()).toContain("I am an alert!");

			await d.accept();
		});

		await page.locator(".a-button").click();
	});

	test("modal", async ({ page }: { page: Page }) => {
		await page.goto("https://www.qa-practice.com/elements/popup/modal");

		await page.getByRole("button", { name: "Launch Pop-Up" }).click();

		const modal = page.locator("#exampleModal");

		await expect(modal.getByRole("heading", { level: 5 })).toHaveText("I am a Pop-Up");
	});
});
