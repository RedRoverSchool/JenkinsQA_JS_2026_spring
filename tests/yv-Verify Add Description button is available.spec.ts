import {test, expect, Page} from "@/tests/testFixtures/yv-fix"
import { dataYV } from "./testData/yv-data";


test.describe("US_02.002 | Freestyle Project Configuration > Project Description", () =>{
    test("TC_02.002.13 | Verify Add Description button is available in the Status section", async ({ createNewFreeProj }) =>{
        await createNewFreeProj.locator(`a[href$="job/${dataYV.itemName}/"] span`).click({ position: { x: 5, y: 5 }});
        await expect(createNewFreeProj.locator('[href="editDescription"]')).toBeVisible();
    });

});

