import { test, expect } from "@/base";
import { Page } from "@playwright/test";
import { jenkinsData } from "./testData/ad-data";

test.describe("US_01.001 | New Item > Creatе a new item", () => {
    test("TC_01.001.12 | Verify new item creation (folder)", async ({ page } : { page: Page}) => {
        await page.locator("#side-panel a[href$='newJob']").click();
        await page.locator("#name").fill(jenkinsData.folderName)
        await page.locator("li.com_cloudbees_hudson_plugins_folder_Folder").click();
        await page.locator("#ok-button").click();
        await page.locator(".app-jenkins-logo").click();

        const folderLinkName = await page.locator("#projectstatus .jenkins-table__link").getAttribute("href");

        expect(folderLinkName).toContain(jenkinsData.folderName);
    });

});
