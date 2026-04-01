import { expect } from "@playwright/test";
import { test } from "@/base";
import { jenkinsData } from "@/tests/testData/ak84-jenkinsData";

test.describe("TC_01.002.04 | New Item > Folder > Delete Folder", () => {
	test("TC_01.002.04 | Verify folder deletion", async ({ page }) => {
		const newItemButton = page.getByRole("link", { name: "New Item" });
		await newItemButton.click();

		const itemNameField = page.getByLabel("Enter an item name");
		await itemNameField.fill(jenkinsData.folderName);

		const folderLabel = page.getByRole("radio", { name: "Folder Creates a container" });
		await folderLabel.click();

		const okButton = page.getByRole("button", { name: "OK" });
		await okButton.click();

		const saveButton = page.getByRole("button", { name: "Save" });
		await saveButton.click();
		await expect(page.getByRole("heading", { level: 1 })).toHaveText(jenkinsData.folderName);

		const deleteFolderIcon = page.getByRole("link", { name: "Delete Folder" });
		await deleteFolderIcon.click();
		await page.getByRole("button", { name: "Yes" }).click();
		await expect(page.getByRole("heading", { level: 1, name: jenkinsData.folderName })).not.toBeVisible();
	});
});
