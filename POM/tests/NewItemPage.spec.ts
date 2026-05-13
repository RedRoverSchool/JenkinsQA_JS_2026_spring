import { test, expect, App } from '@/POM/fixtures/baseFixtures';

test.describe('US_01.001 | New Item > Create a new item', () => {
	test("RF_01.001.22 | New Item > Create a new item > Verify blank item name validation", async ({ app }: { app: App }) => {
		await app.homePage.clickNewItemLink();

  	await expect(app.newItemPage.itemNameValidationMessage()).toContainText("This field cannot be empty");	
	});
});
