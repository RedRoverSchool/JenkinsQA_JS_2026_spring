import { test, expect, Page } from '@/base';
import { createNewItem, ozData, ozhJenkinsLocators } from './testData/ozh-data';
import { cleanData } from '../helpers/cleanData';
import { Locator } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe.serial('US_23.001 | Global View > Create View with items with access', () => {
  let page: Page;
  let newViewBtn: Locator;
  let nameField: Locator;
  let myView: Locator;

  test.beforeAll(async ({ browser, request }) => {
    await cleanData(request);
    const context = await browser.newContext({
      storageState: '.auth/storageState.json',
    });
    page = await context.newPage();
    await page.goto('/');

    newViewBtn = page.locator('.tab a.addTab');
    nameField = page.locator('input#name');
    myView = page.locator('label[for="hudson.model.MyView"]');

    if ((await page.locator('tr.job').count()) === 0) {
      await createNewItem(page, faker.word.noun());
      await page.locator(ozhJenkinsLocators.jenkinsLogo).click();
      await page.goto('/');
    }
  });

  test.afterAll(async () => {
    await page.context().close();
  });

  test('TC_23.001.01 | A button for creating a new View is available on the Dashboard and has correct URL', async () => {
    await expect(newViewBtn).toBeVisible();
    await expect(newViewBtn).toHaveAttribute('href', '/newView');
  });

  for (let unsupportedChar of ozData.unsupportedCharacters) {
    test(`TC_23.001.02 | Verify validation tooltip if naming rules are violated - ${unsupportedChar}`, async () => {
      if (!page.url().includes('newView')) {
        await newViewBtn.click();
      }
      await nameField.fill(unsupportedChar);
      await nameField.blur();
      await expect(page.locator('.error')).toBeVisible();
      await expect(page.locator('.error')).toContainText(ozData.unsupportedCharTooltip);
      await nameField.clear();
    });
  }

  test('TC_23.001.03 | Verify New View creation form opens after selecting "My View" option', async () => {
    const viewName = ozData.jobName;
    await nameField.fill(viewName);
    await nameField.blur();
    await myView.check();
    await page.locator('button[name="Submit"]').click();
    await expect(page.locator(`.tabBar a[href*="${viewName}"]`)).toBeVisible();
    await expect(page.locator(`.tabBar a[href*="${viewName}"]`)).toContainText(viewName);
  });
});
