import { test, expect, Page } from '@/base';
import { manageCredentialsLocators, manageJenkinsLocators, credentials } from './testData/ozh-data';
import { Locator } from '@playwright/test';

test.describe.serial('US_22.001 | Add Credentials > General Flow', () => {
  let page: Page;
  let nextBtn: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('/');
    nextBtn = page.locator('button#cr-dialog-next');
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('TC_22.001.01 | Verify that the Credentials page is accessible', async () => {
    await page.locator(manageJenkinsLocators.manageJenkinsBtn).click();
    await page.locator(manageCredentialsLocators.goToCredentialsBtn).click();
    await expect(page.locator(manageCredentialsLocators.addCredentialsBtn)).toBeVisible();
  });

  test('TC_22.001.02 | Verify opening modal window by clicking "Add Credentials"', async () => {
    await page.locator(manageCredentialsLocators.addCredentialsBtn).click();
    await expect(page.locator('.jenkins-dialog')).toBeVisible();
  });

  test('TC_22.001.03 | Verify credential types list', async () => {
    const credentialsList = page.locator('.jenkins-choice-list__item__label');
    await expect(credentialsList).toHaveText(credentials);
  });

  test('TC_22.001.04 | Verify "Next" button is disabled until a credential type is selected', async () => {
    await expect(nextBtn).toBeDisabled();
    await page.locator('.jenkins-choice-list__item__label').first().check();
    await expect(nextBtn).toBeEnabled();
  });

  test('TC_22.001.05 | Verify displaying the credential creation form after clicking NextButton', async () => {
    const credentialBtns = await page.locator('.jenkins-choice-list__item__label').all();
    const randomIndex = Math.floor(Math.random() * credentialBtns.length);
    await credentialBtns[randomIndex].check();
    const chosenCredentialTitle = await credentialBtns[randomIndex].innerText();
    await nextBtn.click();
    await expect(page.locator('.jenkins-dialog__title')).toContainText(chosenCredentialTitle);
  });
});
