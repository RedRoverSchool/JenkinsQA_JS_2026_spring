import { test, expect, App } from "@/POM/fixtures/newItemPageFixtures";
import { newItemPageData } from "../testData/newItemPageData";

test.describe("US_02.001 | Freestyle Project Configuration > Enable or Disable the Project", async () => {
    test.beforeEach(async ({ app, createJob }) => {
        await createJob(newItemPageData.itemName, newItemPageData.itemTypes.freestyleProject, true);
        await app.homePage.hoverItemName();
        await app.homePage.openItemDropdownMenu();
        await app.homePage.clickItemDropDownConfigureButton(newItemPageData.itemName);
        await app.configureFreestylePage.disableProject();
        await app.configureFreestylePage.saveChanges();
    });

    test("RF_02.001.01 | ыVerify that warning message appears after disabling the project", async ({
        app,
    }) => {
        await expect(app.statusFreestyleProjectPage.disabledProjectWarning()).toBeVisible();
        await expect(app.statusFreestyleProjectPage.disabledProjectWarning()).toContainText(
            "This project is currently disabled",
        );
    });
    test("TC_02.001.09 | Verify Enable button is shown while project is disabled", async ({
        app,
    }) => {
        await expect(app.statusFreestyleProjectPage.enableProjectBtn()).toBeVisible();
        await expect(app.statusFreestyleProjectPage.enableProjectBtn()).toBeEnabled();
    });

    test("TC_02.001.10  | Verify user is redirected to project's Status page after disabling the project", async ({
        app,
    }) => {
        await expect(app.statusFreestyleProjectPage.activeNavLink()).toContainText("Status");
    });
});
