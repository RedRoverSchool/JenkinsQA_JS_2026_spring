import {test, expect, Page} from "@/tests/testFixtures/yv-fix"
import { dataYV } from "./testData/yv-data";



test.describe("US_02.002 | Freestyle Project Configuration > Project Description", () =>{
    test("TC_02.002.13 | Verify Add Description button is available in the Status section", async ({ createNewFreeProj }) =>{
        await createNewFreeProj.locator(`a[href$="job/${dataYV.itemName}/"] span`).click({ position: { x: 5, y: 5 }});
        await expect(createNewFreeProj.locator('[href="editDescription"]')).toBeVisible();
    });

    test("TC_02.002.14| Verify description field is available", async ({createNewFreeProj}) =>{

        await createNewFreeProj.locator(`a[href$="job/${dataYV.itemName}/"] span`).click({position: {x: 5, y: 5}});
        await createNewFreeProj.locator('[href="editDescription"]').click();

        await expect(createNewFreeProj.locator('[name="description"]')).toBeVisible();
    });


    test("TC_02.002.15 | Add description to Freestyle Project", async ({createNewFreeProj}) =>{

        await createNewFreeProj.locator(`a[href$="job/${dataYV.itemName}/"] span`).click({position: {x: 5, y: 5}});
        await createNewFreeProj.locator('[href="editDescription"]').click();
        await createNewFreeProj.locator('[name="description"]').fill(dataYV.descriptionText);
        await createNewFreeProj.locator(dataYV.saveBtn).click();

        await expect(createNewFreeProj.locator('#description-content')).toContainText(dataYV.descriptionText);
    });

    test("TC_02.002.16 | Verify Preview option is available", async ({createNewFreeProj}) =>{
        await createNewFreeProj.locator(`a[href$="job/${dataYV.itemName}/"] span`).click({position: {x: 5, y: 5}});
        await createNewFreeProj.locator('[href="editDescription"]').click();
        
        await expect(createNewFreeProj.locator(`a[previewendpoint="/markupFormatter/previewDescription"]`)).toBeEnabled();
    })


});

