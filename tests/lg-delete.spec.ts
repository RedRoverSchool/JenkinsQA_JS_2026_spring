import { expect, Page } from "@playwright/test";
import { test } from "@/base";
import { jenkinsData } from "@/tests/testData/lg-jenkinsData";

const FOLDER_NAME = jenkinsData.folderName;

async function createFolder(page: Page, folderName: string) {
	await page.locator("#side-panel a[href$='newJob']").click();
	await page.locator("#name").fill(folderName);
	await page.getByRole("radio", { name: "Folder Creates a container" }).check();
	await page.getByRole("button", { name: "OK" }).click();
	await page.locator("button[name='Submit']").click();

	await expect(page.getByRole("heading", { name: folderName, exact: true })).toBeVisible();
}

test.describe("US_21.003 Folder Management > Delete > Delete Folder ", () => {
	test.beforeEach(async ({ page }: { page: Page }) => {
		await test.step("Precondition: Create Folder", async () => {
			await createFolder(page, FOLDER_NAME);
		});
	});

	test("TC_21.003.01 | Delete Folder via Side Panel", async ({ page }) => {
		await test.step("Click 'Delete Folder' in the Side Panel", async () => {
			const deleteLink = page.getByRole("link", { name: "Delete Folder", exact: true });
			await expect(deleteLink).toBeVisible();
			await deleteLink.click();
		});

		await test.step("Confirm  that folder  will be deleted via the modal dialog ", async () => {
			await expect(page.locator(".jenkins-dialog")).toBeVisible();
			const yesButton = page.getByRole("button", { name: "Yes" });
			await expect(yesButton).toBeVisible();
			await yesButton.click();
		});

		await test.step("Validate redirection to Jenkins homepage", async () => {
			await expect(page.locator("h1")).toHaveText("Welcome to Jenkins!");
		});

		await test.step("Validate folder was removed from Dashboard", async () => {
			const deletedFolder = page.getByRole("link", { name: FOLDER_NAME });
			await expect(deletedFolder).not.toBeVisible();
			await expect(deletedFolder).not.toBeAttached();
		});
	});
});
