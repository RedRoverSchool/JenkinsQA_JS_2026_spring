import { expect } from "@playwright/test";
import { test } from "@/base";
import { App } from "@/POM/pageObjects/App";
import { globalData } from "../testData/globalData";

test.describe("test description suite", () => {
	test("test 1", async ({ page }) => {
		const app = new App(page);

		await app.homePage.clickNewItemLink();

		await app.newItemPage.fillItemNameField(globalData.itemName);
		await app.newItemPage.clickFreestyleProject();
		await app.newItemPage.clickOkbutton();

		await app.configureFreestylePage.header.clickHome();

		await expect(app.homePage.itemName()).toHaveText(globalData.itemName);
	});
});
