import { test, expect, App } from "@/POM/fixtures/newItemPageFixtures";
import { newItemPageData } from "../testData/newItemPageData";
import { statusFreestyleProjectPageData } from "@/POM/testData/statusFreestyleProjectPageData";
import { faker } from "@faker-js/faker";

test.describe("US_02.001 | Freestyle Project Configuration > Enable or Disable the Project", async () => {
    test.beforeEach(async ({ app, createJob }) => {
        await createJob(newItemPageData.itemName, newItemPageData.itemTypes.freestyleProject, true);
        await app.homePage.hoverItemName();
        await app.homePage.openItemDropdownMenu();
        await app.homePage.clickItemDropDownConfigureButton(newItemPageData.itemName);
        await app.configureFreestylePage.disableProject();
        await app.configureFreestylePage.saveChanges();
    });

    test("RF_02.001.01 | Verify that warning message appears after disabling the project", async ({ app }) => {
        await expect(app.statusFreestyleProjectPage.disabledProjectWarning()).toBeVisible();
        await expect(app.statusFreestyleProjectPage.disabledProjectWarning()).toContainText(
            "This project is currently disabled",
        );
    });
    test("TC_02.001.09 | Verify Enable button is shown while project is disabled", async ({ app }) => {
        await expect(app.statusFreestyleProjectPage.enableProjectBtn()).toBeVisible();
        await expect(app.statusFreestyleProjectPage.enableProjectBtn()).toBeEnabled();
    });

    test("TC_02.001.10  | Verify user is redirected to project's Status page after disabling the project", async ({
        app,
    }) => {
        await expect(app.statusFreestyleProjectPage.activeNavLink()).toContainText("Status");
    });
});

test.describe("US_02.002 | Freestyle Project Configuration > Project Description", () => {
    test("RF_02.002.10 | Verify description can be edited from Status page", async ({ app }: { app: App }) => {
        const itemName = newItemPageData.itemName;
        const description = statusFreestyleProjectPageData.description;
        const updatedDescription = statusFreestyleProjectPageData.updatedDescription;

        await app.homePage.clickNewItemLink();
        await app.newItemPage.createFreestyleProject(itemName);
        await app.configureFreestylePage.clickSaveButton();

        await app.statusFreestyleProjectPage.clickAddDescriptionBtn();
        await app.configureFreestylePage.fillDescription(description);
        await app.configureFreestylePage.clickSaveButton();

        await app.statusFreestyleProjectPage.clickAddDescriptionBtn();
        await app.configureFreestylePage.fillDescription(updatedDescription);
        await app.configureFreestylePage.clickSaveButton();

        await expect(app.statusFreestyleProjectPage.descriptionContent()).toContainText(updatedDescription);
    });

    test("TC_02.002.17 | Add description to Freestyle Project", async ({ app }: { app: App }) => {
        const itemName = faker.string.alphanumeric(10);
        const descriptionText = faker.lorem.lines();

        await app.homePage.clickNewItemLink();
        await app.newItemPage.clickFreestyleProject();
        await app.newItemPage.fillItemNameField(itemName);
        await app.newItemPage.clickOkButton();
        await app.homePage.header.clickHome();

        await app.homePage.clickJobName(itemName);
        await app.statusFreestyleProjectPage.clickAddDescriptionBtn();
        await app.configureFreestylePage.fillDescription(descriptionText);
        await app.configureFreestylePage.clickSaveButton();

        await expect(app.statusFreestyleProjectPage.descriptionContent()).toContainText(descriptionText);
    });
});
