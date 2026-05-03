import { test, expect, Page } from "@/ov-folder";

test.describe("US_07.001 | Organization folder Configuration > Change General Settings", () => {
    test("TC_07.001.01 | Access the General Settings from Job Dropdown on the main Jenkins page", async ({page, existingFolderName }: {page: Page; existingFolderName: string}) => {
        await expect(page.getByRole("heading", { name: existingFolderName})).toBeVisible();

        await page.locator("span.jenkins-mobile-hide").click();
        
        const folderName = page.getByRole('link', { name: existingFolderName });
        await folderName.hover();
        await folderName.getByRole("button").click();

        const popup = page.locator("div[id^='tippy-'] .jenkins-dropdown");
        await popup.getByText("Configure").click();

        await expect(page.locator("h2#general")).toBeVisible();
        await expect(page.locator("h2#general")).toHaveText("General");
    })
});
