import { test, expect, App } from "@/POM/fixtures/baseFixtures";
import { newItemPageData } from "../testData/newItemPageData";

test.describe("US_02.004 | Freestyle Project Configuration > Build Triggers", () => {
    test.beforeEach(async ({ app }: { app: App }) => {
        await app.homePage.clickNewItemLink();
        await app.newItemPage.fillItemNameField(newItemPageData.itemName);
        await app.newItemPage.clickFreestyleProject();
        await app.newItemPage.clickOkButton();
        await app.configureFreestylePage.goToTriggersSection();
    });

    test("TC_02.004.01 | Verify Build Triggers section is available during project setup",
        async ({ app }: { app: App }) => {
            await expect(app.configureFreestylePage.triggersSectionTitle()).toBeInViewport();
            await expect(app.configureFreestylePage.triggersSectionTitle()).toContainText("Triggers");
        });

    test(`TC_02.004.02 | Verify Authentication Token field is displayed when "Trigger builds remotely" is selected`,
        async ({ app }: { app: App }) => {
            await app.configureFreestylePage.clickTriggerBuildsRemotely();
            await expect(app.configureFreestylePage.authTokenField()).toBeVisible();
            await expect(app.configureFreestylePage.authTokenField()).toBeEnabled();
        });

    test(`TC_02.004.03 | Verify "Projects to watch" field is displayed and enabled when "Build after other projects are built" is selected`,
        async ({ app }: { app: App }) => {
            await app.configureFreestylePage.clickBuildAfterOtherProjectsCheckBox();

            await expect(app.configureFreestylePage.projectsToWatchInput()).toBeVisible();
            await expect(app.configureFreestylePage.projectsToWatchInput()).toBeEnabled();
        });


    test(`TC_02.004.04 | Verify "No project specified" is displayed when Projects to watch field is empty`,
        async ({ app }: { app: App }) => {
            await app.configureFreestylePage.clickBuildAfterOtherProjectsCheckBox();
            await app.configureFreestylePage.projectsToWatchInput().clear();

            await expect(app.configureFreestylePage.noProjectSpecifiedMessage()).toBeVisible();
        });

    test(`TC_02.004.05 | Verify Schedule field is displayed and enabled when Build periodically is selected`,
        async ({ app }: { app: App }) => {
            await app.configureFreestylePage.clickBuildPeriodicallyCheckbox();

            await expect(app.configureFreestylePage.scheduleField()).toBeVisible();
            await expect(app.configureFreestylePage.scheduleField()).toBeEnabled();

            await app.configureFreestylePage.clickBuildPeriodicallyCheckbox();

            await expect(app.configureFreestylePage.scheduleField()).toBeHidden();
        });

});
