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
  test('TC_01.004.02 | Verify an item type is selectable', async ({ page }: { page: Page }) => {
    await page.getByRole('link', { name: 'New Item' }).click();

    const freeStyleProject = await page.locator('.hudson_model_FreeStyleProject');
    freeStyleProject.click();

    const checkedItems = page.locator('.j-item-options li[aria-checked="true"]');
    await expect(checkedItems).toHaveCount(1);
    await expect(freeStyleProject).toHaveAttribute('aria-checked', 'true');
  });
});
