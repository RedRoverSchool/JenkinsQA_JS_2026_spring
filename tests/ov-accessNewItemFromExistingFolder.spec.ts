import { test, expect, Page } from "@/ov-folder";

test.describe("US_01.002 | New Item > Folder", () => {
    test("TC_01.002.04 | Access New Item Page from existing folder", async ({page, existingFolderName }: {page: Page; existingFolderName: string}) => {
        await expect(page.getByRole("heading", { name: existingFolderName})).toBeVisible();

        await page.getByRole("link", {name: "New Item"}).click();

        await expect(page).toHaveURL(/newJob/);
        await expect(page.locator("input#name.jenkins-input")).toBeVisible();
        await expect(page.locator("input#name.jenkins-input")).toBeEditable();
    })
});
