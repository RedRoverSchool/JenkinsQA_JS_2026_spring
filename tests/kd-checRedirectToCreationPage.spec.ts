import { test, expect } from "@/base";
import { assert } from "node:console";
import { URLs } from "./testData/kd-data";

test.describe('US_01.001 | New Item > Creatе a new item #6', () => {
    test('TC_01.001.29 | Button New Item Follow To Correct Page', async({ page }) => {
        await page.locator('.task:first-child a').click();

        await expect(page.url()).toContain(URLs.createNewItem);
    });
});