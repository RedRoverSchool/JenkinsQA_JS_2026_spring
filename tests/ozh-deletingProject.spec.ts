import { test, expect, Page } from '../base';
import { ozData } from './testData/ozh-data';

test.describe('US_16.008 | Freestyle Project Management > Delete Project', () => {
  test('TC_16.008.01 | Verify deleting project via dropdown menu', async ({
    page,
  }: {
    page: Page;
  }) => {
    page.on('dialog', async (dialog) => {
      await dialog.accept();
    });
    await page.locator("#side-panel a[href$='newJob']").click();
    await page.locator('#name').fill(ozData.jobName);
    await page
      .locator("#j-add-item-type-standalone-projects ul li[class*='FreeStyleProject']")
      .click();
    await page.locator('#ok-button').click();
    await page.locator('.app-jenkins-logo').click();
    await expect(page.locator(`tr#job_${ozData.jobName}`)).toHaveCount(1);
    const item = page.locator(`[href*=${ozData.jobName}].jenkins-table__link`);
    await item.hover();
    await item.locator('button.jenkins-menu-dropdown-chevron').click();
    const itemDropDown = page.locator(`div.jenkins-dropdown`);
    await itemDropDown
      .locator(`button[href="/job/${ozData.jobName}/doDelete"].jenkins-dropdown__item `)
      .click();

    await page.click('button[data-id=ok]');
    await expect(page.locator(`tr#job_${ozData.jobName}`)).toHaveCount(0);
  });
});
