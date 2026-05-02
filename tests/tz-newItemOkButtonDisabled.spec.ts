import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/tz-data";

test.describe('US_01.001 | New Item > Creatе a new item', () => {

    test('TC_01.001.13 | OK button is disabled until both conditions are met', async( {page} : {page: Page} ) => {
        
        await page.locator("#side-panel a[href$='newJob']").click()
        await page.locator("#name").fill(jenkinsData.folderName)

        await expect(page.locator('#ok-button')).toBeDisabled()
        
        await page.locator("#j-add-item-type-nested-projects ul li[class*='_Folder']").check();
        await expect(page.locator('#ok-button')).toBeEnabled()
    });
});