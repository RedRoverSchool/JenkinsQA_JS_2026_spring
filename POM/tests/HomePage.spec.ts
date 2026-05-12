import { test, expect, App } from "@/POM/fixtures/baseFixtures";
import { newItemPageData } from "../testData/newItemPageData";

test.describe("US_01.001 | New Item > Create a new item", () => {
	test("RF_01.001.01 | Verify new item creation", async ({ app }: { app: App }) => {
		await app.homePage.clickNewItemLink();

		await app.newItemPage.fillItemNameField(newItemPageData.itemName);
		await app.newItemPage.clickFreestyleProject();
		await app.newItemPage.clickOkButton();

		await app.configureFreestylePage.header.clickHome();

		await expect(app.homePage.itemName()).toHaveText(newItemPageData.itemName);
	});
});
