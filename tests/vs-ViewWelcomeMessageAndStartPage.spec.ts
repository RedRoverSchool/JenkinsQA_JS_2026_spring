import { expect } from '@playwright/test';
import { test } from '../base';
import { describe } from 'node:test';

test.describe('US_11.001 | Welcome Dashboard > View Welcome Message and start page', () => {
  test('TC_11.001.03 | Verify Welcome message', async ({ page }) => {
    const element = page.locator('.empty-state-block h1');
    await expect(element).toContainText('Welcome to Jenkins!');
  });
});
