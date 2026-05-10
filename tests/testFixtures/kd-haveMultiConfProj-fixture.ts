import {test as basa, Page} from '@/base';
import {faker} from '@faker-js/faker';

interface Fixture {
  haveMultiProject: Page;  
}

export const label = faker.word.sample();
export const test = basa.extend<Fixture>({
    haveMultiProject: async({ page }, use) => {
            
        await page.locator('.task:first-child a').click();
        await page.locator(".add-item-name input").fill(label);
        await page.locator('[class *= "_FreeStyleProject"]').click();
        await page.locator("#ok-button").click();
        await page.locator('[name="Submit"]').click();
        await page.locator('[href="/"]').click();

        await use(page);
    }
})

// разобраться. не понимаю что написано ниже))
export const expect = basa.expect;
export type { Page };