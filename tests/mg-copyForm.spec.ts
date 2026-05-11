import { test, expect, Page } from "@/base"
import { jenkinsData } from "./testData/mg-data";



test.describe("US_01.003.09 | New Item > copy from", () => {
    test.beforeEach("TC_01.003.09 | Dropdown shows matching item", async ({ page }: {page: Page }) => {
        
    await page.goto('/');

    await page.locator("#side-panel a[href$='newJob']").click();

    await page.locator("#name").fill(jenkinsData.item1);

    await page.getByRole('radio', { name: 'Freestyle project' }).click();

    await page.locator("#ok-button").click();

    await page.locator('button[name="Submit"]').click();

    await page.locator('.app-jenkins-logo').click();
          
    });


test('TC_01.003.10 - Copy From dropdown shows item1', async ({ page }) => {
  await page.locator("#side-panel a[href$='newJob']").click();

    await page.locator('#name').fill(jenkinsData.newItem);

    await page.locator('#from').fill(jenkinsData.item1);

    await expect(page.getByText(jenkinsData.item1)).toBeVisible();
    });

test("TC_01.003.11 | Invalid Copy From shows error", async ({ page }) => {

    await page.locator("#side-panel a[href$='newJob']").click();

    await page.locator('#name').fill(jenkinsData.newItem);

    await page.locator('#from').fill(jenkinsData.inValid);

    await page.locator('#ok-button').click();

    await expect(page).toHaveURL(/newJob|createItem/);

    await expect(page.getByText(/No such job/i)).toBeVisible();

    await expect(page.locator(`a[href="job/${jenkinsData.newItem}/"]`)).toHaveCount(0);
  });

  test("TC_01.003.12 | Valid Copy From creates item", async ({ page }) => {

    await page.locator("#side-panel a[href$='newJob']").click();

    await page.locator('#name').fill(jenkinsData.newItem);

    await page.locator('#from').fill(jenkinsData.item1);

    
    await expect(page.getByText(jenkinsData.item1)).toBeVisible();

    await page.locator('#ok-button').click();

    await expect(page).toHaveURL(/.*\/configure/);

    await page.locator('button[name="Submit"]').click();

    await page.locator('.app-jenkins-logo').click();

    await expect(page.locator('table.jenkins-table a[href="job/item2_copy/"]')).toBeVisible();
  });

});