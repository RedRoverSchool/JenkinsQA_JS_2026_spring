import { test, expect } from "../base";
import { jenkinsData } from "./testData/sm-data";
test.describe("US_01.001 | New Item > Creatе a new item", () => {
    test.beforeEach(async ({ page }) => {
        //Navigate to newJob page
        await page.locator("a:has-text('New Item')").click();
    });
    test("TC_01.001.35 | Successful item creation", async ({ page }) => {
        await page.locator("#name").fill(jenkinsData.jobName);
        await page.locator(".hudson_model_FreeStyleProject").click();
        await page.locator("#ok-button").click();
        const job = await page.locator(".jenkins-breadcrumbs__list-item a").getAttribute("href");
        expect(job).toContain(jenkinsData.jobName);
    });
    test("TC_01.001.36 | Verify new item name for invalid characters and blank name", async ({ page }) => {
        //Blank item name validation
        const newItemField = page.locator("#name");
        const validationMessage = page.locator("#itemname-required");
        const okButton = page.locator("#ok-button");
        await expect(okButton).toBeDisabled();
        //Switch focus to trigger validation message
        await page.keyboard.press("Tab");
        const expectedError = jenkinsData.itemNameRequiredValidationMessage;
        await expect(validationMessage).toHaveText(expectedError);
        //Item name with special characters validation
        for (let specialChar of jenkinsData.specialCharArray) {
            await newItemField.fill(specialChar);
            const expectedError = jenkinsData.itemNameInvalidValidationMessage.replace("‘’", `‘${specialChar}’`);
            await expect(page.locator("#itemname-invalid")).toHaveText(expectedError);
            await expect(okButton).toBeDisabled();
            await newItemField.clear();
        }
    });
});
//# sourceMappingURL=sm-createNewItem.spec.js.map