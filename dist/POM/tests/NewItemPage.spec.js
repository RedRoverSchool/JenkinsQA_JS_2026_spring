import { test, expect } from '../../POM/fixtures/baseFixtures';
test.describe('US_01.001 | New Item > Create a new item', () => {
    test("RF_01.001.21 | New Item > Create a new item > Verify new item page opens from dashboard", async ({ app }) => {
        await app.homePage.clickNewItemLink();
        await expect(app.newItemPage.newItemTitle()).toContainText("New Item");
    });
    test("RF_01.001.22 | New Item > Create a new item > Verify blank item name validation", async ({ app }) => {
        await app.homePage.clickNewItemLink();
        await expect(app.newItemPage.itemNameValidationMessage()).toContainText("This field cannot be empty");
    });
});
//# sourceMappingURL=NewItemPage.spec.js.map