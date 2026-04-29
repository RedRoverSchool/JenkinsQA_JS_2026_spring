import { test, expect } from "@/base";
import { jenkinsData } from "./testData/sk-data.js";

test.describe("US_06.002 | Multibranch pipeline Configuration > Rename", () => {

    test("TC_06.002.01 | Renaming project from the side menu", async ({ page }) => {
        await page.getByRole("link", {name: "New Item"}).click();
        await page.locator("#name").fill(jenkinsData.projectName);
        await page.getByRole("radio", { name: "Multibranch Pipeline" }).click();
        await page.getByRole("button", {name: "OK"}).click();

        await page.getByRole("button", {name: "Save"}).click();
        await page.getByRole("link", {name: "Rename"}).click();

        const newNameField = page.locator("[name='newName']");
        await newNameField.clear();
        await newNameField.fill(`New ${jenkinsData.projectName}`);

        await page.getByRole("button", {name: "Rename"}).click();

        const updatedProjectName = page.locator("h1.page-headline");
        await updatedProjectName.waitFor({state: "visible"});

        await expect(updatedProjectName).toHaveText(`New ${jenkinsData.projectName}`);  
    });
});