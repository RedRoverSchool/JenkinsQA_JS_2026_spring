import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/dk-data";

test.describe('US_01.002 | New Item > Folder', () => {

  test.beforeEach(async ({ page }: { page: Page }) => {
     await page.locator('a[it="hudson.model.Hudson@232d376e"]').click();
     // await page.getByRole('link', { name: 'New Item' }).click();  

      await page.locator('.add-item-name > .jenkins-input').fill(jenkinsData.folderName)
     //await page.getByRole('textbox', { name: 'Enter an item name' }).click().fill(jenkinsData.folderName);

     await page.locator('.com_cloudbees_hudson_plugins_folder_Folder').click()
     //await page.getByRole('radio', { name: 'Folder Creates a container' }).click();

     await page.locator('#ok-button').click();
     //await page.getByRole('button', { name: 'OK' }).click();

     await page.locator('.jenkins-button.jenkins-submit-button.jenkins-button--primary').click();
     //await page.getByRole('button', { name: 'Save' }).click();

  })

 test('TC_01.001.01 | Verify folder created by title', async ({ page }: { page: Page }) => {
    await expect(page.getByRole('heading', { name: jenkinsData.folderName })).toBeVisible()
 })

 test('TC_01.001.01 | Verify new folder created on HP', async ({ page }: { page: Page }) =>{
  await page.goto('/');
  await expect(page.locator('#projectstatus .jenkins-table__link')).toContainText(jenkinsData.folderName)
 })

})