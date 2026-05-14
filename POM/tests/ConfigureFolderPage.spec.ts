import {test, expect, App} from '@/POM/fixtures/baseFixtures';
import {newItemPageData} from '../testData/newItemPageData';
import {configureFolderPageData} from '../testData/configureFolderPageData';

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