import { test, expect, App } from "@/POM/fixtures/baseFixtures";
import { newItemPageData } from "@/POM/testData/newItemPageData";
import { dropdownMenuOptions } from "@/POM/testData/DropdownMenuOptions";

test.describe("US_07.001 | Organization folder Configuration > Change General Settings", () => {
    test("RF_07.001.01 | Access the General Settings from Job Dropdown on the main Jenkins page", async ({app }: {app: App}) => {
        await app.homePage.clickNewItemLink();

        await app.newItemPage.fillItemNameField(newItemPageData.itemTypes.organizationFolder);
        await app.newItemPage.clickOrganizationFolder();
        await app.newItemPage.clickOkButton();

        await app.configureOrganizationFolderPage.header.clickHome();

        await app.homePage.hoverItemName();
        await app.homePage.clickArrowButton();
        await app.homePage.selectDropdownOption(dropdownMenuOptions.optionName.configure);

        await expect(app.configureOrganizationFolderPage.contentTitle()).toHaveText("General");
    });
});