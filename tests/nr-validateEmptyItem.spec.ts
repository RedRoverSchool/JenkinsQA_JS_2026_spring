import { test, expect, Page } from "@/base";

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
});