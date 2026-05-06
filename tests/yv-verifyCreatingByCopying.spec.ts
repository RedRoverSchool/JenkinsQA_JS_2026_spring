import {test, expect, Page} from "@/base";
import { dataYV, NewItemWhithDescription } from "./testData/yv-data";
import { asyncWrapProviders } from "node:async_hooks";

test.describe("US_01.003 | New Item > Copy from", () =>{
    test("TC_01.003.08 | Verify creating a new item by copying configuration from an existing item", async({page}:{page:Page}) =>{

        const newItem = new NewItemWhithDescription(page)
        await newItem.createNewitemDesc();

        await page.locator(dataYV.NewitemLink).click();
        await page.locator(dataYV.inputName).fill(dataYV.nestedFolder);
        await page.locator(dataYV.freestylePr).click();
        await page.locator('#from').fill(dataYV.itemName);
        await page.locator(dataYV.okBtn).click();
        await page.locator(dataYV.saveBtn).click();
        await page.locator(dataYV.logo).click();
        await page.locator(`a[href$="job/${dataYV.nestedFolder}/"] span`).click({position: {x: 5, y:5 }});
        await expect(page.locator('#description-content')).toContainText(dataYV.descriptionText);
    });
});