import {test, expect, Page} from "@/base";
import { dataYV } from "./testData/yv-data";

test.describe("US_01.004 | New Item > Select an Item type", () =>{

    for(const itemType of Object.values(dataYV.itemTypes)){

        test(`TC_01.004.17 | Verify that a ${itemType.name} item can be created successfully`, async({page}) =>{

            await page.locator(dataYV.NewitemLink).click();
            await page.locator(dataYV.inputName).fill(dataYV.itemName);
            await page.locator(itemType.locator).click();
            await page.locator(dataYV.okBtn).click();
            await page.locator(dataYV.logo).click();

            const job = await page.locator('#projectstatus .jenkins-table__link').getAttribute('href');
            expect(job).toContain(dataYV.itemName);
        })
    }
});
