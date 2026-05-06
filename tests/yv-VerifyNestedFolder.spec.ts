import {test, expect, Page} from "@/base";
import { dataYV } from "./testData/yv-data";

test.describe("US_01.002 | New Item > Folder", () =>{
    test("TC_01.002.21 | Verify nested folder creation", async({page}:{page:Page}) =>{
        await page.getByRole('link', {name: 'New Item'}).click();
        await page.getByRole('textbox', {name: 'name'}).fill(dataYV.itemName);
        await page.getByRole('radio', {name: 'Folder Creates a container'}).click();
        await page.locator('#ok-button').click();
        await page.locator('.app-jenkins-logo').click();

        await page.locator('#projectstatus .jenkins-table__link').hover();
        await page.locator(`.jenkins-menu-dropdown-chevron`).click();
        await page.locator(`a[href$="/${dataYV.itemName}/newJob"]`).click();
        await page.getByRole('textbox', {name: 'name'}).fill(dataYV.nestedFolder);
        await page.getByRole('radio', {name: 'Folder Creates a container'}).click();
        await page.locator('#ok-button').click();
        await page.locator('.app-jenkins-logo').click();
        
        await page.locator(`a[href$="job/${dataYV.itemName}/"] span`).click({ position: { x: 5, y: 5 }});
        await page.locator(`a[href$="job/${dataYV.nestedFolder}/"] span`).click({position: {x: 5, y:5 }});
        await expect(page.locator('.job-index-headline')).toHaveText(dataYV.nestedFolder);



    });
});