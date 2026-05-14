import {test, expect, App} from '@/POM/fixtures/baseFixtures';
import {newItemPageData} from '../testData/newItemPageData';
import {configureFolderPageData} from '../testData/configureFolderPageData';

test.describe('US_01.001 | New Item > Create a new item', () => {
    test('RF_01.001.01 | Verify new item creation', async ({app}: { app: App }) => {
        await app.homePage.clickNewItemLink();

        await app.newItemPage.fillItemNameField(newItemPageData.itemName);
        await app.newItemPage.clickFreestyleProject();
        await app.newItemPage.clickOkButton();

        await app.configureFreestylePage.header.clickHome();

        await expect(app.homePage.itemName()).toHaveText(newItemPageData.itemName);
    });
});

test.describe('US_16.008 | Freestyle Project Management', () => {
    test(`RF_16.008.02 |  Verify deleting freestyle project on project's page`, async ({
                                                                                           app,
                                                                                       }: {
        app: App;
    }) => {
        await app.homePage.clickNewItemLink();

        await app.newItemPage.fillItemNameField(newItemPageData.itemName);
        await app.newItemPage.clickFreestyleProject();
        await app.newItemPage.clickOkButton();

        await app.configureFreestylePage.header.clickHome();

        await app.homePage.clickItemNameLink();
        await app.freeStyleProjectPage.clickDeleteProjectBtn();
        await app.freeStyleProjectPage.clickYesInDeleteDialog();
        await expect(app.homePage.projectTableRow(newItemPageData.itemName)).toHaveCount(0);
    });
});

test.describe("US_05.003 | Folder Configuration > Pipeline Libraries", (): void => {
    test("RF_05.003.01 | Verify adding Pipeline library", async ({app}: { app: App }) => {

        await app.homePage.clickNewItemLink();
        await app.newItemPage.fillItemNameField(newItemPageData.itemName);
        await app.newItemPage.clickFolderAndOkButton();

        await app.configureFolderPage.header.clickHome();

        await app.homePage.clickItemDropDownMenuButton();
        await app.homePage.clickItemDropDownConfigureButton(newItemPageData.itemName);

        await app.configureFolderPage.clickPropertiesButton();
        await app.configureFolderPage.clickAddButton();
        await app.configureFolderPage.fillLibraryName(configureFolderPageData.libraryName);
        //Иногда Save не срабатывает, поэтому передаю itemName, чтобы точно перерйти на страницу после клика по Save
        await app.configureFolderPage.clickSaveButton(newItemPageData.itemName);

        await app.folderPage.clickConfigureButton(newItemPageData.itemName)
        await app.configureFolderPage.clickPropertiesButton()

        await expect(app.configureFolderPage.libraryInputField()).toHaveValue(configureFolderPageData.libraryName);
    });
});
