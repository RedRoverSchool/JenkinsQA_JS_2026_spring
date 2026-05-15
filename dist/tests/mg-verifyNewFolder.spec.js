import { test, expect } from "../base";
test.describe("US_01.002.24 | New Item > Folder", () => {
    test("TC_01.002.24 | Verify new folder creation", async ({ page }) => {
        const folderName = `folder_${Date.now()}`;
        await page.locator("#side-panel a[href$='newJob']").click();
        await page.locator("#name").fill(folderName);
        await page.locator("li.com_cloudbees_hudson_plugins_folder_Folder").click();
        await page.locator("#ok-button").click();
        await expect(page.locator("button[value='Save']")).toBeVisible();
        await page.locator("button[value='Save']").click();
        await page.locator(".app-jenkins-logo").click();
        await expect(page.locator(`#job_${folderName}`)).toBeVisible();
    });
});
//# sourceMappingURL=mg-verifyNewFolder.spec.js.map