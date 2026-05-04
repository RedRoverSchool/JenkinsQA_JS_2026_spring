import { test, expect, Page } from '../base';
import {
  ozData,
  createNewItem,
  ozhJenkinsLocators,
  projectSidePanelLocators,
} from './testData/ozh-data';

test.describe('US_16.008 | Freestyle Project Management > Delete Project', () => {
  test.beforeEach(async ({ page }) => {
    await createNewItem(page);
  });
  test('TC_16.008.01 | Verify deleting project via dropdown menu', async ({
    page,
  }: {
    page: Page;
  }) => {
    await page.locator('.app-jenkins-logo').click();
    await expect(page.locator(`tr#job_${ozData.jobName}`)).toHaveCount(1);
    const item = page.locator(`[href*=${ozData.jobName}].jenkins-table__link`);
    await item.hover();
    await item.locator('button.jenkins-menu-dropdown-chevron').click();
    const itemDropDown = page.locator(`div.jenkins-dropdown`);
    await itemDropDown
      .locator(`button[href="/job/${ozData.jobName}/doDelete"].jenkins-dropdown__item`)
      .click();
    await page.click('button[data-id=ok]');
    await expect(page.locator(`tr#job_${ozData.jobName}`)).toHaveCount(0);
  });

  test(`TC_16.008.02 | Verify deleting project on project's page`, async ({ page }) => {
    await page.locator('.app-jenkins-logo').click();
    await page.locator(ozhJenkinsLocators.itemPageLink).click();
    await page.locator(projectSidePanelLocators.deleteProjectBtn).click();
    await page.click('button[data-id=ok]');
    await expect(page.locator(`tr#job_${ozData.jobName}`)).toHaveCount(0);
  });
});
