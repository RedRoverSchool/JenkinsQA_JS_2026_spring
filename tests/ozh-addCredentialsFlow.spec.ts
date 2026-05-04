import { test, expect, Page } from '../base';
import { manageCredentialsLocators, manageJenkinsLocators } from './testData/ozh-data';

test.describe('US_22.001 | Add Credentials > General Flow', () => {
  test('TC_22.001.01 | Verify that the Credentials page is accessible', async ({ page }) => {
    await page.locator(manageJenkinsLocators.manageJenkinsBtn).click();
    await page.locator(manageCredentialsLocators.goToCredentialsBtn).click();
    await expect(page.locator(manageCredentialsLocators.addCredentialsBtn)).toBeVisible();
  });
});
