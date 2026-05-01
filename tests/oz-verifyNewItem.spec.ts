import { test, expect } from '../base';
import { Page } from '@playwright/test';
import { jenkinsData } from './testData/oz-data';

test.describe('US_01.001 | New Item > Creatе a new item', () => {
  test('TC_01.001.09 | Verify new item creation', async ({ page }) => {
    await page.locator('#side-panel a[href$="newJob"]').click();
    await page.locator('#name').fill(jenkinsData.jobName);
    await page
      .locator('#j-add-item-type-standalone-projects ul li[class=hudson_model_FreeStyleProject]')
      .click();
    await page.locator('#ok-button').click();
    await page.locator('a.app-jenkins-logo').click();
    const job = await page.locator('#projectstatus .jenkins-table__link').getAttribute('href');
    expect(job).toContain(jenkinsData.jobName);
  });
});
