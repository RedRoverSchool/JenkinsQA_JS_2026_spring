import { test, expect, App } from "@/POM/fixtures/baseFixtures";
import { newItemPageData } from "../testData/newItemPageData";
import { configureFolderPageData } from "../testData/configureFolderPageData";

test.describe("US_05.001 | Folder Configuration > Display Name and Description", () => {
    test('RF_05.001.01| Folder Configuration > Folder information displayed on configuration page', 
      async ({ app }: { app: App }) => {
        // Precondition: Create a folder named "TestFolder"
        const folderName = configureFolderPageData.folderName;
        const description = configureFolderPageData.description;
        await app.homePage.clickNewItemLink();
        await app.newItemPage.createFolder(folderName);
      
        await app.configureFolderPage.waitForLoadState("load");

        // Fill out the folder configuration form
        await app.configureFolderPage.fillDisplayName(folderName);
        await app.configureFolderPage.fillDescription(configureFolderPageData.description);
        await app.configureFolderPage.clickSaveButton();

        await app.configureFolderPage.waitForLoadState("load");
        // Go to Home Page
        await app.header.clickHome();
       
        // Step 1 - Click on the arrow ^ next to the folder name
        await app.homePage.itemArrowDropdownMenu(folderName).click();
        
        // Step 2 - Click on "Configure" option
         await app.homePage.clickItemDropDownConfigureButton(folderName);

        // Step 3 - Verify that the folder information is displayed on the configuration page
        expect.soft(app.configureFolderPage.displayNameInput()).toHaveValue(folderName);
        expect.soft(app.configureFolderPage.descriptionInput()).toHaveValue(description);
        expect.soft(app.configureFolderPage.healthMetricsButton()).toBeVisible();
        expect.soft(app.configureFolderPage.propertiesSection()).toContainText("Properties");
        expect.soft(app.configureFolderPage.addButton()).toBeVisible();
    });
  
  test("RF_05.001.04 | Verify Display Name and Description fields are available", async ({
    app,
  }: {
    app: App;
  }) => {
    const folderName = configureFolderPageData.folderName;

    await app.homePage.clickNewItemLink();
    await app.newItemPage.createFolder(folderName);

    await expect(app.configureFolderPage.displayNameInput()).toBeVisible();
    await expect(app.configureFolderPage.descriptionInput()).toBeVisible();
  });

  test("RF_05.001.08 | Verify Apply saves changes without leaving page", async ({
    app,
  }: {
    app: App;
  }) => {
    const folderName = configureFolderPageData.folderName;
    const displayName = configureFolderPageData.displayName;
    const description = configureFolderPageData.description;

    await app.homePage.clickNewItemLink();
    await app.newItemPage.createFolder(folderName);

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
});

test.describe("US_05.003 | Folder Configuration > Pipeline Libraries", (): void => {
  test("RF_05.003.01 | Verify adding Pipeline library", async ({
    app,
  }: {
    app: App;
  }) => {
    await app.homePage.clickNewItemLink();
    await app.newItemPage.fillItemNameField(newItemPageData.itemName);
    await app.newItemPage.clickFolderAndOkButton();

    await app.configureFolderPage.header.clickHome();

    await app.homePage.hoverItemName();
    await app.homePage.openItemDropdownMenu();
    await app.homePage.clickItemDropDownConfigureButton(
      newItemPageData.itemName,
    );

    await app.configureFolderPage.clickPropertiesButton();
    await app.configureFolderPage.clickAddButton();
    await app.configureFolderPage.fillLibraryName(
      configureFolderPageData.libraryName,
    );
    //Иногда Save не срабатывает, поэтому передаю itemName, чтобы точно перерйти на страницу после клика по Save
    await app.configureFolderPage.clickSaveButton();

    await app.folderPage.clickConfigureButton(newItemPageData.itemName);
    await app.configureFolderPage.clickPropertiesButton();

    await expect(app.configureFolderPage.libraryInputField()).toHaveValue(
      configureFolderPageData.libraryName,
    );
  });
});
