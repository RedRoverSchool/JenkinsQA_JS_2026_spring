import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/sk-data.js";

test.describe("US_06.002 | Multibranch pipeline Configuration > Rename", () => {
    test.beforeEach(async({ page }: { page: Page }) => {
        await page.getByRole("link", {name: "New Item"}).click();
        await page.locator("#name").fill(jenkinsData.projectName);
        await page.getByRole("radio", { name: "Multibranch Pipeline" }).click();
        await page.getByRole("button", {name: "OK"}).click();

        await page.waitForURL("**/configure");
    })

    test("TC_06.002.01 | Renaming project from the side menu", async ({ page }) => {
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

     test("TC_06.002.02 | Renaming project from the main page", async ({ page}: { page: Page }) => {
        await page.locator(".app-jenkins-logo").click();
        await page.getByRole("link", {name: `${jenkinsData.projectName}`}).hover();

        const chevronButton = page.locator("button.jenkins-menu-dropdown-chevron");
        await chevronButton.waitFor({state: "visible"});
        await chevronButton.click();

        await page.locator(".jenkins-dropdown").waitFor({state: "visible"});
        await page.getByRole("link", {name: "Rename"}).click();

        await page.waitForURL("**/confirm-rename");

        const newNameField = page.locator("[name='newName']");
        await newNameField.clear();
        await newNameField.fill(`New ${jenkinsData.projectName}`);

        await page.getByRole("button", {name: "Rename"}).click();

        const updatedProjectName = page.locator("h1.page-headline");
        await updatedProjectName.waitFor({state: "visible"});

        await expect(updatedProjectName).toHaveText(`New ${jenkinsData.projectName}`);
    });

    test("TC_06.002.03 | Error when renaming a project with an empty name", async ({ page }: { page: Page }) => {
        await page.getByRole("button", {name: "Save"}).click();
        await page.getByRole("link", {name: "Rename"}).click();

        await page.locator("[name='newName']").clear();
        await page.getByRole("button", {name: "Rename"}).click();
        await page.waitForURL("**/confirmRename");

        await expect(page.getByRole("heading")).toHaveText(jenkinsData.errorHeading);
        await expect(page.locator("h1+p")).toHaveText(jenkinsData.errorMessages.emptyProjectName);
    });

    jenkinsData.unsafeCharacters.forEach( unsafeCharacter => {
        test(`TC_06.002.04 | Error when renaming a project using a ${unsafeCharacter} character`, async ({ page }: { page: Page }) => {
            await page.getByRole("button", {name: "Save"}).click();
            await page.getByRole("link", {name: "Rename"}).click();

            const newNameField = page.locator("[name='newName']");
            await newNameField.clear();
            await newNameField.fill(`${jenkinsData.projectName}${unsafeCharacter}`);
            
            await page.getByRole("button", {name: "Rename"}).click();
            await page.waitForURL("**/confirmRename");

            const invalidChar = unsafeCharacter === "&" ? "&amp;" : 
                unsafeCharacter === "<" ? "&lt;" : 
                unsafeCharacter === ">" ? "&gt;" : 
                unsafeCharacter;

            await expect(page.getByRole("heading")).toHaveText(jenkinsData.errorHeading);
            await expect(page.locator("h1+p")).toHaveText(`‘${invalidChar}’ ${jenkinsData.errorMessages.unsafeCharacterMessage}`);
        });
    })
    
    test("TC_06.002.06 | Error when renaming a project with the existing name", async ({ page }: { page: Page }) => {
        await page.getByRole("button", {name: "Save"}).click();
        await page.getByRole("link", {name: "Rename"}).click();

        await page.locator("[name='newName']").click();
        await page.getByRole("button", {name: "Rename"}).click();
        await page.waitForURL("**/confirmRename");

        await expect(page.getByRole("heading")).toHaveText(jenkinsData.errorHeading);
        await expect(page.locator("h1+p")).toHaveText(jenkinsData.errorMessages.existingNameErrorMessage);
    });
});
