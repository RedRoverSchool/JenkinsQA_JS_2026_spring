import {test, expect} from '@/base';
import {Page} from '@playwright/test';
import {folderData, folderFieldsLocators} from './testData/olesk-data';


test.describe('US_05.001 | Folder Configuration > Display Name and Description', () => {

    test('TC_05.001.01| Folder Configuration > Folder information displayed on configuration page', async ({ page }: { page: Page }) => {
        // Precondition: Create a folder named "TestFolder"
        await page.locator("#side-panel a[href$='newJob']").click();
        await page.locator("#name").fill(folderData.displayName);
        await page.locator("li.com_cloudbees_hudson_plugins_folder_Folder").click();
        await page.getByRole("button", { name: "OK" }).click();

        await page.waitForLoadState("load");
        // Fill out the folder configuration form
        await page.locator(folderFieldsLocators.displayName).fill(folderData.displayName);
        await page.locator(folderFieldsLocators.description).fill(folderData.description);
        await page.locator("button[name='Submit']").click();

        await page.waitForLoadState("load");
        // Go to Home Page
        await page.locator(".app-jenkins-logo").click();
        
        // Step 1 - Click on the arrow ^ next to the folder name
        await page.locator(`#job_${folderData.displayName} .jenkins-menu-dropdown-chevron`).click();
        
        // Step 2 - Click on "Configure" option
        await page.getByRole("link", { name: "Configure" }).click();
       
        // Step 3 - Verify that the folder information is displayed on the configuration page
        const displayName = (await page.locator(folderFieldsLocators.displayName).inputValue()).trim();
        expect.soft(displayName).toBe(folderData.displayName);
        const description = (await page.locator(folderFieldsLocators.description).inputValue()).trim();
        expect.soft(description).toBe(folderData.description);

        expect.soft(page.locator('#main-panel').getByRole('button', { name: 'Health metrics' })).toBeVisible();
        expect.soft(page.locator("#properties")).toContainText("Properties");
        expect.soft(page.getByRole('button', {name: 'Add'})).toBeVisible();
    });
});