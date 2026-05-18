import { test, expect, App } from "@/POM/fixtures/baseFixtures";

test.describe("US_01.002.24 | New Item > Nested Folder", () => {
  test("RF_01.002.24 | Verify nested folder creation.", async ({ app }) => {

    const parentFolder = `parent_${Date.now()}`;
    const childFolder = `child_${Date.now()}`;

    await app.newItemPage.createFolder(parentFolder);

    await app.header.clickHome();

    await app.homePage.openItem(parentFolder);

    await app.newItemPage.createFolder(childFolder);

    await expect(app.homePage.getItemLink(childFolder)).toBeVisible();

});
});