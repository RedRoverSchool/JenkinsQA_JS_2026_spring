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
    await page.locator(ozhJenkinsLocators.jenkinsLogo).click();
  });
  test('TC_16.008.01 | Verify deleting project via dropdown menu', async ({
    page,
  }: {
    page: Page;
  }) => {
    await expect(page.locator(`tr#job_${ozData.jobName}`)).toHaveCount(1);
    const item = page.locator(`[href*=${ozData.jobName}].jenkins-table__link`);
    await item.hover();
    await item.locator('button.jenkins-menu-dropdown-chevron').click();
    const itemDropDown = page.locator(`div.jenkins-dropdown`);
    await itemDropDown
      .locator(`button[href*="job/${ozData.jobName}/doDelete"].jenkins-dropdown__item`)
      .click();
  });

  test(`TC_16.008.02 | Verify deleting project on project's page`, async ({ page }) => {
    await page.goto(`/job/${ozData.jobName}/`);
    await page.locator(projectSidePanelLocators.deleteProjectBtn).click();
  });

  test.afterEach(async ({ page }) => {
    await page.click('button[data-id=ok]');
    await expect(page.locator(`tr#job_${ozData.jobName}`)).toHaveCount(0);
  });
});
