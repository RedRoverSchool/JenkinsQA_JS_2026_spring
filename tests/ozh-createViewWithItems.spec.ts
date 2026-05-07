import { test, expect, Page } from '@/base';
import {
  createNewItem,
  getRandomElementFromArray,
  ozData,
  ozhJenkinsLocators,
} from './testData/ozh-data';
import { cleanData } from '../helpers/cleanData';
import { Locator } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe.serial('US_23.001 | Global View > Create View with items with access', () => {
  let page: Page;
  let newViewBtn: Locator;
  let listView: Locator;
  let myView: Locator;

  test.beforeAll(async ({ browser, request }) => {
    await cleanData(request);
    const context = await browser.newContext({
      storageState: '.auth/storageState.json',
    });
    page = await context.newPage();
    await page.goto('/');
    newViewBtn = page.locator('.tab a.addTab');
    listView = page.locator('label[for="hudson.model.ListView"]');
    myView = page.locator('label[for="hudson.model.MyView"]');

    const itemsCount = await page.locator('tr.job').count();
    if (itemsCount === 0) {
      for (let i = 0; i < 4; i++) {
        await createNewItem(page, faker.word.noun() + i);
        await page.locator(ozhJenkinsLocators.jenkinsLogo).click();
      }
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

  test('TC_23.001.02 | Verify validation tooltip if naming rules are violated', async () => {
    await newViewBtn.click();
    const randomChar = getRandomElementFromArray(ozData.unsupportedCharacters);
    await page.locator('input#name').fill(randomChar);
    await listView.click();
    await expect(page.locator('.error')).toContainText(ozData.unsupportedCharTooltip);
  });
});
