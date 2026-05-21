import { test, expect, App } from '@/POM/fixtures/baseFixtures';
import { newItemPageData } from "@/POM/testData/newItemPageData";

test.describe("US_13.001 | Header > Navigate to Dashboard", () => {
    test("RF_13.001.01 | Verify header is visible from tools page", async ({ app }: { app: App }) => {
        await app.homePage.header.clickManageJenkins();
        await app.manageJenkinsPage.clickTools();

        await expect(app.toolsPage.header.logoLink()).toBeVisible();
    });

    test("RF_13.001.02 | Verify redirection to Dashboard and content visibility", async ({ app }: { app: App }) => {
        await app.homePage.clickNewItemLink();
        await app.newItemPage.fillItemNameField(newItemPageData.itemName);
        await app.newItemPage.clickFreestyleProject();
        await app.newItemPage.clickOkButton();

        await app.configureFreestylePage.header.clickHome();

        await expect(app.homePage.itemName()).toHaveText(newItemPageData.itemName);
    });
});

test.describe("US_13.002 | Header > Global Search", () => {
    test("RF_13.002.01 | Verify search results appear", async ({ app }: { app: App }) => {
        const itemName = newItemPageData.itemName;

        await app.homePage.clickNewItemLink();
        await app.newItemPage.fillItemNameField(itemName);
        await app.newItemPage.clickFreestyleProject();
        await app.newItemPage.clickOkButton();

        await app.configureFreestylePage.header.clickHome();
        await app.homePage.header.clickSearchButton();
        await app.homePage.header.fillSearchField(itemName);
     
        const results = await app.homePage.header.getSearchDropdownResults();
        await expect(results).toContainText(itemName);
    });
});