import { test, expect, Page } from "@/base";
import { vvData } from "./testData/vv-data";


test.describe("US_01.002 | New Item > Folder" , () => {
    test("TC_01.002.03 | Verify Apply button saves changes", async ({ page }: { page: Page }) => {
        await page.locator("#side-panel a[href$='newJob']").click();
        await page.locator("#name").fill(vvData.jobName);
        await page.locator(".com_cloudbees_hudson_plugins_folder_Folder").click();
        await page.locator("#ok-button").click();
        await page.locator("[name='_.displayNameOrNull']").fill(vvData.displayNameFolder);
        await page.locator("[name='_.description']").fill(vvData.descriptionFolder);
        await page.locator("[name='Apply']").click();

        await expect(page.locator("#notification-bar")).toHaveText("Saved");

        await page.locator("#jenkins-head-icon").click();

        await expect(page.locator("#projectstatus .jenkins-table__link")).toHaveText(vvData.displayNameFolder);

        await page.locator("#projectstatus .jenkins-table__link").click();

        await expect(page.locator(".job-index-headline")).toHaveText(vvData.displayNameFolder);
        await expect(page.locator("#view-message")).toHaveText(vvData.descriptionFolder);

    });
});