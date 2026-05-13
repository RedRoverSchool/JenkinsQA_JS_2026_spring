import { test, expect, App } from "@/POM/fixtures/baseFixtures";
import { newItemPageData } from "@/POM/testData/newItemPageData";

test.describe("US_05.001 | Folder Configuration > Display Name and Description", () => {

  test("RF_05.001.03 | Folder Configuration > Display Name and Description > Verify Configure page opens", async ({ app }: { app: App }) => {
    const folderName = newItemPageData.folderName;

    await app.homePage.clickNewItemLink();
    await app.newItemPage.fillItemNameField(folderName);
    await app.newItemPage.clickFolder();
    await app.newItemPage.clickOkButton();

    await app.configureFolderPage.clickSaveButton();

    await app.folderPage.clickConfigureMenuItem();

    await expect(app.configureFolderPage.generalSection()).toBeVisible();
   });
});