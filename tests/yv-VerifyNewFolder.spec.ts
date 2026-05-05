import { test, expect, Page } from "@/base";
import { dataYV } from "./testData/yv-data";

test.describe("US_01.002 | New Item > Folder", () => {
    test("TC_01.002.20 | Verify new folder creation", async({page}: {page: Page} ) =>{
        await page.getByRole('link', {name: 'New Item'}).click();
        await page.locator('.jenkins-input#name').fill(dataYV.folderName);
        await page.locator('.com_cloudbees_hudson_plugins_folder_Folder').click();
        await page.getByRole('button', {name: 'OK'}).click();
        await page.getByRole('button', {name: 'Save'}).click();
        await page.locator('.app-jenkins-logo').click();
        const folder = await page.locator('#projectstatus .jenkins-table__link').getAttribute('href');
        expect(folder).toContain(dataYV.folderName);
    });
});