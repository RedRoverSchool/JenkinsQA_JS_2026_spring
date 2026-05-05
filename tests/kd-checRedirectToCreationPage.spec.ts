import { test, expect } from "@/base";
import { assert } from "node:console";
import { URLs, errorText, unsupported_symbols } from "./testData/kd-data";
import { faker } from "@faker-js/faker";


test.describe('US_01.001 | New Item > Creatе a new item #6', () => {
    test('TC_01.001.29 | Button New Item Follow To Correct Page', async({ page }) => {
        await page.locator('.task:first-child a').click();

        await expect(page.url()).toContain(URLs.createNewItem);
    });

    test('TC_01.001.33 | Verify new item creation with unsupported symbols in name', async({ page }) => {
        // в рефакторе локаторы вынесу отдельно
        await page.locator('a[href *= "/newJob"]').click();
        
        for (const element of unsupported_symbols){
            // в рефакторе поменяю статичное name на фейкер
            await page.locator('input#name').fill("name"+element);
            await expect(page.locator('.error')).toHaveText(`‘${element}’${errorText}`);
        }
    })
}); 