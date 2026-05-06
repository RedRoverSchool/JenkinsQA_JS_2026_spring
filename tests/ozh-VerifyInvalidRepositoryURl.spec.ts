import { test, expect, Page } from '../base';
import { createNewItem, ozData, ozhJenkinsLocators } from './testData/ozh-data';

test.describe('US_02.003 | Freestyle Project Configuration > Configure SCM', () => {
  test('TC_02.003.01 | Verify error message when repository URL is invalid', async ({ page }) => {
    await createNewItem(page);
    await page
      .locator(ozhJenkinsLocators.itemSidePanel)
      .locator(ozhJenkinsLocators.SCMButton)
      .click();

    await page.locator('label[for=radio-block-1]').click();
    await page.locator(ozhJenkinsLocators.repoUrlInput).fill(ozData.incorrectGitUrl);
    await page.locator(ozhJenkinsLocators.repoUrlInput).blur();
    await expect(page.locator(ozhJenkinsLocators.repoUrlError)).toContainText(
      ozData.repoErrorMessage,
    );
  });
});
