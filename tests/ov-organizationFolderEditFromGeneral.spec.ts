import { test, expect, Page } from "@/tests/testFixtures/ov-organizationFolder.fixtures";
import { OrganizationFolderData } from "@/tests/testData/ov-data";

test.describe("US_07.001 | Organization folder Configuration > Change General Settings", () => {
    test("TC_07.001.04 | Edit the Display Name from the General section", async ({page, organizationFolderName}: {page: Page, organizationFolderName: string}) => {
        await page.locator("span.jenkins-mobile-hide").click();
        
        const folderName = page.getByRole('link', { name: organizationFolderName });
        await folderName.click();

        await page.getByRole('link', { name: 'Configure', exact: true }).click();

        await page.locator("input[name='_.displayNameOrNull']").clear();
        await page.locator("input[name='_.displayNameOrNull']").fill(OrganizationFolderData.editDisplayName);
        await page.locator("button[name='Submit']").click();

        const editDisplayName = page.locator("h1.job-index-headline.page-headline");
        await expect(editDisplayName).toHaveText(OrganizationFolderData.editDisplayName);
    });
});
