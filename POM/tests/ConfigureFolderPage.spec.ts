import { test, expect, App } from "@/POM/fixtures/baseFixtures";
import { newItemPageData } from "../testData/newItemPageData";
import { configureFolderPageData } from "../testData/configureFolderPageData";

test.describe("US_05 | Folder Configuration", () => {
    let folderName: string;

    test.beforeEach(async ({ app }: { app: App }) => {
        folderName = newItemPageData.folderName;

        await app.homePage.clickNewItemLink();
        await app.newItemPage.createFolder(folderName);
    });

    test("RF_05.001.03 | Verify Configure page opens", async ({ app }) => {
        await expect(app.configureFolderPage.generalSection()).toBeVisible();
    });

    test("RF_05.001.04 | Verify Display Name and Description fields are available", async ({
        app,
    }) => {
        await expect(app.configureFolderPage.displayNameInput()).toBeVisible();
        await expect(app.configureFolderPage.descriptionInput()).toBeVisible();
    });

    test("RF_05.001.08 | Verify Apply saves changes without leaving page", async ({
        app,
    }) => {
        const displayName = configureFolderPageData.displayName;
        const description = configureFolderPageData.description;

        await expect(app.configureFolderPage.generalSection()).toBeVisible();
        await app.configureFolderPage.fillDisplayName(displayName);
        await app.configureFolderPage.fillDescription(description);

        await app.configureFolderPage.clickApplyButton();

        await expect(app.configureFolderPage.generalSection()).toBeVisible();
        await expect(app.configureFolderPage.displayNameInput()).toHaveValue(
            displayName,
        );

        await expect(app.configureFolderPage.descriptionInput()).toHaveValue(
            description,
        );
    });

    test("RF_05.003.01 | Verify adding Pipeline library", async ({ app }) => {
        await app.configureFolderPage.clickPropertiesButton();
        await app.configureFolderPage.clickAddButton();
        await app.configureFolderPage.fillLibraryName(
            configureFolderPageData.libraryName,
        );
        await app.configureFolderPage.clickSaveButton();
        await app.statusFolderPage.clickConfigureLink();

        await expect(app.configureFolderPage.libraryInputField()).toHaveValue(
            configureFolderPageData.libraryName,
        );
    });
});
