import { test, expect, Page } from "@/base";
import { duplicateItemNameData } from "./testData/nr-data";


test.describe("US_01.001 | New Item > Create a new item", () => {
    test("ID: TC_01.001.08 |Validate Empty Item Name", async ({ page }: { page: Page}) => {
       // Open New Item page
       await page.locator("#side-panel a[href$='newJob']").click();
       // Select Freestyle project
       await page.locator("li.hudson_model_FreeStyleProject").click();
       // Verify error message
       const errorMsg = page.getByText("This field cannot be empty, please enter a valid name");
       await expect(errorMsg).toBeVisible();
       // Verify ok button is disabled
       const okBtn = page.locator("button#ok-button");
       await expect(okBtn).toBeDisabled();
    });

    test("ID: TC_01.001.31 | Validate Duplicate Item Name", async ({ page }: { page: Page}) => {
        // Open New Item page
        await page.locator("#side-panel a[href$='newJob']").click();
        // Fill in the item name
        await page.locator("#name").fill(duplicateItemNameData.itemName);
        // Select the Freestyle project
        await page.getByText(duplicateItemNameData.itemType).click();
        // Click the OK button
        await page.locator("#ok-button").click();
        // Go back to home page
        await page.locator("span.jenkins-mobile-hide").click();
        // Click New Item again
        await page.locator("#side-panel a[href$='newJob']").click();
        // Fill in the same item name
        await page.locator("#name").fill(duplicateItemNameData.itemName);

        const warningMsg = page.getByText(duplicateItemNameData.expectedWarningMessage);
        await expect(warningMsg).toBeVisible();

        const okBtn = page.locator("button#ok-button");
        await expect(okBtn).toBeDisabled();
    });
})

