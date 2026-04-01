import { expect } from '@playwright/test';
import { test } from '../base.js';

test.describe('US_11.008 | Welcome Dashboard > Learn About Distributed Builds', () => {
  test('TC_01.001.24 | Checking the redirection to the User Handbook page', async ({ page }) => {
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.getByRole('link', { name: 'Learn more about distributed builds' }).click(),
    ]);

    await newPage.waitForLoadState('domcontentloaded');
    expect(newPage.url()).toBe(
      'https://www.jenkins.io/doc/book/scaling/architecting-for-scale/#distributed-builds-architecture',
    );
  });
});
