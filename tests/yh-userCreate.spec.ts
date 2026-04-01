import { expect } from '@playwright/test';
import { test } from '../base.js';

test.describe('US_15.001 | User > Create', () => {
  test('TC_15.001.01 | Verify click "+Create User" button', async ({ page }) => {
    await page.locator("a[href$='/manage']").click();
    await page.locator(".jenkins-section__item a[href$='Realm/']").click();
    await page.locator(".jenkins-app-bar__controls").click();
   
   expect(page).toHaveURL('/manage/securityRealm/addUser');
  });

});
