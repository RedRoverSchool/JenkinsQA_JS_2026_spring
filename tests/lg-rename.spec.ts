import { expect, Page } from "@playwright/test";
import { test } from "@/base";
import { jenkinsData } from "@/tests/testData/lg-jenkinsData";

const generateUniqueName = (baseName: string) => {
	return `RENAMED_${baseName.replace(/\s/g, "_")}_${Date.now() % 100}`;
};

const FOLDER_NAME = jenkinsData.folderName;
const NEW_NAME = generateUniqueName(FOLDER_NAME);
const ENCODED_NEW_NAME = encodeURIComponent(NEW_NAME);

test.describe("US_21.004 | Folder Management > Rename", () => {
	async function createAndNavigateToFolder(page: Page, folderName: string) {
		await page.locator("#side-panel a[href$='newJob']").click();
		await page.locator("#name").fill(folderName);
		await page.getByRole("radio", { name: "Folder Creates a container" }).check();
		await page.getByRole("button", { name: "OK" }).click();
		await page.locator("button[name='Submit']").click();

		await page.locator("a:has(#jenkins-head-icon)").click();
		await page.getByRole("link", { name: folderName }).click();
		await expect(page.getByRole("heading", { name: folderName, exact: true })).toBeVisible();
	}

	test("TC_21.004.01 | Folder Rename Functionality using Side Panel", async ({ page }) => {
		await test.step("Precondition: Create and Navigate to Folder", async () => {
			await createAndNavigateToFolder(page, FOLDER_NAME);
		});

		await test.step(" Click 'Rename' link ", async () => {
			const renameLink = page.getByRole("link", { name: "Rename", exact: true });
			await expect(renameLink).toBeVisible();
			await renameLink.click();

			await expect(page).toHaveURL(
				new RegExp(`\/job\/${encodeURIComponent(FOLDER_NAME)}\/confirm-rename`)
			);
		});

		await test.step(" Enter new name and confirm rename ", async () => {
			await page.locator("input[name='newName']").fill(NEW_NAME);
			await page.getByRole("button", { name: "Rename" }).click();
		});

		await test.step(" Verify browser redirect to the new folder URL ", async () => {
			await expect(page).toHaveURL(new RegExp(`\/job\/${ENCODED_NEW_NAME}\/`));

			await expect(page.getByRole("heading", { name: NEW_NAME, exact: true })).toBeVisible();
		});

		await test.step(" Verify new name when back to  Dashboard ", async () => {
			await page.locator("a:has(#jenkins-head-icon)").click();

			await expect(page.getByRole("link", { name: FOLDER_NAME })).not.toBeVisible();
			await expect(page.getByRole("link", { name: NEW_NAME })).toBeVisible();
		});
	});
});
