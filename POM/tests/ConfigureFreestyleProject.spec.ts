import { test, expect, App } from "@/POM/fixtures/baseFixtures";
import { newItemPageData } from "../testData/newItemPageData";
import { faker } from "@faker-js/faker";

test.describe("US_02.004 | Freestyle Project Configuration > Build Triggers", () => {
    test.beforeEach(async ({ app }: { app: App }) => {
        await app.homePage.clickNewItemLink();
        await app.newItemPage.fillItemNameField(newItemPageData.itemName);
        await app.newItemPage.clickFreestyleProject();
        await app.newItemPage.clickOkButton();
        await app.configureFreestylePage.goToTriggersSection();
    });

    test("TC_02.004.01 | Verify Build Triggers section is available during project setup", async ({
        app,
    }: {
        app: App;
    }) => {
        await expect(app.configureFreestylePage.triggersSectionTitle()).toBeInViewport();
        await expect(app.configureFreestylePage.triggersSectionTitle()).toContainText("Triggers");
    });

    test(`TC_02.004.02 | Verify Authentication Token field is displayed when "Trigger builds remotely" is selected`, async ({
        app,
    }: {
        app: App;
    }) => {
        await app.configureFreestylePage.enableTriggerBuildsRemotely();
        await expect(app.configureFreestylePage.authTokenField()).toBeVisible();
        await expect(app.configureFreestylePage.authTokenField()).toBeEnabled();
    });

    test(`TC_02.004.03 | Verify "Projects to watch" field is displayed and enabled when "Build after other projects are built" is selected`, async ({
        app,
    }: {
        app: App;
    }) => {
        await app.configureFreestylePage.enableBuildAfterOtherProjectsCheckBox();

        await expect(app.configureFreestylePage.projectsToWatchInput()).toBeVisible();
        await expect(app.configureFreestylePage.projectsToWatchInput()).toBeEnabled();
    });

    test(`TC_02.004.04 | Verify "No project specified" is displayed when Projects to watch field is empty`, async ({
        app,
    }: {
        app: App;
    }) => {
        await app.configureFreestylePage.enableBuildAfterOtherProjectsCheckBox();
        await app.configureFreestylePage.projectsToWatchInput().clear();

        await expect(app.configureFreestylePage.noProjectSpecifiedMessage()).toBeVisible();
    });
});

test.describe("US_02.002 | Freestyle Project Configuration > Project Description", () => {
    test("RF_02.002.16 | Verify Preview option is available", async ({ app }: { app: App }) => {
        const itemName = faker.string.alphanumeric(10);

        await app.homePage.clickNewItemLink();
        await app.newItemPage.fillItemNameField(itemName);
        await app.newItemPage.clickFreestyleProject();
        await app.newItemPage.clickOkButton();
        await app.homePage.header.clickHome();

        await app.homePage.clickJobName(itemName);
        await app.statusFreestyleProjectPage.clickAddDescriptionBtn();
        await app.configureFreestylePage.clickPreviewLink();

        await expect(app.configureFreestylePage.previewTextArea()).toBeVisible();
    });
});
