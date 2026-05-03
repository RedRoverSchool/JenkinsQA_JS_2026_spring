import { test, expect } from '../base';
import { Page } from '@playwright/test';
import { ozData } from './testData/ozh-data';

test.describe('US_02.001 | Freestyle Project Configuration > Enable or Disable the Project', () => {
  test('TC_02.001.01 | Verify that warning message appears after disabling the project', async ({
    page,
  }) => {
    await page.locator('#side-panel a[href$="newJob"]').click();
    await page.locator('#name').fill(ozData.jobName);
    await page
      .locator('#j-add-item-type-standalone-projects ul li[class=hudson_model_FreeStyleProject]')
      .click();
    await page.locator('#ok-button').click();
    await page.locator('a.app-jenkins-logo').click();
    // const job = await page.locator('#projectstatus .jenkins-table__link').getAttribute('href');
    const item = page.locator(`#job_${ozData.jobName} .jenkins-table__link`);
    await item.hover();
    await item.locator('button').click();

    const popup = page.locator('div[id^="tippy-"] .jenkins-dropdown');
    const configureLink = popup.locator(`[href*='${ozData.jobName}/configure']`);
    await configureLink.click();

    const changeConfigToggle = page.locator('.jenkins-toggle-switch__label ');
    await changeConfigToggle.uncheck();

    const saveBtn = page.locator('.jenkins-submit-button');
    await saveBtn.click();

    await expect(page.locator('form[id="enable-project"]')).toContainText(
      'This project is currently disabled',
    );
  });
});
