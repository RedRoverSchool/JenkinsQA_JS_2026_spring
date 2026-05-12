import { test, expect, App } from "@/POM/fixtures/baseFixtures";
import { faker } from "@faker-js/faker";

test.describe("US_02.002 | Freestyle Project Configuration > Project Description", () =>{
    test("RF_02.002.16 | Verify Preview option is available", async ({app}: {app: App}) =>{
        const itemName = faker.string.alphanumeric(10);

        await app.homePage.clickNewItemLink();
        await app.newItemPage.fillItemNameField(itemName);
        await app.newItemPage.clickFreestyleProject();
        await app.newItemPage.clickOkButton();
        await app.homePage.header.clickHome();

        await app.homePage.clickJobName(itemName);
        await app.statusPage.clickAddDescriptionBtn();
        await app.statusPage.clickPreviewLink();

        await expect(app.statusPage.previewTextArea()).toBeVisible();
    })
})