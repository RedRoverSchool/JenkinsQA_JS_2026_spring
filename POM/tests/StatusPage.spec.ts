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

    test("TC_02.002.17 | Add description to Freestyle Project", async ({app}: {app:App}) =>{
        const itemName = faker.string.alphanumeric(10);
        const descriptionText = faker.lorem.lines();

        await app.homePage.clickNewItemLink();
        await app.newItemPage.clickFreestyleProject();
        await app.newItemPage.fillItemNameField(itemName);
        await app.newItemPage.clickOkButton();
        await app.homePage.header.clickHome()

        await app.homePage.clickJobName(itemName);
        await app.statusPage.clickAddDescriptionBtn();
        await app.statusPage.fillDescription(descriptionText);
        await app.statusPage.clickSaveButton();

        await expect(app.statusPage.descriptionContent()).toContainText(descriptionText);
    })
})