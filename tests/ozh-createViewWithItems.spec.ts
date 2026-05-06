import { test, expect, Page } from '@/base';
import { createNewItem, ozhJenkinsLocators } from './testData/ozh-data';
import { cleanData } from '../helpers/cleanData';
import { Locator } from '@playwright/test';

test.describe.serial('US_23.001 | Global View > Create View with items with access', () => {
  let page: Page;
  let newViewBtn: Locator;

  test.beforeAll(async ({ browser, request }) => {
    await cleanData(request);
    page = await browser.newPage();
    await page.goto('/');

    newViewBtn = page.locator('.tab a.addTab');

    const itemsCount = await page.locator('tr.job').count();
    if (itemsCount === 0) {
      for (let i = 0; i < 4; i++) {
        await createNewItem(page);
        await page.locator(ozhJenkinsLocators.jenkinsLogo).click();
      }
      await page.goto('/');
    }
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('TC_23.001.01 | A button for creating a new View is available on the Dashboard and has correct URL', async () => {
    await expect(newViewBtn).toBeVisible();
    await expect(newViewBtn).toHaveAttribute('href', '/newView');
  });
});
