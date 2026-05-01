import { test, expect, Page } from '@/base';

test.describe('US_01.004 | New Item | Select an Item type', () => {
  test('TC_01.004.01 | Verify all required item types are available', async ({
    page,
  }: {
    page: Page;
  }) => {
    await page.getByRole('link', { name: 'New Item' }).click();

    const typesLocator = page.locator('.j-item-options .label');

    await expect(typesLocator).toHaveCount(6);
    await expect(typesLocator).toHaveText([
      'Pipeline',
      'Freestyle project',
      'Multi-configuration project',
      'Folder',
      'Multibranch Pipeline',
      'Organization Folder',
    ]);
  });
});
