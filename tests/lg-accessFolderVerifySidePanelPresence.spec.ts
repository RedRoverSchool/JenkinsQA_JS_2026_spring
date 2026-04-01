import { expect } from "@playwright/test";
import { test } from "@/base";
import { jenkinsData } from "@/tests/testData/lg-jenkinsData";

const FOLDER_NAME = jenkinsData.folderName;
const REQUIRED_LINKS = jenkinsData.required_links;

test.describe("US_21.001 | Folder Management > Navigate Side Panel", () => {
	test("TC_21.001.01 | Access Folder and Verify Side Panel Presence", async ({ page }) => {
		await test.step("Create a new Folder", async () => {
			await page.locator("#side-panel a[href$='newJob']").click();
			await page.locator("#name").fill(jenkinsData.folderName);
			await page.getByRole("radio", { name: "Folder Creates a container" }).check();
			await page.getByRole("button", { name: "OK" }).click();
			await page.locator("button[name='Submit']").click();
			await page.locator("a:has(#jenkins-head-icon)").click();

			const folderCreated = page.locator("a:has(button)>span");

			expect(folderCreated).toHaveText(FOLDER_NAME);
			await page.getByRole("link", { name: FOLDER_NAME }).click();

			await expect(page.getByRole("heading", { name: FOLDER_NAME, exact: true })).toBeVisible();
		});
		await test.step("Verify Side Panel Visibility and Interactivity", async () => {
			const statusLink = page.getByRole("link", { name: "Status", exact: true });
			await expect(statusLink).toBeVisible();
			await expect(statusLink).toBeEnabled();
		});
		await test.step("Verify all Required Links are Present", async () => {
			const sidePanel = page.locator("#side-panel");
			let linkLocator;

			for (const linkText of REQUIRED_LINKS) {
				if (linkText === "+New Item") {
					linkLocator = sidePanel.locator("a[href$='newJob']");
				} else {
					linkLocator = sidePanel.getByRole("link", { name: linkText, exact: true });
				}

				await expect(linkLocator, `Side panel has links: ${linkText}`).toBeVisible();
				await expect(linkLocator).toBeEnabled();
			}
		});
	});
});
