import { test, expect, Page } from "@/tests/testFixtures/ov-organizationFolder.fixtures";

test.describe("US_07.001 | Organization folder Configuration > Change General Settings", () => {
    test("TC_07.001.01 | Access the General Settings from Job Dropdown on the main Jenkins page", async ({page, organizationFolderName }: {page: Page; organizationFolderName: string}) => {
        await expect(page.getByRole("heading", { name: organizationFolderName})).toBeVisible();

        await page.locator("span.jenkins-mobile-hide").click();
        
        const folderName = page.getByRole('link', { name: organizationFolderName });
        await folderName.hover();
        await folderName.getByRole("button").click();

        const popup = page.locator("div[id^='tippy-'] .jenkins-dropdown");
        await popup.getByText("Configure").click();

        await expect(page.locator("h2#general")).toBeVisible();
        await expect(page.locator("h2#general")).toHaveText("General");
    });
    
    test("TC_07.001.02 | Access the General Settings by clicking the job name in the project table", async ({page, organizationFolderName }: {page: Page; organizationFolderName: string}) => {
        await page.locator("span.jenkins-mobile-hide").click();
        
        const folderName = page.getByRole('link', { name: organizationFolderName });
        await folderName.click();

        await page.getByRole('link', { name: 'Configure', exact: true }).click();

        await expect(page.locator("h2#general")).toBeVisible();
        await expect(page.locator("h2#general")).toHaveText("General");
    });

    test("TC_07.001.03 | Access the General Settings from the project link", async ({page, organizationFolderName}: {page: Page; organizationFolderName: string}) => {
        await page.locator("span.jenkins-mobile-hide").click();

        const folderName = page.getByRole('link', {name: organizationFolderName});
        await folderName.click();

        await page.locator("a[href = './configure'].content-block__link").click();

        await expect(page.locator("h2#general")).toBeVisible();
        await expect(page.locator("h2#general")).toHaveText("General");
    });
});
