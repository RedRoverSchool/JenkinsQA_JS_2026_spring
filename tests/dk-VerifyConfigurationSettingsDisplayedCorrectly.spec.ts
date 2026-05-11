import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/dk-data";

test.describe('US_10.004.06 Epic Name > User Story Name' , ()=> {
    
    test.beforeEach(async ({ page }: { page: Page }) => {
        await page.locator('.jenkins-header__actions > #root-action-ManageJenkinsAction').click()
        await page.getByRole('link', { name: 'Tools' }).click();

    })
     
  

     test('TC_10.004.06 | Verify page has all titles ', async ({page}: {page: Page}) => {
        const titles = [
     page.getByText('Maven Configuration'),
     page.getByText('JDK installations'),
     page.getByText('Git installations'),
     page.getByText('Gradle installations'),
     page.getByText('Ant installations'),
     page.getByText('Maven installations')
        ]

      for (const title of titles) {
        await expect(title).toBeVisible()
      }

     })



})