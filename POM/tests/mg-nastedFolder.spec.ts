import { test, expect } from "@/base";
import { HomePage } from "../pageObjects/pages/HomePage";
import { NewItemPage } from "../pageObjects/pages/NewItemPage";


test.describe("US_01.002 | New Item > Folder", () => {
    test("RF_01.002.24 | Verify nasted folder creation", async ({ page }) => {

        const parentFolder = `parent_${Date.now()}`;
        const childFolder = `child_${Date.now()}`;

        const home = new HomePage(page);
        const newItem = new NewItemPage(page);

        await newItem.createFolder(parentFolder);
        await home.goHome();

        await home.openItem(parentFolder);

        await newItem.createFolder(childFolder);

        await expect(page.getByRole("link", { name: childFolder })).toBeVisible();
    })
})