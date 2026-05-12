import { test, expect, Page } from "@/base";
import { faker } from "@faker-js/faker";


test.describe('US_01.002 | New Item > Folder', () => {
    test('TC_01.002.23 | New Item > Folder > Create New Folder', async({ page } : {page : Page}) => {
            const label = faker.word.sample();
            
            await page.locator('.task:first-child a').click();
            await page.locator(".add-item-name input").fill(label);
            await page.locator('[class *= "_Folder"]').click();
            await page.locator("#ok-button").click();
            await page.locator('[name="Submit"]').click();
            const pageUrl = page.url();

            expect(pageUrl.includes(label));
    })
});
