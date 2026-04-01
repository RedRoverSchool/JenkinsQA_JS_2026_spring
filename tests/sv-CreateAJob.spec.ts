import { expect } from '@playwright/test';
import { test } from '../base.js';

test.describe('US_11.002 | Welcome Dashboard > Create a Job', () => {
  test('TC_11.002.01 | Verify New Item Button', async ({ page }) => {
    const element = page.locator("#side-panel a[href$='newJob']");
    await expect(element).toBeVisible();
  });
});
